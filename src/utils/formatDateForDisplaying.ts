export function formatDateForDisplaying(date: string | null | undefined): string {
  if (!date) return "";
  const [year, month, day] = date.split("-");
  return `${day}.${month}.${year}`;
}
