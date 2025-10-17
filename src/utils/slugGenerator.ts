export const genSlug = (title: string): string => {
  const normalizedTitle = title
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  const slug = normalizedTitle
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]\s-/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/[\s-]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const randomChars = Math.random().toString(36).slice(2);
  const uniqueSlug = `${slug}-${randomChars}`;

  return uniqueSlug;
};
