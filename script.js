// Variables para almacenar los valores
let display = document.getElementById('display');
let primerNumero = '';
let operador = '';
let segundoNumero = '';
let resultado = '';

/**
 * Agrega un número a la pantalla
 * @param {string} numero - El número a agregar
 */
function agregarNumero(numero) {
    // Si hay un resultado y presionamos un número, comenzamos de nuevo
    if (resultado !== '') {
        primerNumero = numero;
        segundoNumero = '';
        operador = '';
        resultado = '';
        display.value = numero;
        return;
    }

    // Si no hay operador, agregamos al primer número
    if (operador === '') {
        primerNumero += numero;
        display.value = primerNumero;
    } else {
        // Si hay operador, agregamos al segundo número
        segundoNumero += numero;
        display.value = primerNumero + ' ' + operador + ' ' + segundoNumero;
    }
}

/**
 * Agrega un operador matemático
 * @param {string} op - El operador (+, -, *, /)
 */
function agregarOperador(op) {
    // Si no hay primer número, no hacemos nada
    if (primerNumero === '') {
        return;
    }

    // Si ya hay un operador, calculamos el resultado primero
    if (operador !== '' && segundoNumero !== '') {
        calcular();
        operador = op;
        segundoNumero = '';
        display.value = primerNumero + ' ' + operador;
        return;
    }

    // Agregamos el operador
    operador = op;
    display.value = primerNumero + ' ' + operador;
}

/**
 * Agrega un punto decimal
 */
function agregarDecimal() {
    if (operador === '') {
        // En el primer número
        if (primerNumero === '') {
            primerNumero = '0.';
        } else if (!primerNumero.includes('.')) {
            primerNumero += '.';
        }
        display.value = primerNumero;
    } else {
        // En el segundo número
        if (segundoNumero === '') {
            segundoNumero = '0.';
        } else if (!segundoNumero.includes('.')) {
            segundoNumero += '.';
        }
        display.value = primerNumero + ' ' + operador + ' ' + segundoNumero;
    }
}

/**
 * Calcula el resultado de la operación
 */
function calcular() {
    // Validamos que tengamos todos los elementos
    if (primerNumero === '' || operador === '' || segundoNumero === '') {
        return;
    }

    let num1 = parseFloat(primerNumero);
    let num2 = parseFloat(segundoNumero);
    let res = 0;

    // Realizamos la operación según el operador
    switch (operador) {
        case '+':
            res = num1 + num2;
            break;
        case '-':
            res = num1 - num2;
            break;
        case '*':
            res = num1 * num2;
            break;
        case '/':
            // Validamos división por cero
            if (num2 === 0) {
                display.value = 'Error: División por 0';
                limpiar();
                return;
            }
            res = num1 / num2;
            break;
        default:
            return;
    }

    // Redondeamos a 8 decimales para evitar errores de precisión
    res = Math.round(res * 100000000) / 100000000;

    // Almacenamos el resultado
    resultado = res.toString();
    primerNumero = resultado;
    operador = '';
    segundoNumero = '';

    // Mostramos el resultado
    display.value = resultado;
}

/**
 * Limpia toda la calculadora
 */
function limpiar() {
    primerNumero = '';
    operador = '';
    segundoNumero = '';
    resultado = '';
    display.value = '';
}

/**
 * Borra el último carácter
 */
function borrarUltimo() {
    if (operador === '') {
        // Estamos en el primer número
        primerNumero = primerNumero.slice(0, -1);
        display.value = primerNumero;
    } else if (segundoNumero !== '') {
        // Estamos en el segundo número
        segundoNumero = segundoNumero.slice(0, -1);
        display.value = primerNumero + ' ' + operador + ' ' + segundoNumero;
    } else {
        // Borramos el operador
        operador = '';
        display.value = primerNumero;
    }
}

// Permitir usar el teclado
document.addEventListener('keydown', function(event) {
    const key = event.key;

    // Números
    if (key >= '0' && key <= '9') {
        agregarNumero(key);
    }
    // Operadores
    else if (key === '+') {
        agregarOperador('+');
    }
    else if (key === '-') {
        agregarOperador('-');
    }
    else if (key === '*') {
        agregarOperador('*');
    }
    else if (key === '/') {
        event.preventDefault();
        agregarOperador('/');
    }
    // Decimal
    else if (key === '.') {
        agregarDecimal();
    }
    // Igual o Enter
    else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calcular();
    }
    // Backspace para borrar
    else if (key === 'Backspace') {
        event.preventDefault();
        borrarUltimo();
    }
    // Escape para limpiar
    else if (key === 'Escape') {
        limpiar();
    }
});

// Inicializar la pantalla
display.value = '';