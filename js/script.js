//PodemosAprender: no uso "const" porque me impide probar el codigo simplemente evaluando la version nueva en la consola del browser.
//Puedo conseguir LO MISMO y mejor usando ESTO_ES_CONSTANTE, EstoEsGlobal, estoEsDentroDeLaFuncion

var Productos = [ //U: la lista a mostrar, filtrar TODO: cargarla de un servidor
  {nombre:"china", animal: "Perro", sexo: "hembra", raza: "picher"},
  {nombre:"alma", animal: "Perro", sexo: "hembra", raza: "bulldog frances"},
  {nombre:"cristobal", animal: "Perro", sexo: "macho", raza: ""},
  {nombre:"athila", animal: "Perro", sexo: "hembra", raza: ""},
  {nombre:"cabeza", animal: "Perro", sexo: "macho", raza: ""},
  {nombre:"luna", animal: "Perro", sexo: "hembra", raza: "border coliie"},
]

//PodemosAprender: separe la busqueda en esta funcion _pura_ que hace siempre lo mismo para los mismos parametros, y no depende de nada externo
// la ventaja es que asi las partes dificiles del codigo quedan muy faciles de probar con todos los casos posibles
function filtrar(datos, texto, onElementFound, onDone) { //U: filtra un array de diccionarios devolviendo los que en "nombre" contienen "texto"
  for (let elemento of datos){ //TODO: por que no usar array filter?
    let nombre = elemento.nombre.toLowerCase();
    if (nombre.indexOf(texto) !== -1) { onElementFound(elemento) } //A: pasamos el elemento a quien llamo
  }
  onDone(); //A: avisamos que termino la busqueda
}

//PodemosAprender: lo mismo, si lo escribo asi separado lo puedo probar ej. en la consola con perroComoLi[Productos[1]]
function perroComoLi(e) { //U: devuelve los datos de un perro formateados para agregar a una ul u ol
  return `
      <li>${e.nombre} - animal: ${e.animal} - sexo: ${e.sexo} - raza: ${e.raza}</li>
      `
}

var formulario = document.querySelector("#formulario");
var boton = document.querySelector("#boton");
var resultado= document.querySelector("#resultado");
var OnFiltrar = ()=>{ //U: el event handler solo conecta UI input con funciones con UI output 
  //console.log(formulario.value);
  resultado.innerHTML = "";
  const texto = formulario.value.toLowerCase();
  filtrar(Productos, texto, 
    e => { //U: encontre un elemento, lo muestro
      resultado.innerHTML += perroComoLi(e)},
    () => { //U: termino la busqueda
      if (resultado.innerHTML === "") {
        resultado.innerHTML += `
          <li>Producto no encontrando...</li>
        `
      }
    }
  );
}

boton.addEventListener('click', OnFiltrar);
formulario.addEventListener("keyup",OnFiltrar)

OnFiltrar(); //A: inicialmente muestro todas las opciones
