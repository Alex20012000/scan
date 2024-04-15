const checkLimit = (num) => {
  const isValidNumber = (value) => {
    const parsedValue = parseInt(value, 10);
    return !isNaN(parsedValue) && parsedValue >= 1 && parsedValue <= 1000;
  };

  return isValidNumber(num);
};

export { checkLimit };
