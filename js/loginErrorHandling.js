const errorpassdiv = document.querySelector(".errorpassdiv");
const errorEmailDiv = document.querySelector(".erroremaildiv");
const passwordInput = document.querySelector(".create__account--password");
const emailInput = document.querySelector(".create__account--email");

const passwordError = (type = "") => {
  passwordInput.setAttribute("style", "border: 3px solid rgb(197, 90, 90)");
  const errorElement = document.createElement("p");
  const errorText = document.createTextNode(
    type === "wrong_password"
      ? "wrong password"
      : `Invalid Password. Password should be at least 6 characters long`
  );
  errorElement.appendChild(errorText);
  errorpassdiv.appendChild(errorElement);
};

const displayWrongPassword = () => {
  passwordError("wrong_password");
};

const displayWeakPassword = () => {
  passwordError();
};

const emailError = (errorTxt) => {
  emailInput.setAttribute("style", "border: 3px solid rgb(197, 90, 90);");
  const errorElement = document.createElement("p");
  const errorTextContent = errorTxt;
  const errorText = document.createTextNode(errorTextContent);
  errorElement.appendChild(errorText);
  errorEmailDiv.appendChild(errorElement);
};

const displayWrongEmail = () => {
  emailError("email not found, please create a new account");
};

const displayEmailExists = () => {
  emailError("This email already have an account, please sign in");
};

const displayInvalidEmail = () => {
  emailError("This is not a valid Email...");
};

const displayOtherErrors = (errMsg) => {
  const authHeader = document.querySelector(".auth__header");
  const formAuth = document.querySelector(".auth__createaccount");
  formAuth.classList.add("hidden");
  authHeader.textContent = `Ops... Something Went Wrong... ${errMsg}`;
};

export const cleanErrorState = () => {
  emailInput.setAttribute("style", "border: none");
  passwordInput.setAttribute("style", "border: none");
  errorpassdiv.textContent = errorEmailDiv.textContent = "";
};

class InvalidLoginError {
  constructor(error) {
    this.error = error;
  }

  displayError() {
    switch (this.error.message) {
      case "INVALID_PASSWORD":
        displayWrongPassword();
        break;
      case "EMAIL_NOT_FOUND":
        displayWrongEmail();
        break;
      case "EMAIL_EXISTS":
        displayEmailExists();
        break;
      case "WEAK_PASSWORD : Password should be at least 6 characters":
        displayWeakPassword();
        break;
      case "INVALID_EMAIL":
        displayInvalidEmail();
        break;
      default:
        displayOtherErrors(this.error.message);
    }
  }
}

export default InvalidLoginError;
