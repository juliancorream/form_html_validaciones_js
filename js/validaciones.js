export function valida(input){
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }
    
    if (input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];

const mensajesDeError = {
    nombre: {
        valueMissing: "El Campo nombre no puede estar Vacio",
    },
    email: {
        valueMissing: "El Campo correo no puede estar Vacio",
        typeMismatch: "El correo no es Valido"
    },
    password: {
        valueMissing: "El Campo contraseña no puede estar Vacio",
        patternMismatch:
        "Al menos 6 caracteres, maximo 12,debe contener una letra minúscula, una mayúscula, un número y no puede contener caracteres especiales",
    },
    nacimiento: {
        valueMissing: "Este Campo no puede estar Vacio",
        customError: "Debes tener al menos 18 años de edad",
    },
    numero: {
        valueMissing: "El Campo numero telefonico no puede estar Vacio",
        patternMismatch: "El Formato requerido es XXXXXXXXXX 10 numeros"
    },
    direccion: {
        valueMissing: "El Campo direccion no puede estar Vacio",
        patternMismatch: "La direccion debe contener entre 10 a 40 caracteres"
    },
    ciudad: {
        valueMissing: "El Campo ciudad no puede estar Vacio",
        patternMismatch: "La ciudad debe contener entre 10 a 40 caracteres"
    },
    estado: {
        valueMissing: "El Campo estado no puede estar Vacio",
        patternMismatch: "El estado debe contener entre 10 a 40 caracteres"
    },
};

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje = "";
    tipoDeErrores.forEach( (error) => {
        if(input.validity[error]){
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    });
    return mensaje;
}

function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if (!mayorDeEdad(fechaCliente)){
        mensaje = "Debe tener al menos 18 Años de edad";
    }
    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    );
    return diferenciaFechas <= fechaActual;
}
