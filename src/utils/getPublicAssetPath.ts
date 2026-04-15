export function getPublicAssetPath(path: string) {
  if (!path.startsWith("/")) {
    return path;
  }

  return `${import.meta.env.BASE_URL}${path.slice(1)}`;
}
