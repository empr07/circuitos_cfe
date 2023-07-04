const id_usuario = localStorage.getItem("id_usuario") ? localStorage.getItem("id_usuario") : 0
if (id_usuario > 0) {
    fetch("https://apicfe.onrender.com/api/usuarios/" + id_usuario, {
        headers: {
            'Authorization': 'token ' + localStorage.getItem('token')
        },
    }).then(response => response.json()).then(data => {
        document.getElementById("nombre").innerHTML = data.nombres + " " + data.apellido_p + " " + data.apellido_m
        document.getElementById("correo").innerHTML = data.correo
        document.getElementById("puesto").innerHTML = data.puesto
        document.getElementById("tipo").innerHTML = data.esadministrador ? "Administrador" : "Usuario Normal"
        document.getElementById("title").innerHTML = 'Usuario: ' + data.id
    })

}
else {
    window.location.href = "../usuario.html"
}


