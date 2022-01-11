import { fetchDatabaseMessages } from "./initChatRoom.js";
import getUserTokenFromLocalStorage from "./loginDetails.js";

const getMessagesDatabase = async () => {
  const { idToken: USER_IDTOKEN, email: USER_EMAIL } =
    getUserTokenFromLocalStorage();

  const DATABASE_NAME = `https://mayer-chat-default-rtdb.europe-west1.firebasedatabase.app/.json?auth=${USER_IDTOKEN}`;

  try {
    const resp = await fetch(DATABASE_NAME, {
      method: "GET",
    });
    const data = await resp.json();
    // console.log(data);
    return data;
  } catch (error) {
    alert(error.message);
    console.log(error);
  }
};

export const sendMessageToDatabase = async () => {
  const inputMessage = document.querySelector(".chat__sendmessage--inp");
  const message = inputMessage.value;
  inputMessage.value = "";
  const { idToken: USER_IDTOKEN, email: USER_EMAIL } =
    getUserTokenFromLocalStorage();

  const DATABASE_NAME = `https://mayer-chat-default-rtdb.europe-west1.firebasedatabase.app/.json?auth=${USER_IDTOKEN}`;

  try {
    const resp = await fetch(DATABASE_NAME, {
      method: "POST",
      body: JSON.stringify({
        room: localStorage.getItem("room"),
        message,
        userName: USER_EMAIL,
      }),
    });
    const data = await resp.json();
    fetchDatabaseMessages();
    // console.log(data);
    return data;
  } catch (error) {
    alert(error.message);
    console.log(error);
  }
};

export default getMessagesDatabase;
