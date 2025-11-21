// Variáveis principais usadas nos cálculos de faltas
let cargaHoraria;          // Guarda a carga horária total da matéria (30, 60, 90 ou 120 horas)
let horasFaltasPossiveis;  // Quantidade de horas que o aluno pode faltar (25% da carga horária)
let diasFaltasPossiveis;   // Quantidade de dias que o aluno pode faltar, derivado das horas
let resultadoFinal;        // Quantidade final de dias que ainda pode faltar

// Esses elementos parecem ser de uma versão anterior (não estão no HTML atual)
// mas já estão referenciados aqui caso voltem a ser usados no layout
let cardResultado = document.querySelector(".card-alerta"); // Card de alerta geral (não está visível no HTML atual)
let diasTexto = document.querySelector("#diasTexto");       // Elemento de texto para dias (não está no HTML atual)
let mensagemTexto = document.querySelector("#mensagemTexto"); // Elemento de texto para mensagem (não está no HTML atual)

// Botões de seleção de carga horária (30h, 60h, 90h, 120h)
let botao30h = document.querySelector("#botao30h");
let botao60h = document.querySelector("#botao60h");
let botao90h = document.querySelector("#botao90h");
let botao120h = document.querySelector("#botao120h");

// Campo de entrada onde o usuário digita quantos dias já faltou
let entrada = document.querySelector("input"); 

// Mensagens de erro para validações:
// .mensagem-erroum -> erro da seleção de carga horária
// .mensagem-errodois -> erro do campo de entrada
let mensagemErroBotao = document.querySelector(".mensagem-erroum");
let mensagemErroInput = document.querySelector(".mensagem-errodois");

// Botão principal para disparar o cálculo
let botaoCalcular = document.querySelector("#botaocalcular");

// Elementos responsáveis por mostrar o resultado e a mensagem explicativa
let respostaFinal = document.querySelector("#resultado");           // Número de dias que ainda pode faltar
let retratoResposta = document.querySelector(".resposta_retrato");  // Quadrado colorido que muda de cor pela situação
let mensagemResultado = document.querySelector("#mensagem-resultado"); // Texto explicando a situação do aluno

// --- Seleção da carga horária ---
// Cada botão, ao ser clicado, simplesmente define a variável "cargaHoraria"

// Seleciona 30 horas de carga horária
botao30h.addEventListener("click", function(){
    cargaHoraria = 30;
})

// Seleciona 60 horas de carga horária
botao60h.addEventListener("click", function(){
    cargaHoraria = 60;
})

// Seleciona 90 horas de carga horária
botao90h.addEventListener("click", function(){
    cargaHoraria = 90;
})

// Seleciona 120 horas de carga horária
botao120h.addEventListener("click", function(){
    cargaHoraria = 120;
})

