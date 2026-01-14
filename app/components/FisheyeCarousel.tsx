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

// Smooth easing function - ease in-out sine for ultra-smooth animation
const easeInOutSine = (t: number): number => -(Math.cos(Math.PI * t) - 1) / 2;

export default function FisheyeCarousel({
  imageUrls,
  autoplayInterval = 4000,
  animationDuration = 700,
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
  const lastFisheyeUpdateRef = useRef(0);
  const pendingImageRef = useRef<string | null>(null);
  const currentDprRef = useRef(1); // Track current DPR for dynamic scaling

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
    const centerImageWidth = canvas.width * 0.7;
    const centerImageHeight = canvas.height * 1.2;
    const sideImageWidth = canvas.width * 0.5;
    const sideImageHeight = canvas.height * 0.6;
    const gap = canvas.width * 0.01;

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
      imgArray: HTMLImageElement[],
      dpr: number = currentDprRef.current // Allow custom DPR for dynamic scaling
    ) => {
      const canvas = sourceCanvasRef.current;
      if (!canvas || imgArray.length === 0 || containerSize.width === 0) return;

      // Resize canvas if DPR changed
      const targetWidth = Math.floor(containerSize.width * dpr);
      const targetHeight = Math.floor(containerSize.height * dpr);
      if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        currentDprRef.current = dpr;
      }

      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;

      // Optimize rendering quality based on animation state
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = dpr < 2 ? "medium" : "high";

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
      ctx.fillStyle = "#fff";
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
          const slotX = lerp(slot.startX, slot.endX, progress);
          const slotWidth = lerp(slot.startWidth, slot.endWidth, progress);
          const slotHeight = lerp(slot.startHeight, slot.endHeight, progress);
          const slotY = centerY - slotHeight / 2;

          // Calculate dimensions that preserve original aspect ratio ("contain" fit)
          const imgAspect = img.naturalWidth / img.naturalHeight;
          const slotAspect = slotWidth / slotHeight;

          let drawWidth: number, drawHeight: number;
          if (imgAspect > slotAspect) {
            // Image is wider than slot - fit to width
            drawWidth = slotWidth;
            drawHeight = slotWidth / imgAspect;
          } else {
            // Image is taller than slot - fit to height
            drawHeight = slotHeight;
            drawWidth = slotHeight * imgAspect;
          }

          // Center the image within the slot
          const drawX = slotX + (slotWidth - drawWidth) / 2;
          const drawY = slotY + (slotHeight - drawHeight) / 2;

          ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
        }
      }
    },
    [getLayoutDimensions, containerSize]
  );

  // Update fisheye - throttle during animation to prevent black flashes
  // The FisheyeGL library can't handle rapid setImage calls without flickering
  const updateFisheye = useCallback((isAnimating: boolean = false) => {
    const canvas = sourceCanvasRef.current;
    const fisheye = fisheyeInstanceRef.current;
    if (!canvas || !fisheye) return;

    const now = performance.now();
    const timeSinceLastUpdate = now - lastFisheyeUpdateRef.current;

    // The fisheye library needs time to process each image
    const minInterval = isAnimating ? 21 : 0;

    if (isAnimating && timeSinceLastUpdate < minInterval) {
      return;
    }

    try {
      // Use lower quality during animation for speed, full quality when static
      const quality = isAnimating ? 0.75 : 0.95;
      const dataURL = canvas.toDataURL("image/jpeg", quality);
      fisheye.setImage(dataURL);
      lastFisheyeUpdateRef.current = now;
    } catch (e) {
      // Silently fail - not critical
    }
  }, []);

  // Smooth animation using requestAnimationFrame (syncs with monitor refresh rate)
  const animateToNext = useCallback(() => {
    if (isAnimatingRef.current || images.length === 0) return;

    isAnimatingRef.current = true;
    const startIndex = currentIndexRef.current;
    const startTime = performance.now();

    // Use 1x DPR during animation for smooth performance
    const animationDpr = 1;
    // Use higher DPR for final static frame (capped at 2x)
    const finalDpr = Math.min(window.devicePixelRatio || 1, 2);

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(elapsed / animationDuration, 1);
      const easedProgress = easeInOutSine(rawProgress);

      drawCarousel(easedProgress, startIndex, images, animationDpr);
      updateFisheye(true); // Pass true for animating state

      if (rawProgress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        // Animation complete - update index
        currentIndexRef.current = (startIndex + 1) % images.length;
        isAnimatingRef.current = false;
        animationFrameRef.current = null;

        // Final high-quality render at full DPR after animation completes
        setTimeout(() => {
          drawCarousel(0, currentIndexRef.current, images, finalDpr);
          updateFisheye(false);
        }, 30);
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

    // Use devicePixelRatio for high-DPI displays (Retina, etc.)
    const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2x for performance
    const scaledWidth = Math.floor(width * dpr);
    const scaledHeight = Math.floor(height * dpr);

    // Set fisheye canvas dimensions (source canvas is managed by drawCarousel)
    fisheyeCanvas.width = scaledWidth;
    fisheyeCanvas.height = scaledHeight;

    // Reset index on reinit
    currentIndexRef.current = 0;

    // Draw initial state at full DPR
    drawCarousel(0, 0, images, dpr);

    const initialDataURL = sourceCanvas.toDataURL("image/jpeg", 0.95);
    const FisheyeGLFunc = (window as any).FisheyeGl;

    if (typeof FisheyeGLFunc === "function") {
      // Clean up previous instance
      if (fisheyeInstanceRef.current) {
        fisheyeInstanceRef.current = null;
      }

      fisheyeInstanceRef.current = FisheyeGLFunc({
        selector: "#fisheye-canvas",
        width: scaledWidth,
        height: scaledHeight,
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
