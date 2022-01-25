import getUserTokenFromLocalStorage, {
  logOutUser,
  changeRoom,
} from "./loginDetails.js";
import createNewAccount, { refreshToken, changeLoginPage } from "./userAuth.js";
getUserTokenFromLocalStorage;
import initiateChatRoom, {
  fetchDatabaseMessagesWhenLoad,
  fetchDatabaseMessages,
} from "./initChatRoom.js";
import { sendMessageToDatabase } from "./databaseReq.js";

import { cleanErrorState } from "./loginErrorHandling.js";

const createAccBtn = document.querySelector(".auth__button--createaccount");
const logoutBtn = document.querySelector(".logout");
const sendBtn = document.querySelector(".chat__sendmessage--btn");
const generalTalkBtn = document.querySelector(".generalBtn");
const sportsRoomBtn = document.querySelector(".sportsBtn");
const programmingRoomBtn = document.querySelector(".programmingBtn");
const chatRoomNameH1 = document.querySelector(".chatroom__name--header");
const loginAncherTag = document.querySelector(".auth__alreadyAccount");

loginAncherTag.addEventListener("click", () => {
  cleanErrorState();
  changeLoginPage();
});

createAccBtn.addEventListener("click", (event) => {
  event.preventDefault();
  createNewAccount(
    createAccBtn.classList.contains("isOnLogin") ? "signin" : "signup"
  );
});

logoutBtn.addEventListener("click", logOutUser);
sendBtn.addEventListener("click", () => {
  sendMessageToDatabase();
});
generalTalkBtn.addEventListener("click", () => {
  changeRoom("general_talk");
});
sportsRoomBtn.addEventListener("click", () => {
  changeRoom("sports");
});
programmingRoomBtn.addEventListener("click", () => {
  changeRoom("programming");
});

chatRoomNameH1.textContent = localStorage.getItem("room");

refreshToken();
fetchDatabaseMessagesWhenLoad();
initiateChatRoom();

setInterval(() => {
  fetchDatabaseMessages();
}, 10000);
