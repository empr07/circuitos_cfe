const id_numcirc = localStorage.getItem("id_numcirc") ? localStorage.getItem("id_numcirc") : 0

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


fetch('https://apicfe.onrender.com/api/subestaciones/', {
    headers: {
        'Authorization': 'token ' + localStorage.getItem('token')
    }
})
    .then(response => response.json())
    .then(data => {
        const select = document.getElementById('idsubestacion');

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

if (id_numcirc > 0) {
    fetch("https://apicfe.onrender.com/api/numcircs/" + id_numcirc, {
        headers: {
            'Authorization': 'token ' + localStorage.getItem('token')
        },
    }).then(response => response.json()).then(data => {
        document.getElementById("numero").value = data.numero
        document.getElementById("idarea").value = data.area?.id || ''
        document.getElementById("idsubestacion").value = data.subestacion?.id || ''
        document.getElementById("title").innerHTML = 'Editando número de circuito: ' + data.id
    })

}
else {
    document.getElementById("title").innerHTML = 'Nuevo número de circuito'
    document.getElementById("fecha").value = new Date().toISOString().slice(0, 10)
}



function save() {
    const numero = document.getElementById("numero").value;
    const idarea = document.getElementById("idarea").value
    const idsubestacion = document.getElementById("idsubestacion").value

    fetch(localStorage.getItem("id_numcirc") ? "https://apicfe.onrender.com/api/numcircs/" + localStorage.getItem("id_numcirc") : "https://apicfe.onrender.com/api/numcircs", {
        method: localStorage.getItem("id_numcirc") ? 'PUT' : 'POST',
        mode: "cors",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': 'token ' + localStorage.getItem('token')
        },
        body: JSON.stringify({ numero: numero, idarea: idarea, idsubestacion: idsubestacion }),

    }).then(response => {
        if (response.status == 200 || response.status == 201) {
            window.location.href = "../numcirc.html"
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