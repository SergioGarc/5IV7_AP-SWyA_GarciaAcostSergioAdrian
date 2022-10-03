/*
Ejemplos de destructuración
*/

//tenemos el siguiente arreglo
const arregloOrdenadoMayoraMenor = [10, 9, 8, 7, 6, 5, 4, 3 ,2, 1, 0];
console.log(`arregloOrdenadoMayoraMenor: ${arregloOrdenadoMayoraMenor}`)

//supongamos que usaran varias veces la primera pocision que consiste en el valor mas grande del arreglo es conveniente destructuracion para tener un nombre mas significativo

const [valorMasGrande] = arregloOrdenadoMayoraMenor;
console.log(`valorMasGrande: ${valorMasGrande}`);

//podemos obtener tantas variables como deseemos con el patron rest que indica... nombre de la variable podemos asignar el resto de valores

const [valorMasGrande1, valorMasGrande2, valorMasGrande3, ...restoDeValores] = arregloOrdenadoMayoraMenor;
console.log(`valorMasGrande1, valorMasGrande2, valorMasGrande3, ...restoDeValores: ${valorMasGrande}, ${valorMasGrande2}, ${valorMasGrande3}, ${restoDeValores},`);

//Supongamos que tenemos el siguiente objeto para poder ejemplificar el resultado de busqueda de esta funcion

const resultadoDeBusqueda = {
    resultados: [
        "resultado 1",
        "resultado 2",
        "resultado 3",
        "resultado 4",
        "resultado 5",
        "resultado 6",
        "resultado 7",
    ], 
    total : 7,
    mejorCoincidencia: "resultado 3"
};

console.log(`resultadoDeBusqueda: ${resultadoDeBusqueda}`);

//supongamos que solo nos interesa la mejor coincidencia con ello podemos destructurar un objeto de la siguiente manera

const{mejorCoincidencia} = resultadoDeBusqueda;

console.log(`mejorCoincidencia: ${mejorCoincidencia}`);

//Ademasa podemos cambiar el nombre, lo cual puede llegar a ser util para mantener la consistencia en el codigo, haciendo uso de la siguiente nomenclatura

const {mejorCoincidencia:  nuevoNombre} = resultadoDeBusqueda

console.log(`nuevoNombre: ${nuevoNombre}`);

//otro uso util de la destructuracuin es que podemos crear copias tanto de objetos y arreglos

const copiaDelResultadoDeBusqueda = {...resultadoDeBusqueda};
console.log(`copiaDelResultadoDeBusqueda: ${copiaDelResultadoDeBusqueda}`);

const copiaDelArregloOrdenado = [...arregloOrdenadoMayoraMenor];

console.log(`copiaDelArregloOrdenado: ${copiaDelArregloOrdenado}`);

//al destructurar podemos agregar informacion

const copiaDelResultadoDeBusquedaModificada = {...resultadoDeBusqueda, cadenaBuscada: "resultado 3"};
console.log(`copiaDelResultadoDeBusquedaModificada: ${copiaDelResultadoDeBusquedaModificada}`);

const copiaDelArregloOrdenadoConNuevoMayor = [11, ...arregloOrdenadoMayoraMenor];
console.log(`copiaDelArregloOrdenadoConNuevoMayor: ${copiaDelArregloOrdenadoConNuevoMayor}`);