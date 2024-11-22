export function capitalizeWords(text: string): string {
  const exceptions = new Set([
    'a', 'an', 'the', 'and', 'but', 'or', 'for', 'nor', 'on', 'at',
    'to', 'from', 'by', 'with', 'in', 'of', 'under', 'between'
  ]);

  return text.split(' ').map((word, index) => {
    // Always capitalize first and last word
    if (index === 0 || index === text.split(' ').length - 1) {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
    // Check for exceptions
    return exceptions.has(word.toLowerCase())
      ? word.toLowerCase()
      : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join(' ');
}