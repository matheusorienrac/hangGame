//ESSE CODIGO JA NAO ME FAZ MAIS SENTIDO
//FAZIA H� TIPO UNS 2 DIAS
//OH GOD WHY






// PROFESSOR SE VOCE ESTIVER LENDO ESSE C�DIGO, EU TE PE�O PERD�O PELO NIVEL DAS GAMBIARRAS, REDUNDANCIAS ETC. ESPERO UM DIA ME REDIMIR PELO PECADO COMETIDO AQUI NESSE ARQUIVO




// EU REALMENTE ME ARREPENDO DAS GAMBI MAS CARA, TA SINISTRO A PARADA AQUI. ACABOU O CAF� E EU TO ME SENTINDO ESQUISITO








// SE VOC� EST� LENDO ISSO, EU PROVAVELMENTE N�O ESTOU A� PRA APRESENTAR O TRABALHO PORQUE EU VIREI LA NOCHE CONSERTANDO OS BUG LOCO

// PERDOA EU, TEACHER
// Mas eu deixei o c�digo mais ou menos comentado, ent�o d� pra ter uma ideia do que cada parte faz

//Variaveis de controle
var i = 0;
var aux = {}; // Nao lembro
aux.x = 200;
aux.y = 300;
var screen1Ready = true;  // Tela Inicial
var screen2Ready = false; // Tela do menu
var screen3Ready = false; // Tela do jogo em si
var screen4Ready = false; // Tela para adicionar uma nova palavra
var screen5Ready = false; // Tela game over



////////////////////////////// A VARIAVEL CATEGORY TEM QUE CONTER A CATEGORIA DA PALAVRA. ENT�O PUXA A CATEGORIA DO BANCO DE DADOS
//////////////////////////////// A VARIAVEL WORD TEM QUE CONTER A PALAVRA EM SI. PUXA DO BANCO DE DADOS
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var coluna = 1; // Isso � pra parte do Nova Palavra - Para o c�digo saber se voc� est� escrevendo em cima ou embaixo (no caso a palavra ou a categoria)
var newCategory = "";
var newWord = "";






var categoryword = "CATEGORIA"; // Guarda a string categoria. Em algum ponto do c�digo, um for percorre isso aqui e vai recortando as letras do font.png e desenhando a palavra na tela

var soundOn = true;
var mousePos;
var blocked; // bloqueia o keypress quando o jogo termina
var mouseReady = false;
var chances; // Chances que o player ainda tem
var chanceword= "";// Variavel que vai guardar o nome por extenso das chances que o player tem disponivel

var drawn = 0 // Quantas letras foram desenhadas
var space = 50; // Espa�o entre as lletras, varia conforme o tamanho da palavra
var validchar = ""; // Letras que foram escolhidas e EST�O na palavra
var invalidchar= "";// Letras que foram escolhidas e N�O EST�O na palavra
var then; // Usarei isso para saber se 1 segundo passou e ent�o mudar a anima��o do bot�o start ou do bot�o menu
var now;
var inicial;
var x; // Vai ser usado para coordenadas do clique
var y;
// Cria o canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas); // Poe o canvas criado no html
//SoundPart -> Os sonzins dos buttons e outras partes aleatorias
var playing = false; // Controle para ele nao ficar dando play na musica toda vez que o main executar
var snd = new Audio('sound/song.mp3');
snd.loop = true;
var rightsnd = new Audio('sound/right.wav');
var wrongsnd = new Audio('sound/wrong.wav');
var buttonsnd = new Audio('sound/buttonpress.wav');
var gamesnd = new Audio('sound/asturias.mp3');
var winsnd = new Audio('sound/win.wav');
var losesnd = new Audio('sound/lose.wav');


// Background e Bot�o do Som e a Fonte
var bgReady = false; // Controle
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "Images/bg.jpg";
var sound = {};
sound.Image = new Image(); // Imagem do som ligado
sound.Image2 = new Image(); // imagem do som desligado
sound.Image.src = "Images/soundon.png";
sound.Image2.src = "Images/soundoff.png";
var font = new Image();
font.src = "Images/font.png";

