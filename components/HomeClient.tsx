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
  const previousPinState = useRef(false);
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

  // Control autoplay based on pin state
  useEffect(() => {
    const autoplay = autoplayRef.current;
    if (!autoplay) return;

    // Only act on actual state changes, not initial mount
    const isPinStateChange = previousPinState.current !== isPinned;

    if (isPinned && isPinStateChange) {
      // Stop autoplay when pinning
      try {
        if (typeof autoplay.stop === 'function') {
          autoplay.stop();
        }
      } catch (error) {
        console.log('Error stopping autoplay:', error);
      }
    } else if (!isPinned && isPinStateChange && previousPinState.current === true) {
      // Only resume autoplay when explicitly unpinning (not on initial mount)
      try {
        if (typeof autoplay.play === 'function') {
          autoplay.play();
        }
      } catch (error) {
        console.log('Error resuming autoplay:', error);
      }
    }

    // Update previous state
    previousPinState.current = isPinned;
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
