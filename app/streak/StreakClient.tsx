'use client';

import { GitHubCalendar } from 'react-github-calendar';
import { Flame, TrendingUp, Code, Calendar } from 'lucide-react';
import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';

interface StreakClientProps {
  totalSolved: number;
  currentStreak: number;
  bestStreak: number;
}

export default function StreakClient({ totalSolved, currentStreak, bestStreak }: StreakClientProps) {
  const [fireAnimation, setFireAnimation] = useState(null);

  useEffect(() => {
    // Load fire animation
    fetch('/animations/fire.json')
      .then((res) => res.json())
      .then((data) => setFireAnimation(data))
      .catch(() => console.log('Animation not found'));
  }, []);

  return (
    <div className="streak-page">
      {/* Stats Grid */}
      <div className="streak-stats-grid">
        {/* Current Streak */}
        <div className="streak-stat-card streak-stat-primary">
          <div className="streak-stat-icon">
            {fireAnimation && (
              <Lottie animationData={fireAnimation} loop style={{ width: 60, height: 60 }} />
            )}
            {!fireAnimation && <Flame className="w-12 h-12" />}
          </div>
          <div className="streak-stat-content">
            <p className="streak-stat-label">Current Streak</p>
            <h2 className="streak-stat-value">{currentStreak} days 🔥</h2>
          </div>
        </div>

        {/* Total Solved */}
        <div className="streak-stat-card">
          <div className="streak-stat-icon">
            <Code className="w-10 h-10" />
          </div>
          <div className="streak-stat-content">
            <p className="streak-stat-label">Problems Solved</p>
            <h2 className="streak-stat-value">{totalSolved}</h2>
          </div>
        </div>

        {/* Best Streak */}
        <div className="streak-stat-card">
          <div className="streak-stat-icon">
            <TrendingUp className="w-10 h-10" />
          </div>
          <div className="streak-stat-content">
            <p className="streak-stat-label">Best Streak</p>
            <h2 className="streak-stat-value">{bestStreak} days</h2>
          </div>
        </div>
      </div>

      {/* GitHub Contributions */}
      <div className="github-calendar-section">
        <div className="section-header" style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <Calendar className="w-8 h-8 inline-block mb-2" />
          <h2 className="section-title">GitHub Contributions</h2>
          <p className="section-subtitle">@jattu8602</p>
        </div>

        <div className="github-calendar-wrapper">
          <GitHubCalendar
            username="jattu8602"
            colorScheme="dark"
            blockSize={14}
            fontSize={14}
            theme={{
              dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
            }}
          />
        </div>
      </div>

      {/* Motivational Quote */}
      <div className="streak-quote">
        <p className="streak-quote-text">
          "Consistency is the key to mastery. Keep coding, keep growing!"
        </p>
        <p className="streak-quote-author">— Every Successful Developer</p>
      </div>
    </div>
  );
}
