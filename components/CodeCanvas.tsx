'use client';

import { useState } from 'react';
import { JavaFile } from '@/lib/getJavaFiles';

interface CodeCanvasProps {
  file: JavaFile;
  index: number;
}

export default function CodeCanvas({ file, index }: CodeCanvasProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(file.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Format date
  const formattedDate = new Date(file.dateModified).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  // Add syntax highlighting for Java code
  const highlightJava = (line: string) => {
    // Java keywords
    const keywords = /\b(public|private|protected|static|final|class|interface|extends|implements|void|int|double|float|long|short|byte|char|boolean|String|if|else|while|for|return|new|this|super|try|catch|finally|throw|throws|import|package)\b/g;

    // Function calls (word followed by parenthesis)
    const functions = /\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g;

    // Annotations
    const annotations = /(@[a-zA-Z]+)/g;

    // Strings
    const strings = /(["'])(.*?)\1/g;

    // Comments
    const comments = /(\/\/.*$|\/\*[\s\S]*?\*\/)/g;

    // Numbers
    const numbers = /\b(\d+\.?\d*)\b/g;

    // Apply highlighting
    let highlighted = line;

    // Comments first (highest priority)
    highlighted = highlighted.replace(comments, '<span class="syntax-comment">$1</span>');

    // Strings
    highlighted = highlighted.replace(strings, '<span class="syntax-string">$1$2$1</span>');

    // Keywords
    highlighted = highlighted.replace(keywords, '<span class="syntax-keyword">$1</span>');

    // Annotations
    highlighted = highlighted.replace(annotations, '<span class="syntax-annotation">$1</span>');

    // Functions
    highlighted = highlighted.replace(functions, '<span class="syntax-function">$1</span>(');

    // Numbers
    highlighted = highlighted.replace(numbers, '<span class="syntax-number">$1</span>');

    return highlighted;
  };

  // Add line numbers to code
  const codeLines = file.content.split('\n');

  return (
    <div
      className="code-canvas group"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Card Header */}
      <div className="canvas-header">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="filename">{file.filename}</h3>
            <p className="file-date">{formattedDate}</p>
          </div>

          {/* Copy Button */}
          <button
            onClick={copyToClipboard}
            className="copy-btn"
            aria-label="Copy code"
          >
            {copied ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
          </button>
        </div>

        {/* LeetCode Question Link */}
        {file.questionLink && (
          <a
            href={file.questionLink}
            target="_blank"
            rel="noopener noreferrer"
            className="question-link"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <span>View Problem on LeetCode</span>
          </a>
        )}
      </div>

      {/* Code Display with White Background */}
      <div className="code-container code-container-white">
        <pre className="code-pre code-pre-white">
          <code className="code-block">
            {codeLines.map((line, idx) => (
              <div key={idx} className="code-line code-line-white">
                <span className="line-number line-number-white">{idx + 1}</span>
                <span
                  className="line-content"
                  dangerouslySetInnerHTML={{ __html: highlightJava(line) }}
                />
              </div>
            ))}
          </code>
        </pre>
      </div>

      {/* Additional Links */}
      {file.links.length > 1 && (
        <div className="canvas-footer">
          <p className="footer-label">Related Links:</p>
          <div className="links-grid">
            {file.links.slice(1).map((link, idx) => (
              <a
                key={idx}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="related-link"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span className="truncate">{link}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
