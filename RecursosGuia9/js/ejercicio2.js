// Obteniendo la referencia de los elementos
// por medio de arreglos asociativos
// aqui se esta utilizando el atributo name de cada elemento
const formulario = document.forms["frmRegistro"];
const button = document.forms["frmRegistro"].elements["btnRegistro"];

// CREANDO MODAL CON BOOTSTRAP
const modal = new bootstrap.Modal(document.getElementById("idModal"), {});

// OBTENIENDO LA REFERENCIA DEL CUERPO DEL MODAL
// PARA IMPRIMIR EL RESULTADO
const bodyModal = document.getElementById("idBodyModal");

 // Recorrer el formulario 
const recorrerFormulario = function () {
    let totText = 0;
    let totRadio = 0;
    let totCheck = 0;
    let totDate = 0;
    let totSelect = 0;
    let totFile = 0;
    let totPass = 0;
    let totEmail = 0;

    // Recorriendo elementos del formulario
    let elementos = formulario.elements;
    let totalElementos = elementos.length;

    for (let index = 0; index < totalElementos; index++) {
        // Accediendo a cada hijo del formulario
        let elemento = elementos[index];

        // verificando el tipo de control en el formulario
        let tipoElemento = elemento.type;
        // verificando el tipo de nodo
        let tipoNode = elemento.nodeName;

        // Contabilizando el total de INPUT TYPE TEXT
        if (tipoElemento == "text" && tipoNode == "INPUT") {
            console.log(elemento);
            totText++;
        }
        // Contabilizando el total de INPUT TYPE= PASSWORD 
        else if (tipoElemento == "password" && tipoNode == "INPUT") {
            console.log(elemento);
            totPass++;
        }
        // Contabilizando el total de INPUT TYPE= EMAIL
        else if (tipoElemento == "email" && tipoNode == "INPUT") {
            console.log(elemento);
            totEmail++;
        }
        // Contabilizando el total de INPUT TYPE = RADIO
        else if (tipoElemento == "radio" && tipoNode == "INPUT") {
            console.log(elemento);
            totRadio++;
        }
        // Contabilizando el total de INPUT TYPE = CHECKBOX 
        else if (tipoElemento == "checkbox" && tipoNode == "INPUT") {
            console.log(elemento);
            totCheck++;
        }
        // Contabilizando el total de INPUT TYPE = FILE 
        else if (tipoElemento == "file" && tipoNode == "INPUT") {
            console.log(elemento);
            totFile++;
        }
        // Contabilizando el total de INPUT TYPE = CHECKBOX 
        else if (tipoElemento == "date" && tipoNode == "INPUT") {
            console.log(elemento);
            totDate++;
        }
        // Contabilizando el total de INPUT TYPE = EMAIL 
        else if (tipoNode == "SELECT") {
            console.log(elemento);
            totSelect++;
        }
    }

    let resultado =`
Total de input[type="text"] ${totText}<br> =
Total de input[type="password"] = ${totPass} <br>
Total de input[type="radio"] ${totRadio}<br>
Total de input[type="checkbox"] = ${totCheck}<br>
Total de input[type="date"] = ${totDate}<br>
Total de input[type="email"] = ${totEmail}<br>
Total de select ${totSelect}<br>
`;

bodyModal.innerHTML = resultado;
//Funcion que permite mostrar el modal de Bootstrap 
//Esta funcion es definida por Bootstrap
modal.show();
};

const validarFormulario = () => {
    // Obtener los valores de los campos del formulario
    const nombre = formulario.elements["idNombre"].value;
    const apellidos = formulario.elements["idApellidos"].value;
    const fechaNacimiento = new Date(formulario.elements["idFechaNac"].value);
    const correo = formulario.elements["idCorreo"].value;
    const password = formulario.elements["idPassword"].value;
    const repetirPassword = formulario.elements["idPasswordRepetir"].value;
    const intereses = [
        formulario.elements["idCkProgramacion"].checked,
        formulario.elements["idCkBD"].checked,
        formulario.elements["idCkRedes"].checked,
        formulario.elements["idCkSeguridad"].checked
    ];
    const carrera = formulario.elements["idRdCarrera"].value;
    const pais = formulario.elements["idCmPais"].value;
    const archivo = formulario.elements["idArchivo"].value;
    const extensionesPermitidas = [".jpg", ".jpeg", ".png"];

    // Realizar las validaciones
    if (nombre === "" || apellidos === "" || fechaNacimiento === "" || correo === "" || password === "" || repetirPassword === "" || carrera === "" || pais === "") {
        alert("Todos los campos son obligatorios.");
        return false;
    }

    if (fechaNacimiento >= new Date()) {
        alert("La fecha de nacimiento no puede ser mayor o igual a la fecha actual.");
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
        alert("Correo electrónico inválido.");
        return false;
    }

    if (password !== repetirPassword) {
        alert("Las contraseñas no coinciden.");
        return false;
    }

    if (!intereses.some(interes => interes)) {
        alert("Debe seleccionar al menos un interés.");
        return false;
    }
    
    if (archivo === "") {
        alert("Debe seleccionar un archivo.");
        return false;
    }

    const extension = archivo.slice(archivo.lastIndexOf(".")).toLowerCase();
    if (!extensionesPermitidas.includes(extension)) {
        alert("El archivo debe tener una extensión .jpg o .png.");
        return false;
    }

    // Crear una tabla con los datos y mostrarla en el modal
    const tabla = `
        <table class="table">
            <tbody>
                <tr>
                    <th>Nombres</th>
                    <td>${nombre}</td>
                </tr>
                <tr>
                    <th>Apellidos</th>
                    <td>${apellidos}</td>
                </tr>
                <tr>
                    <th>Fecha de Nacimiento</th>
                    <td>${fechaNacimiento.toLocaleDateString()}</td>
                </tr>
                <tr>
                    <th>Correo Electrónico</th>
                    <td>${correo}</td>
                </tr>
                <tr>
                    <th>Intereses</th>
                    <td>${intereses.map((interes, index) => interes ? `Interés ${index + 1}` : "").join(", ")}</td>
                </tr>
                <tr>
                    <th>Carrera</th>
                    <td>${carrera}</td>
                </tr>
                <tr>
                    <th>País</th>
                    <td>${pais}</td>
                </tr>
            </tbody>
        </table>
    `;

    bodyModal.innerHTML = tabla;
    modal.show();

    return true;
};

// Agregar evento al botón de envío
button.onclick = () => {
    if (validarFormulario()) {
        // Aquí puedes enviar el formulario si todas las validaciones son exitosas
        // formulario.submit();
    }
};