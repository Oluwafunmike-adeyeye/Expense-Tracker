const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

let localStorageTransactions = JSON.parse(localStorage.getItem('transactions'))

console.log(localStorageTransactions);

// let transaction =
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// add transaction
function addTransaction() {
    // e.preventDefault();

    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please add a text and amount');
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            // 
            amount: +amount.value
        };

        transactions.push(transaction);

        addTransactionDOM(transaction);

        updateValues();

        updateLocalStorage();

        text.value = '';
        amount.value = '';
    }
}

// A function to generate a random ID
function generateID() {
    return Math.floor(Math.random() * 1000000000);
}

// Add transaction to DOM List
function addTransactionDOM(transaction) {
    // Get sign
    const sign = transaction.amount < 0 ? '-' : '+';

    const item = document.createElement('li');

    // add class on value
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus')

    // Math.abs will change a number from positive to negative
    item.innerHTML = `${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span> <button class="delete-btn" onClick="removeTransaction (${transaction.id})">X</button>`

    list.appendChild(item);
}

// update localstorage transaction
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}


// write a function
function updateValues(){
    const amounts = transactions.map(transaction => transaction.amount)
    console.log(amounts);
    const total = amounts.reduce((acc, item) => (acc = acc += item), 0).toFixed(2)

    // this is me calculating the total income
    const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => acc = (acc += item), 0)
    .toFixed(2)

    const expense = (
        amounts.filter(item => item < 0).reduce((acc, item) => (acc = acc += item), 0)* -1
    ).toFixed(2);

    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;

}

// function to remove a transaction - **
function removeTransaction(id) {
    transactions = transactions.filter((transaction) => transaction.id !== id)

    updateLocalStorage();
    init();
}

// initialize the app
function init() {
    list.innerHTML = '';

    // you know foreach takes a function
    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();

form.addEventListener('submit', addTransaction)
