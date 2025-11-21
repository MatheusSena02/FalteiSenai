let cargaHoraria;          
let horasFaltasPossiveis;  
let diasFaltasPossiveis;   
let resultadoFinal;        

const botao30h  = document.querySelector("#botao30h");
const botao60h  = document.querySelector("#botao60h");
const botao90h  = document.querySelector("#botao90h");
const botao120h = document.querySelector("#botao120h");

const entrada = document.querySelector("input");

const mensagemErroBotao = document.querySelector(".mensagem-erroum");
const mensagemErroInput = document.querySelector(".mensagem-errodois");

const botaoCalcular   = document.querySelector("#botaocalcular");

const secaoResposta   = document.querySelector(".resposta");

const respostaFinal     = document.querySelector("#resultado");              
const mensagemResultado = document.querySelector("#mensagem-resultado");      
let retratoResposta     = document.querySelector(".resposta_retrato");       

botao30h.addEventListener("click", () => { cargaHoraria = 30; });
botao60h.addEventListener("click", () => { cargaHoraria = 60; });
botao90h.addEventListener("click", () => { cargaHoraria = 90; });
botao120h.addEventListener("click", () => { cargaHoraria = 120; });

botaoCalcular.addEventListener("click", function () {
    let temErro = false;

    if (entrada.value === "") {
        mensagemErroInput.className = "mensagem-erro-transicao";
        mensagemErroInput.textContent = "Campo obrigatório";
        temErro = true;
    } else {
        mensagemErroInput.className = "mensagem-erroum";
    }

    if (!cargaHoraria) {
        mensagemErroBotao.className = "mensagem-erro-transicao";
        mensagemErroBotao.textContent = "Campo obrigatório";
        temErro = true;
    } else {
        mensagemErroBotao.className = "mensagem-errodois";
    }

    if (temErro) {
        secaoResposta.classList.add("hidden");
        return;
    }

    secaoResposta.classList.remove("hidden");

    const diasJaFaltou = Number(entrada.value);

    horasFaltasPossiveis = cargaHoraria * 0.25;

    diasFaltasPossiveis = Math.ceil((horasFaltasPossiveis * 60) / 100);

    resultadoFinal = diasFaltasPossiveis - diasJaFaltou;

    const situacaoMedia   = diasFaltasPossiveis * 0.5;
    const situacaoCritica = diasFaltasPossiveis * 0.8;

    retratoResposta = document.querySelector(".resposta_retrato, .resposta_retrato-medio, .resposta_retrato-critico");

    if (resultadoFinal <= 0) {
        respostaFinal.textContent = "0";
        mensagemResultado.textContent =
            "Você usou todo seu limite de faltas. Fale com seu professor(a) ou vá na secretaria para se informar mais sobre sua situação!";
        retratoResposta.className = "resposta_retrato-critico";
    } else if (diasJaFaltou >= situacaoCritica) {
        respostaFinal.textContent = resultadoFinal;
        mensagemResultado.textContent =
            `Você está próximo do seu limite de faltas. Ainda lhe restam ${resultadoFinal} dia(s). Fale com seu professor(a) ou vá na secretaria para se informar mais sobre sua situação!`;
        retratoResposta.className = "resposta_retrato-critico";
    } else if (diasJaFaltou >= situacaoMedia) {
        respostaFinal.textContent = resultadoFinal;
        mensagemResultado.textContent =
            `Você já faltou ${diasJaFaltou} dia(s), ainda restam ${resultadoFinal} dia(s) até o seu limite de faltas. Você já passou da metade, vá para a aula!`;
        retratoResposta.className = "resposta_retrato-medio";
    } else {
        respostaFinal.textContent = resultadoFinal;
        mensagemResultado.textContent =
            `Você já faltou ${diasJaFaltou} dia(s), ainda restam ${resultadoFinal} dia(s) até o seu limite de faltas.`;
        retratoResposta.className = "resposta_retrato";
    }
});

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