// Parte do Teclado que s� tem uso na parte do jogo em si e na parte de adicionar palavras novas(mentira que na tela p�s jogo ele tambem � usado)
var keyPressed;
// Faz as verifica��es dos valores ASCII das teclas pressionadas. Como eu quero que tudo seja maiusculo, qualquer minusculo � convertido pra maiusculo
addEventListener("keypress", function (e) {
	if(!blocked){
		if((screen3Ready)||(screen4Ready)){ // Para a tela de jogo e de adicionar palavras, apenas letras sao aceitas
			if(((e.keyCode<91)&&(e.keyCode > 64))||((e.keyCode > 96)&&(e.keyCode < 123))){
				keyPressed = e.keyCode;
			if(keyPressed >= 97)
				keyPressed = keyPressed - 32;
			if(screen4Ready){
				if(coluna ==1)
					if(newWord.length < 15)
						newWord = newWord + String.fromCharCode(keyPressed);
				if(coluna == 2)
					if(newCategory.length < 9)
						newCategory = newCategory + String.fromCharCode(keyPressed);	
			}
		  }
		}
		else
			if(screen5Ready){ // Qualquer tecla digitada na tela de gameover serve para retornar a tela de menu
				document.location.reload() // Atualiza a pagina, fazendo com que o c�digo php escreva outras palavras e categorias. Como o jogo est� dentro de um iframe, quase n�o � percebivel
				}
		
		}

}, false);
// POR ALGUM RAIO DE MOTIVO, O DE CIMA NAO PEGA BACKSPACE, ENTAO VOU USAR ESSE AQUI
addEventListener("keydown", function (e) {
	if(screen4Ready){
			if(e.keyCode == 8)
				if(coluna == 1)
					newWord = newWord.slice(0,-1);
				else
					newCategory = newCategory.slice(0,-1);
			else
				if(e.keyCode == 13){ //////////////////////// QUANDO ELE APERTAR ENTER E A COLUNA ESTIVER NO 2(SIGNIFICA QUE ELE ESTAVA ESCREVENDO A CATEGORIA), � PORQUE A PALAVRA J� FOI ESCOLHIDA, OU SEJA TEM QUE BOTAR NO BANCO DE DADOS ////////////////////////////
					if(coluna == 1){
						if(newWord.length >= 3) // Se tiver 3 ou mais letras ele vai pra linha debaixo
							coluna = 2;
						else
							alert("Voce digitou uma palavra com a quantidade de letras inferior a 3 digitos. Escreva uma palavra valida."); // Senao da erro
					}
					else{
						///////////////////////TEM QUE BOTAR O COMANDO PARA INSERIR A CATEGORIA E A PALAVRA NO BANCO DE DADOS NESSE ELSE
						if(newCategory.length >= 3){	// Se tiver tres ou mais ele adiciona a palavra ao banco de dados
							ctx.clearRect(0,0,canvas.width,canvas.height)
							keyPressed = 1;
							screen4Ready = false;
							screen2Ready = true;
							coluna = 1;
							window.location.href = "insert.php?word=" + newWord + "&category=" + newCategory; // Manda as informa��es para serem avalidas no arquivo insert.php
						}
						else
							alert("Voce digitou uma palavra com a quantidade de letras inferior a 3 digitos. Escreva uma palavra valida.");

					}
				}
				///////////////////////////////////////////////////////////////////////////////
		}

					
},false);
// Controladores de valor
// Reseta algumas coisas para que um novo jogo da forca possa come�ar

function newGame(){
	aux.aux = 0; // Isso vai impedir que ele toque um som em cima do outro apos o termino do jogo
	aux.aux2 = 1;
	validchar = "";
	invalidchar = "";
	chances = 6;
	space = (15 - word.length) * 10;
	if((word.length == 10)||(word.length == 11)) // Dependendo do tamanho da palavra, ele espa�a os tra�os de forma diferente pra que nao fiquem muito juntas ou muito separadas
		space = space + 10;
	else
		if ((word.length == 11)||((word.length == 13))||(word.length == 12))
			space = space + 20;
		else
			if((word.length == 14)||((word.length == 15)))
				space = space + 40;

}

