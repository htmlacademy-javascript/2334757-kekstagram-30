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


// Функция проверки времени.
const getTime = (time) => {
  if(String(time).includes(':', 0)) {
    const timeArr = time.split(':');
    return new Date().setHours(+timeArr[0], +timeArr[1], 0, 0);
  } else {
    return new Date().setHours(0, +time, 0, 0) - new Date().setHours(0, 0, 0, 0);
  }
};

const checkWorkingTimeLimits = (startWorkTime, endWorkTime, startMeetingTime, meetingDuration) => {
  const startWorkTimeDate = getTime(startWorkTime);
  const endWorkTimeDate = getTime(endWorkTime);
  const startMeetingTimeDate = getTime(startMeetingTime);
  const meetingDurationTime = getTime(meetingDuration);
  return (startWorkTimeDate <= startMeetingTimeDate && (startMeetingTimeDate + meetingDurationTime) <= endWorkTimeDate);
};

checkWorkingTimeLimits('08:00', '17:30', '14:00', 90); // true
checkWorkingTimeLimits('8:0', '10:0', '8:0', 120); // true
checkWorkingTimeLimits('08:00', '14:30', '14:00', 90); // false
checkWorkingTimeLimits('14:00', '17:30', '08:0', 90); // false
checkWorkingTimeLimits('8:00', '17:30', '08:00', 900); // false
