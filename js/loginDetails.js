const localStorage = window.localStorage;

const getUserTokenFromLocalStorage = () => {
  return {
    idToken: localStorage.getItem("idToken"),
    email: localStorage.getItem("email"),
  };
};

export const setTokenLocalStorage = (dataObject) => {
  localStorage.setItem("idToken", dataObject.idToken);
  localStorage.setItem("refreshToken", dataObject.refreshToken);
  localStorage.setItem("email", dataObject.email);
  localStorage.setItem("timeToken", new Date().getTime());
  localStorage.setItem("room", "general_talk");
};

export const setNewTokenFromExpiredOne = (data) => {
  localStorage.setItem("access_token", data.access_token);
  localStorage.setItem("timeToken", new Date().getTime());
  localStorage.setItem("refreshToken", data.refresh_token);
  localStorage.setItem("idToken", data.id_token);
};

export const changeRoom = (roomName) => {
  localStorage.setItem("room", roomName);
  location.reload();
};

export const logOutUser = () => {
  localStorage.clear();
  location.reload();
};

export default getUserTokenFromLocalStorage;
