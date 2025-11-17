// Variáveis que guardam valores usados no cálculo
let cargaHoraria;
let quantidadeHorasFaltasPossiveis;
let quantidadeDiasFaltaPossiveis;
let quantidadeDiasFaltaRestantes;
let ultimoValorLido = "";

// Seleciona os elementos do card de resultado
let cardResultado = document.querySelector(".card-alerta");
let diasTexto = document.querySelector("#diasTexto");
let mensagemTexto = document.querySelector("#mensagemTexto");

// Seleciona os botões da carga horária
let botao30h = document.querySelector("#botao30h");
let botao60h = document.querySelector("#botao60h");
let botao90h = document.querySelector("#botao90h");
let botao120h = document.querySelector("#botao120h");

let entrada = document.querySelector("input"); // Seleciona o input onde o usuário digita as faltas

let botaoCalcular = document.querySelector("#botaocalcular");// Seleciona o botão de calcular

// Função responsável por atualizar o card de resultado
function atualizarCard(dias){

    cardResultado.classList.remove("hidden");// Exibe o card caso esteja escondido


    diasTexto.innerText = dias;// Atualiza o número de dias mostrado no card vermelho

    // Se o valor for negativo, significa que passou do limite
    if(dias<0){
        resultadoTexto.innerText = "Você usou todo o seu limite de faltas. Fale com seu professor(a) ou vá na secretaria se informar mais sobre sua situação!";
    }else{
        // Caso contrário, mostra quantos dias ainda pode faltar
        mensagemTexto.innerText = `Você ainda pode faltar ${dias} dia(s).`;
    }
}

// Cada botão define a carga horária e calcula o limite de faltas permitido
botao30h.addEventListener("click", function(){
    cargaHoraria = 30;
    quantidadeHorasFaltasPossiveis = cargaHoraria - (cargaHoraria * 0.75);
    quantidadeDiasFaltaPossiveis = (quantidadeHorasFaltasPossiveis * 60) /100;
})

botao60h.addEventListener("click", function(){
    cargaHoraria = 60;
    quantidadeHorasFaltasPossiveis = cargaHoraria - (cargaHoraria * 0.75);
    quantidadeDiasFaltaPossiveis = (quantidadeHorasFaltasPossiveis * 60) /100;
})

botao90h.addEventListener("click", function(){
    cargaHoraria = 90;
    quantidadeHorasFaltasPossiveis = cargaHoraria - (cargaHoraria * 0.75);
    quantidadeDiasFaltaPossiveis = (quantidadeHorasFaltasPossiveis * 60) /100;
})

botao120h.addEventListener("click", function(){
    cargaHoraria = 120;
    quantidadeHorasFaltasPossiveis = cargaHoraria - (cargaHoraria * 0.75);
    quantidadeDiasFaltaPossiveis = (quantidadeHorasFaltasPossiveis * 60) /100;
})

botaoCalcular.addEventListener("click", function(){
    // Verifica se o input está vazio
    if(entrada.value == ""){
        alert("É preciso inserir o números de dias de falta");
    }
    // Verifica se o usuário escolheu carga horária
    if(!cargaHoraria){ 
        alert("É preciso digitar a carga horária");
    }
    // Calcula os dias restantes de falta
    quantidadeDiasFaltaRestantes = quantidadeDiasFaltaPossiveis - entrada.value;
    console.log(quantidadeDiasFaltaRestantes);

    // Atualiza o card com o resultado
    atualizarCard(quantidadeDiasFaltaRestantes);
})

entrada.addEventListener("keydown", function (event) {
    const teclasPermitidas = [
        "Backspace",
        "Delete",
        "ArrowLeft",
        "ArrowRight",
        "Tab"
    ];

    if (teclasPermitidas.includes(event.key)) {
        return;
    }

    if (!/[0-9]/.test(event.key)) {
        event.preventDefault();
    }
});