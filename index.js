// Asignación 6: Métodos de Algoritmos de Ordenamiento, Búsqueda y Muestreo de éstos
// Brizuela González Juan Eduardo
// Estructuras de Datos y Algoritmos Avanzados
// 21/02/22

// Variables
let myArr = [];
let newArr = [];

let cantidad = document.getElementById("cantidad");
let min = document.getElementById("min");
let max = document.getElementById("max");
let numeroDeCorridas = document.getElementById("numero-corridas");
let ordenamientoTable = document.getElementById("ordenamiento-table");
let parentDiv = document.getElementById("tbody");
let tablaPromedios = document.getElementById("tabla-promedio");
let loaderElement = document.getElementById("loader");
let resultDiv = document.getElementById("result-div");
let busquedaDiv = document.getElementById("busqueda-div");

// Función para generar números aleatorios
const generateRandomNumbers = (cantidad, min, max, arr) => {
  let n = Array.from({ length: cantidad }, () =>
    Math.floor(Math.random() * (max - min + 1) + min)
  );
  for (let index = 0; index < n.length; index++) {
    arr.push(n[index]);
  }
  return arr;
};
//--------------FUNCIONES DE ORDENAMIENTO--------------
/////////////////BURBUJA///////////////////////////////
const ordenamientoBurbuja = (array) => {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      if (array[j] > array[j + 1]) {
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }
  return array;
};
/////////////////SACUDIDA//////////////////////////////
const sacudida = (arr) => {
  let start = 0,
    end = arr.length,
    swapped = true;
  while (swapped) {
    swapped = false;
    for (let i = start; i < end - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        swapped = true;
      }
    }
    end--;
    if (!swapped) break;
    swapped = false;
    for (let i = end - 1; i > start; i--) {
      if (arr[i - 1] > arr[i]) {
        let temp = arr[i];
        arr[i] = arr[i - 1];
        arr[i - 1] = temp;
        swapped = true;
      }
    }
    start++;
  }
  return arr;
};
////////////////QUICK SORT/////////////////////////////
// Intercambio
const intercambio = (arr, i, j) => {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};
// Partición
const partition = (arr, izq, der) => {
  let pivote = arr[der];
  let i = izq - 1;
  for (let j = izq; j <= der - 1; j++) {
    if (arr[j] < pivote) {
      i++;
      intercambio(arr, i, j);
    }
  }
  intercambio(arr, i + 1, der);
  return i + 1;
};
// Función de quick sort
const quickSort = (arr, izq, der) => {
  if (izq < der) {
    let pi = partition(arr, izq, der);
    quickSort(arr, izq, pi - 1);
    quickSort(arr, pi + 1, der);
  }
};
//--------------FUNCIONES DE BÚSQUEDA--------------
////////////////Búsqueda Secuencial////////////////
const busquedaSecuencial = (arr, key) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === key) {
      return i;
    }
  }
  return -1;
};
////////////////Búsqueda SC////////////////////////
const busquedaSecuencialConCentinela = (arr, key) => {
  let n = arr.length;
  let i = 0;
  while (arr[i] < key && i < n) {
    i += 1;
  }
  if (arr[i] == key) {
    return i;
  }
  return -1;
};
////////////////Búsqueda Binaria///////////////////
const busquedaBinaria = (arr, l, r, x) => {
  if (r >= l) {
    let mid = l + Math.floor((r - l) / 2);
    // Si el elemento se encuentra en la mitad
    if (arr[mid] == x) return mid;
    // Si el elemento es más pequeño que la mitad, entonces
    // debe de estar a la izquierda
    if (arr[mid] > x) return busquedaBinaria(arr, l, mid - 1, x);
    // De otra forma, el elemento debe de estar a la derecha
    return busquedaBinaria(arr, mid + 1, r, x);
  }
  // Elemento no presente en el arreglo
  return -1;
};
// Función para borrar los datos generados
function clearTable() {
  for (let i = 0; i < numeroDeCorridas.value; i++) {
    for (let j = 0; j < parentDiv.childElementCount; j++) {
      parentDiv.removeChild(parentDiv.childNodes[0]);
    }
  }
  tablaPromedios.removeChild(tablaPromedios.childNodes[0]);
  for (let i = 0; i < resultDiv.childElementCount + 1; i++) {
    resultDiv.removeChild(resultDiv.childNodes[0]);
  }
  for (let i = 0; i < busquedaDiv.childElementCount + 5; i++) {
    busquedaDiv.removeChild(busquedaDiv.childNodes[0]);
  }
}
// Función para mostrar Spinner de Carga
function loader() {
  loaderElement = AmagiLoader.show();
  setTimeout(() => {
    AmagiLoader.hide();
  }, (numeroDeCorridas.value * cantidad.value) / 800);
}

