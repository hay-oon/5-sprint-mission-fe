// HTML 요소 가져오기
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const nicknameInput = document.getElementById("nickname")
const confirmPasswordInput = document.getElementById("confirm-password");
const submitButton = document.querySelector(".submit-button");

// 유효성 검사
function validateForm() {
  let isValid = true;

  // 이메일 검사
  const emailError = document.querySelector(".email-error");
  if (!emailInput.value.includes("@")) {
    emailError.style.color="red";
    emailError.style.display= "block";
    emailError.textContent = "유효한 이메일을 입력해주세요.";
    isValid = false;
  } else {
    emailError.textContent = "";
  }

  // 비밀번호 검사
  const passwordError = document.querySelector(".password-error");
  if (passwordInput.value.length < 8) {
    passwordError.textContent = "비밀번호는 8자 이상이어야 합니다.";
    isValid = false;
  } else {
    passwordError.textContent = "";
  }

  // 비밀번호 확인 검사
  const confirmPasswordError = document.querySelector(".confirm-password-error");
  if (passwordInput.value !== confirmPasswordInput.value) {
    confirmPasswordError.textContent = "비밀번호가 일치하지 않습니다.";
    isValid = false;
  } else {
    confirmPasswordError.textContent = "";
  }

  // 버튼 활성화
  if (isValid) {
    submitButton.classList.add("active");
    submitButton.disabled = false;
  } else {
    submitButton.classList.remove("active");
    submitButton.disabled = true;
  }
}

// 이벤트 리스너
emailInput.addEventListener("input", validateForm);
passwordInput.addEventListener("input", validateForm);
confirmPasswordInput.addEventListener("input", validateForm);




// 비밀번호 보기 토글
const passwordToggle = document.getElementById("password-toggle");
const confirmPasswordToggle = document.getElementById("confirm-password-toggle");

passwordToggle.addEventListener("click", () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    passwordToggle.src = "image/btn_visibility_on_24px.png";
  } else {
    passwordInput.type = "password";
    passwordToggle.src = "image/btn_visibility_off_24px.png";
  }
});

confirmPasswordToggle.addEventListener("click", function () {
  if(confirmPasswordInput.type === "password") {
    confirmPasswordInput.type = "text"
    confirmPasswordToggle.src = "image/btn_visibility_on_24px.png";
  } else {
    confirmPasswordInput.type = "password";
    confirmPasswordToggle.src = "image/btn_visibility_off_24px.png";
  }
});