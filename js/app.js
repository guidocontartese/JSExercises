const formulario = document.querySelector("#agregar-gasto");
const presupuestoMostrado = document.querySelector("#total");
const restanteMostrado = document.querySelector("#restante");
const listaGastos = document.querySelector(".list-group");

document.addEventListener("DOMContentLoaded", pedirPresupuesto); // al terminar de cargarse mi html pido ingresar el monto
formulario.addEventListener("submit", agregarGasto);

class Presupuesto {
  constructor(presupuesto) {
    this.presupuesto = Number(presupuesto);
    this.restante = Number(presupuesto);
    this.gastos = [];
  }

	agregarGasto(gasto)
	{
		this.gastos.push(gasto)
	}

	actualizarRestante(monto){
		this.restante -= monto;
	}
}

class Ui {
  insertarPresupuesto(presupuesto) {
    presupuestoMostrado.textContent = presupuesto.presupuesto;
    restanteMostrado.textContent = presupuesto.presupuesto;
  }

  imprimirAlerta(mensaje, tipo) {
    const divMensaje = document.createElement("div");
    formulario.parentNode.insertBefore(divMensaje, formulario);
    if (tipo === "alerta")
      divMensaje.classList.add("alert-danger", "alert", "text-center");
    if (tipo == "correcto")
      divMensaje.classList.add("alert-success", "alert", "text-center");
    divMensaje.textContent = mensaje;
    setTimeout(() => divMensaje.remove(), 2500);
  }

	actualizarRestante(){
		restanteMostrado.textContent = presupuesto.restante;
	}

	actualizarListaGastos(gastos){
		//235limpiarGastos();  // aca limpio la lista de gastos cada vez que la voy a crear para que no se me repitan los mismos
		gastos.forEach(gasto =>{
			console.log(gasto)
		const nuevoGasto = document.createElement("li");
		nuevoGasto.className = "list-group-item list-group-item-warning d-flex justify-content-between align-items-center"
		nuevoGasto.innerHTML = `${gasto.nombre} <span class="badge bg-primary rounded-pill"> ${gasto.gasto}</span>`		
		listaGastos.appendChild(nuevoGasto)
	})
	}
}
const ui = new Ui();
let presupuesto;

function pedirPresupuesto() {
  const presupuestoAgregado = prompt(
    "Ingrese el presupuesto disponible semanal: "
  );
  if (
    presupuestoAgregado <= 0 ||
    isNaN(presupuestoAgregado) ||
    presupuestoAgregado === ``
  )
    pedirPresupuesto();

  presupuesto = new Presupuesto(presupuestoAgregado);
  ui.insertarPresupuesto(presupuesto);
}

function agregarGasto(e) {
  e.preventDefault();
  let nombre = document.querySelector("#gasto").value;
  let gasto = Number(document.querySelector("#cantidad").value);
  if (nombre === "" || gasto <= 0){
  	ui.imprimirAlerta("Ingrese correctamente ambos campos", "alerta");
		return;
	}
  ui.imprimirAlerta("Gasto cargado correctamente", "correcto");
	presupuesto.actualizarRestante(gasto);
	ui.actualizarRestante();

	const gastoObj ={nombre, gasto, id: Date.now()};
	presupuesto.agregarGasto(gastoObj);
	ui.actualizarListaGastos(presupuesto.gastos);
	formulario.reset();
}

function limpiarGastos(){
	while(listaGastos.nextSibling != "</ul>"){
		listaGastos.nextSibling.remove();
	}
}