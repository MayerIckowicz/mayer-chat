import {
  setTokenLocalStorage,
  setNewTokenFromExpiredOne,
} from "./loginDetails.js";

// import getMessagesDatabase from "./databaseReq.js";
// import initiateChatRoom from "./initChatRoom.js";
// import getUserTokenFromLocalStorage from "./loginDetails.js";

const emailInput = document.querySelector(".create__account--email");
const passwordInput = document.querySelector(".create__account--password");

const API_KEY = "AIzaSyCdyyWO_PjpxivDxgXbhUWi5SDT9nXkdWI";

const SIGNUP_EMAIL_ENDPOINT = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;

const LOGIN_EMAIL_ENDPOINT = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

const EXCHANGETOKEN_ENDPOINT = `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`;

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
    // window.addEventListener("load", (event) => {
    //   getMessagesDatabase();
    // });
  } catch (error) {
    console.log(error);
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
    console.log(error);
  }
  location.reload();
};

export default createNewAccount;
