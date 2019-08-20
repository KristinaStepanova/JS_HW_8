const userContainer = document.querySelector(".user-container");

function makeGetRequest(method, url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.addEventListener("load", () => {
        const resBody = JSON.parse(xhr.responseText);
        cb(resBody);
    });
    xhr.send();
}

function makePostRequest(method, url, body, cb) {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.addEventListener('load', () => {
        const resBody = JSON.parse(xhr.responseText);
        cb(resBody);
    });
    xhr.send(JSON.stringify(body));
}

makeGetRequest("GET", "https://jsonplaceholder.typicode.com/users", res => {
    renderUsers(res);
});

function renderUsers(users) {
    users.forEach(user => {
        const fragment = document.createDocumentFragment();
        const div = document.createElement("div");
        const name = document.createElement("div");
        const content = document.createElement("ul");
        const username = document.createElement("li");
        const email = document.createElement("li");
        const phone = document.createElement("li");
        const website = document.createElement("li");
        name.textContent = user.name;
        name.classList.add("name");
        username.textContent = user.username;
        email.textContent = user.email;
        phone.textContent = user.phone;
        website.textContent = user.website;
        content.classList.add("hide");
        content.appendChild(username);
        content.appendChild(email);
        content.appendChild(phone);
        content.appendChild(website);
        div.appendChild(name);
        div.appendChild(content);
        fragment.appendChild(div);
        userContainer.appendChild(fragment);
    });
}

userContainer.addEventListener("click", toggleUserBody);

function toggleUserBody(e) {
    const { target } = e;
    const userBody = target.nextElementSibling;
    userBody.classList.toggle("hide");
    userBody.classList.toggle("show");
}

const form = document.forms["addUser"];
const inputName = form.elements["name"];
const inputEmail = form.elements["email"];
const inputUsername = form.elements["username"];
const inputPhone = form.elements["phone"];
const inputWebsite = form.elements["website"];

form.addEventListener("submit", onFormSubmitHandler);

function onFormSubmitHandler() {
    const nameValue = inputName.value;
    const emailValue = inputEmail.value;
    const usernameValue = inputUsername.value;
    const phoneValue = inputPhone.value;
    const websiteValue = inputWebsite.value;

    if (
        !nameValue ||
        !emailValue ||
        !usernameValue ||
        !phoneValue ||
        !websiteValue
    ) {
        alert("Заполните все поля");
        return;
    }

    makePostRequest("POST", "https://jsonplaceholder.typicode.com/users", {
        name: nameValue,
        email: emailValue,
        username: usernameValue,
        phone: phoneValue,
        website: websiteValue
    },
        res => {
            //renderUsers(res);
            console.log(res);
        }
    );
}
