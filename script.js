let carrito = [];
let subtotal = 0;

const carritoVacio = document.querySelector("#carritoVacio");
const listaItems = document.querySelector("#listaItems");
const subtotalArea = document.querySelector("#subtotalArea");
const subtotalMostrado = document.querySelector("#subtotalMostrado");
const inputCupon = document.querySelector("#inputCupon");
const btnPagar = document.querySelector("#btnPagar");
const resumenPago = document.querySelector("#resumenPago");
const resumenSubtotal = document.querySelector("#resumenSubtotal");
const resumenDescuento = document.querySelector("#resumenDescuento");
const resumenIVA = document.querySelector("#resumenIVA");
const resumenTotal = document.querySelector("#resumenTotal");

function calcularIVA(subtotal) {
    return subtotal * 0.19;
}

function formatearDinero(numero) {
    return "$" + Math.round(numero).toLocaleString('es-CO');
}

function aplicarDescuento(total, codigo) {
    if (codigo === "BIT10") {
        return total * 0.90;
    } else if (codigo === "HAPPYHOUR") {
        return total * 0.80;
    }
    return total;
}

function agregarCombo(nombre, precio) {
    carrito.push({ nombre: nombre, precio: precio });
    subtotal += precio;

    carritoVacio.style.display = "none";
    subtotalArea.style.display = "block";
    subtotalMostrado.textContent = formatearDinero(subtotal);

    renderizarCarrito();
}

function renderizarCarrito() {
    listaItems.innerHTML = "";
    carrito.forEach(function (item) {
        let divItem = document.createElement("div");
        divItem.className = "cart-item";
        divItem.innerHTML = `
            <span class="cart-item-name">${item.nombre}</span>
            <span class="cart-item-price">${formatearDinero(item.precio)}</span>
        `;
        listaItems.appendChild(divItem);
    });
}

btnPagar.addEventListener("click", function () {
    if (carrito.length === 0) {
        alert("⚠️ El carrito está vacío. Agrega combos antes de pagar.");
        return;
    }

    let codigoCupon = inputCupon.value.trim().toUpperCase();
    
    let totalConDescuento = aplicarDescuento(subtotal, codigoCupon);
    let descuentoAplicado = subtotal - totalConDescuento;
    let iva = calcularIVA(totalConDescuento);
    let totalFinal = totalConDescuento + iva;

    resumenSubtotal.textContent = formatearDinero(subtotal);
    resumenDescuento.textContent = "-" + formatearDinero(descuentoAplicado);
    resumenIVA.textContent = formatearDinero(iva);
    resumenTotal.textContent = formatearDinero(totalFinal);

    resumenPago.style.display = "block";
});