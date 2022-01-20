export function phoneValidator(phone) {
  const re = /^((\+7|7|8)+([0-9]){10})$/;
  if (!phone) {
    return 'Обязательное поле.';
  }
  if (!re.test(phone)) {
    return 'Некорректный номер телефона.';
  }
}
