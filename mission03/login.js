
// 이메일 유효성 검사 함수
function validateEmail(input) {
    const emailValue = input.value.trim();
    const errorMessage = input.nextElementSibling;
  
    if (emailValue === "") {
      input.style.borderColor = "red";
      errorMessage.textContent = "이메일을 입력해주세요.";
      errorMessage.style.display = "block";
      return false;
    }
  
    else if (!emailValue.includes("@") || !emailValue.includes(".")) {
      input.style.borderColor = "red";
      errorMessage.textContent = "잘못된 이메일 형식입니다";
      errorMessage.style.display = "block";
      return false;
    } else {
    input.style.borderColor = "";
    errorMessage.style.display = "none";
    return true;
    }
  }
  
// 비밀번호 유효성 검사 함수
  function validatePassword(input) {
    const passwordValue = input.value.trim();
    const errorMessage = input.nextElementSibling;
  
    if (passwordValue === "") {
      input.style.borderColor = "red";
      errorMessage.textContent = "비밀번호를 입력해주세요.";
      errorMessage.style.display = "block";
      return false;
    } else if (passwordValue.length < 8) {
      input.style.borderColor = "red";
      errorMessage.textContent = "비밀번호를 8자 이상 입력해주세요.";
      errorMessage.style.display = "block";
      return false;
    } else {
      input.style.borderColor = "";
      errorMessage.style.display = "none";
      return true;
    }
  }
  

// HTML 요소 가져오기
  const emailInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const loginButton = document.querySelector(".button");
  const visibilityToggle = document.getElementById("visibility-toggle");

  let passwordVisible = false;
  
  // 비밀번호 토글 버튼 클릭 이벤트
  visibilityToggle.addEventListener("click", (e) => {
    e.preventDefault(); // 클릭 시 입력 필드에 포커스가 이동하지 않도록 방지
    passwordVisible = !passwordVisible;
    if (passwordVisible) {
      passwordInput.type = "text";
      visibilityToggle.src = "/image/btn_visibility_on_24px.png";
    } else {
      passwordInput.type = "password";
      visibilityToggle.src = "/image/btn_visibility_off_24px.png";ßß
    }
  });
// 모든 입력값 유효성 확인 후 로그인 버튼 활성화/비활성화 함수
  function validateLogin() {
    const isEmailValid = validateEmail(emailInput);
    const isPasswordValid = validatePassword(passwordInput);
  
    loginButton.disabled = !(isEmailValid && isPasswordValid);
  }
  
// 이메일 input 이벤트 핸들러
  emailInput.addEventListener("focusout", () => {
    validateEmail(emailInput);
    validateLogin();
  });
  
  emailInput.addEventListener("focus", () => {
    const errorMessage = emailInput.nextElementSibling;
    emailInput.style.borderColor = "";
    errorMessage.style.display = "none";
  });
  
// 비밀번호 input 이벤트 핸들러
  passwordInput.addEventListener("focusout", () => {
    validatePassword(passwordInput);
    validateLogin();
  });
  
  passwordInput.addEventListener("focus", () => {
    const errorMessage = passwordInput.nextElementSibling;
    passwordInput.style.borderColor = "";
    errorMessage.style.display = "none";
  });
  
  // 로그인 버튼 클릭 이벤트 핸들러
  loginButton.addEventListener("click", (event) => {
    event.preventDefault(); // 기본 동작 막기
    if (!loginButton.disabled) {
      window.location.href = "/items"; // 페이지 이동
    }
  });
  
 