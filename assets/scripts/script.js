
// IGNORE THE SCRIPS BELOW , I'M ONLY KNOW HOW PROGRAM, NOT USE THE DOM :(
// i'm still learning 


//

const inputs = document.querySelectorAll('.general-input');

inputs.forEach((input) => {
    const container = input.closest('.input-container'); // Selecciona el contenedor más cercano
    input.addEventListener('focus', function () {
        container.classList.add('focused');
    });
    input.addEventListener('blur', function () {
        container.classList.remove('focused');
    });
});

//

document.getElementById('amount').addEventListener('input', function (e) {
    const input = e.target;
    const value = input.value.replace(/\D/g, ''); // Eliminar cualquier carácter que no sea un dígito
    const formattedValue = new Intl.NumberFormat('en-US').format(value); // Formatear el número
    input.value = formattedValue;
});

//

document.getElementById('term').addEventListener('input', function (e) {
    const input = e.target;
    const value = input.value.replace(/\D/g, ''); // Eliminar cualquier carácter que no sea un dígito
    input.value = value;
});

//
document.getElementById('rate').addEventListener('input', function (e) {
    const input = e.target;
    const value = input.value.replace(/[^0-9.]/g, '');
    const pointIndex = value.indexOf('.');

    let finalValue;
    if (pointIndex !== -1) {

        finalValue = value.slice(0, pointIndex + 1) + value.slice(pointIndex + 1).replace(/\./g, '');
    } else {
        finalValue = value;
    }

    input.value = finalValue;
});


//

document.addEventListener('DOMContentLoaded', function () {
    const radioInputs = document.querySelectorAll('.radio-input');

    radioInputs.forEach(function (radioInput) {
        radioInput.addEventListener('change', function () {
            const id = this.id;
            const labels = document.querySelectorAll('.radio-label');

            labels.forEach(function (label) {
                if (label.getAttribute('for') === id) {
                    label.classList.add('active');
                } else {
                    label.classList.remove('active');
                }
            });
        });
    });
});

//



const collectData = document.getElementById('collector');

collectData.addEventListener('click', function () {
    const amount = document.getElementById('amount');
    const term = document.getElementById('term');
    const rate = document.getElementById('rate');
    const repayment = document.querySelector('input[name="mortgage-type"]:checked');

    console.log(amount.value);
    console.log(term.value);
    console.log(rate.value);
    console.log(repayment.value);

    if (validateData(amount, term, rate, repayment)) {
        printData(amount.value.replaceAll(',', ''), term.value, rate.value, repayment.value);
    }
});

//if is not valida, add error class to their parent container
function validateData(amount, term, rate, repayment) {
    const amountValue = amount.value.replace(/\D/g, '');
    const termValue = term.value.replace(/\D/g, '');
    const rateValue = rate.value.replace(/[^0-9.]/g, '');

    let isValid = true;

    if (amountValue === '') {
        amount.parentElement.classList.add('error');
        isValid = false
    }

    if (termValue === '') {
        term.parentElement.classList.add('error');
        isValid = false;
    }

    if (rateValue === '') {
        rate.parentElement.classList.add('error');
        isValid = false;
    }

    return isValid;
}

function printData(amount, term, rate, repayment) {

    const monthlyRepayments = document.querySelector('.monthly-repayments');
    const finalAmount = document.querySelector('.final-amount');

    // 

    monthlyRepayments.textContent = '£' + amount;
    finalAmount.textContent = '£' + amount;

    console.log('Amount: ' + amount);
    console.log('Term: ' + term);
    console.log('Rate: ' + rate);
    console.log('Repayment: ' + repayment);

    const monthlyRate = rate / 100 / 12;
    const numberOfPayments = term * 12;
    let monthlyPayment;

    if (repayment === 'repayment') {
        monthlyPayment = amount * monthlyRate / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
    } else if (repayment === 'interest-only') {
        monthlyPayment = amount * monthlyRate;
    }

    console.log('Monthly Payment: ' + monthlyPayment);

    const totalAmount = monthlyPayment * numberOfPayments;
    console.log('Total Amount: ' + totalAmount);

    monthlyRepayments.textContent = '£' + monthlyPayment.toFixed(2);
    finalAmount.textContent = '£' + totalAmount.toFixed(2);

    changeView();
    
}

function changeView() {
    const resultsSection = document.querySelector('.results-section');
    resultsSection.classList.add('finished');

    const emptyResult = document.querySelector('.empty-result');
    emptyResult.classList.add('finished');

    setTimeout(() => {
    const completedResult = document.querySelector('.completed-result');
    completedResult.classList.add('finished');
    }, 300);
}

// remove error class on click to their parent container

const amount = document.getElementById('amount');

amount.addEventListener('click', function () {
    amount.parentElement.classList.remove('error');
});

const term = document.getElementById('term');

term.addEventListener('click', function () {
    term.parentElement.classList.remove('error');
});

const rate = document.getElementById('rate');

rate.addEventListener('click', function () {
    rate.parentElement.classList.remove('error');
});

const repayment = document.querySelector('input[name="mortgage-type"]');
repayment.addEventListener('click', function () {
    const labels = document.querySelectorAll('.radio-label');
    labels.forEach(function (label) {
        label.parentElement.classList.remove('error');
    });
});

//

const reset = document.querySelector('.clear-button');

reset.addEventListener('click', function () {
document.getElementById('amount').value = '';
document.getElementById('term').value = '';
document.getElementById('rate').value = '';


const completedResult = document.querySelector('.completed-result');
completedResult.classList.remove('finished');

const emptyResult = document.querySelector('.empty-result');
emptyResult.classList.remove('finished');

setTimeout(() => {
const resultsSection = document.querySelector('.results-section');
resultsSection.classList.remove('finished');

}, 300);
});