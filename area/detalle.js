const id_areas = localStorage.getItem("id_areas") ? localStorage.getItem("id_areas") : 0
if (id_areas > 0) {
    fetch("https://apicfe.onrender.com/api/areas/" + id_areas, {
        headers: {
            'Authorization': 'token ' + localStorage.getItem('token')
        },
    }).then(response => response.json()).then(data => {
        document.getElementById("nombre").innerHTML = data.nombre
        document.getElementById("title").innerHTML = 'Área: ' + data.id
    })

}
else {
    window.location.href = "../areas.html"
}


