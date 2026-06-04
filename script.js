// Clase para representar el mazo de cartas
class Mazo {
  constructor() {
    this.palos = ['♠', '♥', '♦', '♣'];
    this.valores = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    this.cartas = [];
    this.inicializar();
  }

  inicializar() {
    this.cartas = [];
    for (let palo of this.palos) {
      for (let valor of this.valores) {
        this.cartas.push({ valor, palo });
      }
    }
    this.barajar();
  }

  barajar() {
    for (let i = this.cartas.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cartas[i], this.cartas[j]] = [this.cartas[j], this.cartas[i]];
    }
  }

  repartirCarta() {
    if (this.cartas.length === 0) {
      this.inicializar();
    }
    return this.cartas.pop();
  }
}

// Clase para manejar el juego
class BlackJack {
  constructor() {
    this.mazo = new Mazo();
    this.manoJugador = [];
    this.manoCroupier = [];
    this.juegoTerminado = false;
    this.victoriasConsecutivas = 0;
  }

  iniciarJuego() {
    this.mazo = new Mazo();
    this.manoJugador = [this.mazo.repartirCarta(), this.mazo.repartirCarta()];
    this.manoCroupier = [this.mazo.repartirCarta(), this.mazo.repartirCarta()];
    this.juegoTerminado = false;
  }

  calcularPuntuacion(mano) {
    let puntuacion = 0;
    let ases = 0;

    for (let carta of mano) {
      if (carta.valor === 'A') {
        ases++;
        puntuacion += 11;
      } else if (['K', 'Q', 'J'].includes(carta.valor)) {
        puntuacion += 10;
      } else {
        puntuacion += parseInt(carta.valor);
      }
    }

    while (puntuacion > 21 && ases > 0) {
      puntuacion -= 10;
      ases--;
    }

    return puntuacion;
  }

  esBlackJack(mano) {
    return mano.length === 2 && this.calcularPuntuacion(mano) === 21;
  }

  pedirCartaJugador() {
    if (!this.juegoTerminado) {
      this.manoJugador.push(this.mazo.repartirCarta());
      if (this.calcularPuntuacion(this.manoJugador) > 21) {
        this.juegoTerminado = true;
        return 'jugador_pierde';
      }
    }
    return null;
  }

  plantarse() {
    if (!this.juegoTerminado) {
      this.juegoTerminado = true;
      return this.jugarCroupier();
    }
    return null;
  }

  jugarCroupier() {
    while (this.calcularPuntuacion(this.manoCroupier) < 17) {
      this.manoCroupier.push(this.mazo.repartirCarta());
    }

    const puntuacionJugador = this.calcularPuntuacion(this.manoJugador);
    const puntuacionCroupier = this.calcularPuntuacion(this.manoCroupier);

    // Determinar resultado
    const jugadorBlackJack = this.esBlackJack(this.manoJugador);
    const croupierBlackJack = this.esBlackJack(this.manoCroupier);

    if (jugadorBlackJack && croupierBlackJack) {
      return 'empate_blackjack';
    } else if (jugadorBlackJack) {
      this.victoriasConsecutivas++;
      return 'jugador_blackjack';
    } else if (croupierBlackJack) {
      return 'croupier_blackjack';
    } else if (puntuacionCroupier > 21) {
      this.victoriasConsecutivas++;
      return 'croupier_pierde';
    } else if (puntuacionJugador > puntuacionCroupier) {
      this.victoriasConsecutivas++;
      return 'jugador_gana';
    } else if (puntuacionCroupier > puntuacionJugador) {
      return 'croupier_gana';
    } else {
      return 'empate';
    }
  }

  obtenerResultado() {
    const puntuacionJugador = this.calcularPuntuacion(this.manoJugador);
    
    if (puntuacionJugador > 21) {
      return 'jugador_pierde';
    }
    
    if (!this.juegoTerminado) {
      return null;
    }
    
    return this.jugarCroupier();
  }
}

// Interfaz de usuario
const juego = new BlackJack();
const btnIniciar = document.getElementById('btn-iniciar');
const btnPedir = document.getElementById('btn-pedir');
const btnPlantarse = document.getElementById('btn-plantarse');
const cartasJugador = document.getElementById('cartas-jugador');
const cartasCroupier = document.getElementById('cartas-croupier');
const puntuacionJugador = document.getElementById('puntuacion-jugador');
const puntuacionCroupier = document.getElementById('puntuacion-croupier');
const resultado = document.getElementById('resultado');

function mostrarCartas(mano, elemento, mostrarTodas = true) {
  elemento.innerHTML = '';
  for (let carta of mano) {
    const cartaDiv = document.createElement('div');
    cartaDiv.className = 'carta';
    if (['♥', '♦'].includes(carta.palo)) {
      cartaDiv.classList.add('carta-roja');
    } else {
      cartaDiv.classList.add('carta-negra');
    }
    cartaDiv.textContent = `${carta.valor}${carta.palo}`;
    elemento.appendChild(cartaDiv);
  }
}

