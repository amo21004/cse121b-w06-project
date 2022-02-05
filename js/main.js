import * as Calculator from "./calculator.js";

const main_element = document.querySelector("main");

document.querySelector("#calculate").addEventListener("click", function () {
  clean_up();

  const values = get_form_values();

  if (check_for_empty_fields(values)) {
    // One of the fields is empty. Terminate.
    return;
  }

  const amount = Calculator.get_amount(
    values.reinvest_frequency,
    parseFloat(values.duration),
    parseFloat(values.principal),
    parseFloat(values.apy)
  );

  const interest = (amount - values.principal).toFixed(4); // Round to 4 decimal places

  display_summary(interest, values.principal, values.ticker);
});

function clean_up() {
  // Clears all existing alerts and tables

  // Uses forEach rather than map because querySelectorAll returns NodeList which only implements forEach

  document
    .querySelectorAll("main .alert-danger")
    .forEach((alert) => alert.remove());

  document.querySelectorAll("main .table").forEach((alert) => alert.remove());
}

function display_summary(interest, amount, ticker) {
  const table = document.createElement("table");

  const total = parseFloat(interest) + parseFloat(amount);

  table.classList = "mt-3 table";

  table.innerHTML = `
        <tr>
            <th>Interest</th>
            <td>${interest} ${ticker}</td>
        </tr>
        <tr>
            <th>Total</th>
            <td>${total} ${ticker}</td>
        </tr>
    `;

  main_element.appendChild(table);
}

function get_form_values() {
  return {
    ticker: document.querySelector("#ticker").value,
    apy: document.querySelector("#apy").value,
    duration: document.querySelector("#duration").value,
    principal: document.querySelector("#principal").value,
    reinvest_frequency: document.querySelector("#reinvest-frequency").value,
  };
}

function check_for_empty_fields(values) {
  let is_field_empty = false;

  for (const key in values) {
    // Trim input first and then if its empty
    if (values[key].trim() == "") {
      is_field_empty = true;

      // One of the fields is empty. No pointing in checking the rest; so break the loop.
      break;
    }
  }

  if (is_field_empty) {
    const alert = document.createElement("div");

    alert.innerHTML = `
            <div class="mt-3 alert alert-danger">
                All fields are required!
            </div>
        `;

    main_element.appendChild(alert);

    return true;
  }

  return false;
}
