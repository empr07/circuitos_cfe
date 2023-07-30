const id_numcirc = localStorage.getItem("id_numcirc") ? localStorage.getItem("id_numcirc") : 0
if (id_numcirc > 0) {
    fetch("https://apicfe.onrender.com/api/numcircs/" + id_numcirc, {
        headers: {
            'Authorization': 'token ' + localStorage.getItem('token')
        },
    }).then(response => response.json()).then(data => {
        document.getElementById("numero").innerHTML = data.numero
        document.getElementById("area").innerHTML = data.area?.nombre || 'Eliminada'
        document.getElementById("subestacion").innerHTML = data.subestacion?.nombre || 'Eliminada'
        document.getElementById("title").innerHTML = 'Número de Circuito: ' + data.id
    })

}
else {
    window.location.href = "../numcirc.html"
}


