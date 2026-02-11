import { getJavaFiles } from '@/lib/getJavaFiles';
import StreakClient from './StreakClient';

export const dynamic = 'force-dynamic';

export default async function StreakPage() {
  const files = await getJavaFiles();
  const totalSolved = files.length;

  // Calculate streak (simplified - assumes daily commits)
  let currentStreak = 0;
  if (files.length > 0) {
    const sortedDates = files
      .map((f) => new Date(f.dateModified))
      .sort((a, b) => b.getTime() - a.getTime());

    let prevDate = sortedDates[0];

    for (const date of sortedDates) {
      const diffDays = Math.floor((prevDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays <= 1) {
        currentStreak++;
        prevDate = date;
      } else {
        break;
      }
    }
  }

  return (
    <StreakClient
      totalSolved={totalSolved}
      currentStreak={currentStreak}
      bestStreak={currentStreak}
    />
  );
}
