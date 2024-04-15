const checkInn = (inn) => {
  const checkDigit = (inn, coefficients) => {
    return (
      (inn
        .split("")
        .reduce((sum, digit, index) => sum + digit * coefficients[index], 0) %
        11) %
      10
    );
  };

  const isValidLength = inn.length === 10 || inn.length === 12;

  if (!/^\d+$/.test(inn) || !isValidLength) return false;

  const coefficients =
    inn.length === 10
      ? [2, 4, 10, 3, 5, 9, 4, 6, 8, 0]
      : [7, 2, 4, 10, 3, 5, 9, 4, 6, 8, 0];

  const firstCheckDigit = checkDigit(inn, coefficients);
  const secondCheckDigit =
    inn.length === 12 ? checkDigit(inn, coefficients) : undefined;

  const isValid =
    firstCheckDigit === parseInt(inn[inn.length - 2], 10) &&
    (inn.length === 10 ||
      secondCheckDigit === parseInt(inn[inn.length - 1], 10));

  return isValid;
};

export { checkInn };
