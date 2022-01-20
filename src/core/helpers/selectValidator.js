export const selectValidator = value => {
  if (!value || value.length <= 0) {
    return 'Обязательное поле.';
  }
};
