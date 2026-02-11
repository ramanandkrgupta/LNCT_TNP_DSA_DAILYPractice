'use client';

import { useEffect, useState, useRef } from 'react';
import { JavaFile } from '@/lib/getJavaFiles';
import CodeCanvas from '@/components/CodeCanvas';
import Lottie from 'lottie-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface HomeClientProps {
  javaFiles: JavaFile[];
  recentFiles: JavaFile[];
  streak: number;
  totalSolved: number;
}

export default function HomeClient({ javaFiles, recentFiles, streak, totalSolved }: HomeClientProps) {
  const [fireAnimation, setFireAnimation] = useState(null);
  const [isPinned, setIsPinned] = useState(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const autoplayRef = useRef(
    Autoplay({
      delay: 10000, // 10 seconds
      stopOnInteraction: false,
    })
  );

  useEffect(() => {
    // Load fire animation
    fetch('/animations/fire.json')
      .then((res) => res.json())
      .then((data) => setFireAnimation(data))
      .catch(() => console.log('Animation not found'));
  }, []);

  // Handle pin/unpin and control autoplay
  useEffect(() => {
    const autoplay = autoplayRef.current;

    // Safety check - ensure autoplay plugin is initialized
    if (!autoplay) return;

    if (isPinned) {
      // Stop autoplay completely when pinned
      if (autoplay.stop) autoplay.stop();
      if (autoplay.reset) autoplay.reset();
    } else {
      // Resume autoplay when unpinned
      if (autoplay.reset) autoplay.reset();
      // Small delay to ensure plugin is ready
      setTimeout(() => {
        if (autoplay.play) autoplay.play();
      }, 100);
    }
  }, [isPinned]);

  // Handle pin/unpin toggle
  const handlePinToggle = () => {
    setIsPinned(!isPinned);
  };

  // Use all files if no recent files
  const filesToShow = recentFiles.length > 0 ? recentFiles : javaFiles;

  return (
    <div className="home-carousel-container">
      <Carousel
        opts={{
          align: "start",
          loop: true,
          watchDrag: !isPinned, // Disable drag when pinned
        }}
        plugins={[autoplayRef.current]}
        className="home-carousel-wrapper"
        setApi={setCarouselApi}
      >
        <CarouselContent>
          {filesToShow.map((file, index) => (
            <CarouselItem key={file.relativePath} className="carousel-full-item">
              <CodeCanvas
                file={file}
                index={index}
                isPinned={isPinned}
                onPinToggle={handlePinToggle}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          className="carousel-nav-button"
          style={{
            opacity: isPinned ? 0.3 : 1,
            pointerEvents: isPinned ? 'none' : 'auto',
            cursor: isPinned ? 'not-allowed' : 'pointer'
          }}
        />
        <CarouselNext
          className="carousel-nav-button"
          style={{
            opacity: isPinned ? 0.3 : 1,
            pointerEvents: isPinned ? 'none' : 'auto',
            cursor: isPinned ? 'not-allowed' : 'pointer'
          }}
        />
      </Carousel>
    </div>
  );
}
