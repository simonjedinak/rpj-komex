"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";

interface FisheyeCarouselProps {
  imageUrls?: string[];
  autoplayInterval?: number;
  animationDuration?: number;
  className?: string;
  aspectRatio?: number;
  fisheyeAmount?: number;
}

const easeInOutSine = (t: number): number => -(Math.cos(Math.PI * t) - 1) / 2;

export default function FisheyeCarousel({
  imageUrls,
  autoplayInterval = 4000,
  animationDuration = 700,
  className = "",
  aspectRatio = 16 / 9,
  fisheyeAmount = 0.7,
}: FisheyeCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const meshesRef = useRef<THREE.Mesh[]>([]);
  const texturesRef = useRef<THREE.Texture[]>([]);
  const composerTargetRef = useRef<THREE.WebGLRenderTarget | null>(null);
  const fisheyeMaterialRef = useRef<THREE.ShaderMaterial | null>(null);

  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const currentIndexRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const isAnimatingRef = useRef(false);
  const progressRef = useRef(0);

  // Observe container size
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let timeoutId: NodeJS.Timeout;
    const resizeObserver = new ResizeObserver((entries) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        for (const entry of entries) {
          const { width } = entry.contentRect;
          if (width > 0) {
            const height = width / aspectRatio;
            setContainerSize((prev) =>
              prev.width === width && prev.height === height
                ? prev
                : { width, height },
            );
          }
        }
      }, 50);
    });

    resizeObserver.observe(container);
    return () => {
      clearTimeout(timeoutId);
      resizeObserver.disconnect();
    };
  }, [aspectRatio]);

  // Load images
  useEffect(() => {
    let cancelled = false;

    const loadImages = async () => {
      let urls: string[] = imageUrls ?? [];

      if (!urls.length) {
        try {
          const response = await fetch("/api/images");
          const data = await response.json();
          urls = data.images || [];
        } catch (error) {
          console.error("Failed to load images:", error);
          return;
        }
      }

      if (urls.length === 0 || cancelled) return;

      try {
        const loadedImages = await Promise.all(
          urls.map(
            (url) =>
              new Promise<HTMLImageElement>((resolve, reject) => {
                const img = new Image();
                img.crossOrigin = "anonymous";
                img.onload = () => resolve(img);
                img.onerror = () => reject(new Error(`Failed to load: ${url}`));
                img.src = url;
              }),
          ),
        );

        if (!cancelled) {
          setImages(loadedImages);
          setIsReady(true);
        }
      } catch (error) {
        console.error("Error loading images:", error);
      }
    };

    loadImages();
    return () => {
      cancelled = true;
    };
  }, [imageUrls]);

  // Initialize Three.js
  useEffect(() => {
    if (
      !containerRef.current ||
      containerSize.width === 0 ||
      images.length === 0
    )
      return;

    const container = containerRef.current;
    const width = containerSize.width;
    const height = containerSize.height;
    const dpr = Math.min(window.devicePixelRatio, 2);

    // Clear existing
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(dpr);
    renderer.setClearColor(0xffffff);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Scene for carousel
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    sceneRef.current = scene;

    // Orthographic camera matching pixel coordinates
    const camera = new THREE.OrthographicCamera(
      0,
      width,
      height,
      0,
      -1000,
      1000,
    );
    camera.position.z = 1;
    cameraRef.current = camera;

    // Create textures and meshes for each image
    const textures: THREE.Texture[] = [];
    const meshes: THREE.Mesh[] = [];

    images.forEach((img) => {
      const texture = new THREE.Texture(img);
      texture.needsUpdate = true;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      textures.push(texture);

      const geometry = new THREE.PlaneGeometry(1, 1);
      const material = new THREE.MeshBasicMaterial({ map: texture });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.visible = false;
      scene.add(mesh);
      meshes.push(mesh);
    });

    texturesRef.current = textures;
    meshesRef.current = meshes;

    // Render target for carousel scene
    const renderTarget = new THREE.WebGLRenderTarget(width * dpr, height * dpr);
    composerTargetRef.current = renderTarget;

    // Fisheye post-process scene
    const postScene = new THREE.Scene();
    const postCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const fisheyeMaterial = new THREE.ShaderMaterial({
      uniforms: {
        iChannel0: { value: renderTarget.texture },
        iResolution: { value: new THREE.Vector2(width, height) },
        amount: { value: fisheyeAmount },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;
        uniform sampler2D iChannel0;
        uniform vec2 iResolution;
        uniform float amount;
        varying vec2 vUv;
        
        void main() {
          vec2 p = vUv;
          float prop = iResolution.x / iResolution.y;
          vec2 m = vec2(0.5, 0.5 / prop);
          vec2 d = p - vec2(0.5, 0.5);
          d.y /= prop;
          float r = length(d);
          float power = (2.0 * 3.141592 / (2.0 * sqrt(dot(m, m)))) * (amount - 0.5);
          float bind = power > 0.0 ? sqrt(dot(m, m)) : (prop < 1.0 ? m.x : m.y);
          
          vec2 uv;
          if (power > 0.0)
            uv = vec2(0.5, 0.5) + normalize(d) * tan(r * power) * bind / tan(bind * power);
          else if (power < 0.0)
            uv = vec2(0.5, 0.5) + normalize(d) * atan(r * -power * 10.0) * bind / atan(-power * bind * 10.0);
          else
            uv = p;
          
          uv.y = (uv.y - 0.5) * prop + 0.5;
          gl_FragColor = texture2D(iChannel0, uv);
        }
      `,
    });
    fisheyeMaterialRef.current = fisheyeMaterial;

    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), fisheyeMaterial);
    postScene.add(quad);

    // Layout helper
    const getSlotPositions = (progress: number, baseIndex: number) => {
      const centerW = width * 0.6;
      const centerH = height * 1.2;
      const sideW = width * 0.8;
      const sideH = height;
      const gap = width * 0.02;

      // const centerW = width * 0.7;
      // const centerH = height * 1.2;
      // const sideW = width * 0.8;
      // const sideH = height * 0.6;
      // const gap = width * 0.01;

      const totalW = sideW + gap + centerW + gap + sideW;
      const startX = (width - totalW) / 2;
      const leftX = startX;
      const centerX = startX + sideW + gap;
      const rightX = centerX + centerW + gap;
      const farRightX = rightX + sideW + gap;
      const slideD = centerW + gap;

      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

      return [
        {
          offset: -1,
          x: lerp(leftX, leftX - slideD, progress),
          w: sideW,
          h: sideH,
        },
        {
          offset: 0,
          x: lerp(centerX, leftX, progress),
          w: lerp(centerW, sideW, progress),
          h: lerp(centerH, sideH, progress),
        },
        {
          offset: 1,
          x: lerp(rightX, centerX, progress),
          w: lerp(sideW, centerW, progress),
          h: lerp(sideH, centerH, progress),
        },
        { offset: 2, x: lerp(farRightX, rightX, progress), w: sideW, h: sideH },
      ].map((slot) => ({
        ...slot,
        index: (baseIndex + slot.offset + images.length) % images.length,
      }));
    };

    // Render loop
    let running = true;
    const render = () => {
      if (!running) return;

      const slots = getSlotPositions(
        progressRef.current,
        currentIndexRef.current,
      );

      // Hide all meshes
      meshes.forEach((m) => (m.visible = false));

      // Position and show active slots
      slots.forEach((slot) => {
        const mesh = meshes[slot.index];
        const img = images[slot.index];
        if (!mesh || !img) return;

        const imgAspect = img.naturalWidth / img.naturalHeight;
        const slotAspect = slot.w / slot.h;

        let drawW: number, drawH: number;
        if (imgAspect > slotAspect) {
          drawW = slot.w;
          drawH = slot.w / imgAspect;
        } else {
          drawH = slot.h;
          drawW = slot.h * imgAspect;
        }

        // Scale images based on how far their center is from the carousel center.
        // Cap the final width so the gap between slots never collapses.
        // Also apply a small boost to side images to compensate for the fisheye effect
        // and enforce a minimum size so they don't shrink too much.
        const slotCenterX = slot.x + slot.w / 2;
        const carouselCenterX = width / 2;
        const distanceNormalized = Math.min(
          1,
          Math.abs(slotCenterX - carouselCenterX) / (width / 2),
        );

        const maxExtraScale = 0.6; // how much off-center images can grow
        const scaleMultiplier = 1 + distanceNormalized * maxExtraScale;

        const gapLocal = width * 0.01; // should match layout gap calculation
        const isSide = slot.offset !== 0;

        // Keep the visual gap constant throughout the animation
        const gapReserve = gapLocal;

        const desiredWidth = drawW * scaleMultiplier;

        // Apply a fisheye compensation for side images (scales with fisheyeAmount)
        const sideCompensation = isSide ? 1 + Math.abs(fisheyeAmount) * 0.5 : 1;

        const maxAllowedWidth = Math.max(slot.w - gapReserve, 1);
        const minAllowedWidth = Math.min(slot.w * 0.8, maxAllowedWidth); // don't shrink below 80% of slot

        let finalWidth = Math.min(
          desiredWidth * sideCompensation,
          maxAllowedWidth,
        );
        finalWidth = Math.max(finalWidth, minAllowedWidth);

        const finalHeight = finalWidth / imgAspect;

        mesh.scale.set(finalWidth, finalHeight, 1);
        mesh.position.set(
          slot.x + slot.w / 2,
          height / 2,
          slot.offset, // z-order
        );
        mesh.visible = true;
      });

      // Render carousel to target
      renderer.setRenderTarget(renderTarget);
      renderer.render(scene, camera);

      // Render fisheye to screen
      renderer.setRenderTarget(null);
      renderer.render(postScene, postCamera);

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      running = false;
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
      textures.forEach((t) => t.dispose());
      meshes.forEach((m) => {
        m.geometry.dispose();
        (m.material as THREE.Material).dispose();
      });
      renderTarget.dispose();
      fisheyeMaterial.dispose();
      renderer.dispose();
    };
  }, [containerSize, images, fisheyeAmount]);

  // Update fisheye amount
  useEffect(() => {
    if (fisheyeMaterialRef.current) {
      fisheyeMaterialRef.current.uniforms.amount.value = fisheyeAmount;
    }
  }, [fisheyeAmount]);

  // Animation
  const animateToNext = useCallback(() => {
    if (isAnimatingRef.current || images.length === 0) return;

    isAnimatingRef.current = true;
    const startTime = performance.now();
    const startIndex = currentIndexRef.current;

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const raw = Math.min(elapsed / animationDuration, 1);
      progressRef.current = easeInOutSine(raw);

      if (raw < 1) {
        requestAnimationFrame(animate);
      } else {
        // keep the final eased state for one frame to avoid snapping
        progressRef.current = 1;
        requestAnimationFrame(() => {
          currentIndexRef.current = (startIndex + 1) % images.length;
          progressRef.current = 0;
          isAnimatingRef.current = false;
        });
      }
    };

    requestAnimationFrame(animate);
  }, [images.length, animationDuration]);

  // Autoplay
  useEffect(() => {
    if (!isReady || images.length === 0) return;

    const id = setInterval(() => {
      if (!isAnimatingRef.current) animateToNext();
    }, autoplayInterval);

    return () => clearInterval(id);
  }, [isReady, images.length, autoplayInterval, animateToNext]);

  return (
    <div
      ref={containerRef}
      className={`w-full ${className}`}
      style={{ height: containerSize.height || "auto" }}
    />
  );
}
