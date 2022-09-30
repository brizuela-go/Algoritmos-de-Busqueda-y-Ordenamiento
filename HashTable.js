// DOM obtiene los elementos HTML por su ID
const hashTable = document.getElementById("hashTable");
const myString = document.getElementById("typeText");
const hashButton = document.getElementById("hash-btn");
const colisiones = document.getElementById("colisiones");

// Array y Tabla Hash (Objeto, Diccionario)
const myArray = [];
const myHash = {};

// Cadena de caracteres a Hash
// Convirtiéndola en un entero de 32 bits ASCII 32
function stringToHash(string) {
  var hash = 0;

  if (string.length == 0) return hash;

  for (i = 0; i < string.length; i++) {
    // ASCII
    char = string.charCodeAt(i);
    // 32 bits
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }

  return hash;
}

// Cuando se presione click en el botón...
hashButton.addEventListener("click", () => {
  const string = myString.value;

  myArray.push(string);

  hashTable.innerHTML = "";

  myArray.forEach((element) => {
    myHash[stringToHash(element)] = element;
    hashTable.innerHTML += `
  <tr>
      <td scope="row">${stringToHash(element)}</td>
      <td>${element}</td>
  </tr>
  
  `;
  });
  console.table(myHash);
  console.log(myHash);
});
