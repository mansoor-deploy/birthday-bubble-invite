
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, Heart, X } from 'lucide-react';

interface Photo {
  id: number;
  src: string;
  alt: string;
  category: string;
}

interface PhotoGalleryProps {
  photos: Photo[];
  categories: string[];
}

const PhotoGallery = ({ photos, categories }: PhotoGalleryProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const openLightbox = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <span className="invitation-badge bg-birthday-purple text-white mb-2">Precious Moments</span>
        <h2 className="text-2xl md:text-3xl font-semibold mt-2">Emma's Gallery</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mt-4">
          Glimpses of joy, laughter, and love from our little one's first year
        </p>
      </div>

      <Tabs defaultValue={categories[0]} className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="bg-white bg-opacity-70 backdrop-blur-sm">
            {categories.map((category) => (
              <TabsTrigger 
                key={category} 
                value={category}
                className="data-[state=active]:bg-birthday-pink data-[state=active]:text-white"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {categories.map((category) => (
          <TabsContent key={category} value={category} className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {photos
                .filter((photo) => photo.category === category)
                .map((photo) => (
                  <div 
                    key={photo.id} 
                    className="gallery-item cursor-pointer group"
                    onClick={() => openLightbox(photo)}
                  >
                    <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-xl">
                      <img 
                        src={photo.src} 
                        alt={photo.alt}
                        className="object-cover w-full h-full transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <div className="text-white font-medium">{photo.alt}</div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Lightbox */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button 
            className="absolute top-4 right-4 z-10 text-white bg-black/40 rounded-full p-2"
            onClick={closeLightbox}
          >
            <X size={24} />
          </button>
          <div 
            className="max-w-4xl max-h-[90vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedPhoto.src} 
              alt={selectedPhoto.alt}
              className="max-h-[90vh] max-w-full object-contain rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white rounded-b-lg">
              <div className="flex items-center justify-between">
                <p className="font-medium">{selectedPhoto.alt}</p>
                <Heart className="w-5 h-5 text-birthday-pink animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
