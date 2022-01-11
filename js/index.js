import getUserTokenFromLocalStorage, {
  logOutUser,
  changeRoom,
} from "./loginDetails.js";
import createNewAccount, { refreshToken } from "./userAuth.js";
getUserTokenFromLocalStorage;
import initiateChatRoom, {
  fetchDatabaseMessagesWhenLoad,
  fetchDatabaseMessages,
} from "./initChatRoom.js";
import { sendMessageToDatabase } from "./databaseReq.js";

const createAccBtn = document.querySelector(".auth__button--createaccount");
const loginBtn = document.querySelector(".auth__button--login");
const logoutBtn = document.querySelector(".logout");
const sendBtn = document.querySelector(".chat__sendmessage--btn");
const generalTalkBtn = document.querySelector(".generalBtn");
const sportsRoomBtn = document.querySelector(".sportsBtn");
const programmingRoomBtn = document.querySelector(".programmingBtn");
const chatRoomNameH1 = document.querySelector(".chatroom__name--header");

createAccBtn.addEventListener("click", () => {
  createNewAccount("signup");
});
loginBtn.addEventListener("click", () => {
  createNewAccount("signin");
});
logoutBtn.addEventListener("click", logOutUser);
sendBtn.addEventListener("click", () => {
  // sendMessageToDatabase("general_talk");
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
