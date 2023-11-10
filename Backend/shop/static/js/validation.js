function isEmailValid(email) { 
  // Регулярное выражение для валидации email 
  const emailRegex = /^\S+@\S+\.\S+$/; 
  return emailRegex.test(email); 
} 

function isPasswordValid(password) { 
  // Пароль должен содержать минимум 8 символов, хотя бы одну заглавную букву и хотя бы одну цифру 
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/; 
  return passwordRegex.test(password); 
} 

function doPasswordsMatch(password, confirmPassword) { 
  return password === confirmPassword; 
} 

function isNameValid(name) { 
  // Регулярное выражение для проверки имени и фамилии (только буквы) 
  const nameRegex = /^[A-Za-zА-Яа-яЁё]+$/; 
  return nameRegex.test(name); 
} 

function isPhoneNumberValid(phoneNumber) { 
  // Предполагается, что номер телефона должен соответствовать определенному формату 
  // Например, +380XXXXXXXXX 
  const phoneNumberRegex = /^\+380\d{9}$/; 
  return phoneNumberRegex.test(phoneNumber); 
} 
function validateForm(event) { 
  const email = document.getElementById('email'); 
  const password = document.getElementById('password'); 
  const confirmPassword = document.getElementById('confirmPassword'); 
  const firstName = document.getElementById('first_name'); 
  const lastName = document.getElementById('last_name'); 
  const phoneNumber = document.getElementById('phone_number'); 
    
  let isValid = true; 

  // Проверка валидации email 
  function isEmailValid(email) { 
      const emailRegex = /^\S+@\S+\.\S+$/; 
      return emailRegex.test(email); 
  } 

  // Проверка валидации пароля 
  function isPasswordValid(password) { 
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/; 
      return passwordRegex.test(password); 
  } 

  // Проверка совпадения паролей 
  function doPasswordsMatch(password, confirmPassword) { 
      return password === confirmPassword; 
  } 

  // Проверка, что имя и фамилия содержат только буквы 
  function isNameValid(name) { 
      const nameRegex = /^[A-Za-zА-Яа-яЁё]+$/; 
      return nameRegex.test(name); 
  } 

  // Проверка номера телефона Украины 
  function isPhoneNumberValid(phoneNumber) { 
      const phoneNumberRegex = /^\+380\d{9}$/; 
      return phoneNumberRegex.test(phoneNumber); 
  } 

  // Проверка валидации email 
  if (!isEmailValid(email.value)) { 
      document.getElementById('emailError').textContent = 'Некорректный адрес электронной почты'; 
      isValid = false; 
  } else { 
      document.getElementById('emailError').textContent = ''; 
  } 

  // Проверка валидации пароля 
  if (!isPasswordValid(password.value)) { 
      document.getElementById('passwordError').textContent = 'Пароль должен содержать минимум 8 символов, хотя бы одну заглавную букву и хотя бы одну цифру'; 
      isValid = false; 
  } else { 
      document.getElementById('passwordError').textContent = ''; 
  } 

  // Проверка совпадения паролей 
  if (!doPasswordsMatch(password.value, confirmPassword.value)) { 
      document.getElementById('confirmPasswordError').textContent = 'Пароли не совпадают'; 
      isValid = false; 
  } else { 
      document.getElementById('confirmPasswordError').textContent = ''; 
  } 

  // Проверка, что поля не пустые и валидация обязательности 
  if (email.value.trim() === '') { 
      document.getElementById('emailError').textContent = 'Поле почты обязательно для заполнения'; 
      isValid = false; 
  } 

  if (password.value.trim() === '') { 
      document.getElementById('passwordError').textContent = 'Поле пароля обязательно для заполнения'; 
      isValid = false; 
  } 

  if (confirmPassword.value.trim() === '') { 
      document.getElementById('confirmPasswordError').textContent = 'Поле подтверждения пароля обязательно для заполнения'; 
      isValid = false; 
  } 

  // Проверка, что имя и фамилия содержат только буквы и валидация обязательности 
  if (firstName.value.trim() === '') { 
      document.getElementById('firstNameError').textContent = 'Поле имени обязательно для заполнения'; 
      isValid = false; 
  } else if (!isNameValid(firstName.value)) { 
      document.getElementById('firstNameError').textContent = 'Имя должно содержать только буквы'; 
      isValid = false; 
  } else { 
      document.getElementById('firstNameError').textContent = ''; 
  } 

  if (lastName.value.trim() === '') { 
      document.getElementById('lastNameError').textContent = 'Поле фамилии обязательно для заполнения'; 
      isValid = false; 
  } else if (!isNameValid(lastName.value)) { 
      document.getElementById('lastNameError').textContent = 'Фамилия должна содержать только буквы'; 
      isValid = false; 
  } else { 
      document.getElementById('lastNameError').textContent = ''; 
  } 
  
  // Проверка номера телефона Украины и валидация обязательности 
  if (phoneNumber.value.trim() === '') { 
    document.getElementById('phoneNumberError').textContent = 'Поле номера телефона обязательно для заполнения'; 
    isValid = false; 
  } else if (!isPhoneNumberValid(phoneNumber.value)) { 
    document.getElementById('phoneNumberError').textContent = 'Некорректный номер телефона Украины'; 
    isValid = false; 
  } else { 
    document.getElementById('phoneNumberError').textContent = ''; 
  }

  if (!isValid) { 
      event.preventDefault(); // Отменить отправку формы, если есть ошибки 
  } 
}
  
