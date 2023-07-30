function onFileSelected() {
    var fileInput = document.getElementById('diagrama');

    if (fileInput.files && fileInput.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            const image = document.getElementById('image');
            image.src = e.target.result;
        };

        reader.readAsDataURL(fileInput.files[0]);
    }
}





const id_circuito = localStorage.getItem("id_circuito") ? localStorage.getItem("id_circuito") : 0

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

fetch('https://apicfe.onrender.com/api/numcircs/', {
    headers: {
        'Authorization': 'token ' + localStorage.getItem('token')
    }
})
    .then(response => response.json())
    .then(data => {
        const select = document.getElementById('idnumcirc');

        // Iterar sobre los datos recibidos y agregarlos al select
        data.forEach(dato => {
            const opcion = document.createElement('option');
            opcion.value = dato.id;
            opcion.text = dato.numero;
            opcion.selected = false
            select.appendChild(opcion);
        });
    })
    .catch(error => console.error('Error al obtener datos:', error));

let ubicaciones = []
const divUbicaciones = document.getElementById("div-ubicaciones")
let lastUbicacion = {}
let lastId = 0

function renderUbications() {
    divUbicaciones.innerHTML = ''
    if (ubicaciones.length) {
        ubicaciones.forEach(ubicacion => {
            divUbicaciones.innerHTML = divUbicaciones.innerHTML + `
            
            <div class="col-md-6 mt-3">
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h6 class="card-title">
                            ${ubicacion.cuchilla}
                        </h6>
                        <div class="d-flex">
                            <a onclick="saveUbication(${ubicacion.id})" class="btn btn-outline-primary p-1 m-1" title="Eliminar">
                                <i class="fa fa-brands fa-save p-1"></i>
                            </a>
                            <a onclick="deleteUbication(${ubicacion.id})" class="btn btn-outline-danger p-1 m-1" title="Eliminar">
                                <i class="fa fa-brands fa-trash p-1"></i>
                            </a>
                            
                        </div>
                        
                    </div>
                    <div class="card-body">
                        <div class="row">

                            <div class="form-group mt-3 col-md-6 col-12">
                                <label for="cuchilla${ubicacion.id}">Cuchilla</label>
                                <input type="text" class="form-control mt-2" id="cuchilla${ubicacion.id}" required value="${ubicacion.cuchilla}">
                            </div>

                            <div class="form-group mt-3 col-md-6 col-12">
                                <label for="tipo${ubicacion.id}">Tipo</label>
                                <input type="text" class="form-control mt-2" id="tipo${ubicacion.id}" required value="${ubicacion.tipo}">
                            </div>

                            <div class="form-group mt-3 col-md-12 col-12">
                                <label for="direccion${ubicacion.id}">Dirección</label>
                                <input type="text" class="form-control mt-2" id="direccion${ubicacion.id}" required value="${ubicacion.direccion}">
                            </div>

                            <div class="form-group mt-3 col-md-6 col-12">
                                <label for="enlace${ubicacion.id}">Enlace</label>
                                <input type="number" class="form-control mt-2" id="enlace${ubicacion.id}" required value="${ubicacion.enlace}">
                            </div>

                            <div class="form-group mt-3 col-md-6 col-12">
                                <label for="normal${ubicacion.id}">Normal</label>
                                <input type="text" class="form-control mt-2" id="normal${ubicacion.id}" required value="${ubicacion.normal}">
                            </div>

                            <div class="form-group mt-3 col-md-12 col-12">
                                <label for="mapa${ubicacion.id}">Ubicación</label>
                                <div id="mapa${ubicacion.id}" style="height: 400px;"></div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>`
        })
        loadMaps()
    }
}

function loadMaps() {
    ubicaciones.forEach(ubicacion => {
        const map = new google.maps.Map(document.getElementById(`mapa${ubicacion.id}`), {
            center: { lat: ubicacion.latitud, lng: ubicacion.longitud },
            zoom: 13
        });

        const marker = new google.maps.Marker({
            position: { lat: ubicacion.latitud, lng: ubicacion.longitud },
            map: map,
            draggable: true
        });


        marker.addListener('dragend', function (event) {
            const nuevaLatitud = event.latLng.lat();
            const nuevaLongitud = event.latLng.lng();

            // Actualiza la ubicación en tu arreglo o realiza cualquier acción necesaria
            actualizarUbicacion(ubicacion.id, nuevaLatitud, nuevaLongitud);
        });
    })
}

function addNewUbication() {
    let newUbication = {
        id: ubicaciones.length ? lastUbicacion.id + 1 : 1,
        idcircuito: Number(id_circuito),
        cuchilla: "Nueva Ubicación",
        tipo: "",
        direccion: "",
        enlace: "",
        normal: "",
        latitud: 20.9670,
        longitud: -89.6237
    }

    ubicaciones.unshift(newUbication)
    lastUbicacion = newUbication
    renderUbications()
}

