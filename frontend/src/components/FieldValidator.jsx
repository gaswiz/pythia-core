export const getFieldClass = (value, error) => {
  if (error && (!value || value.trim() === '')) {
    return 'glow-error';
  }
  return '';
};
