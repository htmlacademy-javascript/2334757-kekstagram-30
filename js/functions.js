//Функция для проверки длины строки.
function getLengthString (string, maxLength) {
  return string.length <= maxLength;
}

getLengthString('проверяемая строка', 20);
getLengthString('проверяемая строка', 18);
getLengthString('проверяемая строка', 10);

// Функция для проверки, является ли строка палиндромом.
function getPalindrome (string) {
  const normalizeString = string.replaceAll(' ', '').toUpperCase();

  for (let i = 0; i <= normalizeString.length; i++) {
    if (normalizeString.at(i) !== normalizeString.at(i - 1)) {
      return false;
    }
    return true;
  }
}

getPalindrome('топот');
getPalindrome('ДовОд');
getPalindrome('Кекс');
getPalindrome('Лёша на полке клопа нашёл ');

//Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.
function extractNumber (string) {
  string = String(string);
  let result = '';
  for (let i = 0; i < string.length; i++) {
    if (!Number.isNaN(parseInt(string[i], 10))) {
      result += string[i];
    }
  }
  return parseInt(result, 10);
}

extractNumber('2023 год');
extractNumber('ECMAScript 2022');
extractNumber('1 кефир, 0.5 батона');
extractNumber('агент 007');
extractNumber('а я томат');

extractNumber(2023);
extractNumber(-1);
extractNumber(1.5);
