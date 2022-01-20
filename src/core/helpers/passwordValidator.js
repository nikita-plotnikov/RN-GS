export function passwordValidator(password) {
  if (!password) {
    return 'Обязательное поле.';
  }
  if (password.length < 5) {
    return 'Пароль должен состоять не менее чем из 5 символов.';
  }
  return '';
}
