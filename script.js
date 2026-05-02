let equipoPokemon = [];
let entrenadorRegistrado = false;

function mostrarError(mensaje) {
  let elError = document.getElementById("mensajeError");
  let elExito = document.getElementById("mensajeExito");
  elExito.style.display = "none";
  elError.textContent = "⚠️ " + mensaje;
  elError.style.display = "block";
}

function mostrarExito(mensaje) {
  let elError = document.getElementById("mensajeError");
  let elExito = document.getElementById("mensajeExito");
  elError.style.display = "none";
  elExito.textContent = "✅ " + mensaje;
  elExito.style.display = "block";
}

function limpiarMensajes() {
  document.getElementById("mensajeError").style.display = "none";
  document.getElementById("mensajeExito").style.display = "none";
}

function renderizarTarjeta(entrenador) {
  let claseRegion = "region-" + entrenador.region.toLowerCase();
  let inicial = entrenador.nombre.charAt(0).toUpperCase();
  let idFicticio = "ID-" + Date.now().toString().slice(-6);

  document.getElementById("cardAvatar").textContent = inicial;
  document.getElementById("cardNombre").textContent = entrenador.nombre;
  document.getElementById("cardRegion").textContent = "📍 Región: " + entrenador.region;
  document.getElementById("cardId").textContent = idFicticio;

  let tarjeta = document.getElementById("trainerCard");
  tarjeta.className = "trainer-card " + claseRegion;

  if (entrenador.obtenerInsignia) {
    document.getElementById("cardInsignia").textContent = entrenador.obtenerInsignia();
  } else {
    document.getElementById("cardInsignia").textContent = "🏅";
  }
}

function renderizarEquipo() {
  let contenedor = document.getElementById("equipoContenedor");
  
  if (!contenedor) {
    contenedor = document.createElement("div");
    contenedor.id = "equipoContenedor";
    contenedor.style.display = "flex";
    contenedor.style.flexDirection = "column";
    contenedor.style.gap = "16px";
    document.querySelector(".cards-container").appendChild(contenedor);
    
    let pokeCardOriginal = document.getElementById("pokeCard");
    if (pokeCardOriginal) {
      pokeCardOriginal.style.display = "none";
    }
  }
  
  contenedor.innerHTML = "";
  
  equipoPokemon.forEach(pokemon => {
    let inicial = pokemon.nombre.charAt(0).toUpperCase();
    let miniCard = document.createElement("div");
    miniCard.className = "poke-card";
    
    miniCard.innerHTML = `
      <div class="poke-hero" style="background-image: url('images/estadio.webp'); height: 80px; background-size: cover; background-position: center;"></div>
      <div class="poke-header" style="padding: 12px 16px;">
        <div class="poke-avatar" style="width: 48px; height: 48px; font-size: 16px;">${inicial}</div>
        <div class="poke-header-info">
          <h2 class="card-nombre" style="font-size: 14px;">${pokemon.nombre}</h2>
          <p class="poke-nivel" style="font-size: 11px;">Nivel: ${pokemon.nivel}</p>
        </div>
        <div class="poke-tipo-badge">${pokemon.tipo.toUpperCase()}</div>
      </div>
      <div class="card-body" style="padding: 12px 16px; gap: 8px;">
        <div class="card-stat">
          <span class="stat-label">MOVIMIENTO ESTRELLA</span>
          <span class="stat-value" style="font-size: 12px;">${pokemon.movimiento}</span>
        </div>
        <div class="card-frase" style="font-size: 12px; padding: 8px 12px;">"${pokemon.frase}"</div>
      </div>
    `;
    contenedor.appendChild(miniCard);
  });
}

