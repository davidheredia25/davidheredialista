//ELEMENTOS
// Accedemos al DOM para almacenar en constantes los elementos html que necesitemos */
const tituloTabla = document.getElementById('titulo');
const titulo = document.getElementById('tituloModal');
const mensaje = document.getElementById('mensajeModal');
const aceptar = document.getElementById('btn-si');
const cancelar = document.getElementById('btn-no');
const tableEl = document.getElementById("table");
const progressBar = document.getElementById("progressBar");
const switchDropdown = document.getElementById('switch');
const filtroEl = document.getElementById('filtroTipo');
let body = document.createElement("tbody");


const overlayEl = document.getElementById('overlay');

//defino la variable que tiene los datos parseados
let processedData = new Array;

// defino el objeto que va a contener los nuevos datos al agregar
let nuevaPersona = {
    Nombre: "",
    Apellido: "",
    Edad: "",
    Nacionalidad: ""
}

/* document.getElementByClassName me devuelve un arreglo con todos los elementos
que tengan esa clase, por eso yo accedo al primer elemento dentro de ese array [0] */
const btnNewCustomer = document.getElementById('btn-new');

//UTILIDADES


//creamos el header de la tabla:
let crearHeader = (arregloclave) => {
    let listaDatos = document.createElement("tr");
    for (let i = 0; i < arregloclave.length; i++) {
        let listheader = document.createElement("th");
        listheader.innerHTML = arregloclave[i];
        listaDatos.appendChild(listheader);
    };
    tableEl.appendChild(listaDatos);
    // Creamos la celda editar
    let columnaEditar = document.createElement("th");
    columnaEditar.innerHTML = "Editar";
    listaDatos.appendChild(columnaEditar);
    body.appendChild(listaDatos);
    // Creamos la celda eliminar
    let columnaEliminar = document.createElement("th");
    columnaEliminar.innerHTML = "Borrar";
    listaDatos.appendChild(columnaEliminar);
    body.appendChild(listaDatos);
}
// inicializamos la tabla en blanco
function limpiarTabla() {
    body.innerHTML = "";
}

//creamos el contenido de la  tabla:
let crearTabla = (personas) => {
    let listaDatos = document.createElement("tr");
    for (const lista in personas) {
        let listItem = document.createElement("td");
        listItem.innerHTML = personas[lista];
        listaDatos.appendChild(listItem);
        body.appendChild(listaDatos)
    }
    tableEl.appendChild(body);

    // celda con boton de editar
    let botonEditar = document.createElement("td");
    botonEditar.innerHTML = "<img src='imagenes/editar.png' alt='editar'/>";
    botonEditar.classList.add("botonesTabla");
    listaDatos.appendChild(botonEditar);
    botonEditar.addEventListener("click", (event) => { event.preventDefault(); showModalEditar(event.path[2]) });

    //celda con boton de eliminar
    let botonEliminar = document.createElement("td");
    botonEliminar.innerHTML = "<img src='imagenes/eliminar.png' alt='eliminar'/>";
    botonEliminar.classList.add("botonesTabla");
    listaDatos.appendChild(botonEliminar);
    botonEliminar.addEventListener("click", (event) => { event.preventDefault(); showModalEliminar(event.path[2]) });
    botonEliminar.removeEventListener("click", (event) => { event.preventDefault(); showModalEliminar(event.path[2]) }, true);

}

//se crea dinamicamente el boton de "agregar"
function agregarBoton() {
    let div = document.getElementById("divBoton");
    let boton = document.createElement("button");
    div.appendChild(boton);
    boton.addEventListener("click", (event) => { event.preventDefault(); showModalAgregar() });
    boton.classList.add("btn-dark");
    boton.classList.add("btn");
    boton.innerHTML = "Agregar";
}

// Se muestra el modal cuando se quiere eliminar fila */
function showModalEliminar(fila) {
    titulo.innerHTML = "Eliminar";
    mensaje.innerHTML = "Desea eliminar la fila?";
    aceptar.innerHTML = "Aceptar";
    cancelar.innerHTML = "Cancelar";
    aceptar.addEventListener("click", () => { eliminarDato(fila) }, { once: true });
    cancelar.addEventListener("click", cancelarModal, { once: true });
    overlayEl.classList.remove('display-none');
}

// funcion que elimina con demora de dos segundos
function eliminarDato(fila) {

    progressBar.classList.add('final');
    setTimeout(() => {
        overlayEl.classList.add('display-none');
        progressBar.classList.remove('final');
        body.removeChild(fila);
    }, 1000);
}

