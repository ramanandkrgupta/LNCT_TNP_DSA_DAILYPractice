import fs from 'fs';
import path from 'path';

export interface JavaFile {
  filename: string;
  content: string;
  questionLink: string | null;
  links: string[];
  dateModified: string; // ISO string format for consistent timezone handling
  relativePath: string;
}

/**
 * Scans the JavaDSA folder and returns all .java files with metadata
 * Detects links (starting with https://) in comments
 * Extracts the LeetCode question link (typically the first link in the file)
 */
export async function getJavaFiles(): Promise<JavaFile[]> {
  const javaDirectory = path.join(process.cwd(), 'JavaDSA');

  // Check if directory exists
  if (!fs.existsSync(javaDirectory)) {
    console.warn('JavaDSA directory does not exist');
    return [];
  }

  const files: JavaFile[] = [];

  // Recursively read all .java files
  function scanDirectory(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        scanDirectory(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.java')) {
        const content = fs.readFileSync(fullPath, 'utf-8');
        const stats = fs.statSync(fullPath);

        // Extract all links from the file (looking for https:// URLs)
        const linkRegex = /https?:\/\/[^\s\)]+/g;
        const matches = content.match(linkRegex) || [];
        const links = [...new Set(matches)]; // Remove duplicates

        // The first link is typically the LeetCode question link
        const questionLink = links.length > 0 ? links[0] : null;

        files.push({
          filename: entry.name,
          content,
          questionLink,
          links,
          dateModified: stats.mtime.toISOString(),
          relativePath: path.relative(javaDirectory, fullPath),
        });
      }
    }
  }

  scanDirectory(javaDirectory);

  // Sort by date modified (latest first) - ISO strings can be compared directly
  files.sort((a, b) => b.dateModified.localeCompare(a.dateModified));

  return files;
}
