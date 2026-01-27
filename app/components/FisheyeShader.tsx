"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface FisheyeShaderProps {
  sourceCanvas: HTMLCanvasElement | null;
  width: number;
  height: number;
  amount?: number; // -2.5 to 2.5 (negative = anti-fisheye, positive = fisheye)
  className?: string;
}

export default function FisheyeShader({
  sourceCanvas,
  width,
  height,
  amount = 1.0,
  className = "",
}: FisheyeShaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const textureRef = useRef<THREE.Texture | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const isRunningRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current || !sourceCanvas || width === 0 || height === 0)
      return;

    // Capture container reference for cleanup
    const container = containerRef.current;

    // Clear any existing children first
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    // Initialize Three.js scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create texture from source canvas
    const texture = new THREE.CanvasTexture(sourceCanvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
    textureRef.current = texture;

    // Fisheye shader from Shadertoy 4s2GRR
    const fisheyeShader = {
      uniforms: {
        iChannel0: { value: texture },
        iResolution: { value: new THREE.Vector2(width, height) },
        amount: { value: amount },
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
          vec2 fragCoord = vUv * iResolution;
          
          // Normalized coords
          vec2 p = fragCoord.xy / iResolution.x;
          
          // Screen proportion
          float prop = iResolution.x / iResolution.y;
          
          // Center coords
          vec2 m = vec2(0.5, 0.5 / prop);
          
          // Vector from center to current fragment
          vec2 d = p - m;
          
          // Distance of pixel from center
          float r = sqrt(dot(d, d));
          
          float power = (2.0 * 3.141592 / (2.0 * sqrt(dot(m, m)))) * (amount - 0.5);
          
          // Radius of 1:1 effect
          float bind;
          
          // Stick to borders
          if (power > 0.0)
            bind = sqrt(dot(m, m));
          else {
            if (prop < 1.0)
              bind = m.x;
            else
              bind = m.y;
          }
          
          vec2 uv;
          
          // Fisheye
          if (power > 0.0)
            uv = m + normalize(d) * tan(r * power) * bind / tan(bind * power);
          // Anti-fisheye
          else if (power < 0.0)
            uv = m + normalize(d) * atan(r * -power * 10.0) * bind / atan(-power * bind * 10.0);
          // No effect
          else
            uv = p;
          
          // Sample texture
          vec3 col = texture2D(iChannel0, vec2(uv.x, uv.y * prop)).rgb;
          gl_FragColor = vec4(col, 1.0);
        }
      `,
    };

    const material = new THREE.ShaderMaterial(fisheyeShader);
    materialRef.current = material;

    // Create plane geometry
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Continuous render loop to pick up canvas changes during animation
    isRunningRef.current = true;
    const renderLoop = () => {
      if (!isRunningRef.current) return;

      if (textureRef.current) {
        textureRef.current.needsUpdate = true;
      }
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }

      animationFrameRef.current = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    // Cleanup
    return () => {
      isRunningRef.current = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (
        container &&
        renderer.domElement &&
        renderer.domElement.parentNode === container
      ) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (textureRef.current) {
        textureRef.current.dispose();
      }
    };
  }, [sourceCanvas, width, height]);

  // Update amount uniform
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.amount.value = amount;
    }
  }, [amount]);

  // Update resolution
  useEffect(() => {
    if (!rendererRef.current || !materialRef.current) return;

    rendererRef.current.setSize(width, height);
    materialRef.current.uniforms.iResolution.value.set(width, height);
  }, [width, height]);

  return <div ref={containerRef} className={className} />;
}
