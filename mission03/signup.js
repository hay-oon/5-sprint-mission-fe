// HTML 요소 가져오기
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const nicknameInput = document.getElementById("nickname")
const confirmPasswordInput = document.getElementById("confirm-password");
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

  // 닉네임 검사 조건문
  const nicknameError = document.querySelector(".nickname-error");

  if (nicknameInput.value === "") {
    nicknameInput.style.border = "3px solid red";
    nicknameError.textContent = "닉네임을 입력해주세요.";
    nicknameError.style.color = "red";
    isValid = false;
  } else if (nicknameInput.value.length < 3) {
    nicknameInput.style.border = "3px solid red";
    nicknameError.textContent = "닉네임을 2자 이상 입력해주세요.";
    nicknameError.style.color = "red";
    isValid = false;
  } else {
    nicknameInput.style.border = "none";
    nicknameError.textContent = "";
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

  // 비밀번호 확인 검사 조건문
  const confirmPasswordError = document.querySelector(".confirm-password-error");

  if (confirmPasswordInput.value === "") {
    confirmPasswordInput.style.border = "3px solid red";
    confirmPasswordError.textContent = "비밀번호를 다시 한 번 입력해주세요.";
    confirmPasswordError.style.color = "red";
    isValid = false;
  } else if (passwordInput.value !== confirmPasswordInput.value) {
    confirmPasswordInput.style.border = "3px solid red";
    confirmPasswordError.textContent = "비밀번호가 일치하지 않습니다.";
    confirmPasswordError.style.color = "red";
    isValid = false;
  } else {
    confirmPasswordInput.style.border = "none";
    confirmPasswordError.textContent = "";
  }

// 버튼 활성화 및 비활성화 처리
  if (isValid) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}
const USER_DATA = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
  { email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
  { email: 'codeit4@codeit.com', password: "codeit404!" },
  { email: 'codeit5@codeit.com', password: "codeit505!" },
  { email: 'codeit6@codeit.com', password: "codeit606!" },
];

function handleFormSubmit(event) {
  event.preventDefault();

  for (let i = 0; i < USER_DATA.length; i++) {
    const user = USER_DATA[i]
    
    if (user.email === emailInput.value) {
      alert("사용 중인 이메일입니다.");
      return; // 이메일이 존재하면 함수 종료
    }
  }

  // 이메일이 없을 경우
  window.location.href = "/login";
}

// // 폼 제출 이벤트 추가
// function handleFormSubmit(event) {
//   event.preventDefault(); // 기본 동작 중단
//   if (!submitButton.disabled) {
//     // 유효한 값이 있을 경우 이동
//     window.location.href = "/items";
//   }
// }

// 이벤트 리스너
emailInput.addEventListener("input", validateForm);
nicknameInput.addEventListener("input", validateForm);
passwordInput.addEventListener("input", validateForm);
confirmPasswordInput.addEventListener("input", validateForm);
submitButton.addEventListener("click", handleFormSubmit);

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