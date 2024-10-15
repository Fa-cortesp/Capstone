document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const correoInput = document.getElementById("correo");
    const passwordInput = document.getElementById("password");
    const loginButton = document.getElementById("loginButton");
  
    // Verifica si el formulario es válido
    function checkFormValidity() {
      const isValid = correoInput.value.trim() !== '' && passwordInput.value.trim() !== '';
      loginButton.disabled = !isValid; // Habilitar o deshabilitar el botón
    }
  
    // Agregar eventos para verificar la validez de los campos
    correoInput.addEventListener("input", checkFormValidity);
    passwordInput.addEventListener("input", checkFormValidity);
  
    // Manejar el envío del formulario
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Evitar el envío del formulario
  
      // Aquí iría la lógica para manejar el inicio de sesión
      const loginData = {
        correo: correoInput.value,
        password: passwordInput.value
      };
  
      // Aquí puedes hacer la solicitud al servidor, por ejemplo:
      fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      })
      .then(response => {
        if (response.ok) {
          // Si el inicio de sesión es válido, redirigir a index2.html
          window.location.href = "../index2.html"; // Redirigir a index2.html
        } else {
          // Manejar errores de inicio de sesión (por ejemplo, mostrar un mensaje)
          console.error('Inicio de sesión fallido');
          alert("Correo o contraseña incorrectos");
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
    });
  });
  