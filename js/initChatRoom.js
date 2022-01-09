import getUserTokenFromLocalStorage from "./loginDetails.js";

const chatApp = document.querySelector(".app");
const loginPart = document.querySelector(".auth");

const { email, idToken } = getUserTokenFromLocalStorage();

const initiateChatRoom = () => {
  if (email && idToken) {
    chatApp.classList.remove("hidden");
    loginPart.classList.add("hidden");
  }
  console.log(email);
  console.log(idToken);
};

export default initiateChatRoom;
