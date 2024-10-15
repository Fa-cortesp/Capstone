document.addEventListener('DOMContentLoaded', () => {
    const usuariosTable = document.getElementById('usuariosTable').getElementsByTagName('tbody')[0];
    const rolesMap = {}; // Mapa para almacenar los roles
    const estadosMap = {}; // Mapa para almacenar los estados

    const refreshTable = async () => {
        try {
            const response = await fetch('/api/usuarios');
            const usuarios = await response.json();
            usuariosTable.innerHTML = ''; // Limpiar la tabla

            usuarios.forEach(usuario => {
                const row = usuariosTable.insertRow();
                row.insertCell(0).textContent = usuario.rut;
                row.insertCell(1).textContent = usuario.primer_nombre;
                row.insertCell(2).textContent = usuario.segundo_nombre;
                row.insertCell(3).textContent = usuario.apellido_paterno;
                row.insertCell(4).textContent = usuario.apellido_materno; // Agregar apellido materno
                row.insertCell(5).textContent = usuario.correo;
                row.insertCell(6).textContent = usuario.telefono;

                // Celda de rol
                const rolCell = row.insertCell(7);
                const rolSelect = document.createElement('select');
                rolSelect.id = `rolSelect_${usuario.rut}`; // Asignar un ID único

                // Llenar los roles en el desplegable
                for (const [id, desc] of Object.entries(rolesMap)) {
                    const option = document.createElement('option');
                    option.value = id;
                    option.textContent = desc;
                    rolSelect.appendChild(option);
                }

                rolSelect.value = usuario.id_rol; // Establecer el rol actual
                rolCell.appendChild(rolSelect);

                // Celda de estado
                const estadoCell = row.insertCell(8);
                const estadoSelect = document.createElement('select');
                estadoSelect.id = `estadoSelect_${usuario.rut}`; // Asignar un ID único

                // Llenar los estados en el desplegable
                for (const [id, desc] of Object.entries(estadosMap)) {
                    const option = document.createElement('option');
                    option.value = id;
                    option.textContent = desc;
                    estadoSelect.appendChild(option);
                }

                estadoSelect.value = usuario.id_estadousuario; // Establecer el estado actual
                estadoCell.appendChild(estadoSelect);

                // Botón de submit
                const actionsCell = row.insertCell(9);
                const submitButton = document.createElement('button');
                submitButton.textContent = 'Actualizar';
                submitButton.onclick = () => submitChanges(usuario.rut);
                actionsCell.appendChild(submitButton);
            });
        } catch (error) {
            console.error('Error al cargar los usuarios:', error);
        }
    };

    const loadRoles = async () => {
        try {
            const response = await fetch('/api/roles');
            const roles = await response.json();
            roles.forEach(role => {
                rolesMap[role.id_rol] = role.descripcion_rol; // Ajusta según la estructura de tu tabla de roles
            });
            refreshTable(); // Llama a refreshTable después de cargar roles
        } catch (error) {
            console.error('Error al cargar roles:', error);
        }
    };

    const loadEstados = async () => {
        try {
            const response = await fetch('/api/estados');
            const estados = await response.json();
            estados.forEach(estado => {
                estadosMap[estado.id_estadousuario] = estado.desc_estadousuario; // Ajusta según la estructura de tu tabla de estados
            });
            refreshTable(); // Llama a refreshTable después de cargar estados
        } catch (error) {
            console.error('Error al cargar estados:', error);
        }
    };

    const submitChanges = async (rut) => {
        const rol = document.getElementById(`rolSelect_${rut}`).value;
        const estado = document.getElementById(`estadoSelect_${rut}`).value;

        try {
            await Promise.all([
                fetch(`/api/usuarios/${rut}/rol`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id_rol: rol })
                }),
                fetch(`/api/usuarios/${rut}/estado`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id_estadousuario: estado })
                })
            ]);
            alert('Cambios actualizados con éxito.');
            refreshTable(); // Actualizar la tabla después de la actualización
        } catch (error) {
            console.error('Error al actualizar:', error);
            alert('Error al actualizar los datos.');
        }
    };

    document.getElementById('refreshButton').addEventListener('click', refreshTable);

    // Cargar roles y estados al inicio
    loadRoles();
    loadEstados();
});
