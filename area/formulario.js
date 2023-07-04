const id_areas = localStorage.getItem("id_areas") ? localStorage.getItem("id_areas") : 0
if (id_areas > 0) {
    fetch("https://apicfe.onrender.com/api/areas/" + id_areas, {
        headers: {
            'Authorization': 'token ' + localStorage.getItem('token')
        },
    }).then(response => response.json()).then(data => {
        document.getElementById("nombre").value = data.nombre
        document.getElementById("title").innerHTML = 'Editando Area: ' + data.id
    })

}
else {
    document.getElementById("title").innerHTML = 'Nueva Area'
    document.getElementById("fecha").value = new Date().toISOString().slice(0, 10)
}


function create() {

}

function save() {
    const nombre = document.getElementById("nombre").value;
    fetch(localStorage.getItem("id_areas") ? "https://apicfe.onrender.com/api/areas/" + localStorage.getItem("id_areas") : "https://apicfe.onrender.com/api/areas", {
        method: localStorage.getItem("id_areas") ? 'PUT' : 'POST',
        mode: "cors",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': 'token ' + localStorage.getItem('token')
        },
        body: JSON.stringify({ nombre: nombre }),

    }).then(response => {
        if (response.status == 200 || response.status == 201) {
            window.location.href = "../areas.html"
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