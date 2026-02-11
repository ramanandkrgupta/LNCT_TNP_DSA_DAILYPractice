import { getJavaFiles } from '@/lib/getJavaFiles';
import HomeClient from '@/components/HomeClient';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const javaFiles = await getJavaFiles();

  // Filter files from last 48 hours
  const now = new Date();
  const fortyEightHoursAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000);
  const recentFiles = javaFiles.filter((file) => {
    return new Date(file.dateModified) >= fortyEightHoursAgo;
  });

  // Calculate streak (simplified)
  let streak = 0;
  if (javaFiles.length > 0) {
    const sortedDates = javaFiles
      .map((f) => new Date(f.dateModified))
      .sort((a, b) => b.getTime() - a.getTime());

    let currentStreak = 0;
    let prevDate = sortedDates[0];

    for (const date of sortedDates) {
      const diffDays = Math.floor(
        (prevDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
      );
      if (diffDays <= 1) {
        currentStreak++;
        prevDate = date;
      } else {
        break;
      }
    }
    streak = currentStreak;
  }

  return (
    <HomeClient
      javaFiles={javaFiles}
      recentFiles={recentFiles}
      streak={streak}
      totalSolved={javaFiles.length}
    />
  );
}
