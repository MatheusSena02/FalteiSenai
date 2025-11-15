let cargaHoraria;
let quantidadeHorasFaltasPossiveis;
let quantidadeDiasFaltaPossiveis;
let quantidadeDiasFaltaRestantes;
let ultimoValorLido = "";

let botao30h = document.querySelector("#botao30h");
let botao60h = document.querySelector("#botao60h");
let botao90h = document.querySelector("#botao90h");
let botao120h = document.querySelector("#botao120h");

let entrada = document.querySelector("input");

let botaoCalcular = document.querySelector("#botaocalcular");

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
    if(entrada.value == ""){
        alert("É preciso inserir o números de dias de falta");
    }
    if(cargaHoraria == 0){
        alert("É preciso digitar a carga horária");
    }
    quantidadeDiasFaltaRestantes = quantidadeDiasFaltaPossiveis - entrada.value;
    cargaHoraria = 0;
    console.log(quantidadeDiasFaltaRestantes);
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