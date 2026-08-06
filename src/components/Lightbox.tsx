import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface LightboxProps {
  isOpen: boolean;
  imageIndex: number;
  gallery: string[];
  onClose: () => void;
  onChangeIndex: (index: number) => void;
}

export default function Lightbox({
  isOpen,
  imageIndex,
  gallery,
  onClose,
  onChangeIndex,
}: LightboxProps) {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      onChangeIndex((imageIndex + 1) % gallery.length);
    } else if (isRightSwipe) {
      onChangeIndex((imageIndex - 1 + gallery.length) % gallery.length);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        onChangeIndex((imageIndex + 1) % gallery.length);
      } else if (e.key === 'ArrowLeft') {
        onChangeIndex((imageIndex - 1 + gallery.length) % gallery.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, imageIndex, gallery, onClose, onChangeIndex]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex flex-col justify-between p-6 animate-in fade-in duration-300"
      onClick={onClose}
    >
      {/* Top bar */}
      <div className="flex justify-between items-center text-white w-full max-w-7xl mx-auto">
        <span className="text-sm font-medium tracking-wide text-white/60">
          {imageIndex + 1} / {gallery.length}
        </span>
        <button 
          onClick={onClose}
          className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer text-white"
          aria-label="Close lightbox"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center relative w-full max-w-5xl mx-auto">
        {/* Left Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onChangeIndex((imageIndex - 1 + gallery.length) % gallery.length);
          }}
          className="absolute left-4 p-4 bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer text-white select-none z-10"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Main Image */}
        <div 
          className="relative max-h-[70vh] max-w-[85vw] md:max-w-3xl flex justify-center items-center overflow-hidden rounded-xl bg-neutral-900 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <img 
            src={gallery[imageIndex]} 
            alt={`Product view ${imageIndex + 1}`} 
            className="object-contain max-h-[70vh] w-auto h-auto transition-transform duration-500 scale-100 hover:scale-105 select-none"
            draggable="false"
          />
        </div>

        {/* Right Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onChangeIndex((imageIndex + 1) % gallery.length);
          }}
          className="absolute right-4 p-4 bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer text-white select-none z-10"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Thumbnails */}
      <div 
        className="w-full max-w-2xl mx-auto flex justify-center gap-3 overflow-x-auto py-4"
        onClick={(e) => e.stopPropagation()}
      >
        {gallery.map((src, i) => (
          <button 
            key={i} 
            onClick={() => onChangeIndex(i)}
            className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
              i === imageIndex ? 'border-white scale-105 shadow-md shadow-white/10' : 'border-transparent opacity-50 hover:opacity-100'
            }`}
          >
            <img src={src} alt={`Lightbox thumbnail ${i + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
