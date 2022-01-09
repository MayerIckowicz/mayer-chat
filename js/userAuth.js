import { setTokenLocalStorage } from "./loginDetails.js";

const emailInput = document.querySelector(".create__account--email");
const passwordInput = document.querySelector(".create__account--password");

const API_KEY = "AIzaSyCdyyWO_PjpxivDxgXbhUWi5SDT9nXkdWI";

const SIGNUP_EMAIL_ENDPOINT = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;

const LOGIN_EMAIL_ENDPOINT = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

const checkEmailPassValid = () => {
  if (
    emailInput.value.includes("@") &&
    emailInput.value.length >= 5 &&
    passwordInput.value.length >= 6
  ) {
    return true;
  } else {
    return false;
  }
};

const accountCreatedHandler = () => {
  emailInput.value = passwordInput.value = "";
  alert("your account was created");
};

const createNewAccount = async (arg) => {
  const isValid = checkEmailPassValid();
  if (!isValid) {
    alert(
      "Invalid Password or email, please make sure your password have 6 or more characters"
    );
    return;
  }

  //check if is signin or signup
  let ENDPOINT = "";
  arg === "signin"
    ? (ENDPOINT = LOGIN_EMAIL_ENDPOINT)
    : (ENDPOINT = SIGNUP_EMAIL_ENDPOINT);

  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      body: JSON.stringify({
        email: emailInput.value,
        password: passwordInput.value,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      console.log(response);
      const data = await response.json();
      alert(data.error.message);
      console.log(data.error.message);
      throw new Error();
    }
    arg === "signup" && accountCreatedHandler();
    const data = await response.json();
    console.log(data);
    setTokenLocalStorage(data);
    location.reload();
  } catch (error) {
    console.log(error);
  }
};

export default createNewAccount;