//Atualiza os valores de valid char e invalid char
function updateWord(str){
	if(word.search(str) > -1){
		validchar = validchar + str;
		rightsnd.play();
	}
	else{
		invalidchar = invalidchar + str;
		chances = chances - 1;
		wrongsnd.play();
	}
}
// Imagens da Primeira tela/////////////////////////////////

			// Bot�es da screen1
			var startButton = {};
			startButton.x = 380;
			startButton.y = 180;
			startButton.image = new Image(); // Para o start pequeno
			startButton.image2 = new Image(); // Para o start grande
			startButton.imagePressed = new Image(); // Para a imagem do confete que fica ap�s o mouse ser posicionado em cima do bot�o start
			startButton.image.src = "Images/startbutton.png";
			startButton.image2.src = "Images/startbutton2.png";
			startButton.imagePressed.src = "Images/startbuttonpressed.png";
			// Imagem da screen1 (o boneco com os desenhos)
			var screen1 = new Image();
			screen1.src = "Images/screen1.png";

			
////////////////////////////////////////////////////////////
// Imagens da Segunda Tela /////////////////////////////////
		
			//Menu
			var menu = {};
			var playButton = {};
			var newWordButton = {};
			var screen2 = new Image();
			var snakehat = new Image();
			var headmoustache = new Image();
			headmoustache.src = "Images/headmoustache.png";
			snakehat.src = "Images/snakehat.png";
			screen2.src = "Images/screen2.png";
			menu.Image = new Image();
			menu.x = 295;
			menu.y = 50;
			playButton.Image = new Image(); // Imagem do Jogar e suas coordendas
			playButton.x = 265;
			playButton.y = 200;
			newWordButton.Image = new Image();// Imagem do nova palavra e suas coordenadas
			newWordButton.x = 160;
			newWordButton.y = 350;
			menu.ImageSelected = new Image();
			menu.Image.src = "Images/menu.png";
			playButton.Image.src = "Images/play.png";
		    newWordButton.Image.src = "Images/newword.png";
			menu.ImageSelected.src = "Images/selected.png";
			
// Imagens da Terceira Tela // Eu esqueci de botar s� as partes do corpo, ent�o os arquivos repetem partes do hangman desncessariamente. PREGUI�A DE MUDAR AGAIN
		    var screen3 = new Image();
			screen3.src = "Images/screen3.png";
			var hangman = {};
			hangman[0] = new Image();
			hangman[0].src = "Images/hangman0.png";
			hangman[1] = new Image();
			hangman[1].src = "Images/hangman1.png";			
			hangman[2] = new Image();
			hangman[2].src = "Images/hangman2.png";			
			hangman[3] = new Image();
			hangman[3].src = "Images/hangman3.png";		
			hangman[4] = new Image();
			hangman[4].src = "Images/hangman4.png";			
			hangman[5] = new Image();
			hangman[5].src = "Images/hangman5.png";		
// IMAGENS DA QUARTA TELA
			var screen4 = new Image();
			screen4.src = "Images/screen4.png";
// Imagens da Quinta Tela
			var screen5 = new Image(); // O caminho da imagem ser� atribuido ao final do jogo, quando soubermos quem venceu e quem perdeu.
			var screen52 = new Image(); // Segunda etapa da anima��o dos olhos do playerzim
			
//Parte responsavel por me dizer onde o mouse est� e onde clicou/////////
			function getMousePos(canvas, evt) { // Vai pegar os valores de x e y
				var rect = canvas.getBoundingClientRect();
				return {
				  x: evt.clientX - rect.left,
				  y: evt.clientY - rect.top
				};
				}
			function getPosition(event) // Onde clicou
			{
			    x = event.x;
			    y = event.y;

			}		
			canvas.addEventListener('mousemove', function(evt) {mousePos = getMousePos(canvas, evt);mouseReady = true;}, false); // Mudar� mousePos toda vez que o usuario mexer o mouse
			canvas.addEventListener('mousedown',getPosition, false); // Checa onde o cara clicar
