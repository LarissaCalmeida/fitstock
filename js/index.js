const hasUser = () => {
  const user = localStorage.getItem("username");

  if (user) {
    redirectUser();
  }
};

const redirectUser = () => {
  window.location.href = `/dashboard.html`;
};

const removeScreenLoad = () => {
  const screenLoad = document.querySelector(".load-screen");
  console.log(screenLoad);
  screenLoad.style.display = "none";
};

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    hasUser();
  }, 1000);

  setTimeout(() => {
    removeScreenLoad();
  }, 2000);
});

const loadUser = () => {
  const username = document.querySelector("#username");
  if (!username) {
    return;
  }

  localStorage.setItem("username", username.value);
  redirectUser();
};
