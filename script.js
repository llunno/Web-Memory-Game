(() => {
	let isCardFlipped = false;
	let trancarTabuleiro = false;
	let isGameStarted = false;
	let contadorSeg;
	let contadorMin;
	let tempoJogoInterval;
	let carta1, carta2;
	let isGameFinalized = false;

	let recordStorage = getRecord();
	if (recordStorage != null) {
		let pRecord = document.querySelector('#record');
		pRecord.innerText = `Record: ${recordStorage.recordMin}min ${recordStorage.recordSeg}seg.`;
	}

	let arraySRCs = [
		'angularjs.svg',
		'angularjs.svg',
		'bootstrap.svg',
		'bootstrap.svg',
		'css3.svg',
		'css3.svg',
		'html-5.svg',
		'html-5.svg',
		'jquery.svg',
		'jquery.svg',
		'javascript.svg',
		'javascript.svg',
		'vscode.svg',
		'vscode.svg',
		'vue-js.svg',
		'vue-js.svg',
	];

	for (let i = 0; i < arraySRCs.length; i++) {
		let carta = {
			id: i,
			srcFront: `../img/${arraySRCs[i]}`,
			srcBack: `../img/javascript-back.svg`,
		};
		criarHTMLCartas(carta);
	}

	let todasCartas = document.querySelectorAll('.carta');
	todasCartas.forEach((carta) => {
		setCardBackground(carta);
		carta.classList.add('flip');
	});

	let initBtn = document.querySelector('#initResetButton');

	initBtn.addEventListener('click', iniciarJogo);

	function criarHTMLCartas(carta) {
		let divTabuleiro = document.querySelector('#tabuleiro');
		let divCarta = document.createElement('div');
		divCarta.classList.add('carta');

		let imgCartaBack = document.createElement('img');
		let imgCartaFront = document.createElement('img');

		imgCartaBack.id = carta.id;
		imgCartaBack.src = carta.srcBack;
		imgCartaBack.classList.add('cartaImgBack');

		imgCartaFront.id = carta.id;
		imgCartaFront.src = carta.srcFront;
		imgCartaFront.classList.add('cartaImgFront');

		divCarta.id = carta.id;
		divCarta.appendChild(imgCartaFront);
		divCarta.appendChild(imgCartaBack);
		divTabuleiro.appendChild(divCarta);
	}

	function flip() {
		if (trancarTabuleiro) return;
		if (this === carta1) return;
		if (isGameFinalized) return;
		this.classList.add('flip');

		if (!isCardFlipped) {
			isCardFlipped = true;
			carta1 = this;
			return;
		}

		carta2 = this;
		trancarTabuleiro = true;
		verificarMatch();
		finalizarJogo();
	}

	function verificarMatch() {
		carta1.firstChild.getAttribute('src') ===
		carta2.firstChild.getAttribute('src')
			? fixarCartas()
			: desvirarCartas();
	}

	function fixarCartas() {
		carta1.removeEventListener('click', flip);
		carta2.removeEventListener('click', flip);
		resetarTabuleiro();
	}

	function desvirarCartas() {
		setTimeout(() => {
			carta1.classList.remove('flip');
			carta2.classList.remove('flip');
			resetarTabuleiro();
		}, 1500);
	}

	function resetarTabuleiro() {
		isCardFlipped = false;
		trancarTabuleiro = false;
		carta1 = null;
		carta2 = null;
	}

	function fisherYatesShuffle(array) {
		var i = array.length,
			j,
			temp;
		while (--i > 0) {
			j = Math.floor(Math.random() * (i + 1));
			temp = array[j];
			array[j] = array[i];
			array[i] = temp;
		}
	}

	function setCardBackground(carta) {
		let imgFront = carta.firstChild;
		switch (imgFront.getAttribute('src')) {
			case '../img/vue-js.svg':
				carta.style.backgroundColor = 'rgba(88, 151, 122, 0.699)';
				break;
			case '../img/angularjs.svg':
				carta.style.backgroundColor = 'rgba(204, 32, 32, 0.699)';
				break;
			case '../img/bootstrap.svg':
				carta.style.backgroundColor = 'rgba(90, 37, 107, 0.856)';
				break;
			case '../img/css3.svg':
				carta.style.backgroundColor = 'rgb(97, 177, 230)';
				break;
			case '../img/html-5.svg':
				carta.style.backgroundColor = 'rgb(212, 145, 69)';
				break;
			case '../img/jquery.svg':
				carta.style.backgroundColor = 'rgb(168, 183, 223)';
				break;
			case '../img/javascript.svg':
				carta.style.backgroundColor = 'rgb(247, 230, 137';
				break;
			case '../img/vscode.svg':
				carta.style.backgroundColor = 'rgba(39, 30, 165, 0.904)';
				break;
			default:
				carta.style.backgroundColor = 'rgb(236, 226, 178)';
				break;
		}
	}

	function setupCounter(stopControl) {
		let contadorHTML = document.querySelector('#contador');
		if (!stopControl) {
			contadorSeg = 0;
			contadorMin = 0;
			tempoJogoInterval = setInterval(() => {
				if (contadorSeg >= 59) {
					contadorSeg = -1;
					contadorMin++;
				}
				contadorSeg++;
				contadorMinDisplay = contadorMin < 10 ? '0' + contadorMin : contadorMin;
				contadorSegDisplay = contadorSeg < 10 ? '0' + contadorSeg : contadorSeg;
				timeStyle = 'tempo: ' + contadorMinDisplay + ':' + contadorSegDisplay;
				contadorHTML.innerText = timeStyle;
			}, 1000);
		} else {
			clearInterval(tempoJogoInterval);
			if (!isGameFinalized) {
				contadorHTML.innerText = 'tempo: 00:00';
			}
		}
	}

	function iniciarJogo() {
		isGameFinalized = false;
		if (trancarTabuleiro) {
			window.alert(
				'Por favor, aguarde o carregamento do jogo atual para começar um jovo jogo!'
			);
			return;
		}
		resetarTabuleiro();
		trancarTabuleiro = true;
		let i = 0;
		fisherYatesShuffle(arraySRCs);
		if (!isGameStarted) {
			isGameStarted = true;
			todasCartas.forEach((carta) => {
				let imgFront = carta.firstChild;
				imgFront.src = `../img/${arraySRCs[i]}`;
				setCardBackground(carta);
				i++;
				setTimeout(() => {
					carta.classList.remove('flip');
					carta.addEventListener('click', flip);
					trancarTabuleiro = false;
				}, 3000);
			});
			setTimeout(() => {
				setupCounter(false);
			}, 2750);
		} else {
			todasCartas.forEach((carta) => {
				setupCounter(true);
				trancarTabuleiro = true;
				setTimeout(() => {
					carta.classList.add('flip');
				}, 300);
				setTimeout(() => {
					let imgFront = carta.firstChild;
					imgFront.src = `../img/${arraySRCs[i]}`;
					setCardBackground(carta);
					i++;
				}, 1600);
				setTimeout(() => {
					carta.classList.remove('flip');
					carta.addEventListener('click', flip);
					trancarTabuleiro = false;
				}, 5000);
			});
			setTimeout(() => {
				setupCounter(false);
			}, 4750);
		}
	}

	function finalizarJogo() {
		let flippedCardsList = document.querySelectorAll('.flip');
		if (flippedCardsList.length === 16) {
			isGameFinalized = true;
			setupCounter(true);

			let pRecord = document.querySelector('#record');
			let recordAnterior = getRecord();

			if (recordAnterior == null || contadorMin < recordAnterior.recordMin) {
				setRecord();
				pRecord.innerText = `Record: ${contadorMin}min ${contadorSeg}seg.`;
			} else if (contadorMin > recordAnterior.recordMin) {
				pRecord.innerText = `Record: ${recordAnterior.recordMin}min ${recordAnterior.recordSeg}seg.`;
			} else if (contadorMin == recordAnterior.recordMin) {
				if (contadorSeg < recordAnterior.recordSeg) {
					setRecord();
					pRecord.innerText = `Record: ${contadorMin}min ${contadorSeg}seg.`;
				} else if (contadorSeg > recordAnterior.recordSeg) {
					pRecord.innerText = `Record: ${recordAnterior.recordMin}min ${recordAnterior.recordSeg}seg.`;
				} else if (contadorSeg == recordAnterior.recordSeg) {
					pRecord.innerText = `Record: ${contadorMin}min ${contadorSeg}seg.`;
				} else {
					pRecord.innerText = 'Não foi possível exibir o record :(';
				}
			} else {
				pRecord.innerText = 'Não foi possível exibir o record :(';
			}
			setTimeout(() => {
				window.alert('Parabéns, você completou o jogo! Verifique o seu record!');
			}, 700);
		}
	}

	function getRecord() {
		let recordAtual = window.sessionStorage.getItem('record');
		let recordAtualObject = JSON.parse(recordAtual);
		return recordAtualObject;
	}

	function setRecord() {
		let bestTime = {
			recordMin: contadorMin,
			recordSeg: contadorSeg,
		};

		try {
			window.sessionStorage.setItem('record', JSON.stringify(bestTime));
		} catch (error) {
			let pRecord = document.querySelector('#record');
			pRecord.innerText = 'Não foi possível exibir o record :(';
		}
	}
})();
