'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';

export default function ImageLoader({
  src,
  alt = '',
  gridSize = 20,
  cellShape = 'circle',
  cellGap = 2,
  cellColor = '#cbd5e1',
  blinkSpeed = 1000,
  transitionDuration = 800,
  fadeOutDuration = 600,
  loadingDelay = 1500,
  onLoad,
  className = '',
  width,
  height,
  loop = false,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [showImage, setShowImage] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [gridCells, setGridCells] = useState([]);

  const imageRef = useRef(null);
  const processedRef = useRef(false);
  const loadStartTimeRef = useRef(Date.now());

  const dimensions = useMemo(
    () => ({
      width: parseInt(String(width)) || 800,
      height: parseInt(String(height)) || 600,
    }),
    [width, height]
  );

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    const cellWithGap = gridSize + cellGap;
    const cols = Math.ceil(dimensions.width / cellWithGap) + 1;
    const rows = Math.ceil(dimensions.height / cellWithGap) + 1;

    const cells = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        cells.push({
          id: `${row}-${col}`,
          x: col * cellWithGap,
          y: row * cellWithGap,
          blinkDelay: Math.random() * blinkSpeed,
          fadeDelay: Math.random() * fadeOutDuration,
          initialOpacity: Math.random() * 0.7 + 0.3,
          color: null,
        });
      }
    }

    setGridCells(cells);
  }, [dimensions.width, dimensions.height, gridSize, cellGap, blinkSpeed, fadeOutDuration]);

  const sampleColorFromRegion = useCallback(
    (canvas, x, y, w, h) => {
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return cellColor;

      const imageData = ctx.getImageData(x, y, w, h);
      const data = imageData.data;

      let r = 0;
      let g = 0;
      let b = 0;
      let count = 0;

      for (let i = 0; i < data.length; i += 16) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
        count++;
      }

      return `rgb(${Math.round(r / count)}, ${Math.round(g / count)}, ${Math.round(b / count)})`;
    },
    [cellColor]
  );

  const processImage = useCallback(
    (img, currentGridCells) => {
      if (processedRef.current || currentGridCells.length === 0) return;
      processedRef.current = true;

      const doProcess = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;

        ctx.drawImage(img, 0, 0);

        const scaleX = img.naturalWidth / dimensions.width;
        const scaleY = img.naturalHeight / dimensions.height;

        const updatedCells = currentGridCells.map((cell) => ({
          ...cell,
          color: sampleColorFromRegion(
            canvas,
            Math.floor(cell.x * scaleX),
            Math.floor(cell.y * scaleY),
            Math.floor(gridSize * scaleX),
            Math.floor(gridSize * scaleY)
          ),
        }));

        setGridCells(updatedCells);
        setIsLoading(false);
        setIsTransitioning(true);

        setTimeout(() => setShowImage(true), transitionDuration);

        setTimeout(() => {
          setIsTransitioning(false);
          setIsFadingOut(true);
        }, transitionDuration);

        if (onLoad) onLoad();
      };

      if (loadingDelay > 0) {
        const elapsedTime = Date.now() - loadStartTimeRef.current;
        const remainingDelay = Math.max(0, loadingDelay - elapsedTime);
        setTimeout(doProcess, remainingDelay);
      } else {
        doProcess();
      }
    },
    [dimensions, gridSize, transitionDuration, loadingDelay, sampleColorFromRegion, onLoad]
  );

  useEffect(() => {
    if (loop) return;
    const img = imageRef.current;
    if (!img) return;

    if (img.complete && img.naturalWidth > 0) {
      processImage(img, gridCells);
    } else {
      const handleLoad = () => processImage(img, gridCells);
      img.addEventListener('load', handleLoad);
      return () => img.removeEventListener('load', handleLoad);
    }
  }, [gridCells, processImage, loop]);

  const getCellStyle = useCallback(
    (cell) => {
      const baseStyle = {
        position: 'absolute',
        left: cell.x,
        top: cell.y,
        willChange: 'opacity, background-color, width, height, left, top',
      };

      if (isLoading) {
        return {
          ...baseStyle,
          animation: `imageLoaderBlink ${blinkSpeed}ms infinite`,
          animationDelay: `${cell.blinkDelay}ms`,
          animationFillMode: 'backwards',
          backgroundColor: cellColor,
          width: gridSize,
          height: gridSize,
          opacity: cell.initialOpacity,
        };
      }

      if (isTransitioning) {
        return {
          ...baseStyle,
          backgroundColor: cell.color || cellColor,
          transition: `background-color ${transitionDuration}ms ease, width ${transitionDuration}ms ease, height ${transitionDuration}ms ease, left ${transitionDuration}ms ease, top ${transitionDuration}ms ease, opacity ${transitionDuration}ms ease`,
          width: gridSize + cellGap,
          height: gridSize + cellGap,
          left: cell.x - cellGap / 2,
          top: cell.y - cellGap / 2,
          opacity: 1,
          animation: 'none',
        };
      }

      if (isFadingOut) {
        return {
          ...baseStyle,
          backgroundColor: cell.color || cellColor,
          opacity: 0,
          transition: `opacity ${fadeOutDuration}ms ease`,
          transitionDelay: `${cell.fadeDelay}ms`,
          width: gridSize + cellGap,
          height: gridSize + cellGap,
          left: cell.x - cellGap / 2,
          top: cell.y - cellGap / 2,
        };
      }

      return baseStyle;
    },
    [isLoading, isTransitioning, isFadingOut, blinkSpeed, cellColor, gridSize, cellGap, transitionDuration, fadeOutDuration]
  );

  return (
    <div className={`image-loader ${className}`}>
      <div
        className="image-loader__frame"
        style={{
          width: width || '100%',
          height: height || 'auto',
          aspectRatio: `${dimensions.width} / ${dimensions.height}`,
        }}
      >
        {gridCells.length > 0 && (
          <div className="image-loader__grid" aria-hidden="true">
            {gridCells.map((cell) => (
              <div
                key={cell.id}
                className={`image-loader__cell ${
                  cellShape === 'circle' ? 'image-loader__cell--circle' : ''
                }`}
                style={getCellStyle(cell)}
              />
            ))}
          </div>
        )}

        {!loop && (
          <img
            ref={imageRef}
            src={src}
            alt={alt}
            crossOrigin="anonymous"
            className="image-loader__image"
            style={{
              opacity: showImage ? 1 : 0,
              transition: 'opacity 300ms ease',
            }}
          />
        )}
      </div>
    </div>
  );
}
