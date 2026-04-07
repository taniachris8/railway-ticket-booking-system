export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    if (
      error.message.includes("Failed to fetch") ||
      error.message.includes("NetworkError")
    ) {
      return "Нет подключения к Интернету. Проверьте соединение.";
    }

    return error.message;
  }

  return "Что-то пошло не так. Попробуйте позже.";
}