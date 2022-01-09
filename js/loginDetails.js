const localStorage = window.localStorage;

const getUserTokenFromLocalStorage = () => {
  return {
    idToken: localStorage.getItem("idToken"),
    email: localStorage.getItem("email"),
  };
};

export const setTokenLocalStorage = (dataObject) => {
  localStorage.setItem("idToken", dataObject.idToken);
  localStorage.setItem("email", dataObject.email);
};

export default getUserTokenFromLocalStorage;
