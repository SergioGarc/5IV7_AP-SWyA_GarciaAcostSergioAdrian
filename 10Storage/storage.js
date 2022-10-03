//En la siguiente clase nos ayudara a manejar una lista de tareas de tal forma que sea mas sencillo agrupar y realizar las operaciones mas comunes

const Storage = () => {
    class StorageTodoAppHelper{
        constructor(storageName, initialValue){
            /**La storage de esta api viene de: 
             * provee el acceso al almacenamiento que existe por sesion y por almacenamiento local,
             * en este caso usaremos la tiene mayor persistencia en el localStorage
             * 
             * Storage simplemente conjuntos de clave, valor, getItem, nos da el valor al proporcionar la clave y devuelve nulo si no existe
             */
            let currentStorage = localStorage.getItem(storageName);
            if(!currentStorage){
                //Si no existe aún, la inicializamos
                localStorage.setItem(storageName, JSON.stringify(initialValue));
                currentStorage = initialValue;
            }else{
                /**en caso contrario la convertimos en un objeto JSON, storage solo almacena cadenas de texto, por eso es necesario esta conversion */
            currentStorage = JSON.parse(currentStorage);
            }
      /**Guardamos tanto los valores actuales como el nombre de la seccion de alacenamiento que utilizaremos, los valores ya leidos se gurdan para vvitar la lectura y conversion constante de storage,
       * lo cual ouede demorar conforme el objeto crezca
       */
      //los hacemos privados
      this._storageName = storageName;
      this._currentValues = currentStorage;

        }
        addItem(newItem){
            /**Cuando se agrega un valor lo agregamos a los valores ya cargados, haciendo un respaldo en Storage */
            this._currentValues.push(newItem);
            localStorage.setItem(this._storageName, JSON.stringify(this._currentValues));
        }

        getItem(findFunction){
            /**Cuando se quiere consultar un valor en especifico no es necesario buscarlo en storage, basta con consultarlo con los valores ya cargados
             */
            return this._currentValues.find(findFunction);
        }
        
        updateItem(findFunction, newItem){
            /**Cuando se actualiza un valor, lo actualizamos a los valores ya cargados, haciendo un respaldo en storage */
            const itemIndex = this._currentValues.findIndex(findFunction);
            this._currentValues[itemIndex] = {...this._currentValues[itemIndex], ...newItem};
            localStorage.setItem(this._storageName, JSON.stringify(this._currentValues));
        }

        getItem(){
            /**cuando se quiere consultar los items no es necesario buscarlo, basta de unuevo consultarlo directo*/
            return this._currentValues;
        }

        deleteItem(findFunction){
            /**Cuando se elimina un valor, lo actualizaremos a los valores ya cargados */
            this._currentValues.splice(this._currentValues.findIndex(findFunction), 1);
            localStorage.setItem(this._storageName, JSON.stringify(this._currentValues));
        }


    }

    /**se carga el template usando para crear elementos de la lista de tareas */
    const loadListItemTemplete = () => {
        const templateDomItem = document.getElementById("listItemTemplate");
        const template = templateDomItem.innerHTML.trim();
        //una vez leida la plantilla se elimina
        templateDomItem.remove();
        return template;
    };

    //Cargamos los elementos del DOM
    const DOMElements = {
        taskName : document.getElementById("txtTaskName"),
        addButton : document.getElementById("btnAddTask"),
        taskList : document.getElementById("taskList"),
        changeWallpaperButton : document.getElementById("btnChangeWallpaper"),
        editUser : document.getElementById("editUser")

    };

    //inicializamos la plantilla y la seccion de storage
    const listItemTemplate = loadListItemTemplete();
    const storage = new StorageTodoAppHelper("Storage", []);

    //Esta funcion se usa para marcar una tarea como completada

    const toggleTask = (domItem) = () =>{

        if(domItem){
            storage.updateItem((item) => item.id === +domItem.id, {completed : !domItem.classList.contains("completed")});
        }
        if(!domItem.classList.contains("completed")){
            domItem.classList.add("completed");
        }else{
            domItem.classList.remove("completed");
        }

    }

    /**Esta funcion se usa para eliminar una tarea de la lista */
    const deleteTask = (domItem) =>{
    if(domItem){
        storage.deleteItem((item) => item.id === + domItem.id)
    }
    domItem.parentElement.remove();
    };

    //crea un ejemplo de la lista de tareas
    const createDOMTaskElement = (task) =>{
//creamos un elemento DOM y llenamos los datos de la plantilla
        const template = document.getElementById('li');
        template.innerHTML = listItemTemplate.replace("{id}", task.id).replace("{template}", task.value).replace("{completed}", task.completed ? "completed" : "");
        /**accedemos a los nodos hijos creados de la plantillas los cuales son los botones y les asignamos los eventos a cada boton respectivo */

        const ourContent = template.firstChild;

        ourContent.childNodes.forEach(child => {
            if(child.classList?.contains("complete")){
                child.onclick = () =>toggleTask(ourContent)
            }
            if(child.classList?.contains("delete")){
                child.onclick = () =>deleteTask(ourContent)
            }
        });
        //agregamos el elemento recien creado a la lista de tareas
        DOMElements.taskList.append(template);
    }

    //esta funcion es para el renderizado
    const renderTask = () => {
        //si no tiene tareas la lista, lo indicamos
        DOMElements.taskList.innerHTML = storage.getItem() ? "" : "<li> No hay tareas aun<li>";
        //procesamos los elementos que cargamos en el storage
        storage.getItem().forEach(task => createDOMTaskElement(task));
        
    };

    //esta funcion de agregar una nueva tarea a la lista
    const addTask = () =>{
        if(DOMElements.taskName.value){
            const newTask = {
                id : Date.now,
                value : DOMElements.taskName.value,
                completed : false
            }
            //guardamos el elemento en el storage y limpiamos el campo de texto para crear el elemento de la nueva tarea
            storage.addItem(newTask);
            DOMElements.taskName.value = "";
            createDOMTaskElement(newTask);
        }
    };

    /**solicita que el usuario se registre de esta forma que se crea las sesiones en una aplicacion de front end solo que se suelen usar token en lugar del nombre
     * y en lufgar de solicitarlo por un dialogo, se hace uno de fetch para pedir a un servidor el token, usualmente proporcionado el nombre de usuario y contraseña
     */

    const requestUser = async () => {
        const {value : userName} = await Swal.fire({
            input : 'text',
            inputLabel : 'Introduce tu nombre',
            allowOutsideClick : false,
            allowEscapeKey : false,
            inputValidador : (value) =>{
                if(!value?.trim()){
                    return 'Introduce tu nombre!'
                }
            },
            inputPlaceHolder : 'Introduce tu nombre'
        });
        if(userName){
            //como puedes ver funciona igual a como se guardan las tareas del ejercicio
            localStorage.setItem("userName", userName);
            document.getElementById("title").innerHTML = `Bienvenido ${userName}!`;
        }

    };

    //Esta funcion cambia el wallpaper de la funcion
    const changeWallpaper = async () =>{
        const {value : url} = await Swal.fire({
            input : 'url',
            inputLabel : 'Introduce la url del wallpaper',
            inputPlaceHolder : 'Introduce la URL del wallpaper',
            validationMessage : "La URL no es valida",
        });
        if(url){
            localStorage.setItem("wallpaper", url),
            document.querySelector("body").style.background = `url(${url}) no-repeat center`;
        }
    };

};

window.onload = Storage;