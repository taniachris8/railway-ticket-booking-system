export function formatDuration(duration: number): string { 
 const hours = Math.floor(duration / 3600) % 24;
 const minutes = Math.floor((duration % 3600) / 60);

 return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}