export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const validateImage = (
  file: File,
  maxSize: number = 5 * 1024 * 1024,
  allowedTypes: string[] = ['image/jpeg', 'image/jpg', 'image/png']
): { valid: boolean; error?: string } => {
  if (!file) {
    return { valid: false, error: 'Файл не выбран' };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: `Размер файла не должен превышать ${maxSize / (1024 * 1024)}MB`,
    };
  }

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Поддерживаются только файлы .jpg, .jpeg, .png',
    };
  }

  return { valid: true };
};
