export function formatTime(timestamp: number): string {
  const date = new Date(timestamp * 1000);

  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

const plural = (n: number, [one, few, many]: [string, string, string]) =>
  n % 10 === 1 && n % 100 !== 11
    ? one
    : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
      ? few
      : many;

export function formatDuration(timestamp: number): string {
  const date = new Date(timestamp * 1000);

  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${hours} ${plural(hours, ["час", "часа", "часов"])}
   ${minutes} ${plural(minutes, [
     "минута",
     "минуты",
     "минут",
   ])}`;
}