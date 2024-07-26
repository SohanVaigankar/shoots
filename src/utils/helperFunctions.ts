export const downloadBlobFile = (blob: Blob, name: string | undefined) => {
  if (!blob) {
    console.error("Failed to download file");
    return null;
  }
  const objectUrl = URL.createObjectURL(blob);
  const linkElement = document.createElement("a");
  linkElement.download = String(name);
  linkElement.href = objectUrl;
  linkElement.click();
  URL.revokeObjectURL(objectUrl);
};