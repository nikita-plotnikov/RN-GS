export function confirmPasswordValidator(password, confirmPassword) {
  if (!confirmPassword) {
    return 'Обязательное поле.';
  }
  if (password !== confirmPassword) {
    return 'Пароли не совпадают.';
  }
  return '';
}
