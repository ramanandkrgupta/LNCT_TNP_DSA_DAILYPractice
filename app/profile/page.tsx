import { SiLeetcode, SiGeeksforgeeks, SiHackerrank, SiGithub } from '@icons-pack/react-simple-icons';
import { FileText, ExternalLink, Linkedin } from 'lucide-react';

export default function ProfilePage() {
  const profiles = [
    {
      name: 'LeetCode',
      username: 'jattu8602',
      url: 'https://leetcode.com/jattu8602',
      icon: SiLeetcode,
      color: '#FFA116',
      stats: 'Coding Platform',
    },
    {
      name: 'GeeksforGeeks',
      username: 'jattu8602',
      url: 'https://auth.geeksforgeeks.org/user/jattu8602',
      icon: SiGeeksforgeeks,
      color: '#2F8D46',
      stats: 'Practice & Learn',
    },
    {
      name: 'HackerRank',
      username: 'jattu8602',
      url: 'https://www.hackerrank.com/jattu8602',
      icon: SiHackerrank,
      color: '#00EA64',
      stats: 'Competitive Coding',
    },
    {
      name: 'GitHub',
      username: 'jattu8602',
      url: 'https://github.com/jattu8602',
      icon: SiGithub,
      color: '#FFFFFF',
      stats: 'Open Source',
    },
    {
      name: 'LinkedIn',
      username: 'jattu8602',
      url: 'https://linkedin.com/in/jattu8602',
      icon: Linkedin,
      color: '#0A66C2',
      stats: 'Professional Network',
    },
  ];

  return (
    <div className="page-container">
      <div className="profile-container">
        {/* Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            <span className="profile-avatar-text">J</span>
          </div>
          <h1 className="profile-title">Connect With Me</h1>
          <p className="profile-subtitle">
            Explore my coding journey across platforms
          </p>
        </div>

        {/* Profiles Grid */}
        <div className="profile-grid">
          {profiles.map((profile) => {
            const Icon = profile.icon;
            return (
              <a
                key={profile.name}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="profile-card"
                style={
                  {
                    '--profile-color': profile.color,
                  } as React.CSSProperties
                }
              >
                <div className="profile-card-icon">
                  <Icon className="w-8 h-8" />
                </div>
                <div className="profile-card-content">
                  <h3 className="profile-card-title">{profile.name}</h3>
                  <p className="profile-card-username">@{profile.username}</p>
                  <p className="profile-card-stats">{profile.stats}</p>
                </div>
                <ExternalLink className="profile-card-arrow" />
              </a>
            );
          })}
        </div>

        {/* Resume Section */}
        <div className="resume-section">
          <div className="resume-card">
            <FileText className="w-12 h-12 text-purple-400 mb-4" />
            <h2 className="resume-title">Resume</h2>
            <p className="resume-description">
              Download my latest resume to learn more about my skills and experience
            </p>
            <a
              href="/resume.pdf"
              download
              className="resume-button"
            >
              <FileText className="w-5 h-5" />
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
