const formulario = document.querySelector("#agregar-gasto");
const presupuestoMostrado = document.querySelector("#total");
const restanteMostrado = document.querySelector("#restante");

document.addEventListener("DOMContentLoaded", pedirPresupuesto);
formulario.addEventListener("submit", agregarGasto);


class Presupuesto{
    constructor(presupuesto)
    {
        this.presupuesto = Number(presupuesto)
        this.restante = Number(presupuesto)
        this.gastos = []
    }
}

class Ui {
        insertarPresupuesto(presupuesto){
            presupuestoMostrado.textContent = presupuesto.presupuesto
            restanteMostrado.textContent = presupuesto.presupuesto
        }
    agregarGasto(e){
        e.preventDefault();
        let nombreGasto = document.querySelector("#gasto").value;
        let valorGasto = document.querySelector("#cantidad").value;
        gastos.push(new Gasto(nombreGasto, valorGasto));
        console.log(gastos);
    }
}
const ui = new Ui();
let presupuesto;

function pedirPresupuesto(){
    const presupuestoAgregado = prompt("Ingrese el presupuesto disponible semanal: ");
    if (presupuestoAgregado<=0 || isNaN(presupuestoAgregado))
        pedirPresupuesto();
    
    presupuesto = new Presupuesto(presupuestoAgregado);
    ui.insertarPresupuesto(presupuesto)
}

function agregarGasto(e){
    e.preventDefault();
    console.log("Submit!")
}