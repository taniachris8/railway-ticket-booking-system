export function formatTime(timestamp: number): string {
  const date = new Date(timestamp * 1000);

  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}
