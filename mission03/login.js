// HTML 요소 가져오기
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const submitButton = document.querySelector(".submit-button");

//유효성 검사 함수
function validateForm() {
  let isValid = true;

  // 이메일 검사 조건문
  
  const emailError = document.querySelector(".email-error");

  if (emailInput.value === "") {
    emailInput.style.border = "3px solid red";
    emailError.textContent = "이메일을 입력해주세요.";
    emailError.style.color = "red";
    isValid = false;
  } else if (!emailInput.value.includes("@") || !emailInput.value.includes(".")) {
    emailInput.style.border = "3px solid red";
    emailError.textContent = "잘못된 이메일 형식입니다.";
    emailError.style.color = "red";
    isValid = false;
  } else {
    emailInput.style.border = "none";
    emailError.textContent = "";
  }

  // 비밀번호 검사 조건문
  const passwordError = document.querySelector(".password-error");

  if (passwordInput.value === "") {
    passwordInput.style.border = "3px solid red";
    passwordError.textContent = "비밀번호를 입력해주세요.";
    passwordError.style.color = "red";
    isValid = false;
  } else if (passwordInput.value.length < 8) {
    passwordInput.style.border = "3px solid red";
    passwordError.textContent = "비밀번호는 8자 이상이어야 합니다.";
    passwordError.style.color = "red";
    isValid = false;
  } else {
    passwordInput.style.border = "none";
    passwordError.textContent = "";
  }

// 버튼 활성화 및 비활성화 처리
  if (isValid) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}

// 폼 제출 이벤트 추가
function handleFormSubmit(event) {
  event.preventDefault(); // 기본 동작 중단
  if (!submitButton.disabled) {
    // 유효한 값이 있을 경우 이동
    window.location.href = "/items";
  }
}

// 이벤트 리스너
emailInput.addEventListener("input", validateForm);
passwordInput.addEventListener("input", validateForm);
submitButton.addEventListener("click", handleFormSubmit);

// 비밀번호 보기 토글
const passwordToggle = document.getElementById("password-toggle");

passwordToggle.addEventListener("click", () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    passwordToggle.src = "image/btn_visibility_on_24px.png";
  } else {
    passwordInput.type = "password";
    passwordToggle.src = "image/btn_visibility_off_24px.png";
  }
});