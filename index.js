const buttonAddIncome = document.getElementById("income-button");
const inputIncome = document.getElementById("income-title");
const incomesList = document.getElementById("income-list");
const incomeAmount = document.getElementById("user-income");
const errorMessage = document.getElementById("budget-error");
const errorMessage2 = document.getElementById("expenses-title-error");
const budgetTotal = document.getElementById("amount");
const summaryIncome = document.getElementById("summary");
let objArray = [];
const buttonAddExpenses = document.getElementById("expenses-button");
const inputExpensesTitle = document.getElementById("expenses-title");
const inputExpensesAmount = document.getElementById("user-expenses-amount");
const summaryExpenses = document.getElementById("summary2");
const expensesList = document.getElementById("expenses-list");

function budgetTotalUserText() {
  if (budgetTotal.innerHTML > 0) {
    budgetTotal.innerHTML = `Możesz jeszcze wydać ${budgetTotal.innerHTML} złotych`;
  } else if (budgetTotal.innerHTML === "0") {
    budgetTotal.innerHTML = "Bilans wynosi zero";
  } else {
    budgetTotal.innerHTML = `Bilans jest ujemny. Jesteś na minusie ${budgetTotal.innerHTML} złotych`;
  }
}
function createButton(classList, innerHtml, id) {
  const button = document.createElement("button");
  button.classList.add(classList);
  button.innerHTML = innerHtml;
  button.id = id;
  return button;
}
function createInput(id) {
  const input = document.createElement("input");
  input.id = id;
  return input;
}
function addButtonsToLi(li, buttonEdit, buttonRemove) {
  li.appendChild(buttonEdit);
  li.appendChild(buttonRemove);
  return li;
}
function createError(inputAmount, inputTitle, errorMessage) {
  if (
    inputAmount.value === "" ||
    inputAmount.value <= 0 ||
    inputTitle.value === ""
  ) {
    errorMessage.classList.remove("hide");
    inputAmount.value = "";
    return true;
  }
  return false;
}
function createErrorEditInputs(editInputValue, editInput, errorMessage) {
  if (
    editInputValue.value === "" ||
    editInputValue.value <= "0 zł" ||
    editInput.value === ""
  ) {
    errorMessage.classList.remove("hide");
    inputAmount.value = "";
    return true;
  }
  return false;
}

function hiddenElements(
  buttonSave,
  buttonEdit,
  editInput,
  editInputValue,
  amountAndInput,
  buttonRemove
) {
  buttonSave.hidden = true;
  buttonEdit.hidden = false;
  editInput.hidden = true;
  editInputValue.hidden = true;
  amountAndInput.hidden = false;
  buttonRemove.hidden = false;
}
function createObj(li, inputIncome, incomeAmount, type) {
  let obj = {
    id: li,
    name: inputIncome,
    amount: Number(incomeAmount),
    type: type,
  };
  objArray.push(obj);
  return obj;
}
function reduceIncomeandExpenses(type) {
  return objArray.reduce(
    (acc, prev) => (prev.type === type ? acc + prev.amount : acc),
    0
  );
}
function summaryAmountTotal() {
  const addAmountIncome = reduceIncomeandExpenses("income");
  const addAmountExpenses = reduceIncomeandExpenses("expenses");

  summaryIncome.innerHTML = `${addAmountIncome}  zł`;
  summaryExpenses.innerHTML = `${addAmountExpenses}  zł`;
  budgetTotal.innerHTML = addAmountIncome - addAmountExpenses;
}
function createEditInputs(li, divRow, amountAndInput, buttonRemove, editObj) {
  let buttonEdit = createButton("edit-button", "edytuj", li.id);

  buttonEdit.addEventListener("click", () => {
    const editInput = document.createElement("input");
    const editInputValue = document.createElement("input");
    editInput.id = li.id;
    const result = objArray.filter((item) => item.id === li.id);
    editInput.value = result[0].name;
    editInputValue.value = `${result[0].amount} zł`;

    divRow.appendChild(editInput);
    divRow.appendChild(editInputValue);
    amountAndInput.hidden = true;
    buttonEdit.hidden = true;

    let buttonSave = createButton("save-button", "zapisz", li.id);
    li.appendChild(buttonSave);
    li.appendChild(buttonRemove);

    buttonSave.addEventListener("click", () => {
      if (
        createErrorEditInputs(editInputValue, editInput, errorMessage) === false
      ) {
        errorMessage.classList.add("hide");
        hiddenElements(
          buttonSave,
          buttonEdit,
          editInput,
          editInputValue,
          amountAndInput,
          buttonRemove
        );
        amountAndInput.innerHTML = `${editInput.value} ${editInputValue.value}`;
        editObj.name = editInput.value;
        editObj.amount = parseInt(editInputValue.value);
        summaryAmountTotal();
        budgetTotalUserText();
      }
    });
  });
  return buttonEdit;
}
function removeAllItems(
  buttonEdit,
  buttonRemove,
  incomeAmountAndInput,
  li,
  summaryAmountTotal
) {
  buttonEdit.hidden = true;
  buttonRemove.hidden = true;
  buttonRemove.id = li.id;
  incomeAmountAndInput.remove();
  li.parentNode.removeChild(li);
  objArray = objArray.filter((item) => item.id !== li.id);
  summaryAmountTotal();
  budgetTotalUserText();
}

