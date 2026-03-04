export function formatTrainName(trainName: string): string {
  if (!trainName) return "";

  if (trainName.toLowerCase().includes("undefined")) {
    return trainName.replace(/undefined\s*-\s*/i, "").trim();
  }

  return trainName;
}