document.getElementById("formTrainer").addEventListener("submit", function (evento) {
  evento.preventDefault();
  limpiarMensajes();

  if (equipoPokemon.length >= 5) {
    return;
  }

  let nombre = document.getElementById("inputNombre").value;
  let region = document.getElementById("inputRegion").value;
  let pokeNombre = document.getElementById("inputPokeNombre").value;
  let tipo = document.getElementById("inputTipo").value;
  let nivel = document.getElementById("inputNivel").value;
  let movimiento = document.getElementById("inputMovimiento").value;
  let frase = document.getElementById("inputFrase").value;

  if (!entrenadorRegistrado) {
    if (nombre.trim() === "") {
      mostrarError("El nombre del entrenador no puede estar vacío.");
      return;
    }
    if (region.trim() === "") {
      mostrarError("La región no puede estar vacía.");
      return;
    }
  }

  if (pokeNombre.trim() === "") {
    mostrarError("El nombre del Pokémon no puede estar vacío.");
    return;
  }
  if (tipo.trim() === "") {
    mostrarError("El tipo principal no puede estar vacío.");
    return;
  }
  if (nivel.trim() === "" || isNaN(nivel) || nivel < 1 || nivel > 100) {
    mostrarError("El nivel debe ser un número válido entre 1 y 100.");
    return;
  }
  if (movimiento.trim() === "") {
    mostrarError("El movimiento especial no puede estar vacío.");
    return;
  }
  if (frase.trim() === "") {
    mostrarError("La frase de combate no puede estar vacía.");
    return;
  }

  if (!entrenadorRegistrado) {
    let entrenador = {
      nombre: nombre,
      region: region,
      presentarse: function () {
        return "Soy " + this.nombre + ", entrenador de la región " + this.region + ".";
      },
      obtenerInsignia: function () {
        if (this.region === "Kanto") { return "🔴"; }
        else if (this.region === "Johto") { return "✨"; }
        else if (this.region === "Hoenn") { return "🌊"; }
        else if (this.region === "Sinnoh") { return "💎"; }
        else if (this.region === "Unova") { return "⚫"; }
        else if (this.region === "Kalos") { return "🌸"; }
        else { return "🏅"; }
      }
    };
    
    renderizarTarjeta(entrenador);
    entrenadorRegistrado = true;
    
    document.getElementById("inputNombre").disabled = true;
    document.getElementById("inputNombre").style.opacity = "0.5";
    document.getElementById("customRegion").style.pointerEvents = "none";
    document.getElementById("customRegion").style.opacity = "0.5";
  }

  let nuevoPokemon = {
    nombre: pokeNombre,
    tipo: tipo,
    nivel: parseInt(nivel),
    movimiento: movimiento,
    frase: frase
  };

  equipoPokemon.push(nuevoPokemon);
  
  document.getElementById("cardSection").style.display = "block";
  renderizarEquipo();

  if (equipoPokemon.length >= 5) {
    mostrarExito("Tu equipo ya está completo. ¡A batallar!");
    document.getElementById("formSection").style.display = "none";
  } else {
    mostrarExito(`¡${pokeNombre} añadido! Llevas ${equipoPokemon.length}/5 Pokémon.`);
    
    document.getElementById("inputPokeNombre").value = "";
    document.getElementById("inputTipo").value = "";
    document.getElementById("inputNivel").value = "";
    document.getElementById("inputMovimiento").value = "";
    document.getElementById("inputFrase").value = "";
    
    let selectTipoTrigger = document.querySelector("#customTipo .custom-select-trigger span");
    if(selectTipoTrigger) selectTipoTrigger.innerHTML = "— Selecciona un tipo —";
    document.querySelectorAll("#customTipo .custom-option").forEach(opt => opt.classList.remove("selected"));
    document.getElementById("inputPokeNombre").focus();
  }
});

document.getElementById("btnReset").addEventListener("click", function () {
  equipoPokemon = [];
  entrenadorRegistrado = false;
  
  document.getElementById("cardSection").style.display = "none";
  document.getElementById("formSection").style.display = "block";
  document.getElementById("formTrainer").reset();
  
  document.getElementById("inputNombre").disabled = false;
  document.getElementById("inputNombre").style.opacity = "1";
  document.getElementById("customRegion").style.pointerEvents = "auto";
  document.getElementById("customRegion").style.opacity = "1";
  
  let contenedor = document.getElementById("equipoContenedor");
  if (contenedor) contenedor.innerHTML = "";
  
  let customTriggers = document.querySelectorAll(".custom-select-trigger span");
  customTriggers.forEach(span => {
    span.innerHTML = "— Selecciona una opción —";
  });
  document.querySelectorAll(".custom-option").forEach(opt => {
    opt.classList.remove("selected");
  });
  
  limpiarMensajes();
});