function actualizarInterfaz() {
  mostrarCartas(juego.manoJugador, cartasJugador);
  
  if (juego.juegoTerminado) {
    mostrarCartas(juego.manoCroupier, cartasCroupier);
    puntuacionCroupier.textContent = juego.calcularPuntuacion(juego.manoCroupier);
  } else {
    cartasCroupier.innerHTML = '<div class="carta">?</div><div class="carta">?</div>';
    puntuacionCroupier.textContent = '?';
  }
  
  puntuacionJugador.textContent = juego.calcularPuntuacion(juego.manoJugador);
  
  if (juego.manoJugador.length > 0) {
    btnPedir.style.display = juego.juegoTerminado ? 'none' : 'inline-block';
    btnPlantarse.style.display = juego.juegoTerminado ? 'none' : 'inline-block';
  }
}

function mostrarResultado(resultadoJuego) {
  const mensajes = {
    'jugador_blackjack': '¡BlackJack! ¡Ganaste 3 a 2!',
    'empate_blackjack': '¡Ambos tienen BlackJack! ¡Empate!',
    'jugador_pierde': '¡Te pasaste de 21! ¡Perdiste!',
    'jugador_gana': '¡Ganaste 1 a 1!',
    'croupier_gana': '¡El croupier gana!',
    'empate': '¡Empate!',
    'croupier_pierde': '¡El croupier se pasó! ¡Ganaste 1 a 1!',
    'croupier_blackjack': '¡El croupier tiene BlackJack! ¡Perdiste!'
  };
  
  resultado.textContent = mensajes[resultadoJuego] || resultadoJuego;
  resultado.style.backgroundColor = resultadoJuego.includes('jugador') ? '#e8f5e9' : '#ffebee';
}

btnIniciar.addEventListener('click', () => {
  juego.iniciarJuego();
  actualizarInterfaz();
  resultado.textContent = '';
  btnPedir.style.display = 'inline-block';
  btnPlantarse.style.display = 'inline-block';
});

btnPedir.addEventListener('click', () => {
  const resultadoJuego = juego.pedirCartaJugador();
  actualizarInterfaz();
  
  if (resultadoJuego === 'jugador_pierde') {
    mostrarResultado(resultadoJuego);
    btnPedir.style.display = 'none';
    btnPlantarse.style.display = 'none';
  }
});

btnPlantarse.addEventListener('click', () => {
  const resultadoJuego = juego.plantarse();
  actualizarInterfaz();
  mostrarResultado(resultadoJuego);
  btnPedir.style.display = 'none';
  btnPlantarse.style.display = 'none';
});

