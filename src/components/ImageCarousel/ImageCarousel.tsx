import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { CarouselImage } from './CarouselImage';
import { CarouselControls } from './CarouselControls';

interface ImageCarouselProps {
  images: Array<{
    url: string;
    alt: string;
  }>;
  autoPlayInterval?: number;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  autoPlayInterval = 5000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTouching, setIsTouching] = useState(false);

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = images.length - 1;
      if (nextIndex >= images.length) nextIndex = 0;
      return nextIndex;
    });
  }, [images.length]);

  const handleDotClick = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }, [currentIndex]);

  useEffect(() => {
    if (!isAutoPlaying || isTouching) return;

    const timer = setInterval(() => {
      paginate(1);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [autoPlayInterval, paginate, isAutoPlaying, isTouching]);

  return (
    <div 
      className="relative w-full bg-black group touch-pan-y select-none"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      onTouchStart={() => setIsTouching(true)}
      onTouchEnd={() => {
        setIsTouching(false);
        setIsAutoPlaying(true);
      }}
      role="region"
      aria-label="Image carousel"
    >
      <div className="relative w-full" style={{ paddingTop: 'calc(270 / 1600 * 100%)' }}>
        <div className="absolute inset-0">
          <AnimatePresence initial={false} custom={direction}>
            <CarouselImage
              src={images[currentIndex].url}
              alt={images[currentIndex].alt}
              direction={direction}
              currentIndex={currentIndex}
              onSwipe={paginate}
            />
          </AnimatePresence>

          <CarouselControls
            currentIndex={currentIndex}
            totalImages={images.length}
            onNavigate={paginate}
            onDotClick={handleDotClick}
          />
        </div>
      </div>
    </div>
  );
};