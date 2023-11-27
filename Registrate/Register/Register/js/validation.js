function validateForm() {
  // Get the input values
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  // Reset error messages
  document.getElementById('emailError').textContent = '';
  document.getElementById('passwordError').textContent = '';
  document.getElementById('confirmPasswordError').textContent = '';

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    document.getElementById('emailError').textContent = 'Некоректна адреса електронної пошти';
    return false;
  }

  // Validate password
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!passwordRegex.test(password)) {
    document.getElementById('passwordError').textContent = 'Пароль повинен містити принаймні 8 символів, включаючи принаймні одну велику літеру та одну цифру';
    return false;
  }

  // Validate password confirmation
  if (password !== confirmPassword) {
    document.getElementById('confirmPasswordError').textContent = 'Паролі не співпадають';
    return false;
  }

  return true;
}