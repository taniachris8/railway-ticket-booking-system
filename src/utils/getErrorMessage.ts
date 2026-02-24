export function getErrorMessage(error: unknown): string {
  if (error instanceof Error)
    return "Нет подключения к Интернету. Проверьте настройки подключения или попробуйте позже.";
  return "Что-то пошло не так. Попробуйте позже.";
}
