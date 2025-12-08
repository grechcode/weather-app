export const isUserQueryValid = (value) => {
  const isCorrectValue = /^[-а-яё0-9| ]+$/gi.test(value);
  if (value.length === 0) {
    return { isValid: false, message: 'Введите название города' };
  } else if (value.length === 1) {
    return {
      isValid: false,
      message: 'Запрос должен состоять минимум из 2 символов',
    };
  } else if (!isCorrectValue) {
    return { isValid: false, message: 'Запрос должен быть на русском языке' };
  } else {
    return { isValid: true, message: '' };
  }
};
