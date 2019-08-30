const userContainer = document.querySelector(".user-container");

function makeGetRequest(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);

    xhr.addEventListener("load", () => {
        const resBody = JSON.parse(xhr.responseText);
        cb(resBody);
    });

    xhr.addEventListener("error", () => {
        alert("error");
    });

    xhr.send();
}

function makePostRequest(url, body, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.addEventListener("load", () => {
        const resBody = JSON.parse(xhr.responseText);
        cb(resBody);
    });

    xhr.setRequestHeader("Content-Type", "multipart/form-data");

    xhr.addEventListener("error", () => {
        alert("error");
    });

    xhr.send(JSON.stringify(body));
}

makeGetRequest("https://jsonplaceholder.typicode.com/users", res => {
    renderUsers(res);
});

function createTemplate(user) {
    return `
    <div>
      <div class="name">
        ${user.name}
      </div>
      <ul class="content hide">
        <li>${user.username}</li>
        <li>${user.email}</li>
        <li>${user.phone}</li>
        <li>${user.website}</li>
      </ul>
  </div>`;
}

function renderUsers(users) {
    let fragment = "";

    users.forEach(user => {
        fragment += createTemplate(user);
    });

    userContainer.insertAdjacentHTML("afterbegin", fragment);
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

form.addEventListener("submit", e => onFormSubmitHandler(e));

function onFormSubmitHandler(e) {
    e.preventDefault();
    // const nameValue = inputName.value;
    // const emailValue = inputEmail.value;
    // const usernameValue = inputUsername.value;
    // const phoneValue = inputPhone.value;
    // const websiteValue = inputWebsite.value;

    let formData = new FormData(userForm);
    console.log(userForm);
    
    for (let [name, value] of formData) {
        if (!value) {
            alert("Заполните все поля");
            return;
        }
    }

    makePostRequest(
        "https://jsonplaceholder.typicode.com/users",
        
            // name: nameValue,
            // email: emailValue,
            // username: usernameValue,
            // phone: phoneValue,
            // website: websiteValue
            formData
        ,
        res => {
            console.log(res);
            userContainer.insertAdjacentHTML("afterbegin", createTemplate(res));
        }
    );
}
