const id_usuario = localStorage.getItem("id_usuario") ? localStorage.getItem("id_usuario") : 0

if (id_usuario > 0) {
    fetch("https://apicfe.onrender.com/api/usuarios/" + id_usuario, {
        headers: {
            'Authorization': 'token ' + localStorage.getItem('token')
        },
    }).then(response => response.json()).then(data => {
        document.getElementById("nombre").value = data.nombres
        document.getElementById("apellido_p").value = data.apellido_p
        document.getElementById("apellido_m").value = data.apellido_m
        document.getElementById("correo").value = data.correo
        document.getElementById("contraseña").value = data.contraseña
        document.getElementById("puesto").value = data.puesto
        document.getElementById("esadministrador").value = data.esadministrador ? 1 : 0
        document.getElementById("title").innerHTML = 'Editando Usuario: ' + data.id
    })

}
else {
    document.getElementById("title").innerHTML = 'Nuevo Usuario'
    document.getElementById("fecha").value = new Date().toISOString().slice(0, 10)
}



function save() {
    const nombres = document.getElementById("nombre").value;
    const apellido_p = document.getElementById("apellido_p").value;
    const apellido_m = document.getElementById("apellido_m").value;
    const correo = document.getElementById("correo").value;
    const contraseña = document.getElementById("contraseña").value;
    const puesto = document.getElementById("puesto").value;
    const esadministrador = document.getElementById("esadministrador").value == '1' ? true : false ;

    fetch(localStorage.getItem("id_usuario") ? "https://apicfe.onrender.com/api/usuarios/" + localStorage.getItem("id_usuario") : "https://apicfe.onrender.com/api/auth/register", {
        method: localStorage.getItem("id_usuario") ? 'PUT' : 'POST',
        mode: "cors",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': 'token ' + localStorage.getItem('token')
        },
        body: JSON.stringify({
            nombres: nombres,
            apellido_p: apellido_p,
            apellido_m: apellido_m,
            correo: correo,
            contraseña: contraseña,
            puesto: puesto,
            esadministrador: esadministrador
        }),

    }).then(response => {
        if (response.status == 200 || response.status == 201) {
            window.location.href = "../usuario.html"
        }
        else if (response.status >= 500) {
            document.getElementById('error').innerHTML = '¡Ocurrió un error, intentalo más tarde!';
        }
        else if (response.status == 422) {
            document.getElementById('error').innerHTML = '¡Completa todos los campos!';
        }
        else if (response.status == 409) {
            document.getElementById('error').innerHTML = '¡Ya existe un usuario con ese correo!';
        }
        else if (response.status == 403) {
            window.location.href = "../index.html"
        }
    }) // Analizar la respuesta como JSON
}