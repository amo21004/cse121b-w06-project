const DAYS_IN_A_YEAR = 365;

const WEEKS_IN_A_YEAR = 52;

const MONTHS_IN_A_YEAR = 12;

const QUARTERS_IN_A_YEAR = 4;

function calculator(duration, amount, apy, multiplier_and_divisor = 1) {
  for (let i = 0; i < duration * multiplier_and_divisor; i++) {
    amount = calculate_amount(
      amount,
      calculate_interest(amount, apy, multiplier_and_divisor)
    );
  }

  return amount;
}

function get_amount(reinvest_frequency, duration, amount, apy) {
  if (reinvest_frequency == "d") {
    amount = calculator(duration, amount, apy, DAYS_IN_A_YEAR);
  } else if (reinvest_frequency == "w") {
    amount = calculator(duration, amount, apy, WEEKS_IN_A_YEAR);
  } else if (reinvest_frequency == "m") {
    amount = calculator(duration, amount, apy, MONTHS_IN_A_YEAR);
  } else if (reinvest_frequency == "q") {
    amount = calculator(duration, amount, apy, QUARTERS_IN_A_YEAR);
  } else if (reinvest_frequency == "y") {
    amount = calculator(duration, amount, apy);
  }

  return amount;
}

function calculate_interest(amount, apy, divisor = 1) {
  return (amount * apy) / 100 / divisor;
}

function calculate_amount(amount, interest) {
  return amount + interest;
}

export { calculator, get_amount, calculate_interest, calculate_amount };
