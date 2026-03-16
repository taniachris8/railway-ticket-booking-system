import { END, eventChannel, type EventChannel } from "redux-saga";

export function createProgressChannel(
  totalSteps: number,
): EventChannel<number> {
  return eventChannel((emit) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 1;
      emit(progress);
      if (progress >= totalSteps) {
        clearInterval(interval);
        emit(END);
      }
    }, 50);
    return () => clearInterval(interval);
  });
}