// --- Lógica principal do cálculo ---
// Disparada quando o usuário clica no botão "Calcular"
botaoCalcular.addEventListener("click", function(){

    // Validação do campo de entrada (quantos dias já faltou)
    if(entrada.value == ""){
        // Exibe a mensagem de erro do input, trocando a classe para a versão visível
        mensagemErroInput.className = "mensagem-erro-transicao";
        mensagemErroInput.textContent = "Campo Obrigatório";
    }

    // Validação da seleção da carga horária
    if(!cargaHoraria){ 
        // Exibe a mensagem de erro dos botões de carga horária
        mensagemErroBotao.className = "mensagem-erro-transicao";
        mensagemErroBotao.textContent = "Campo Obrigatório";
    }

    // Se o usuário preencheu o campo de entrada após erro, some com a mensagem de erro do input
    if(entrada.value != ""){
        // Volta para a classe original, que deixa a mensagem invisível
        mensagemErroInput.className = "mensagem-erroum";
    }

    // Se a carga horária foi selecionada, some com a mensagem de erro dos botões
    if(cargaHoraria){
        // Volta para a classe original, que deixa a mensagem invisível
        mensagemErroBotao.className = "mensagem-errodois";
    }

    // OBS: A partir daqui o código continua o cálculo mesmo se algo tiver faltando.
    // Na prática, se cargaHoraria não tiver sido definida, vai dar NaN nos cálculos.
    // Ideal seria dar um "return" aqui caso falte algum dos campos.

    // 25% da carga horária é o limite de faltas em horas
    horasFaltasPossiveis = cargaHoraria * 0.25;

    // Conversão das horas em "dias de falta possíveis"
    // Aqui foi usada a regra: (horas * 60) / 100 e depois Math.ceil pra arredondar pra cima.
    // Ex: 7.2 dias -> 8 dias. Garante que o aluno não "ganhe" um dia a mais.
    diasFaltasPossiveis = Math.ceil((horasFaltasPossiveis * 60)/100);

    // Cálculo de quantos dias ainda pode faltar:
    // dias possíveis - dias que já faltou (digitado no input)
    resultadoFinal = diasFaltasPossiveis - entrada.value;

    // Criação de faixas para a situação do aluno:
    let situacaoBoa = diasFaltasPossiveis;          // Faixa boa (não é usada diretamente nas condições)
    let situacaoMedia = diasFaltasPossiveis * 0.5;  // A partir daqui ele já faltou mais da metade do limite
    let situacaoCritica = diasFaltasPossiveis * 0.8; // A partir daqui está perto do limite máximo

    // --- Escolha da mensagem e da cor do "retrato" (quadrado colorido) ---

    // Caso mais crítico: o aluno já usou todo o limite ou passou dele
    if(resultadoFinal <= 0){
        // Mostra "0" como dias restantes (não entra número negativo)
        respostaFinal.textContent = "0";

        // Mensagem avisando que o limite foi estourado
        mensagemResultado.textContent = "Você usou todo seu limite de faltas. Fale com seu professor(a) ou vá na secretária se informar mais sobre sua situação!";

        // Altera a classe para o retrato ficar vermelho (situação crítica)
        retratoResposta.className = "resposta_retrato-critico";

    // Situação crítica: o aluno já faltou 80% ou mais do máximo permitido
    }else if(entrada.value >= situacaoCritica){
        // Mostra quantos dias ainda pode faltar
        respostaFinal.textContent = resultadoFinal;

        // Mensagem avisando que está muito próximo do limite
        mensagemResultado.textContent = `Você está próximo do seu limite de faltas. Ainda lhe restam mais ${resultadoFinal} dias. Fale com seu professor(a) ou vá na secretária se informar mais sobre sua situação!`;

        // Retrato também fica vermelho, reforçando a gravidade
        retratoResposta.className = "resposta_retrato-critico";

    // Situação intermediária: já passou de 50% do limite, mas ainda não chegou na zona crítica (80%)
    }else if(entrada.value >= situacaoMedia ){
        // Mostra quantos dias ainda restam
        respostaFinal.textContent = resultadoFinal;

        // Mensagem dizendo que já foi mais da metade do limite de faltas
        mensagemResultado.textContent = `Você já faltou ${entrada.value} dias, ainda restam ${resultadoFinal} dias até o seu limite de faltas. Você já faltou mais da metade do seu limite. Vá para a aula!`;

        // Retrato fica amarelo (classe "medio"), indicando atenção
        retratoResposta.className = "resposta_retrato-medio";

    // Situação tranquila: faltou menos da metade do limite
    }else if(entrada.value < situacaoMedia){
        // Mostra quantos dias ainda restam
        respostaFinal.textContent = resultadoFinal;

        // Mensagem mais suave, indicando que ainda está dentro de uma margem boa
        mensagemResultado.textContent = `Você já faltou ${entrada.value} dias, ainda restam ${resultadoFinal} dias até o seu limite de faltas.`;

        // Retrato fica verde (classe padrão), indicando que está de boa
        retratoResposta.className = "resposta_retrato";
    }
})

// --- Validação do input para aceitar somente números ---
// Esse listener impede que o usuário digite letras ou caracteres inválidos no campo de dias
entrada.addEventListener("keydown", function (event) {

    // Lista de teclas que são permitidas, mesmo não sendo números
    // Backspace, Delete, setas e Tab são necessários para navegação e correção
    const teclasPermitidas = [
        "Backspace",
        "Delete",
        "ArrowLeft",
        "ArrowRight",
        "Tab"
    ];

    // Se a tecla pressionada estiver na lista de permitidas, não bloqueia
    if (teclasPermitidas.includes(event.key)) {
        return;
    }

    // Se a tecla não for um número de 0 a 9, cancela o evento (não deixa o caractere aparecer)
    if (!/[0-9]/.test(event.key)) {
        event.preventDefault();
    }
});
