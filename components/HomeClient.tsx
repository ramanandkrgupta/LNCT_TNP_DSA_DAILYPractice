'use client';

import { useEffect, useState } from 'react';
import { JavaFile } from '@/lib/getJavaFiles';
import CodeCanvas from '@/components/CodeCanvas';
import { Flame, Code, Trophy } from 'lucide-react';
import Lottie from 'lottie-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
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

  useEffect(() => {
    // Load fire animation
    fetch('/animations/fire.json')
      .then((res) => res.json())
      .then((data) => setFireAnimation(data))
      .catch(() => console.log('Animation not found'));
  }, []);

  return (
    <div className="page-container">
      {/* Hero Section */}
      <div className="hero">
        <div className="hero-content">
          <div className="hero-subtitle">Welcome to</div>
          <h1 className="hero-title">
            Daily <span className="gradient-text">DSA Practice</span>
          </h1>
          <p className="hero-description">
            Training & Placement Journey • LNCT
          </p>
        </div>
      </div>

      {/* Stats Dashboard with Fire Animation */}
      <div className="stats-container">
        {/* Current Streak with Fire */}
        <div className="stat-card stat-card-primary">
          <div className="stat-icon">
            {fireAnimation && (
              <Lottie animationData={fireAnimation} loop style={{ width: 50, height: 50 }} />
            )}
            {!fireAnimation && <Flame className="w-10 h-10" />}
          </div>
          <div className="stat-content">
            <p className="stat-label">Current Streak</p>
            <h2 className="stat-value">{streak} days 🔥</h2>
          </div>
        </div>

        {/* Total Solved */}
        <div className="stat-card">
          <div className="stat-icon">
            <Code className="w-10 h-10" />
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Solved</p>
            <h2 className="stat-value">{totalSolved} 🎯</h2>
          </div>
        </div>

        {/* Recent (48hrs) */}
        <div className="stat-card">
          <div className="stat-icon">
            <Trophy className="w-10 h-10" />
          </div>
          <div className="stat-content">
            <p className="stat-label">Last 48 Hours</p>
            <h2 className="stat-value">{recentFiles.length}</h2>
          </div>
        </div>
      </div>

      {/* Latest Codes Section - Auto-Sliding Carousel */}
      {recentFiles.length > 0 && (
        <div className="section" style={{ marginTop: '3rem' }}>
          <div className="section-header">
            <h2 className="section-title">Latest Solutions (48hrs)</h2>
            <p className="section-subtitle">
              Recent problems solved in the last 2 days
            </p>
          </div>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 5000,
              }),
            ]}
            className="carousel-wrapper"
          >
            <CarouselContent>
              {recentFiles.map((file, index) => (
                <CarouselItem key={file.relativePath} className="md:basis-1/2 lg:basis-1/2">
                  <CodeCanvas file={file} index={index} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      )}

      {/* All Codes Grid */}
      <div className="section" style={{ marginTop: '3rem' }}>
        <div className="section-header">
          <h2 className="section-title">All Solutions</h2>
          <p className="section-subtitle">
            Complete archive of {javaFiles.length} solved problems
          </p>
        </div>

        <div className="canvas-grid">
          {javaFiles.map((file, index) => (
            <CodeCanvas key={file.relativePath} file={file} index={index} />
          ))}
        </div>
      </div>

      {javaFiles.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">
            <Flame className="w-16 h-16" />
          </div>
          <h2 className="empty-title">No Solutions Yet</h2>
          <p className="empty-description">
            Start adding your Java solutions to the JavaDSA folder!
          </p>
        </div>
      )}
    </div>
  );
}
