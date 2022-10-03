/*
Vamos a crear una api rest que nos permite obtener info sobre diferentes pokemones, se puede consultar desde https://pokeapi.co/
*/

const pokeApiUrl = "https://pokeapi.co/api/v2/"

const pokedex = () => 
{
    // Este es un objeto auxiliar que nos permite accerder a los campo destinados a mostrar estadisticas del pokemon a buscar, como pueden ver estamos haciendo uso de la api de DOM
    // que vimos anteriormente
    const pokemonStatsElement =
    {
        hp: document.getElementById("pokemonStatHp"),
        attack: document.getElementById("pokemonStatAttack"),
        defense: document.getElementById("pokemonStatDefense"),
        specialAttack: document.getElementById("pokemonStatSpecialAttack"),
        specialDefense: document.getElementById("pokemonStatSpecialDefense"),
        speed: document.getElementById("pokemonStatSpeed")
    };

    // Este es una referencia auxiliar que nos permitira usar las clases que estan en el archivo de css de acuerdo al tipo de pokemon
    let currentClassType = null;
    // Esta es una simple cadena para crear la imagen
    const imageTemplate = "<img class='pokedisplay' src='{imgSrc}' alt='pokedisplay' />";

    // este objeto sirve para guardar las rutas de las imagenes de apoyo que se utilizaran cuando esperemos el resultado 
    // de la busqueda o cuando no se encuentre el pokemon solicitado
    const images = 
    {
        imgPokemonNotFound: ".img/404.png",
        imgLoading: "./img/loading.gif"
    };

    // Este objeto contiene las referencias de los elementos que se desplegaran con la informacion del pokemon
    const container = 
    {
        imageContainer: document.getElementById("pokedisplay-container"),
        pokemonTypesContainer: document.getElementById("pokemonTypes"),
        pokemonNameElement: document.getElementById("pokemonNameResult"),
        pokemonAbilitiesElement: document.getElementById("pokemonAbilities"),
        pokemonMovesElement: document.getElementById("pokemonMoves"),
        pokemonIdElements: document.getElementById("pokemonId")
    }

    // Este objeto contiene las referencias de los botones 
    const buttons = 
    {
        all: Array.from(document.getElementById("btn")),
        search: document.getElementById("btnSearch"),
        next: document.getElementById("btnUp"),
        previous: document.getElementById("btnDown")
    }

    // Este objeto procesa las abilidades del pokemon y los coloca en su respectivo contenedor
    const processPokemonAbilities = (pokemonData) => 
    {
        let pokemonAbilitiesContent = "";
        pokemonData.abilities?.array.forEach((pokemonAbility) => 
        {
            pokemonAbilitiesContent += `<li>${pokemonAbility.ability.name}</li>`    
        });
        container.pokemonAbilitiesElement.innerHTML = pokemonAbilitiesContent;

    }

    //Poner la imagen de cargando y desabilitar los otros botones
    const setLoading = () =>
    {
        container.imageContainer.innerHTML = imageTemplate.replace("{imgSrc}", images.imgLoading)
        buttons.all.forEach(button => button.disable = true)
    }

    // para volver a hablilitar los botones 
    const setLoadingComplete = () =>
    {
        buttons.all.forEach(button => checkDisabled(button))
    }

    // Esta funcion es la que consulta la pokeapi para obtener la informacion del pokemon solicitado
    // fetch nos sirve para hacer solicitudes a otros sitios, pero tambien se puede usar para cargar archivos locales fetch recive 
    // la url del recurso o destino de la peticion, y un objeto que nos ayuda a establecer algunos parametros de la peticion

    // Fetch devuelve una promesa, por eso tiene un then y un catch por otro lado get PokemonData devuelve un objeto json con la informacion del pokemon
    // o en caso de un error el objeto de la peticion que fallo 
    const getPokemonData = async(pokemonName) => fetch(`${pokeApiUrl}pokemon/${pokemonName}`,
    {
        // existen varios metodos de httm que sirven entre otras cosas para especificar el tipo de peticion pero tambien es necesario
        // para enviar adecuadamente sus parametros
        method : 'GET', //get, post, put, delete, etc
        // en las cabeceras de la peticion se puede especificar el tipo de informacion que vamos a usar, tambien aqui se suele colocar por ejemplo la
        // identidad del usuario por si la peticion requiere alguna infornacion de este tipo o por motivos de seguridas
        headers: 
        {
            'Content-Type' : 'aplication/json'
        },
        // body : JSON.stringfy(miObjetoJson) || ""
        // esto sirve cuando tu peticion use un cuerpo por ejemplo (post y put) debes convertirlo en string
        
    })

    .then((res) => res.json()).catch((error) => ({requestFailed: true}));
    
    // esta funcion valida si debe deshabilitar los botones o no, en este caso unicamente el boton inferior si esta el id en 1 ya qu eno hay
    // pomon ID negativo

    const checkDisabled = (button) =>
    {
        button.disable = button.id === "bynDown" && container.pokemonIdElement.value <= 1;
    }

    // esta funcion es la principal para validar que reciba un nombre o id y realiza la busqueda del pokemon y procesa la respuesta para colocar 
    // los datos en sus respectivos campos

    const setPokemonData = async (pokemonName) => 
    {
        if(pokemonName)
        {
            setLoading();
            // realizar la consulta con await esperar a tener la respuesta primero hay que usar un operador ternario para obtener el nombre
            // en  minuscula si es string
            const pokemonData = await getPokemonData(typeof pokemonName === typeof "" ? pokemonName.toLowerCase() : pokemonName)

            if(pokemonData.requestFailed)
            {
                // no hay pokemon
                container.imageContainer.innerHTML = imageTemplate.replace("{imgSrc}", images.imgPokemonNotFound)
            }
            else
            {
                container.imageContainer.innerHTML = `${imageTemplate.replace("{imgSrc}", pokemonData.sprites.front_default)} ${imageTemplate.replace("{imgSrc}", pokemonData.sprites.front_shiny)}`;

                container.pokemonNameElement.innerHTML = pokemonData.name;
                container.pokemonIdElement.value = pokemonData.id;

                processPokemonType(pokemonData)
                processPokemonStats(pokemonData)
                processPokemonAbilities(pokemonData)
                processPokemonMoves(pokemonData)
            }
        }
        else
        {
            // esta es la forma de usar SweetAlert
            SVGFEDropShadowElement.fire({
                tittle : "Error!",
                text :  "Ingresa el nombre de un pokemon primreo",
                icon : "error",
                confirmButtonText : "Aceptar"
            })
        }
    }


}