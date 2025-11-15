let cargaHoraria;
let quantidadeHorasFaltasPossiveis;
let quantidadeDiasFaltaPossiveis;
let quantidadeDiasFaltaRestantes;

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
    quantidadeDiasFaltaRestantes = quantidadeDiasFaltaPossiveis - entrada.value;
    console.log(quantidadeDiasFaltaRestantes);
})