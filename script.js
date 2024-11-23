
document.getElementById('form').addEventListener('submit', submitForm);

const elemToFilter = document.querySelectorAll('.fade');

const success_message = document.querySelector('.success-message');
const email_error = document.querySelector('.email-error');
const password_error = document.querySelector('.password-error');
let chars = 'abcdefghijklmnopqrstuvwxyz';
let charsSet = new Set(chars);

const submit_btn = document.querySelector('.submit');
// submit_btn.setAttribute('disabled', true);

const email = document.getElementById('email')
email.addEventListener('input', checkEmail);

const password = document.getElementById('password')
password.addEventListener('input', checkPassword);

let isEmailCorrect = false;
let isPasswordCorrect = false;

function checkEmail(event) {
    let countChars = 0;
    const email = event.target.value;
    if(email.length >= 5) {
        for(let i=0; i<email.length; i++) {
            if(charsSet.has(email[i])) {
                countChars++;
            }
        }
    } else {
        inCorrectEmail();
    }

    if(countChars > 3) {
        if(email.includes('@') && email.includes('.')) {
            correctEmail();
        }
        else {
            inCorrectEmail();
        }
    }

    if(isEmailCorrect) {
        correctEmail();
    } else {
        inCorrectEmail();
    }

    // for handling button's diabled state
    checkEmail_Password();
}



function checkPassword(event) {
    const value = event.target.value;

    if(value.length > 8) {
        correctPassword();
    } else {
        InCorrectPassword();
    }
    
    // for handling button's diabled state
    checkEmail_Password();
}


function inCorrectEmail() {
    isEmailCorrect = false;
    email_error.innerText = 'Make sure email is more than 3 characters and has @ and a .'
    success_message.innerHTML = null;
}

function correctEmail() {
    isEmailCorrect = true;
    email_error.innerHTML = null;
}


function InCorrectPassword() {
    password_error.innerText = 'Make sure password is more than 8 characters.';
    isPasswordCorrect = false;
    success_message.innerHTML = null;
}

function correctPassword() {
    password_error.innerHTML = null;
    isPasswordCorrect = true;
}


function checkEmail_Password() {
    if(isEmailCorrect && isPasswordCorrect) {
        submit_btn.removeAttribute('disabled');
        submit_btn.classList.remove('submit-disabled');

        success_message.innerText = 'All good to go!';
    } else {
        submit_btn.setAttribute('disabled', true);
        submit_btn.classList.add('submit-disabled');

        success_message.innerHTML = null;
    }
}



function submitForm(e) {
    e.preventDefault();

    const popup = document.querySelector('.popup');
    popup.classList.add('open-popup');

    elemToFilter.forEach((el) => {
        el.style.filter = 'blur(10px)';
    })

    document.querySelector('.proceed').addEventListener('click', () => {
        alert('successful signup!');
    })
    
    document.querySelector('.cancel').addEventListener('click', () => {
        popup.style.display = 'none';
        popup.classList.remove('open-popup');

        const email = document.getElementById('email');
        email.value = null;
        const password = document.getElementById('password');
        password.value = null;

        isEmailCorrect = false;
        isPasswordCorrect = false;
        checkEmail_Password();
        popup.style.display = 'flex';

        elemToFilter.forEach((el) => {
            el.style.filter = 'blur(0)';
        })
    })
}