const urlSalesToday = 'https://apicfe.onrender.com/api/compras?fechacompra=' + new Date().toISOString().slice(0, 10)
const urlProducts = 'https://apicfe.onrender.com/api/circuitoss?activo=1'
const urlBrands = 'https://apicfe.onrender.com/api/marcas?activo=1'
const urlCategories = 'https://apicfe.onrender.com/api/areas?activo=1'

if(!localStorage.getItem('token')){
    window.location.href = '/index.html'
}


const token = localStorage.getItem("token")
function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
const dataToken = parseJwt(token).data
document.getElementById("welcome-user").innerHTML = "Bienvenido " + dataToken.nombres + " " + dataToken.apellido_p + " " + dataToken.apellido_m

fetch(urlSalesToday, {
    headers: {
        "Authorization": "token " + token
    }
}).then(response => response.json())
    .then(data => {
        let totalSales = 0;
        let totalEarning = 0;
        const cardBodySales = document.getElementById("card-body-sales");
        if (data.length > 0) {
            data.forEach(sale => {
                totalSales += 1
                totalEarning = totalEarning + sale.total;
                const row = document.createElement('div')
                row.className = "row border-bottom pt-3 ps-3"
                row.innerHTML = `<div class="col-md-8 col-12 ">
            <p class="fw-bold text-small p-0 m-0">Realizada por: </p>
            <p class="text-small "> ${sale.usuario.nombres} ${sale.usuario.apellido_p} ${sale.usuario.apellido_m} </p>
        </div>
        <div class="col-md-4 col-12 ">
            <p class="fw-bold text-small p-0 m-0">Monto: </p>
            <p class="text-small text-success"> $${sale.total}</p>
        </div>`;
                cardBodySales.appendChild(row)
            });
        }
        else {
            const div = document.createElement('div')
            div.className = 'd-flex align-items-center justify-content-center h-100'
            div.innerHTML = '<p class="text-muted text-small">Aún no se han realizado compras.</p>'
            cardBodySales.appendChild(div)
        }
        document.getElementById("total-earning").innerHTML = "$" + totalEarning
        document.getElementById("total-sales").innerHTML = totalSales
    })

fetch(urlProducts).then(response => response.json()).then(data => {
    document.getElementById("amountProduct").innerHTML = data.length
})

fetch(urlBrands).then(response => response.json()).then(data => {
    document.getElementById("amountBrand").innerHTML = data.length
})

fetch(urlCategories).then(response => response.json()).then(data => {
    document.getElementById("amountareas").innerHTML = data.length
})