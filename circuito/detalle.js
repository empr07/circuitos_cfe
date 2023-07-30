const id_circuito = localStorage.getItem("id_circuito") ? localStorage.getItem("id_circuito") : 0
if (id_circuito > 0) {
    fetch("https://apicfe.onrender.com/api/circuitos/" + id_circuito, {
        headers: {
            'Authorization': 'token ' + localStorage.getItem('token')
        },
    }).then(response => response.json()).then(data => {
        document.getElementById("nombre").innerHTML = data.nombre
        document.getElementById("idarea").innerHTML = data.area?.nombre || 'Eliminada'
        document.getElementById("idsubestacion").innerHTML = data.subestacion?.nombre || 'Eliminada'
        document.getElementById("idnumcirc").innerHTML = data.numcirc?.numero || 'Eliminado'
        document.getElementById("imagen").src = data.diagrama
        document.getElementById("title").innerHTML = 'Circuito: ' + data.id
    })

}
else {
    window.location.href = "../circuito.html"
}