// Función de muestreo de resultados de ordenamiento
function showSortedResults() {
  if (
    isNaN(numeroDeCorridas.value) ||
    isNaN(min.value) ||
    isNaN(max.value) ||
    isNaN(cantidad.value)
  ) {
    alert("Por favor, introduce sólo valores numéricos");
  } else {
    let burbujaTimes = [];
    let sacudidaTimes = [];
    let quickSortTimes = [];

    /////////////PROMEDIOS DE ORDENAMIENTO///////////////
    let tHead = document.createElement("thead");
    tablaPromedios.appendChild(tHead);
    tablaPromedios.setAttribute(
      "class",
      "table table-success animate__animated animate__slideInUp"
    );

    let tableRow = document.createElement("tr");
    tHead.appendChild(tableRow);

    let thPromedio = document.createElement("th");
    let thPromedioBurbuja = document.createElement("th");
    let thPromedioSacudida = document.createElement("th");
    let thPromedioQuickSort = document.createElement("th");

    tableRow.appendChild(thPromedio);
    tableRow.appendChild(thPromedioBurbuja);
    tableRow.appendChild(thPromedioSacudida);
    tableRow.appendChild(thPromedioQuickSort);

    /////////////CORRIDAD DE ORDENAMIENTO////////////////
    for (let i = 0; i < numeroDeCorridas.value; i++) {
      ordenamientoTable.setAttribute(
        "class",
        "table animate__animated animate__slideInUp"
      );

      let parentDiv = document.getElementById("tbody");

      let tableRow = document.createElement("tr");
      parentDiv.appendChild(tableRow);

      let tableHead = document.createElement("th");
      let bubbleTableData = document.createElement("td");
      let cocktailTableData = document.createElement("td");
      let quickSortTableData = document.createElement("td");

      tableRow.appendChild(tableHead);
      tableRow.appendChild(bubbleTableData);
      tableRow.appendChild(cocktailTableData);
      tableRow.appendChild(quickSortTableData);

      tableRow.childNodes[0].textContent = (i + 1).toString();

      generateRandomNumbers(cantidad.value, min.value, max.value, myArr);
      let start = new Date().getTime();
      ordenamientoBurbuja(myArr);
      let end = new Date().getTime();
      let time = end - start;
      burbujaTimes.push(time);
      myArr = [];

      tableRow.childNodes[1].textContent = time / 1000 + " segundos";

      generateRandomNumbers(cantidad.value, min.value, max.value, myArr);
      start = new Date().getTime();
      sacudida(myArr);
      end = new Date().getTime();
      time = end - start;
      sacudidaTimes.push(time);
      myArr = [];

      tableRow.childNodes[2].textContent = time / 1000 + " segundos";

      generateRandomNumbers(cantidad.value, min.value, max.value, myArr);
      let n = myArr.length;
      start = new Date().getTime();
      quickSort(myArr, 0, n - 1);
      end = new Date().getTime();
      time = end - start;
      quickSortTimes.push(time);
      newArr = myArr;
      myArr = [];

      tableRow.childNodes[3].textContent = time / 1000 + " segundos";
    }
    const reducer = (accumulator, curr) => accumulator + curr;

    let promedioTiemposBurbuja =
      burbujaTimes.reduce(reducer) / 1000 / numeroDeCorridas.value;
    let promedioTiemposSacudida =
      sacudidaTimes.reduce(reducer) / 1000 / numeroDeCorridas.value;
    let promedioTiemposQuickSort =
      quickSortTimes.reduce(reducer) / 1000 / numeroDeCorridas.value;

    tableRow.childNodes[0].textContent = "X̅";
    tableRow.childNodes[1].textContent =
      promedioTiemposBurbuja.toFixed(4) + " segundos";
    tableRow.childNodes[2].textContent =
      promedioTiemposSacudida.toFixed(4) + " segundos";
    tableRow.childNodes[3].textContent =
      promedioTiemposQuickSort.toFixed(4) + " segundos";

    resultDiv.setAttribute(
      "class",
      "fs-5 my-5 d-flex d-flex justify-content-start"
    );
    let saveDataButton = document.createElement("btn");
    let resultH4 = document.createElement("h5");
    resultH4.setAttribute("class", "my-5 animate__animated animate__slideInUp");

    resultDiv.appendChild(resultH4);
    resultH4.textContent = "¡Arreglo Ordenado con Éxito!";
    resultH4.setAttribute("class", "my-2");

    resultDiv.appendChild(saveDataButton);
    let iFile = document.createElement("i");
    saveDataButton.appendChild(iFile);
    iFile.setAttribute("class", "bi bi-file-earmark-text");
    iFile.textContent = " Ver Arreglo";
    saveDataButton.setAttribute(
      "class",
      "btn btn-success mx-4 animate__animated animate__pulse animate__delay-2s animate__repeat-3 animate__slow"
    );
    saveDataButton.setAttribute("onclick", "saveDataToFile()");

    busquedaDiv.setAttribute(
      "class",
      "my-5 animate__animated animate__slideInUp"
    );
    let busquedaTitle = document.createElement("h2");
    let elemento = document.createElement("input");
    let busquedaButton = document.createElement("btn");

    busquedaDiv.appendChild(busquedaTitle);
    busquedaTitle.textContent = "🔎 Algoritmos de Búsqueda";

    busquedaDiv.appendChild(elemento);
    elemento.setAttribute("type", "text");
    elemento.setAttribute("id", "elemento-valor");
    elemento.setAttribute("class", "form-control my-3");
    elemento.setAttribute("placeholder", "Elemento por buscar...");

    busquedaDiv.appendChild(busquedaButton);
    busquedaButton.textContent = "Buscar";
    busquedaButton.setAttribute("class", "btn btn-primary my-1");
    busquedaButton.setAttribute(
      "onclick",
      "buscarElemento();showSearchResults()"
    );
  }
}
// Guardar arreglo en archivo de texto
function saveDataToFile() {
  let blob = new Blob(
    newArr.map((x, index) => `[${index}] ${x} \n`),
    {
      type: "text/plain;charset=utf-8",
    }
  );
  saveAs(blob, "arreglo_ordenado.txt");
}
// Buscar elemento y devolver resultado
function buscarElemento() {
  let busquedaResult = document.createElement("p");
  busquedaDiv.appendChild(busquedaResult);
  let valorElemento = document.getElementById("elemento-valor");
  if (isNaN(valorElemento.value)) {
    alert("Por favor, introduce un número");
  } else {
    let n = newArr.length;
    let x = valorElemento.value;
    let resultado = busquedaBinaria(newArr, 0, n - 1, x);
    busquedaResult.textContent =
      resultado == -1
        ? "Elemento no encontrado"
        : "Elemento encontrado en la posición: " + resultado;
    busquedaResult.setAttribute("class", "fs-5 my-4");
  }
}
// Función de muestreo de resultados de búsqueda
function showSearchResults() {
  let busquedaSecuencialTimes = [];
  let busquedaSecuencialCentinelaTimes = [];
  let busquedaBinariaTimes = [];

  //////////////////CORRIDAS DE BÚSQUEDA///////////////////////
  let valorElemento = document.getElementById("elemento-valor");

  let busquedaTable = document.createElement("table");
  busquedaDiv.appendChild(busquedaTable);
  busquedaTable.setAttribute(
    "class",
    "table animate__animated animate__slideInUp"
  );

  let tHead = document.createElement("thead");
  busquedaTable.appendChild(tHead);

  let tableRow = document.createElement("tr");
  tHead.appendChild(tableRow);

  let gato = document.createElement("th");
  tableRow.appendChild(gato);
  gato.textContent = "#";
  gato.setAttribute("scope", "col");

  let thBusquedaSecuencial = document.createElement("th");
  tableRow.appendChild(thBusquedaSecuencial);
  thBusquedaSecuencial.textContent = "Búsqueda Secuencial";
  thBusquedaSecuencial.setAttribute("scope", "col");

  let thBSC = document.createElement("th");
  tableRow.appendChild(thBSC);
  thBSC.textContent = "Búsqueda Secuencial Centinela";
  thBSC.setAttribute("scope", "col");

  let thBusquedaBinaria = document.createElement("th");
  tableRow.appendChild(thBusquedaBinaria);
  thBusquedaBinaria.textContent = "Búsqueda Binaria";
  thBusquedaBinaria.setAttribute("scope", "col");

  let tBody = document.createElement("tbody");
  busquedaTable.appendChild(tBody);

  /////////////////PROMEDIOS DE BÚSQUEDA//////////////////////
  let tablaPromediosBusqueda = document.createElement("table");
  busquedaDiv.appendChild(tablaPromediosBusqueda);
  tablaPromediosBusqueda.setAttribute(
    "class",
    "table table-success animate__animated animate__slideInUp"
  );

  let tHeadPromedios = document.createElement("thead");
  tablaPromediosBusqueda.appendChild(tHeadPromedios);

  let tableRowPromedios = document.createElement("tr");
  tHeadPromedios.appendChild(tableRowPromedios);

  let thPromedio = document.createElement("th");
  let thPromedioSecuencial = document.createElement("th");
  let thPromedioCentinela = document.createElement("th");
  let thPromedioBinaria = document.createElement("th");

  tableRowPromedios.appendChild(thPromedio);
  tableRowPromedios.appendChild(thPromedioSecuencial);
  tableRowPromedios.appendChild(thPromedioCentinela);
  tableRowPromedios.appendChild(thPromedioBinaria);

  for (let i = 0; i < numeroDeCorridas.value; i++) {
    let tableBodyRow = document.createElement("tr");
    tBody.appendChild(tableBodyRow);

    let numero = document.createElement("th");
    tableBodyRow.appendChild(numero);
    numero.textContent = (i + 1).toString();

    let busquedaSecuencialTableData = document.createElement("td");
    tableBodyRow.appendChild(busquedaSecuencialTableData);
    let start = new Date().getTime();
    busquedaSecuencial(newArr, valorElemento.value);
    let end = new Date().getTime();
    let time = end - start;
    busquedaSecuencialTimes.push(time);
    busquedaSecuencialTableData.textContent = time / 1000 + " segundos";

    let busquedaSecuencialCentinelaTableData = document.createElement("td");
    tableBodyRow.appendChild(busquedaSecuencialCentinelaTableData);
    start = new Date().getTime();
    busquedaSecuencialConCentinela(newArr, valorElemento.value);
    end = new Date().getTime();
    time = end - start;
    busquedaSecuencialCentinelaTimes.push(time);
    busquedaSecuencialCentinelaTableData.textContent =
      time / 1000 + " segundos";

    let busquedaBinariaTableData = document.createElement("td");
    tableBodyRow.appendChild(busquedaBinariaTableData);
    let n = newArr.length;
    let x = valorElemento.value;
    start = new Date().getTime();
    busquedaBinaria(newArr, 0, n - 1, x);
    end = new Date().getTime();
    time = end - start;
    busquedaBinariaTimes.push(time);
    busquedaBinariaTableData.textContent = time / 1000 + " segundos";
  }
  const reducer = (accumulator, curr) => accumulator + curr;

  let promedioTiemposSecuencial =
    busquedaSecuencialTimes.reduce(reducer) / 1000 / numeroDeCorridas.value;
  let promedioTiemposCentinela =
    busquedaSecuencialCentinelaTimes.reduce(reducer) /
    1000 /
    numeroDeCorridas.value;
  let promedioTiemposBinaria =
    busquedaBinariaTimes.reduce(reducer) / 1000 / numeroDeCorridas.value;

  tableRowPromedios.childNodes[0].textContent = "X̅";
  tableRowPromedios.childNodes[1].textContent =
    promedioTiemposSecuencial.toFixed(4) + " segundos";
  tableRowPromedios.childNodes[2].textContent =
    promedioTiemposCentinela.toFixed(4) + " segundos";
  tableRowPromedios.childNodes[3].textContent =
    promedioTiemposBinaria.toFixed(4) + " segundos";
}
