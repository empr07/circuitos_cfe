const id_subestacion = localStorage.getItem("id_subestacion") ? localStorage.getItem("id_subestacion") : 0

fetch('https://apicfe.onrender.com/api/areas/', {
    headers: {
        'Authorization': 'token ' + localStorage.getItem('token')
    }
})
    .then(response => response.json())
    .then(data => {
        const select = document.getElementById('idarea');

        // Iterar sobre los datos recibidos y agregarlos al select
        data.forEach(dato => {
            const opcion = document.createElement('option');
            opcion.value = dato.id;
            opcion.text = dato.nombre;
            opcion.selected = false
            select.appendChild(opcion);
        });
    })
    .catch(error => console.error('Error al obtener datos:', error));

if (id_subestacion > 0) {
    fetch("https://apicfe.onrender.com/api/subestaciones/" + id_subestacion, {
        headers: {
            'Authorization': 'token ' + localStorage.getItem('token')
        },
    }).then(response => response.json()).then(data => {
        document.getElementById("nombre").value = data.nombre
        document.getElementById("idarea").value = data.area?.id || ""
        document.getElementById("title").innerHTML = 'Editando Subestación: ' + data.id
    })

}
else {
    document.getElementById("title").innerHTML = 'Nueva Subestación'
    document.getElementById("fecha").value = new Date().toISOString().slice(0, 10)
}



function save() {
    const nombre = document.getElementById("nombre").value;
    const idarea = document.getElementById("idarea").value
    fetch(localStorage.getItem("id_subestacion") ? "https://apicfe.onrender.com/api/subestaciones/" + localStorage.getItem("id_subestacion") : "https://apicfe.onrender.com/api/subestaciones", {
        method: localStorage.getItem("id_subestacion") ? 'PUT' : 'POST',
        mode: "cors",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': 'token ' + localStorage.getItem('token')
        },
        body: JSON.stringify({ nombre: nombre, idarea: idarea }),

    }).then(response => {
        if (response.status == 200 || response.status == 201) {
            window.location.href = "../subestacion.html"
        }
        else if (response.status >= 500) {
            document.getElementById('error').innerHTML = '¡Ocurrió un error, intentalo más tarde!';
        }
        else if (response.status == 422) {
            document.getElementById('error').innerHTML = '¡Completa todos los campos!';
        }
        else if (response.status == 403) {
            window.location.href = "../index.html"
        }
    }) // Analizar la respuesta como JSON
}