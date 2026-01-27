"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import FisheyeShader from "./FisheyeShader";

interface FisheyeCarouselProps {
  imageUrls?: string[];
  autoplayInterval?: number;
  animationDuration?: number;
  className?: string;
  aspectRatio?: number;
  fisheyeAmount?: number; // New prop for fisheye strength
}

const easeInOutSine = (t: number): number => -(Math.cos(Math.PI * t) - 1) / 2;

export default function FisheyeCarousel({
  imageUrls,
  autoplayInterval = 4000,
  animationDuration = 700,
  className = "",
  aspectRatio = 16 / 9,
  fisheyeAmount = 0.7, // 0.5 = no effect, <0.5 = anti-fisheye, >0.5 = fisheye
}: FisheyeCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sourceCanvasRef = useRef<HTMLCanvasElement>(null);

  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [canvasReady, setCanvasReady] = useState(false);

  const currentIndexRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const isAnimatingRef = useRef(false);

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

  const drawCarousel = useCallback(
    (progress: number, baseIndex: number, imgArray: HTMLImageElement[]) => {
      const canvas = sourceCanvasRef.current;
      if (!canvas || imgArray.length === 0 || containerSize.width === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const targetWidth = Math.floor(containerSize.width * dpr);
      const targetHeight = Math.floor(containerSize.height * dpr);

      if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
      }

      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      const {
        centerX,
        centerY,
        centerImageWidth,
        centerImageHeight,
        sideImageWidth,
        sideImageHeight,
        gap,
      } = getLayoutDimensions(canvas);

      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const len = imgArray.length;
      const totalLayoutWidth =
        sideImageWidth + gap + centerImageWidth + gap + sideImageWidth;
      const layoutStartX = (canvas.width - totalLayoutWidth) / 2;

      const leftImageLeft = layoutStartX;
      const centerImageLeft = layoutStartX + sideImageWidth + gap;
      const rightImageLeft = centerImageLeft + centerImageWidth + gap;
      const farRightImageLeft = rightImageLeft + sideImageWidth + gap;

      const slideDistance = centerImageWidth + gap;

      const lerp = (start: number, end: number, t: number) =>
        start + (end - start) * t;

      const slots = [
        {
          indexOffset: -1,
          startX: leftImageLeft,
          endX: leftImageLeft - slideDistance,
          startWidth: sideImageWidth,
          endWidth: sideImageWidth,
          startHeight: sideImageHeight,
          endHeight: sideImageHeight,
        },
        {
          indexOffset: 0,
          startX: centerImageLeft,
          endX: leftImageLeft,
          startWidth: centerImageWidth,
          endWidth: sideImageWidth,
          startHeight: centerImageHeight,
          endHeight: sideImageHeight,
        },
        {
          indexOffset: 1,
          startX: rightImageLeft,
          endX: centerImageLeft,
          startWidth: sideImageWidth,
          endWidth: centerImageWidth,
          startHeight: sideImageHeight,
          endHeight: centerImageHeight,
        },
        {
          indexOffset: 2,
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

          const imgAspect = img.naturalWidth / img.naturalHeight;
          const slotAspect = slotWidth / slotHeight;

          let drawWidth: number, drawHeight: number;
          if (imgAspect > slotAspect) {
            drawWidth = slotWidth;
            drawHeight = slotWidth / imgAspect;
          } else {
            drawHeight = slotHeight;
            drawWidth = slotHeight * imgAspect;
          }

          const drawX = slotX + (slotWidth - drawWidth) / 2;
          const drawY = slotY + (slotHeight - drawHeight) / 2;

          ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
        }
      }
    },
    [getLayoutDimensions, containerSize],
  );

  const animateToNext = useCallback(() => {
    if (isAnimatingRef.current || images.length === 0) return;

    isAnimatingRef.current = true;
    const startIndex = currentIndexRef.current;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(elapsed / animationDuration, 1);
      const easedProgress = easeInOutSine(rawProgress);

      drawCarousel(easedProgress, startIndex, images);

      if (rawProgress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        currentIndexRef.current = (startIndex + 1) % images.length;
        isAnimatingRef.current = false;
        animationFrameRef.current = null;

        setTimeout(() => {
          drawCarousel(0, currentIndexRef.current, images);
        }, 16);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [images, animationDuration, drawCarousel]);

  // Initialize canvas
  useEffect(() => {
    if (
      images.length === 0 ||
      !sourceCanvasRef.current ||
      containerSize.width === 0
    )
      return;

    currentIndexRef.current = 0;
    drawCarousel(0, 0, images);

    // Signal that canvas is ready for FisheyeShader
    setCanvasReady(true);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      isAnimatingRef.current = false;
    };
  }, [images, containerSize, drawCarousel]);

  // Autoplay
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
    <div ref={containerRef} className={`w-full ${className}`}>
      <canvas ref={sourceCanvasRef} className="hidden" />
      {canvasReady && sourceCanvasRef.current && (
        <FisheyeShader
          sourceCanvas={sourceCanvasRef.current}
          width={containerSize.width}
          height={containerSize.height}
          amount={fisheyeAmount}
          className="w-full h-auto"
        />
      )}
    </div>
  );
}
