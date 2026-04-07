// src/utils/calendar.ts

/**
 * Pad number with leading zero if needed
 */
export function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

/**
 * Generate array of days for a calendar month view, including prev/next month days
 * Each day object contains: day, type (prev|current|next), date (YYYY-MM-DD)
 */
export function getDaysArray(year: number, month: number) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 0).getDay(); // 0=Sun, 1=Mon, ...
  const prevMonthDays = new Date(year, month, 0).getDate();

  // Days from previous month
  const prevDays = Array.from(
    { length: startDay },
    (_, i) => prevMonthDays - startDay + i + 1,
  );

  // Days in current month
  const thisDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Fill only the number of whole weeks needed for the current month view.
  const totalCells = Math.ceil((prevDays.length + thisDays.length) / 7) * 7;
  const nextDays = Array.from(
    { length: totalCells - (prevDays.length + thisDays.length) },
    (_, i) => i + 1,
  );

  // Calculate previous and next month/year
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;

  return [
    ...prevDays.map((d) => ({
      day: d,
      type: "prev",
      date: `${prevYear}-${pad(prevMonth + 1)}-${pad(d)}`,
    })),
    ...thisDays.map((d) => ({
      day: d,
      type: "current",
      date: `${year}-${pad(month + 1)}-${pad(d)}`,
    })),
    ...nextDays.map((d) => ({
      day: d,
      type: "next",
      date: `${nextYear}-${pad(nextMonth + 1)}-${pad(d)}`,
    })),
  ];
}