function loadEntity() {
    fetch("https://apicfe.onrender.com/api/circuitos/" + id_circuito, {
        headers: {
            'Authorization': 'token ' + localStorage.getItem('token')
        },
    }).then(response => response.json()).then(data => {
        document.getElementById("nombre").value = data.nombre
        document.getElementById("idarea").value = data.area?.id || ''
        document.getElementById("idsubestacion").value = data.subestacion?.id || ''
        document.getElementById("idnumcirc").value = data.numcirc?.id || ''
        document.getElementById("image").src = data.diagrama
        document.getElementById("title").innerHTML = 'Editando circuito: ' + data.id
        ubicaciones = []
        if (data.ubicaciones.length) {
            data.ubicaciones.forEach(ubicacion => {
                ubicaciones.push(ubicacion)
                lastUbicacion = ubicacion
                lastId = ubicacion.id;
            }
            )
        }
        renderUbications()
    })
}

if (id_circuito > 0) {
    loadEntity()
}
else {
    const titleUbicaciones = document.getElementById("title-ubicaciones")
    titleUbicaciones.remove()
    document.getElementById("title").innerHTML = 'Nuevo circuito'
    document.getElementById("fecha").value = new Date().toISOString().slice(0, 10)
}

function actualizarUbicacion(id, nuevaLatitud, nuevaLongitud) {
    const ubicacionById = ubicaciones.find(ubicaciones => ubicaciones.id == id)
    ubicacionById.latitud = nuevaLatitud
    ubicacionById.longitud = nuevaLongitud

}

function saveUbication(id) {
    const cuchilla = document.getElementById("cuchilla" + id).value
    const tipo = document.getElementById("tipo" + id).value
    const direccion = document.getElementById("direccion" + id).value
    const enlace = document.getElementById("enlace" + id).value
    const normal = document.getElementById("normal" + id).value
    const ubicacion = ubicaciones.find(ubicaciones => ubicaciones.id == id)
    const type = id <= lastId ? 1 : 2

    fetch(type === 1 ? "https://apicfe.onrender.com/api/ubicaciones/" + ubicacion.id : "https://apicfe.onrender.com/api/ubicaciones/", {
        method: type === 1 ? 'PUT' : 'POST',
        mode: "cors",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': 'token ' + localStorage.getItem('token')
        },
        body: JSON.stringify({
            cuchilla: cuchilla,
            idcircuito: id_circuito,
            tipo: tipo,
            direccion: direccion,
            enlace: enlace,
            normal: normal,
            latitud: ubicacion.latitud,
            longitud: ubicacion.longitud
        }),
    }).then(response => {
        if (response.status == 200 || response.status == 201) {
            Swal.fire({
                icon: 'success',
                title: 'Acción realizada con éxito',
                showConfirmButton: false,
                timer: 1500
            })
            loadEntity()
        }
        else if (response.status == 403) {
            window.location.href = "../index.html"
        }
        else if (response.status >= 500) {
            Swal.fire({
                icon: 'error',
                title: 'Error al realizar la acción',
                text: 'Intentelo más tarde o elimine las dependencias',
                showConfirmButton: false,
                timer: 3000
            })
        }
        else if (response.status >= 400) {
            Swal.fire({
                icon: 'error',
                title: 'Error al realizar la acción',
                text: 'Completa todos los campos',
                showConfirmButton: false,
                timer: 3000
            })
        }
    })
}

function deleteUbication(id_ubicacion) {
    const ubication = ubicaciones.find(ubicaciones => ubicaciones.id === id_ubicacion)
    if (id_ubicacion > lastId) {
        ubicaciones = ubicaciones.filter(ubicaciones => ubicaciones.id !== ubication.id)
        renderUbications()
    }
    else {
        Swal.fire({
            focusConfirm: false,
            title: '¿Estas seguro de realizar esta acción?',
            text: '¡La ubicación ' + ubication.cuchilla + ' será eliminada!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#D33',
            cancelButtonColor: '#C0C0C0',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Eliminar!',

        }).then((result) => {
            if (result.isConfirmed) {
                fetch("https://apicfe.onrender.com/api/ubicaciones" + '/' + id_ubicacion, {
                    method: 'DELETE',
                    mode: "cors",
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                        'Authorization': 'token ' + localStorage.getItem('token')
                    },

                }).then(response => {
                    if (response.status == 200 || response.status == 201) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Acción realizada con éxito',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        loadEntity()

                    }
                    else if (response.status == 403) {
                        window.location.href = "../index.html"
                    }
                    else if (response.status >= 500) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error al realizar la acción',
                            text: 'Intentelo más tarde o elimine las dependencias',
                            showConfirmButton: false,
                            timer: 3000
                        })
                    }
                })
            }
        })
    }

}

function save() {
    const nombre = document.getElementById("nombre").value;
    const idarea = document.getElementById("idarea").value
    const idsubestacion = document.getElementById("idsubestacion").value
    const idnumcirc = document.getElementById("idnumcirc").value
    const diagrama = document.getElementById("image").src



    fetch(localStorage.getItem("id_circuito") ? "https://apicfe.onrender.com/api/circuitos/" + localStorage.getItem("id_circuito") : "https://apicfe.onrender.com/api/circuitos", {
        method: localStorage.getItem("id_circuito") ? 'PUT' : 'POST',
        mode: "cors",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': 'token ' + localStorage.getItem('token')
        },
        body: JSON.stringify({
            nombre: nombre, idarea: idarea, idsubestacion: idsubestacion,
            idnumcirc: idnumcirc, diagrama: diagrama
        }),

    }).then(response => {
        if (response.status == 200 || response.status == 201) {
            window.location.href = "../circuitos.html"
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