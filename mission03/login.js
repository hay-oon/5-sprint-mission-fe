// HTML 요소 가져오기
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const submitButton = document.querySelector(".submit-button");

// 유효성 검사 함수
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

const USER_DATA = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
  { email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
  { email: 'codeit4@codeit.com', password: "codeit404!" },
  { email: 'codeit5@codeit.com', password: "codeit505!" },
  { email: 'codeit6@codeit.com', password: "codeit606!" },
];

function handleFormSubmit(event) {
  event.preventDefault(); // 기본 폼 제출 방지

  for (let i = 0; i < USER_DATA.length; i++) {
    const user = USER_DATA[i];

    if (user.email === emailInput.value) {
      if (user.password === passwordInput.value) {
        window.location.href = "/items";
        return; // 성공하면 함수 종료
      } else {
        alert("비밀번호가 일치하지 않습니다.");
        return; // 비밀번호가 틀리면 함수 종료
      }
    }
  }

  // 이메일이 없을 경우
  alert("이메일이 존재하지 않습니다.");
}

// // 폼 제출 이벤트 함수
// function handleFormSubmit(event) {
//   event.preventDefault(); // 기본 폼 제출 방지
  
// // 데이터 확인을 위한 플래그
// let userFound = false;
// let passwordMatch = false;

//   // USER_DATA 배열 순회
//   for (let i = 0; i < USER_DATA.length; i++) {
//       const user = USER_DATA[i];
//     if (user.email === emailInput.value) {
//         userFound = true; // 이메일이 데이터베이스에 존재함
//         if (user.password === passwordInput.value) {
//             passwordMatch = true; // 비밀번호도 일치함
//             break;  // break를 안써주면 alert("비밀번호가 일치하지 않습니다.") 조건문에서 계속 작동
//           }
//       }    
//     }


//   // 조건에 따른 메시지 출력
//   if (!userFound) {
//       alert("이메일이 존재하지 않습니다.");
//   } else if (!passwordMatch) {
//       alert("비밀번호가 일치하지 않습니다.");
//   } else {
//       alert("로그인 성공!");
//       window.location.href = "/items"; // /items로 이동
//   }
// }


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