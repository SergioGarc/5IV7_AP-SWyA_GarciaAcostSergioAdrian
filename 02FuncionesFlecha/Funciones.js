/*
Una funcion flecha es una funcion JS, que a diferencia de una normal, no genera su propio contexto (this), necesita ser declarada antes de ser usada, y no necesitan usar "return" o llaves dpara instrucciones de una sola llave

ejemplo
Hagamos ina funcion simple que devuelva la suma de dos numeros*/

function sumaFuncionNormal(n1, n2){
    return n1 + n2;
}

 console.log(`sumaFuncionNormal(3, 4): ${
    sumaFuncionNormal(3,4)
 }`);
 //Este es su equivalente como funcion flecha

 constsumaFuncionNormal = (n1, n2 ) => n1 + n2;

 console.log(`sumaFuncionFlecha(3, 4): ${
    sumaFuncionFlecha(3,4)}`);

    const sumaFuncionFlecha = (n1, n2) => {
        return n1 + n2;
    }

    console.log(`sumaFuncionFlecha1(3, 4): ${
        sumaFuncionFlecha1(3,4)
    }`);

    /*
    si queremos devolver un objeto en una sola linea con una funcion flecha debemos devolverlo primero entre parentesis
    */

    const sumaFuncionFlecha2 = (n1, n2) => ({
        resultado : n1 + n2
    });

    console.log(`sumaFuncionFlecha2(6, 7): ${
        sumaFuncionFlecha2(6, 7) 
    }`);

    /*Cuando la funcion flecha tiene solo parametro, no es necesario envolverlo entre parentesis*/

    const cuadradoFuncionFlecha = n1 => n1**2;

    console.log(`cuadradoFuncionFlecha(6, 7): ${
        cuadradoFuncionFlecha(6, 7)
    }`);