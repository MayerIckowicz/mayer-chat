import getUserTokenFromLocalStorage from "./loginDetails.js";
import createNewAccount from "./userAuth.js";
getUserTokenFromLocalStorage;
import initiateChatRoom from "./initChatRoom.js";

const createAccBtn = document.querySelector(".auth__button--createaccount");
const loginBtn = document.querySelector(".auth__button--login");

createAccBtn.addEventListener("click", () => {
  createNewAccount("signup");
});
loginBtn.addEventListener("click", () => {
  createNewAccount("signin");
});

initiateChatRoom();