//////////////////////////////////////////////////////////////
function animation(img1,img2,x,y,delay){ // Fun��o que executa uma anima��o parada de 2 etapas. // TAVA BUGANDO ENT�O ISSO S� VAI SER USADO NA SCREEN 1,2 E 5
	if((screen2Ready)||(screen1Ready)||(screen5Ready)){
		if (i == 0){
			ctx.drawImage(img1, x, y);
			now = Date.now();
			if(now - then >= delay){ // Se tiver passado delay segundos desde a ultima vez que ele mudou de etapa na anima��o, ele continua mudando
				i = 1;
				then = now;
			}
			}
		else{
			ctx.drawImage(img2, x, y);
			now = Date.now();
			if(now - then >= delay){
				i = 0;
				then = Date.now();
			}
			}
	}
}
// Desenhadores
//Varre a palavra e desenha as letras que ja foram usadas
function drawWords(){
	drawn = 0;
	if (chances == 0)
		for(var z = 0; z < word.length; z++)
				ctx.drawImage(font,(word.charAt(z).charCodeAt(0) - 65)* 18,0,18,18,(inicial) + space * (z) + 6,270,22,21);	
	else
		for(var y = 0; y < validchar.length;y++)
			for(var z = 0; z < word.length; z++){
				if(word.charAt(z) == validchar.charAt(y)){
					ctx.drawImage(font,(validchar.charAt(y).charCodeAt(0) - 65)* 18,0,18,18,(inicial) + space * (z) + 6,270,18,18);
					drawn = drawn + 1;
				}
			}
	for(var y = 0; y < invalidchar.length;y++)
		ctx.drawImage(font,(invalidchar.charAt(y).charCodeAt(0) - 65)* 18,0,18,18,200 + 50 * y,500,18,18);
	// Parte desnecessariamente grande porque eu n�o quero usar a fun��o de escrever normalmente. SAO 4 DA MANHA PRA QUE ISSO EU NAO SEI.

	if(chances == 6)
		chanceword = "SEIS";
	else
		if (chances == 5)
			chanceword = "CINCO";
		else
			if (chances == 4)
				chanceword = "QUATRO";
			else
				if (chances == 3)
					chanceword = "TRES";
				else
					if (chances == 2)
						chanceword = "DUAS";
					else
						if(chances == 1)
							chanceword = "UMA";
						else
							chanceword = "NENHUMA";
	// DESENHA QUANTAS CHANCES O CARA TEM AINDA. // EU SEI QUE DAVA PRA JUNTAR AS IMAGENS E EXECUTAR UM LOOP S�. MAS A PREGUI�A MATA VOU STACKAR AS PALAVRAS TUDO FALOW
	for(var y = 0; y < chanceword.length;y++)
		ctx.drawImage(font,(chanceword.charAt(y).charCodeAt(0) - 65)* 18,0,18,18,228 + y * 20,65,22,21)
	chanceword = "CHANCES"; // Para ele digitar o menuzim do chances
	for(var y = 0; y < chanceword.length;y++)
		ctx.drawImage(font,(chanceword.charAt(y).charCodeAt(0) - 65)* 18,0,18,18,100 + y * 16,65,22,21)
	// DESENHA A PALAVRA FINAL QUANDO O JOGO TERMINA
	for(var z = 0; z < category.length; z++){
		ctx.drawImage(font,(category.charAt(z).charCodeAt(0) - 65)* 18,0,18,18,570 + (z) * 17,65,20,20);
		
	}
	for(var z = 0; z < categoryword.length; z++){
		ctx.drawImage(font,(categoryword.charAt(z).charCodeAt(0) - 65)* 18,0,18,18,415 + (z) * 15,65,22,21);
		
	}
		
}

function drawScreen1(){
	if (screen1Ready) {
		ctx.drawImage(screen1, 0, 0); // os desenhos por cima do bg
		animation(startButton.image,startButton.image2,startButton.x,startButton.y,500); // Anima��o do Start
		if(mouseReady)// Me deixa saber se o mouse ja entrou na tela antes de verificar se a sua posi��o coincide com algum bot�o
			if ((mousePos.x >= 500)&&(mousePos.x <= 670)&&(mousePos.y >= 250)&&(mousePos.y <= 380 )){
				ctx.drawImage(startButton.imagePressed,startButton.x,startButton.y);
				if((x >= 500)&&(x <= 670)&&(y >= 250)&&(y <= 380)){ // Faz a verifica��o se ele clicou na area do start, o que mudar� a tela do inicio para o menu
					screen1Ready = false;
					screen2Ready = true;
					x = 800;
					y = 600;
				}
			}
			
	}
}

