import getUserTokenFromLocalStorage from "./loginDetails.js";
import getMessagesDatabase from "./databaseReq.js";

const chatApp = document.querySelector(".app");
const loginPart = document.querySelector(".auth");
const chatDiv = document.querySelector(".chat__messages");

const { email, idToken } = getUserTokenFromLocalStorage();

const initiateChatRoom = () => {
  if (email && idToken) {
    chatApp.classList.remove("hidden");
    loginPart.classList.add("hidden");
  }
  // console.log(email);
  // console.log(idToken);
};

const createAndAppendMessageNodes = (element, displayRightorLeft, room) => {
  const message = document.createElement("p");
  message.innerText = element;
  message.classList.add("chat__message--item");
  message.classList.add(`chat__messages--${displayRightorLeft}`);
  chatDiv.appendChild(message);
  chatDiv.scrollTop = chatDiv.scrollHeight;
  // console.log(email.split("@")[0]);
};

const displayedMessagesKeys = [];
const isMessageAlreadyDisplayed = (messageKey, messageContent) => {
  if (!displayedMessagesKeys.includes(messageKey)) {
    createAndAppendMessageNodes(
      messageContent.message,
      messageContent.userName === email ? "user" : "out"
    );
    return displayedMessagesKeys.push(messageKey);
  }
};

const displayMessages = async (messData) => {
  const resp = await messData;
  const messagesArray = Object.entries(resp);
  console.log(messagesArray);
  messagesArray.map((el) => {
    // console.log(el[1].room);
    el[1].room === localStorage.getItem("room") &&
      isMessageAlreadyDisplayed(el[0], el[1]);
  });
  // console.log(displayedMessagesKeys);
};

export const fetchDatabaseMessagesWhenLoad = () => {
  if (!email || !idToken) return;
  window.addEventListener("load", (event) => {
    const data = getMessagesDatabase();
    displayMessages(data);
  });
};

export const fetchDatabaseMessages = () => {
  if (!email || !idToken) return;
  const data = getMessagesDatabase();
  displayMessages(data);
};

export default initiateChatRoom;