buttonAddIncome.addEventListener("click", (event) => {
  event.preventDefault();
  let li = document.createElement("li");
  if (createError(incomeAmount, inputIncome, errorMessage) === false) {
    errorMessage.classList.add("hide");

    li.id = Math.random();
    const incomeObj = createObj(
      li.id,
      inputIncome.value,
      incomeAmount.value,
      "income"
    );
    summaryAmountTotal();
    budgetTotalUserText();

    const divIncomeRow = document.createElement("div");
    const incomeAmountAndInput = document.createElement("p");
    incomeAmountAndInput.innerHTML = `${inputIncome.value} ${incomeAmount.value} zł.`;
    divIncomeRow.appendChild(incomeAmountAndInput);
    li.appendChild(divIncomeRow);

    const buttonRemove = createButton("remove-button", "usun", li.id);
    const buttonEdit = createEditInputs(
      li,
      divIncomeRow,
      incomeAmountAndInput,
      buttonRemove,
      incomeObj
    );

    li = addButtonsToLi(li, buttonEdit, buttonRemove);
    incomesList.appendChild(li);

    buttonRemove.addEventListener("click", () => {
      removeAllItems(
        buttonEdit,
        buttonRemove,
        incomeAmountAndInput,
        li,
        summaryAmountTotal,
        summaryIncome
      );
    });
  }
  incomeAmount.value = "";
  inputIncome.value = "";
});
/*---------------------------------Expenses---------------------------------*/
buttonAddExpenses.addEventListener("click", (event) => {
  event.preventDefault();
  let li = document.createElement("li"); // jak tu const to nie wyswietli sie
  if (
    createError(inputExpensesAmount, inputExpensesTitle, errorMessage2) ===
    false
  ) {
    errorMessage2.classList.add("hide");

    li.id = Math.random();
    const expensesObj = createObj(
      li.id,
      inputExpensesTitle.value,
      inputExpensesAmount.value,
      "expenses"
    );
    summaryAmountTotal();
    budgetTotalUserText();

    const divExpensesRow = document.createElement("div");
    const expensesAmountAndInput = document.createElement("p");
    expensesAmountAndInput.innerHTML = `${inputExpensesTitle.value} ${inputExpensesAmount.value} zł`;
    divExpensesRow.appendChild(expensesAmountAndInput);
    li.appendChild(divExpensesRow);

    const buttonRemove = createButton("remove-button", "usun", li.id);

    errorMessage.classList.add("hide");
    const buttonEdit = createEditInputs(
      li,
      divExpensesRow,
      expensesAmountAndInput,
      buttonRemove,
      expensesObj
    );
    li = addButtonsToLi(li, buttonEdit, buttonRemove);
    expensesList.appendChild(li);

    buttonRemove.addEventListener("click", () => {
      removeAllItems(
        buttonEdit,
        buttonRemove,
        expensesAmountAndInput,
        li,
        summaryAmountTotal
      );
    });
  }
  inputExpensesAmount.value = "";
  inputExpensesTitle.value = "";
});