//
function drawScreen2(){
	if (screen2Ready){
		animation(screen2,headmoustache,0,0,500); // Anima��o que vai botar todos os desenhos de screen 2 e ainda mudar o cara com chapeu e moustache
		ctx.drawImage(menu.Image, menu.x, menu.y); //Botao de menu
		ctx.drawImage(playButton.Image, playButton.x, playButton.y); // PlayButton
		ctx.drawImage(newWordButton.Image, newWordButton.x, newWordButton.y); // NewWordButton

		if ((mousePos.x >= playButton.x)&&(mousePos.x <= playButton.x + 270)&&(mousePos.y >= playButton.y)&&(mousePos.y <= playButton.y + 80 )){ // Verifica se o mouse est� no playButton
			ctx.drawImage(menu.ImageSelected,playButton.x - 20,playButton.y + 20); // Posiciona o tra�o ao lado do bot�o para voce saber que pode clicar
				if((x >= playButton.x)&&(x <= playButton.x + 270)&&(y >= playButton.y)&&(y <= playButton.y + 80)){ // Faz a verifica��o se ele clicou na area do start, o que mudar� a tela do inicio para o menu
					screen2Ready = false;
					screen3Ready = true;
					snd.pause(); // Pausa a musica do menu
					x = 800; // Para que quando o jogo reinicie para o menu ele nao entre automaticamente
					y = 600; 
					newGame();
					keyPressed = 0; // Para ele nao come�ar o jogo com alguma tecla ja apertada
					buttonsnd.play();
				}
		}
		else
			if ((mousePos.x >= newWordButton.x)&&(mousePos.x <= newWordButton.x + 480)&&(mousePos.y >= newWordButton.y)&&(mousePos.y <= newWordButton.y + 80 )){ // Verifica se o mouse est� no newWordButton
				ctx.drawImage(menu.ImageSelected,newWordButton.x - 30,newWordButton.y + 25); // Posiciona o tra�o ao lado do bot�o para voce saber que pode clicar
					if((x >= newWordButton.x)&&(x <= newWordButton.x + 480)&&(y >= newWordButton.y)&&(y <= newWordButton.y + 80)){ // Faz a verifica��o se ele clicou na area do start, o que mudar� a tela do inicio para o menu
						screen2Ready = false;
						screen4Ready = true;
						x = 800;
						y = 600;
						buttonsnd.play();
						newWord = "";
						newCategory = "";
					}					
	
			}
			else
				if ((mousePos.x >= 240)&&(mousePos.x <= 435)&&(mousePos.y >= 517)&&(mousePos.y <= 546 )) // Verifica se o mouse est� no newWordButton
					ctx.drawImage(snakehat,0,0); // Posiciona o tra�o ao lado do bot�o para voce saber que pode clicar
	}
}
// Desenha tudo da tela 3 que no caso � o jogo em si
function drawScreen3(){
 inicial = aux.x;
 ctx.drawImage(screen3,0,0);
  for(var j = 1; j <= word.length;j++){
   ctx.drawImage(menu.ImageSelected,aux.x,aux.y);
   aux.x = aux.x + space;
  }
  if((keyPressed >= 65)&&(keyPressed <= 90))
	  if((validchar.search(String.fromCharCode(keyPressed)) == -1)&&(invalidchar.search(String.fromCharCode(keyPressed)) == -1))
			updateWord(String.fromCharCode(keyPressed));
  drawWords();
  aux.x = inicial;
  // DESENHA AS PARTES DO HANGMAN
  if(chances < 6)
  	ctx.drawImage(hangman[chances],0,0);
	//TERMINA O JOGO CASO ELE TENHA ACERTADO TUDO
  if(aux.aux){ // Isso impede que ele repita o som enquanto toca o som da vitoria ou da derrota e tamb�m impede um outro bug esquisto em rela��o ao game over que eu nao sei porque conserta, mas conserta.
		drawn = 0;	
		aux.aux2 = 0;
	}
  if(drawn == word.length){
	// OUTRO BUG ESTAVA SENDO CAUSADO AQUI PORQUE ELE ENTRAVA NESSE IF TODA HORA E TOCAVA A MUSICA UMA EM CIMA DA OUTAR
	blocked = 1;
	aux.aux = 1;
  	soundOn = false;
  	winsnd.play();
	screen5.src = "Images/screen5win.png";
	screen52.src = "Images/screen5win2.png";
	setTimeout(function(){screen3Ready = false; screen5Ready = true;keyPressed = 0;blocked=0;},3000); // Ele esperar� e far� a transi��o para a tela de gameover. Al�m disso, vai zerar a variavel keypressed para que qualquer
  }// tecla que seja pressionada na tela de gameover fa�a efeito e o player seja retornado � tela de inicio
  else
  // Termina o JOGO CASO ELE TENHA ERRADO TUDO
	if((chances == 0)&&(aux.aux2 == 1)){
		blocked = 1;
		aux.aux = 2;
		soundOn = false;
		losesnd.play();
		screen5.src = "Images/screen5lose.png";
		screen52.src = "Images/screen5lose2.png";
		setTimeout(function(){screen3Ready = false; screen5Ready = true;keyPressed = 0;blocked=0;},1500);
	
	}
 // EU NAO AGUENTO MAIS, PARE DE BUGAR DESGRA�A
}
// Desenha tela 4

