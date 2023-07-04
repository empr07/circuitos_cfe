const id_subestacion = localStorage.getItem("id_subestacion") ? localStorage.getItem("id_subestacion") : 0
if (id_subestacion > 0) {
    fetch("https://apicfe.onrender.com/api/subestaciones/" + id_subestacion, {
        headers: {
            'Authorization': 'token ' + localStorage.getItem('token')
        },
    }).then(response => response.json()).then(data => {
        document.getElementById("nombre").innerHTML = data.nombre
        document.getElementById("area").innerHTML = data.area.nombre
        document.getElementById("title").innerHTML = 'Subestación: ' + data.id
    })

}
else {
    window.location.href = "../subestacion.html"
}


