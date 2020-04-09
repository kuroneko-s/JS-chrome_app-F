const form = document.querySelector(".js-form");
const greeting = document.querySelector(".js-greetings");
const input = form.querySelector("input");

const USER_LS = "currentUser";
const SHOWING_CN = "showing";

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  //   event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  greeting.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerHTML = `Hello ${text}`;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (!currentUser) {
    askForName();
  } else {
    input.style.display = `none`;
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();
