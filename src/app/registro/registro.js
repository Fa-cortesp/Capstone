document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evitar el comportamiento por defecto del formulario

    const formData = {
        rut: document.getElementById('rut').value
        .replace(/[.\-]/g, '')    // Eliminar puntos y guiones
        .replace(/[^0-9kK]/g, '') // Mantener solo números y la letra k/K
        .toLowerCase(),           // Convertir la letra K a minúscula
        primerNombre: document.getElementById('primer_nombre').value,
        segundoNombre: document.getElementById('segundo_nombre').value,
        apellidoPaterno: document.getElementById('apellido_paterno').value,
        apellidoMaterno: document.getElementById('apellido_materno').value,
        correo: document.getElementById('correo').value,
        telefono: document.getElementById('telefono').value,
        direccion: document.getElementById('direccion').value,
        password: document.getElementById('password').value
    };

    console.log('Datos a enviar:', formData); // Ver datos en la consola

    try {
        const response = await fetch('http://localhost:3000/register', { // Asegúrate de que la URL sea correcta
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            const result = await response.json();
            alert(result.message); // Mostrar el mensaje de error recibido del servidor
            return; // Termina la ejecución si hay un error
        }

        const result = await response.json();
        alert(result.message); // Mostrar mensaje de éxito
    } catch (error) {
        console.error('Error al registrar:', error);
        alert('Hubo un error al registrarse. Intenta nuevamente.');
    }
});
