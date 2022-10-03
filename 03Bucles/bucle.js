//ejemplo de uso de bucles

const razasDePerros = [
    "Gran Danes",
    "Dogo de Burdeos",
    "Dogo de Argentina",
    "San Bernardo",
    "Mastin del Pirineos",
    "Mastin Español",
    "Chihuahua",
    "Pastor Aleman",
    "",
    ""
];

/*Para esta nueva version de JS se agrego el bucle for/of que permite iterar sobre los elementos de objetos iterables*/

//primero como un for tradicional
for(let indice = 0; indice < razasDePerros.length; indice++){
    console.log(razasDePerros[indice]);
}

//Ahora con un for/of

for(const raza of razasDePerros){
    console.log(raza);
}
/*
Tambien existen un bucle for/in que itera sobre las llaves del objeto en el caso de un arreglo estas llaves son los indices
*/

for(const indice in razasDePerros){
    console.log(razasDePerros[indice]);
}