export function emailValidator(email) {
  const re = /\S+@\S+\.\S+/;
  if (!email) {
    return 'Обязательное поле.';
  }
  if (!re.test(email)) {
    return 'Некорректный email.';
  }
  return '';
}
