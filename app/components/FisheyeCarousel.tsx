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
  fisheyeAmount = 0.78,
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
    // Measure immediately to reserve layout space (avoid layout shift)
    const rect = container.getBoundingClientRect();
    if (rect.width > 0) {
      const height = rect.width / aspectRatio;
      setContainerSize((prev) =>
        prev.width === Math.round(rect.width) &&
        prev.height === Math.round(height)
          ? prev
          : { width: Math.round(rect.width), height: Math.round(height) },
      );
    }

    let timeoutId: NodeJS.Timeout;
    const resizeObserver = new ResizeObserver((entries) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        for (const entry of entries) {
          const { width } = entry.contentRect;
          if (width > 0) {
            const height = width / aspectRatio;
            setContainerSize((prev) =>
              prev.width === Math.round(width) &&
              prev.height === Math.round(height)
                ? prev
                : { width: Math.round(width), height: Math.round(height) },
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
    const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 4));

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
    // ensure canvas CSS size matches container pixels
    renderer.domElement.style.width = `${width}px`;
    renderer.domElement.style.height = `${height}px`;
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
    const renderTarget = new THREE.WebGLRenderTarget(
      Math.floor(width * dpr),
      Math.floor(height * dpr),
    );
    composerTargetRef.current = renderTarget;

    // Fisheye post-process scene
    const postScene = new THREE.Scene();
    const postCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const fisheyeMaterial = new THREE.ShaderMaterial({
      uniforms: {
        iChannel0: { value: renderTarget.texture },
        iResolution: { value: new THREE.Vector2(width * dpr, height * dpr) },
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
          float rd = length(uv - vec2(0.5, 0.5));
          float stretchCurve = smoothstep(0.0, 0.1, rd) * rd;
          float yStretch = 1.0 + amount * -(0.8) * stretchCurve;

          // Apply aspect correction together with vertical stretch for smooth fisheye look
          uv.y = (uv.y - 0.5) * prop * yStretch + 0.5;
          gl_FragColor = texture2D(iChannel0, uv);
        }
      `,
    });
    fisheyeMaterialRef.current = fisheyeMaterial;

    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), fisheyeMaterial);
    postScene.add(quad);

    // Layout helper
    const getSlotPositions = (progress: number, baseIndex: number) => {
      // All images have the same size, and only slide left
      const imgW = width * 0.6;
      const imgH = height * 0.8;
      const gap = width * 0.02;
      const totalW = imgW * 3 + gap * 2;
      const startX = (width - totalW) / 2;
      const slideD = imgW + gap;
      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

      return [
        {
          offset: -1,
          x: lerp(startX, startX - slideD, progress),
          w: imgW,
          h: imgH,
        },
        {
          offset: 0,
          x: lerp(startX + imgW + gap, startX, progress),
          w: imgW,
          h: imgH,
        },
        {
          offset: 1,
          x: lerp(startX + (imgW + gap) * 2, startX + imgW + gap, progress),
          w: imgW,
          h: imgH,
        },
        {
          offset: 2,
          x: lerp(
            startX + (imgW + gap) * 3,
            startX + (imgW + gap) * 2,
            progress,
          ),
          w: imgW,
          h: imgH,
        },
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

        // Always use the same size for all images
        const imgAspect = img.naturalWidth / img.naturalHeight;
        let drawW = slot.w;
        let drawH = slot.h;
        if (imgAspect > drawW / drawH) {
          drawH = drawW / imgAspect;
        } else {
          drawW = drawH * imgAspect;
        }

        mesh.scale.set(drawW, drawH, 1);
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
      style={{
        height: containerSize.height || undefined,
        aspectRatio: `${aspectRatio}`,
      }}
    />
  );
}
