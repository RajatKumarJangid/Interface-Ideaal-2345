const url = "https://interface-ideaal-2345.onrender.com";

const signInBtn = document.getElementById("signIn");
const signIn = document.getElementById("signInBtn");
const signInPass = document.getElementById("signInPass");
const signInEmail = document.getElementById("signInEmail");
const signUp = document.getElementById("signUp");
const signUpBtn = document.getElementById("signUpBtn");
const signUpUserName = document.getElementById("signUpUserName");
const signUpPassword = document.getElementById("signUpPassword");
const signUpEmail = document.getElementById("signUpEmail");
const fistForm = document.getElementById("form1");
const secondForm = document.getElementById("form2");
const container = document.querySelector(".container");

signInBtn.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

signUp.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

function showMessage(wrapper, message, color) {
  const messageContainer = document.createElement("p");
  messageContainer.textContent = message;
  messageContainer.style.color = color;

  wrapper.innerHTML = "";

  wrapper.appendChild(messageContainer);
}

signUpBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const userName = signUpUserName.value;
  const email = signUpEmail.value;
  const pass = signUpPassword.value;
  //   console.log(user, email, pass);

  if (!userName || !pass || !email) {
    console.log("fill all fields");
    showMessage(
      signUpMessageWrapper,
      "Please fill in all required fields.",
      "red"
    );
    return;
  }

  const reqData = {
    userName,
    email,
    pass,
  };

  try {
    const res = await fetch(`${url}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqData),
    });

    if (res.ok) {
      const data = await res.json();
      showMessage(signUpMessageWrapper, data.message, "green");
    } else {
      const err = await res.json();
      showMessage(
        signUpMessageWrapper,
        err.message || "An error occurred.",
        "red"
      );
    }
    console.log(data);
  } catch (error) {
    console.log(error);
    showMessage(
      signUpMessageWrapper,
      "New User Registered",
      "green"
    );
  }
});

signIn.addEventListener("click", async (e) => {
  const email = signInEmail.value;
  const pass = signInPass.value;

  const reqData = {
    email,
    pass,
  };

  try {
    const res = await fetch(`${url}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqData),
    });
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      showMessage(signInpMessageWrapper, "Login successful", "green");
      setTimeout(() => {
        window.location.href = "../createNote.html";
      }, 3000);
    } else {
      const err = await res.json();
      console.log(err);
      showMessage(
        signInpMessageWrapper,
        err.message || "Wrong password or email please check again",
        "red"
      );
    }
  } catch (error) {
    console.log(error);
  }
});

fistForm.addEventListener("submit", (e) => e.preventDefault());
secondForm.addEventListener("submit", (e) => e.preventDefault());
