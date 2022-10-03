/*
una promesa es algo que no se debe de romper
la siguiente  funcion sera utilizada como un callback en caso de que la operacion sea exitosa
*/

const fueExitosa = (resultado) => 
{
    console.log(`La operacion fue exitosa ${resultado}`)
}


//La siguiente operacion sera utilizada como callback en caso contrario


const fueErronea = (resultado) => 
{
    console.log(`La operacion fue fallo ${resultado}`)
}

// una promesa recibe una funcion principal que tiene dos parametros y el callback en caso de exito y el callback en caso contrario
//  Debe tener formato de REQ, res

const miPromesaSiFunciona = new Promise((salioBien, salioMal) =>
{

// en la funcion principal va codigo que no se pueda completar de forma asincrona o instantanea, tal como peticiones a un servidor externo
    try{
        const division = 10/5;
        //como no hay nada malo con este codigo nos devolvera true
        salioBien(division);
    }
    catch(e){
        salioMal(e);
    }

});

// hay dos  formas de usar los call back, pasando ambos en el then o pasando solo la de exito en el then y
// usando un catch

miPromesaSiFunciona.then(fueExitosa, fueErronea);

miPromesaSiFunciona.then(fueExitosa).catch(fueErronea);

// tambien se puede usar con funciones anonimas 
miPromesaSiFunciona.then((resultado) =>
{
    console.log(`La operacion Fue exitosa ${resultado}`);

}).catch((resultado) => 
{
    console.log(`La operacion fallo ${resultado}`);
});


/*
Algo muy importante de las promesas es recordar que son asincronas es decir que no se ejecutan de 
forma simultanea inmediata, sino que una ve que termina su ejecucion con then determina que hacer
*/

// para una funcion flecha podemos tambien cambiarla por

const unaFuncionFlechaAsincrona =  async() =>
{
    const resultadoDeLaPromesa = await miPromesaSiFunciona.then((resultado) => 
    {
        console.log(`La operacion fue exitosa${resultado}`);
        return resultado;
    })
    // la variable resultadoDeLaPromesa contiene el valor del resultado que esta en el return,
    // pero solo pro que usamos await si no tendria una promesa y no podriamos hacer uso del resultado
    console.log("Chillo por que sle de la funcion flecha rara del await")
    console.log(resultadoDeLaPromesa);

};

unaFuncionFlechaAsincrona();

