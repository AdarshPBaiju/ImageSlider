import React from 'react';
import { ImageCarousel } from './components/ImageCarousel';

const images = [
  {
    url: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba",
    alt: "Scenic mountain landscape"
  },
  {
    url: "https://images.unsplash.com/photo-1682687221038-404670f09439",
    alt: "Ocean waves crashing on beach"
  },
  {
    url: "https://images.unsplash.com/photo-1682687220063-4742bd7fd538",
    alt: "Autumn forest pathway"
  },
  {
    url: "https://images.unsplash.com/photo-1682687220199-d0124f48f95b",
    alt: "Desert sand dunes"
  }
];

function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Image Gallery</h1>
        <div className="max-w-[1600px] mx-auto">
          <ImageCarousel images={images} />
        </div>
      </div>
    </div>
  );
}

export default App;