// Casos de prueba
function ejecutarCasosDePrueba() {
  const resultados = [];
  let pruebasExitosas = 0;
  let pruebasFallidas = 0;
  
  // Función helper para crear cartas específicas
  function crearCarta(valor, palo) {
    return { valor, palo };
  }
  
  // Test 1: Jugador obtiene BlackJack y gana 3 a 2
  function test1() {
    const juegoTest = new BlackJack();
    juegoTest.manoJugador = [crearCarta('A', '♠'), crearCarta('K', '♥')];
    juegoTest.manoCroupier = [crearCarta('9', '♦'), crearCarta('7', '♣')];
    juegoTest.juegoTerminado = true;
    
    const resultado = juegoTest.obtenerResultado();
    return resultado === 'jugador_blackjack';
  }
  
  // Test 2: Ambos obtienen BlackJack (empate)
  function test2() {
    const juegoTest = new BlackJack();
    juegoTest.manoJugador = [crearCarta('A', '♠'), crearCarta('Q', '♥')];
    juegoTest.manoCroupier = [crearCarta('A', '♦'), crearCarta('J', '♣')];
    juegoTest.juegoTerminado = true;
    
    const resultado = juegoTest.obtenerResultado();
    return resultado === 'empate_blackjack';
  }
  
  // Test 3: Jugador se pasa de 21
  function test3() {
    const juegoTest = new BlackJack();
    juegoTest.manoJugador = [crearCarta('K', '♠'), crearCarta('Q', '♥'), crearCarta('5', '♦')];
    juegoTest.manoCroupier = [crearCarta('9', '♣'), crearCarta('7', '♠')];
    juegoTest.juegoTerminado = true;
    
    const resultado = juegoTest.obtenerResultado();
    return resultado === 'jugador_pierde';
  }
  
  // Test 4: Jugador se planta con 18, croupier se pasa de 21
  function test4() {
    const juegoTest = new BlackJack();
    juegoTest.manoJugador = [crearCarta('K', '♠'), crearCarta('8', '♥')];
    juegoTest.manoCroupier = [crearCarta('K', '♦'), crearCarta('6', '♣'), crearCarta('7', '♠')];
    juegoTest.juegoTerminado = true;
    
    const resultado = juegoTest.obtenerResultado();
    return resultado === 'croupier_pierde';
  }
  
  // Test 5: Jugador 18, Croupier 20
  function test5() {
    const juegoTest = new BlackJack();
    juegoTest.manoJugador = [crearCarta('K', '♠'), crearCarta('8', '♥')];
    juegoTest.manoCroupier = [crearCarta('K', '♦'), crearCarta('Q', '♣')];
    juegoTest.juegoTerminado = true;
    
    const resultado = juegoTest.obtenerResultado();
    return resultado === 'croupier_gana';
  }
  
  // Test 6: BlackJack con racha de 7 victorias
  function test6() {
    const juegoTest = new BlackJack();
    juegoTest.victoriasConsecutivas = 6;
    juegoTest.manoJugador = [crearCarta('A', '♠'), crearCarta('K', '♥')];
    juegoTest.manoCroupier = [crearCarta('9', '♦'), crearCarta('7', '♣')];
    juegoTest.juegoTerminado = true;
    
    const resultado = juegoTest.obtenerResultado();
    return resultado === 'jugador_blackjack' && juegoTest.victoriasConsecutivas === 7;
  }
  
  // Test 7: Jugador se pasa de 21 con múltiples cartas
  function test7() {
    const juegoTest = new BlackJack();
    juegoTest.manoJugador = [crearCarta('5', '♠'), crearCarta('6', '♥'), crearCarta('Q', '♦'), crearCarta('3', '♣')];
    juegoTest.manoCroupier = [crearCarta('9', '♠'), crearCarta('7', '♥')];
    juegoTest.juegoTerminado = true;
    
    const resultado = juegoTest.obtenerResultado();
    return resultado === 'jugador_pierde';
  }
  
  // Test 8: Croupier se pasa de 21
  function test8() {
    const juegoTest = new BlackJack();
    juegoTest.manoJugador = [crearCarta('K', '♠'), crearCarta('6', '♥')];
    juegoTest.manoCroupier = [crearCarta('K', '♦'), crearCarta('6', '♣'), crearCarta('8', '♠')];
    juegoTest.juegoTerminado = true;
    
    const resultado = juegoTest.obtenerResultado();
    return resultado === 'croupier_pierde';
  }
  
  const pruebas = [
    { nombre: 'Test 1: Jugador BlackJack, gana 3 a 2', funcion: test1 },
    { nombre: 'Test 2: Ambos BlackJack, empate', funcion: test2 },
    { nombre: 'Test 3: Jugador se pasa de 21', funcion: test3 },
    { nombre: 'Test 4: Jugador 18, Croupier se pasa', funcion: test4 },
    { nombre: 'Test 5: Jugador 18, Croupier 20', funcion: test5 },
    { nombre: 'Test 6: BlackJack con 7 victorias consecutivas', funcion: test6 },
    { nombre: 'Test 7: Jugador se pasa con múltiples cartas', funcion: test7 },
    { nombre: 'Test 8: Croupier se pasa de 21', funcion: test8 }
  ];
  
  for (let prueba of pruebas) {
    try {
      const resultado = prueba.funcion();
      if (resultado) {
        pruebasExitosas++;
        resultados.push({ nombre: prueba.nombre, exitoso: true, mensaje: '✓ Prueba exitosa' });
      } else {
        pruebasFallidas++;
        resultados.push({ nombre: prueba.nombre, exitoso: false, mensaje: '✗ Prueba fallida' });
      }
    } catch (error) {
      pruebasFallidas++;
      resultados.push({ nombre: prueba.nombre, exitoso: false, mensaje: `✗ Error: ${error.message}` });
    }
  }
  
  mostrarResultadosPruebas(resultados, pruebasExitosas, pruebasFallidas);
}

function mostrarResultadosPruebas(resultados, exitosas, fallidas) {
  const divResultados = document.getElementById('resultados-pruebas');
  divResultados.innerHTML = `<h3>Resultados de pruebas: ${exitosas}/${resultados.length} exitosas</h3>`;
  
  for (let resultado of resultados) {
    const div = document.createElement('div');
    div.className = resultado.exitoso ? 'prueba-exitosa' : 'prueba-fallida';
    div.textContent = `${resultado.nombre}: ${resultado.mensaje}`;
    divResultados.appendChild(div);
  }
}

document.getElementById('btn-ejecutar-pruebas').addEventListener('click', ejecutarCasosDePrueba);
