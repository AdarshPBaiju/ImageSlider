import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselControlsProps {
  currentIndex: number;
  totalImages: number;
  onNavigate: (direction: number) => void;
  onDotClick: (index: number) => void;
}

export const CarouselControls: React.FC<CarouselControlsProps> = React.memo(({
  currentIndex,
  totalImages,
  onNavigate,
  onDotClick
}) => {
  return (
    <>
      {/* Side controls - hidden on mobile */}
      <div className="hidden md:flex absolute inset-y-0 left-0 w-1/4 items-center justify-start">
        <button
          className="ml-4 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200 z-10 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-sm"
          onClick={() => onNavigate(-1)}
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="hidden md:flex absolute inset-y-0 right-0 w-1/4 items-center justify-end">
        <button
          className="mr-4 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200 z-10 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-sm"
          onClick={() => onNavigate(1)}
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom dots - smaller on mobile */}
      <div className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1 md:gap-2 z-10">
        {Array.from({ length: totalImages }).map((_, index) => (
          <button
            key={index}
            aria-label={`Go to image ${index + 1}`}
            className={`w-1 h-1 md:w-2 md:h-2 rounded-full transition-all duration-200 
              focus:outline-none focus:ring-2 focus:ring-blue-400 
              ${index === currentIndex 
                ? 'bg-white w-2 md:w-4' 
                : 'bg-white/60 hover:bg-white/80'
              }`}
            onClick={() => onDotClick(index)}
          />
        ))}
      </div>
    </>
  );
});

CarouselControls.displayName = 'CarouselControls';