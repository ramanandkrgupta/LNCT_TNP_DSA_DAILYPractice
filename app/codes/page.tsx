import { getJavaFiles } from '@/lib/getJavaFiles';
import Link from 'next/link';
import CodeCanvas from '@/components/CodeCanvas';
import { Flame } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function CodesPage() {
  const javaFiles = await getJavaFiles();

  return (
    <div className="page-container">
      {/* Header */}
      <div className="section-header" style={{ marginBottom: '2rem' }}>
        <Link href="/" className="text-sm text-white/60 hover:text-white/90 mb-2 inline-block">
          ← Back to Home
        </Link>
        <h1 className="section-title">All Solutions Archive</h1>
        <p className="section-subtitle">
          Complete collection of {javaFiles.length} solved problems
        </p>
      </div>

      {/* All Codes Grid */}
      <div className="canvas-grid">
        {javaFiles.map((file, index) => (
          <CodeCanvas key={file.relativePath} file={file} index={index} />
        ))}
      </div>

      {javaFiles.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">
            <Flame className="w-16 h-16" />
          </div>
          <h2 className="empty-title">No Solutions Yet</h2>
          <p className="empty-description">
            Start adding your Java solutions to see them here!
          </p>
        </div>
      )}
    </div>
  );
}