// funcion cancelar
function cancelarModal() {
    overlayEl.classList.add('display-none')
    aceptar.removeEventListener("click", () => { eliminarDato(fila) }, { once: true });
}

// Se muestra el modal cuando se quiere EDITAR fila */
function showModalEditar(fila) {
    titulo.innerHTML = "Editar";
    mensaje.innerHTML = "Modifique los datos:";
    let formulario = document.createElement("form");
    formulario.classList.add('container', 'padding', 'margen');
    mensaje.appendChild(formulario);
    // se crean los input dinamicamente
    let nombre = document.createElement("INPUT");
    nombre.setAttribute("type", "text");
    nombre.setAttribute("required", "true"); 
    nombre.value = fila.cells[0].innerHTML;
    nombre.classList.add('margen');
    formulario.appendChild(nombre);
    let apellido = document.createElement("INPUT");
    apellido.setAttribute("type", "text");
    apellido.value = fila.cells[1].innerHTML;
    apellido.classList.add('margen');
    formulario.appendChild(apellido);
    let edad = document.createElement("INPUT");
    edad.setAttribute("type", "number");
    edad.value = fila.cells[2].innerHTML;
    edad.classList.add('margen');
    formulario.appendChild(edad);
    let nacionalidad = document.createElement("INPUT");
    nacionalidad.setAttribute("type", "text");
    nacionalidad.value = fila.cells[3].innerHTML;
    nacionalidad.classList.add('margen');
    formulario.appendChild(nacionalidad);
    aceptar.innerHTML = "Aceptar";
    cancelar.innerHTML = "Cancelar";
    overlayEl.classList.remove('display-none');
    aceptar.addEventListener("click", () => { modificarDato(fila, nombre, apellido, edad, nacionalidad) }, { once: true });
    cancelar.addEventListener("click", () => overlayEl.classList.add('display-none'), { once: true });
}
// funcion que modifica el dato en la tabla
function modificarDato(fila, nombre, apellido, edad, nacionalidad) {
    progressBar.classList.add('final');

    setTimeout(() => {
        overlayEl.classList.add('display-none');
        progressBar.classList.remove('final');
        fila.cells[0].innerHTML = nombre.value;
        fila.cells[1].innerHTML = apellido.value;
        fila.cells[2].innerHTML = edad.value;
        fila.cells[3].innerHTML = nacionalidad.value;
    }, 2000);
}


// Se muestra el modal cuando se quiere AGREGAR fila */
function showModalAgregar() {
    titulo.innerHTML = "Agregar";
    mensaje.innerHTML = "Inserte datos:";
    let formulario = document.createElement("form");
    formulario.classList.add('container', 'padding', 'margen');
    mensaje.appendChild(formulario);
    // se crean los input dinamicamente
    let nombre = document.createElement("INPUT");
    nombre.setAttribute("type", "text");
    nombre.placeholder = 'Nombre';
    nombre.classList.add('margen');
    formulario.appendChild(nombre);
    let apellido = document.createElement("INPUT");
    apellido.setAttribute("type", "text");
    apellido.placeholder = 'Apellido';
    apellido.classList.add('margen');
    formulario.appendChild(apellido);
    let edad = document.createElement("INPUT");
    edad.setAttribute("type", "number");
    edad.placeholder = 'Edad';
    edad.classList.add('margen');
    formulario.appendChild(edad);
    let nacionalidad = document.createElement("INPUT");
    nacionalidad.setAttribute("type", "text");
    nacionalidad.placeholder = 'Nacionalidad';
    nacionalidad.classList.add('margen');
    formulario.appendChild(nacionalidad);
    aceptar.innerHTML = "Aceptar";
    cancelar.innerHTML = "Cancelar";
    overlayEl.classList.remove('display-none');
    aceptar.addEventListener("click", () => { insertarDato(nombre, apellido, edad, nacionalidad) }, { once: true });
    cancelar.addEventListener("click", () => overlayEl.classList.add('display-none'), { once: true });
}

// funcion que inserta el dato nuevo en la tabla
function insertarDato(nombre, apellido, edad, nacionalidad) {
    progressBar.classList.add('final');
    setTimeout(() => {
        overlayEl.classList.add('display-none');
        progressBar.classList.remove('final');
        nuevaPersona.Nombre = nombre.value;
        nuevaPersona.Apellido = apellido.value;
        nuevaPersona.Edad = edad.value;
        nuevaPersona.Nacionalidad = nacionalidad.value;
        crearTabla(nuevaPersona);
    }, 2000);
}

