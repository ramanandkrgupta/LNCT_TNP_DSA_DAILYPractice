export default function AboutPage() {
  return (
    <div className="page-container">
      <div className="about-container">
        <div className="about-card">
          {/* Header */}
          <div className="about-header">
            <h1 className="about-title">
              Why <span className="gradient-text">This Website</span>?
            </h1>
            <div className="about-divider"></div>
          </div>

          {/* Story Content */}
          <div className="about-content">
            <section className="about-section">
              <h2 className="about-section-title">🎯 The Challenge</h2>
              <p className="about-text">
                As a student at <strong>LNCT (Lakshmi Narain College of Technology)</strong>,
                preparing for placements through the Training & Placement cell, I faced a common problem...
              </p>
              <p className="about-text">
                <em>"Where do I track all my daily practice? How do I showcase consistent effort?"</em>
              </p>
            </section>

            <section className="about-section">
              <h2 className="about-section-title">💡 The Solution</h2>
              <p className="about-text">
                This website serves as my <strong>personal DSA journal</strong> — a place where every
                LeetCode problem I solve, every algorithm I master, is documented and displayed beautifully.
              </p>
              <ul className="about-list">
                <li>Track daily progress with streak counters</li>
                <li>Maintain a clean archive of all solutions</li>
                <li>Showcase coding consistency to recruiters</li>
                <li>Stay motivated with visual progress</li>
              </ul>
            </section>

            <section className="about-section">
              <h2 className="about-section-title">🚀 The Journey</h2>
              <p className="about-text">
                Every day, I solve problems focusing on:
              </p>
              <div className="about-badges">
                <span className="about-badge">Arrays & Strings</span>
                <span className="about-badge">Linked Lists</span>
                <span className="about-badge">Trees & Graphs</span>
                <span className="about-badge">Dynamic Programming</span>
                <span className="about-badge">System Design</span>
              </div>
            </section>

            <section className="about-section">
              <h2 className="about-section-title">🎓 LNCT TNP</h2>
              <p className="about-text">
                The Training & Placement cell at LNCT has been instrumental in guiding us through
                the placement process. This platform is my way of staying accountable and demonstrating
                the skills they're helping us build.
              </p>
              <p className="about-text">
                <strong>Goal:</strong> Secure a great placement by showcasing consistent practice,
                problem-solving skills, and dedication through this daily coding journey.
              </p>
            </section>
          </div>

          {/* Footer */}
          <div className="about-footer">
            <p className="about-footer-text">
              Built with ❤️ using Next.js, Tailwind CSS, and a passion for coding
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
