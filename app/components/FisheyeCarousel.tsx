"use client";
import { useEffect, useRef, useState } from "react";
import Script from "next/script";

interface FisheyeCarouselProps {
  imageUrls?: string[];
  autoplayInterval?: number;
  animationDuration?: number;
  className?: string;
  aspectRatio?: number;
}

export default function FisheyeCarousel({
  imageUrls,
  autoplayInterval = 2000,
  animationDuration = 1000,
  className = "",
  aspectRatio = 16 / 9,
}: FisheyeCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sourceCanvasRef = useRef<HTMLCanvasElement>(null);
  const fisheyeCanvasRef = useRef<HTMLCanvasElement>(null);
  const fisheyeInstanceRef = useRef<any>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const animationRef = useRef<number | null>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const isAnimatingRef = useRef(false);

  // Observe container size
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width } = entry.contentRect;
        if (width > 0) {
          const height = width / aspectRatio;
          setContainerSize({ width, height });
        }
      }
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, [aspectRatio]);

  // Load all images
  useEffect(() => {
    const loadImages = async () => {
      let urls: string[] = imageUrls ?? [];

      if (!urls.length) {
        try {
          const response = await fetch("/api/images");
          const data = await response.json();
          urls = data.images || [];
        } catch (error) {
          console.error("Failed to load images:", error);
          urls = [];
        }
      }

      if (urls.length === 0) return;

      const loadedImages = await Promise.all(
        urls.map((url) => {
          return new Promise<HTMLImageElement>((resolve) => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = () => resolve(img);
            img.src = url;
          });
        })
      );
      setImages(loadedImages);
      setImagesLoaded(true);
    };

    loadImages();
  }, [imageUrls]);

  // Draw carousel
  const drawCarousel = (offset: number = 0) => {
    const canvas = sourceCanvasRef.current;
    if (!canvas || images.length === 0) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const imageWidth = canvas.width * 0.8;
    const imageHeight = canvas.height * 0.8;
    const spacing = canvas.width * 0.85;

    // Draw current image
    const currentImg = images[currentIndex];
    if (currentImg) {
      const x = centerX - imageWidth / 2 + offset;
      const y = centerY - imageHeight / 2;
      ctx.drawImage(currentImg, x, y, imageWidth, imageHeight);
    }

    // Draw next image
    const nextIndex = (currentIndex + 1) % images.length;
    const nextImg = images[nextIndex];
    if (nextImg) {
      const x = centerX - imageWidth / 2 + spacing + offset;
      const y = centerY - imageHeight / 2;
      ctx.drawImage(nextImg, x, y, imageWidth, imageHeight);
    }

    // Draw previous image
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    const prevImg = images[prevIndex];
    if (prevImg) {
      const x = centerX - imageWidth / 2 - spacing + offset;
      const y = centerY - imageHeight / 2;
      ctx.drawImage(prevImg, x, y, imageWidth, imageHeight);
    }
  };

  // Update fisheye
  const updateFisheyeFromCanvas = () => {
    if (!sourceCanvasRef.current || !fisheyeInstanceRef.current) return;

    setTimeout(() => {
      try {
        if (sourceCanvasRef.current && fisheyeInstanceRef.current) {
          const dataURL = sourceCanvasRef.current.toDataURL("image/jpeg", 0.8);
          fisheyeInstanceRef.current.setImage(dataURL);
        }
      } catch (e) {
        console.error("Error updating fisheye:", e);
      }
    }, 0);
  };

  // Easing function
  const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  // Animation
  const animateTransition = () => {
    if (isAnimatingRef.current || images.length === 0) return;
    isAnimatingRef.current = true;

    const canvas = sourceCanvasRef.current;
    if (!canvas) return;

    const spacing = canvas.width * 0.85;
    let startTime: number | null = null;
    let frameCount = 0;
    const updateEveryNFrames = 2;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);

      const easedProgress = easeInOutCubic(progress);
      const offset = -spacing * easedProgress;

      drawCarousel(offset);

      frameCount++;
      if (frameCount % updateEveryNFrames === 0) {
        updateFisheyeFromCanvas();
      }

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        const nextIndex = (currentIndex + 1) % images.length;
        setCurrentIndex(nextIndex);

        requestAnimationFrame(() => {
          if (sourceCanvasRef.current && images.length > 0) {
            const canvas = sourceCanvasRef.current;
            const ctx = canvas.getContext("2d", { alpha: false });
            if (ctx) {
              ctx.fillStyle = "#000000";
              ctx.fillRect(0, 0, canvas.width, canvas.height);

              const centerX = canvas.width / 2;
              const centerY = canvas.height / 2;
              const imageWidth = canvas.width * 0.8;
              const imageHeight = canvas.height * 0.8;

              const img = images[nextIndex];
              if (img) {
                const x = centerX - imageWidth / 2;
                const y = centerY - imageHeight / 2;
                ctx.drawImage(img, x, y, imageWidth, imageHeight);
              }

              setTimeout(() => {
                updateFisheyeFromCanvas();
                isAnimatingRef.current = false;
              }, 0);
            }
          } else {
            isAnimatingRef.current = false;
          }
        });
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  // Autoplay
  useEffect(() => {
    if (!imagesLoaded || images.length === 0) return;

    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }

    autoplayRef.current = setInterval(() => {
      if (!isAnimatingRef.current) {
        animateTransition();
      }
    }, autoplayInterval);

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [imagesLoaded, currentIndex, images.length, autoplayInterval]);

  // Initialize FisheyeGL
  useEffect(() => {
    if (
      !imagesLoaded ||
      !scriptLoaded ||
      !sourceCanvasRef.current ||
      !fisheyeCanvasRef.current ||
      containerSize.width === 0
    )
      return;

    const sourceCanvas = sourceCanvasRef.current;
    const fisheyeCanvas = fisheyeCanvasRef.current;

    const { width, height } = containerSize;

    sourceCanvas.width = width;
    sourceCanvas.height = height;
    fisheyeCanvas.width = width;
    fisheyeCanvas.height = height;

    drawCarousel(0);

    const initialDataURL = sourceCanvas.toDataURL("image/jpeg", 0.95);
    const FisheyeGLFunc = (window as any).FisheyeGl;

    if (typeof FisheyeGLFunc === "function") {
      fisheyeInstanceRef.current = FisheyeGLFunc({
        selector: "#fisheye-canvas",
        width: fisheyeCanvas.width,
        height: fisheyeCanvas.height,
        image: initialDataURL,
        animate: false,
        lens: {
          a: 1.0,
          b: 1.0,
          Fx: 0.5,
          Fy: 0.5,
          scale: 1.5,
        },
        fov: {
          x: 1.0,
          y: 1.0,
        },
      });
    }

    return () => {
      fisheyeInstanceRef.current = null;
    };
  }, [imagesLoaded, scriptLoaded, containerSize]);

  // Update when index changes
  useEffect(() => {
    if (!imagesLoaded || !fisheyeInstanceRef.current || isAnimatingRef.current)
      return;
    drawCarousel(0);
    updateFisheyeFromCanvas();
  }, [currentIndex, imagesLoaded]);

  return (
    <>
      <Script
        src="/fisheyegl.js"
        strategy="lazyOnload"
        onLoad={() => setScriptLoaded(true)}
      />

      <div ref={containerRef} className={`w-full ${className}`}>
        <canvas ref={sourceCanvasRef} className="hidden" />
        <canvas
          ref={fisheyeCanvasRef}
          id="fisheye-canvas"
          className="w-full h-auto"
        />
      </div>
    </>
  );
}
