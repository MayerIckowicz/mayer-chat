import {
  setTokenLocalStorage,
  setNewTokenFromExpiredOne,
} from "./loginDetails.js";

import InvalidLoginError, { cleanErrorState } from "./loginErrorHandling.js";

const emailInput = document.querySelector(".create__account--email");
const passwordInput = document.querySelector(".create__account--password");
const createAccBtn = document.querySelector(".auth__button--createaccount");
const loginAncherTag = document.querySelector(".auth__alreadyAccount");

const API_KEY = "AIzaSyCdyyWO_PjpxivDxgXbhUWi5SDT9nXkdWI";

const SIGNUP_EMAIL_ENDPOINT = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;

const LOGIN_EMAIL_ENDPOINT = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

const EXCHANGETOKEN_ENDPOINT = `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`;

let isInErrorState = false;

export const changeLoginPage = () => {
  if (!createAccBtn.classList.contains("isOnLogin")) {
    createAccBtn.textContent = "Log In";
    loginAncherTag.textContent = "Still don't have an account, SignUp";
    createAccBtn.classList.add("isOnLogin");
  } else {
    createAccBtn.textContent = "Create Account";
    loginAncherTag.textContent = "Already Have an Account, SignIn";
    createAccBtn.classList.remove("isOnLogin");
  }
};

const accountCreatedHandler = () => {
  emailInput.value = passwordInput.value = "";
  alert("your account was created");
};

const createNewAccount = async (arg) => {
  //check if is signin or signup
  let ENDPOINT = "";

  ENDPOINT = arg === "signin" ? LOGIN_EMAIL_ENDPOINT : SIGNUP_EMAIL_ENDPOINT;
  isInErrorState && cleanErrorState();

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
      console.log(response.message);
      const data = await response.json();
      console.log(data.error.message);
      throw new Error(data.error.message);
    }
    arg === "signup" && accountCreatedHandler();
    const data = await response.json();
    console.log(data);
    setTokenLocalStorage(data);
    location.reload();
    // window.addEventListener("load", (event) => {
    //   getMessagesDatabase();
    // });
  } catch (error) {
    console.log(error);
    const newError = new InvalidLoginError(error);
    newError.displayError();
    isInErrorState = true;
  }
};

export const refreshToken = async () => {
  const validTokenTime = localStorage.getItem("timeToken");

  const hourNow = new Date().getTime();

  const minutesPassed = Math.trunc(hourNow - validTokenTime) / 60000;

  if (minutesPassed < 59) {
    return;
  }
  try {
    const resp = await fetch(EXCHANGETOKEN_ENDPOINT, {
      method: "POST",
      body:
        "grant_type=refresh_token&refresh_token=" +
        localStorage.getItem("refreshToken"),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    const data = await resp.json();
    console.log(data);
    setNewTokenFromExpiredOne(data);
  } catch (error) {
    alert(error.message);
    // alert("failed to fetch is comming from here(test purposes");
    // location.reload();
    console.log(error);
  }
  location.reload();
};

export default createNewAccount;
