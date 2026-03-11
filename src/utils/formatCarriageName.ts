export function formatCarriageName(carriageName: string): string {
  if (!carriageName) return "";

  const numbers = carriageName.match(/\d+/g);

  return numbers ? numbers.join("") : "";
}
