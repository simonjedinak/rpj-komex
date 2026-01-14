"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Script from "next/script";

interface FisheyeCarouselProps {
  imageUrls?: string[];
  autoplayInterval?: number;
  animationDuration?: number;
  className?: string;
  aspectRatio?: number;
}

// Smooth easing function - ease out cubic for natural deceleration
const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

export default function FisheyeCarousel({
  imageUrls,
  autoplayInterval = 3000,
  animationDuration = 600,
  className = "",
  aspectRatio = 16 / 9,
}: FisheyeCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sourceCanvasRef = useRef<HTMLCanvasElement>(null);
  const fisheyeCanvasRef = useRef<HTMLCanvasElement>(null);
  const fisheyeInstanceRef = useRef<any>(null);

  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  // Animation state stored in refs to avoid re-renders during animation
  const currentIndexRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const isAnimatingRef = useRef(false);
  const lastUpdateTimeRef = useRef(0);

  // Observe container size with debounce
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
                : { width, height }
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

  // Load all images
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
              })
          )
        );

        if (!cancelled) {
          setImages(loadedImages);
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

  // Calculate layout dimensions
  const getLayoutDimensions = useCallback((canvas: HTMLCanvasElement) => {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const centerImageWidth = canvas.width * 0.42;
    const centerImageHeight = canvas.height * 0.8;
    const sideImageWidth = canvas.width * 0.32;
    const sideImageHeight = canvas.height * 0.65;
    const gap = canvas.width * 0.03;

    return {
      centerX,
      centerY,
      centerImageWidth,
      centerImageHeight,
      sideImageWidth,
      sideImageHeight,
      gap,
    };
  }, []);

  // Draw carousel with interpolated position
  const drawCarousel = useCallback(
    (
      progress: number, // 0 to 1 representing transition progress
      baseIndex: number,
      imgArray: HTMLImageElement[]
    ) => {
      const canvas = sourceCanvasRef.current;
      if (!canvas || imgArray.length === 0) return;

      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;

      const {
        centerX,
        centerY,
        centerImageWidth,
        centerImageHeight,
        sideImageWidth,
        sideImageHeight,
        gap,
      } = getLayoutDimensions(canvas);

      // Clear canvas
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const len = imgArray.length;

      // Calculate total width of the visible 3-image layout
      // Layout: [left side image] [gap] [center image] [gap] [right side image]
      const totalLayoutWidth =
        sideImageWidth + gap + centerImageWidth + gap + sideImageWidth;

      // Start position so that the entire layout is centered on the canvas
      const layoutStartX = (canvas.width - totalLayoutWidth) / 2;

      // Calculate positions for each image
      const leftImageLeft = layoutStartX;
      const centerImageLeft = layoutStartX + sideImageWidth + gap;
      const rightImageLeft = centerImageLeft + centerImageWidth + gap;
      const farRightImageLeft = rightImageLeft + sideImageWidth + gap;

      // Animation: slide distance is from right position to center position
      const slideDistance = centerImageWidth + gap;

      // Interpolate function for smooth size transitions
      const lerp = (start: number, end: number, t: number) =>
        start + (end - start) * t;

      // Define start and end states for each image slot
      // Each image transitions: far-left <- left <- center <- right <- far-right
      const slots = [
        {
          indexOffset: -1,
          // Left image moves further left (off-screen)
          startX: leftImageLeft,
          endX: leftImageLeft - slideDistance,
          startWidth: sideImageWidth,
          endWidth: sideImageWidth,
          startHeight: sideImageHeight,
          endHeight: sideImageHeight,
        },
        {
          indexOffset: 0,
          // Center image moves to left position
          startX: centerImageLeft,
          endX: leftImageLeft,
          startWidth: centerImageWidth,
          endWidth: sideImageWidth,
          startHeight: centerImageHeight,
          endHeight: sideImageHeight,
        },
        {
          indexOffset: 1,
          // Right image moves to center position
          startX: rightImageLeft,
          endX: centerImageLeft,
          startWidth: sideImageWidth,
          endWidth: centerImageWidth,
          startHeight: sideImageHeight,
          endHeight: centerImageHeight,
        },
        {
          indexOffset: 2,
          // Far-right image moves to right position
          startX: farRightImageLeft,
          endX: rightImageLeft,
          startWidth: sideImageWidth,
          endWidth: sideImageWidth,
          startHeight: sideImageHeight,
          endHeight: sideImageHeight,
        },
      ];

      for (const slot of slots) {
        const imgIndex = (baseIndex + slot.indexOffset + len) % len;
        const img = imgArray[imgIndex];
        if (img) {
          const x = lerp(slot.startX, slot.endX, progress);
          const width = lerp(slot.startWidth, slot.endWidth, progress);
          const height = lerp(slot.startHeight, slot.endHeight, progress);
          const y = centerY - height / 2;
          ctx.drawImage(img, x, y, width, height);
        }
      }
    },
    [getLayoutDimensions]
  );

  // Update fisheye with throttling for smooth performance
  const updateFisheye = useCallback(() => {
    const canvas = sourceCanvasRef.current;
    const fisheye = fisheyeInstanceRef.current;
    if (!canvas || !fisheye) return;

    // Throttle updates to ~30fps for fisheye (it's expensive)
    const now = performance.now();
    if (now - lastUpdateTimeRef.current < 33) return;
    lastUpdateTimeRef.current = now;

    try {
      const dataURL = canvas.toDataURL("image/jpeg", 0.8);
      fisheye.setImage(dataURL);
    } catch (e) {
      // Silently fail - not critical
    }
  }, []);

  // Smooth animation using requestAnimationFrame
  const animateToNext = useCallback(() => {
    if (isAnimatingRef.current || images.length === 0) return;

    isAnimatingRef.current = true;
    const startIndex = currentIndexRef.current;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(elapsed / animationDuration, 1);
      const easedProgress = easeOutCubic(rawProgress);

      drawCarousel(easedProgress, startIndex, images);
      updateFisheye();

      if (rawProgress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        // Animation complete - update index
        currentIndexRef.current = (startIndex + 1) % images.length;
        isAnimatingRef.current = false;
        animationFrameRef.current = null;
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [images, animationDuration, drawCarousel, updateFisheye]);

  // Initialize FisheyeGL
  useEffect(() => {
    if (
      images.length === 0 ||
      !scriptLoaded ||
      !sourceCanvasRef.current ||
      !fisheyeCanvasRef.current ||
      containerSize.width === 0
    )
      return;

    const sourceCanvas = sourceCanvasRef.current;
    const fisheyeCanvas = fisheyeCanvasRef.current;
    const { width, height } = containerSize;

    // Set canvas dimensions
    sourceCanvas.width = width;
    sourceCanvas.height = height;
    fisheyeCanvas.width = width;
    fisheyeCanvas.height = height;

    // Reset index on reinit
    currentIndexRef.current = 0;

    // Draw initial state
    drawCarousel(0, 0, images);

    const initialDataURL = sourceCanvas.toDataURL("image/jpeg", 0.9);
    const FisheyeGLFunc = (window as any).FisheyeGl;

    if (typeof FisheyeGLFunc === "function") {
      // Clean up previous instance
      if (fisheyeInstanceRef.current) {
        fisheyeInstanceRef.current = null;
      }

      fisheyeInstanceRef.current = FisheyeGLFunc({
        selector: "#fisheye-canvas",
        width: fisheyeCanvas.width,
        height: fisheyeCanvas.height,
        image: initialDataURL,
        animate: false,
        lens: {
          a: 1,
          b: 1,
          Fx: 0.17,
          Fy: 0.6,
          scale: 1.1,
        },
        fov: {
          x: 1.0,
          y: 1.0,
        },
      });

      setIsReady(true);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      isAnimatingRef.current = false;
    };
  }, [images, scriptLoaded, containerSize, drawCarousel]);

  // Autoplay with stable interval
  useEffect(() => {
    if (!isReady || images.length === 0) return;

    const intervalId = setInterval(() => {
      if (!isAnimatingRef.current) {
        animateToNext();
      }
    }, autoplayInterval);

    return () => clearInterval(intervalId);
  }, [isReady, images.length, autoplayInterval, animateToNext]);

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
