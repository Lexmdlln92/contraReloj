// seleccionamos los elementos del DOM con los que se va a interactuar.
const cronometro = document.getElementById('cronometro');
const btnIniciarPausar = document.getElementById('btn-iniciar-pausar');
const btnReiniciar = document.getElementById('btn-reiniciar');

// definimos 3 variables hora, min, segundos
let [horas, minutos, segundos] = [0, 0, 0];

// estos son los dos estados posibles
let intervaloDeTiempo;
let estadoCronometro = 'pausado';

// lógica del cronómetro
function actualizarCronometro() {
  segundos++;
  // cuando "segundos" se divida con 60 será igual a uno, es decir, que segundos++ inicia en 0 y cuando llega a 60 se reinicia a 0 y se incrementa "minutos++", y así igual para crear las horas.
  if (segundos / 60 === 1) {
    segundos = 0;
    minutos++;

    if (minutos / 60 === 1) {
      minutos = 0;
      horas++;
    }
  }

  // debemos agregar el cero para el formato de la hora a seg, min, horas.
  const segundosFormato = asignarFormato(segundos);
  const minutosFormato = asignarFormato(minutos);
  const horasFormato = asignarFormato(horas);

  // actualizamos lo que va a mostrar el innerText con las plantillas literarias (``) que son las que modifican el DOM o el texto interno
  cronometro.innerText = `${horasFormato}:${minutosFormato}:${segundosFormato}`;
}

// esta función retorna: si la unidad de tiempo es menor que 10 se agrega el 0 adelante, y si la unidad es mayor o igual a 10 se retorna la unidad de tiempo.
function asignarFormato(unidadDeTiempo) {
  return unidadDeTiempo < 10 ? '0' + unidadDeTiempo : unidadDeTiempo;
}

// agregamos los eventos de los botones
// el botón iniciar tiene dos estados: iniciar conteo y pausar.
const botonInicioPausa = document.getElementById('btn-iniciar-pausar');
botonInicioPausa.addEventListener('click', function () {
  // creamos la condición del estado del botón
  if (estadoCronometro === 'pausado') {
    intervaloDeTiempo = window.setInterval(actualizarCronometro, 1000);
    botonInicioPausa.innerHTML = '<i class="bi bi-pause-fill"></i>';
    botonInicioPausa.classList.remove('iniciar');
    botonInicioPausa.classList.add('pausar');
    estadoCronometro = 'andando';
  } else {
    window.clearInterval(intervaloDeTiempo);
    botonInicioPausa.innerHTML = '<i class="bi bi-play-fill"></i>';
    botonInicioPausa.classList.remove('pausar');
    botonInicioPausa.classList.add('iniciar');
    estadoCronometro = 'pausado';
  }
});

//BOTON REINICIAR 
// creamos el evento del botonreiniciar , con window. clearInterval limpiamos el intervalo de tiempo

btnReiniciar.addEventListener('click', function() {
  window.clearInterval(intervaloDeTiempo);

  horas = 0;
  minutos = 0;
  segundos = 0;

  // reiniciar cronómetro
  cronometro.innerText = '00:00:00';
  // esto modifica el estado del boton iniciar a color verde cuando se oprime el reinicio.
  botonInicioPausa.innerHTML = '<i class="bi bi-play-fill"></i>';
  botonInicioPausa.classList.remove('pausar');
  botonInicioPausa.classList.add('iniciar');

  estadoCronometro = 'pausado';
});
