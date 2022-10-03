/*
Array

ForEach itera sobre los elementos del arreglo, no regresa nada
En la siguiente linea de codigo hace lo mismo que un bucle pero itera sobre todos los elementos del arreglo cada que lo hace ejecuta una funcion su indice y el arreglo original
*/

razasDePerros.forEach((raza, indice, arregloOriginal) => console.log(raza));

//En caso de que no utilicemos algunos de los parametros los podremos omitir, por ejemplo:

razasDePerros.forEach(raza => console.log(raza));

/*
Funcion map
Itera sobre los elementos del arreglo, regresa un arreglo diferente con el que nos muestra originalmente 
*/

const razasDePerrosEnMayusculas = razasDePerros.map((raza, indice, arregloOriginal,) => raza.toUpperCase());

/*
hay otras funciones utiles por ejemplo

find

nos permite buscar un elemento dentro del arreglo, si lo encuentra, lo regresa, y si no, lanza 'updefinide'
por ejemplo: "Chihuahua"
*/

if(razasDePerros.find((raza, indice, arregloOriginal) => raza ==="Chihuahua")){
    console.log("La raza se encuentra en el arreglo");
}else{
    //Hay que meterlo
    razasDePerros.push("Chihuahua");
    console.log("Se agregó la raza");
}

/*
findIndex
es similar, pero en lugar de regresar el elemento, devuelve su indice, sino lo encuentra, devuelve -1, esta funcion es particularmente util
*/

const indiceDeChihuahua = razasDePerros.findIndex((raza, indice, arregloOriginal) => raza === "Chihuahua")
    if(indiceDeChihuahua > -1){
        //Resultado esperado pq si esta
        console.log(razasDePerros[indiceDeChihuahua])
    razasDePerros[indiceDeChihuahua] += "(Raza de perro pequeña)"
    //Resultado esperado
    //Chihuahua (Raza de perro pequeña)
    console.log(razasDePerros[indiceDeChihuahua])
    }
