import React from 'react';
import { motion } from 'framer-motion';
import { slideVariants, swipeConfidenceThreshold } from './constants';

interface CarouselImageProps {
  src: string;
  alt: string;
  direction: number;
  currentIndex: number;
  onSwipe: (direction: number) => void;
}

export const CarouselImage: React.FC<CarouselImageProps> = React.memo(({
  src,
  alt,
  direction,
  currentIndex,
  onSwipe
}) => {
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <motion.img
      key={currentIndex}
      src={src}
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={1}
      onDragEnd={(_, { offset, velocity }) => {
        const swipe = swipePower(offset.x, velocity.x);
        if (swipe < -swipeConfidenceThreshold) {
          onSwipe(1);
        } else if (swipe > swipeConfidenceThreshold) {
          onSwipe(-1);
        }
      }}
      className="absolute w-full h-full object-cover"
      alt={alt}
    />
  );
});

CarouselImage.displayName = 'CarouselImage';