function drawScreen4(){
	ctx.drawImage(screen4,0,0);
	for(var z = 0; z < newWord.length; z++){
			ctx.drawImage(font,(newWord.charAt(z).charCodeAt(0) - 65)* 18,0,18,18,200 + (z) * 20,255,25,25);
		}
	for(var y = 0; y < newCategory.length; y++)
			ctx.drawImage(font,(newCategory.charAt(y).charCodeAt(0) - 65)* 18,0,18,18,200 + (y) * 20,380,25,25);
}
// Desenha tudo da tela 5 que no caso � a tela de gameover
function drawScreen5(){
	if(screen5Ready)
		animation(screen5,screen52,0,0,100);
}
var render = function () {
	ctx.clearRect(0,0,canvas.width,canvas.height) // Limpa o canvas
	ctx.drawImage(bgImage, 0, 0); // Background
	// Desenha tela 1
	if (screen1Ready)
		drawScreen1();
	// Desenha tela 2
	if (screen2Ready)
		drawScreen2();
	// Desenha tela 3
	if (screen3Ready)
		drawScreen3();
	// Desenha Tela 4
	if (screen4Ready)
		drawScreen4();
	// Desenha tela 5
	if (screen5Ready)
		drawScreen5();
	// Parte de ligar e desligar o som que pode acontecer em qualquer uma das telas
	if (soundOn) // Desenha o icone de ligar/desligar som
		ctx.drawImage(sound.Image,0,0);
	else
		ctx.drawImage(sound.Image2,0,0);
	// Verifica se voce desligou ou ligou o som
	if ((mousePos.x >= 0)&&(mousePos.x <= 27)&&(mousePos.y >= 0)&&(mousePos.y <= 26 )){ // Verifica se o seu mouse est� posicionaod em cima do botao de som
		if((x >= 0)&&(x <= 27)&&(y >= 0)&&(y <= 26)){ // Verifica se voce clicou nele
			if(soundOn) // Se tiver ligado, desliga
				soundOn = false;
			else // Se desligado, liga
				soundOn = true;
			x = 800; // Gambiarra para ele n�o guardar que o ultimo lugar que voc� clicou foi no som. Sem isso, se voce clicar uma vez no som, toda vez que seu mouse estiver em cima ele ira achar que voce clicou
			// em fun��o do valor da variavel se alterar apenas quando voce clica em algum outro lugar.
			y = 600;
		}
	}
}

// loop principal
var main = function () { // Renderiza tudo e da play ou pause nos sounds dependendo da tela que voc� est� e se voce ligou ou desligou o som
	if(soundOn){
		if(screen3Ready)
				gamesnd.play();
		else
			if((screen1Ready)||(screen2Ready)||(screen4Ready))
					snd.play();
	}
	else{
		if(screen3Ready){
			gamesnd.pause();
			}
		else
			if((screen1Ready)||(screen2Ready)||(screen4Ready)){
				snd.pause();
			}
	}
		render();
}

// Come�ando o jogo
then = Date.now();
setInterval(main,1); // executa rapidim pra caramba a lot