//vamos a crear un carrusell de imagen que se consume por medio de una api

window.onload = () => {
    //las imagenes
    const imagenes = [
        
        "https//w.wallhaven.cc/full/l3/wallhaven-l315",
        "https//w.wallhaven.cc/full/l3/wallhaven-l315",
        "https//w.wallhaven.cc/full/l3/wallhaven-l315",
        "https//w.wallhaven.cc/full/l3/wallhaven-l315",
    ];
    //con la api de dom podemos acceder al documento HTML, para esto necesitamos buscar, estos nodos de alguna manera a partir de los id
    //Podemos buscar a los elementos de diferentes formas: por nombre, por clases, por etiquetas
    // de estos atributos solo la busqueda por ID nos

    const display = document.getElementById("display");
    const botones = Array.from(document.getElementsByName("boton"));
    const campoMensaje = document.getElementById("mensaje");
    const mensajes = document.getElementById("mensajes");
    const colorValor = document.getElementById("colorValor");

    let imagenActual = 0;
    const imagenAnterior = () =>{
        //accedemos a la imagen dentro del arreglo con su indice, cuando es la ultima regresamos a la primera
        if(imagenActual > 0){
            imagenActual--;
        }else{
            imagenActual = imagenes.length-1;
        }
        display.src = imagenes[imagenActual];
    };

    const pantallaCompleta = () =>{

        //otra forma para cuando se solicita la pantalla completa nos devuelva una promesa
        //por si queremos manejar el elemento de pantalla completa
        display.requestFullscreen();
    };

    const mostrarMensajes = () =>{
        //otra de las cosas que se pueden haceres modificar el HTML interno de un elemento para agregar de forma dinamica nuevos elementos

        mensajes.innerHTML += `${campoMensaje.value}
        <br/>`;
        campoMensaje.value = "";
        //si queremos manipular los elementos recien creados
        //createElement
        //const lista = document.createElement("ull");
        //const elemtoLista = document.createElement("li");
        //elementoLista.onclick = pantallaCompleta;
        //elementoLista.innerHTML = `${campoMensaje.value}`;
        //lista.append(elementoLista);
        //mensajes.append(lista);    
    };

    const cambiarColor = () =>{
        //en lugar de usar typecolor usamos un color con un icono
        colorValor.click();
    };

    const inicializar = () =>{
        //Vamos a ver los botones
        botones.find(boton => boton.id === "siguiente").onclick = imagenSiguiente;
        botones.find(boton => boton.id === "anterior").onclick = imagenAnterior;
        botones.find(boton => boton.id === "pantallaCompleta").onclick = pantallaCompleta;
        botones.find(boton => boton.id === "mostrarMensaje").onclick = mostrarMensajes;
        botones.find(boton => boton.id === "cambiarColor").onclick = cambiarColor;

        //en general podemos manipular cualquier atributo

        colorValor.onchange = () =>{
            mensajes.style.color = colorValor.value;
        };

        display.src = imagenes[0];
    };

    inicializar();
};