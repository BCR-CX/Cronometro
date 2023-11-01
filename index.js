// Variáveis Começar() 
let minutos = document.querySelector("span#minutos");
let segundos = document.querySelector("span#segundos");
var minutosFormatado;
let intervalo = 0;
let switch_Começar;

// Variáveis Verificador() 
var modifier
const audio = new Audio("assets/audio.mp3");


try {
    minutos.textContent = localStorage.getItem("minutos");
    segundos.textContent = localStorage.getItem("segundos");
    minutos.value = localStorage.getItem("minutos");
    segundos.value = localStorage.getItem("segundos");
    if (localStorage.getItem("modifier") != NaN && localStorage.getItem("modifier") != null) {
        modifier = localStorage.getItem("modifier");
    } else {
        localStorage.setItem("modifier", 0);
        modifier = 0;
    }
    if (localStorage.getItem("switch_Começar") == Boolean) {
        switch_Começar = localStorage.getItem("switch_Começar");

    } else {
        switch_Começar = false
        localStorage.setItem("switch_Começar", switch_Começar)
    }
} catch {
    minutos.innerHTML = "00";
    segundos.innerHTML = "00";
    modifier = 0;
}

let i = localStorage.getItem("segundos");
let j = localStorage.getItem("minutos");

document.querySelector("button#fill-btn").addEventListener("click", function () {
    return false;
});

document.querySelector("button#restart-btn").addEventListener("click", function () {
    if (minutos.innerHTML != "0" || segundos.innerHTML != "0") {
        minutos.value = 0;
        segundos.value = 0;
        minutos.innerHTML = "00";
        segundos.innerHTML = "00";
        i = 0;
        j = 0;
    }
});

function Começar() {
    if (switch_Começar == true) {
        intervalo = setInterval(function () {
            i++
            segundos.textContent = "0" + i;
            segundos.value = i;
            if (i > 59) {
                i = 0;
                segundos.textContent = 0;
                if (j >= 9) {
                    minutos.textContent = ++j;
                    minutos.value = j;
                    return j
                }
                else {
                    minutos.textContent = "0" + ++j;
                    minutos.value = j;
                }
            }
            if (i >= 10) {
                segundos.textContent = i;
                segundos.value = i;
            }
            minutosFormatado = j % 60;
            switch_Começar = false
            localStorage.setItem("segundos", i);
            localStorage.setItem("minutos", j);
            localStorage.setItem("switch_Começar", switch_Começar)
            console.log(localStorage)
            document.querySelector("span#Horas").innerHTML = `${Math.floor(j / 60)}:${minutosFormatado < 10 ? "0" + minutosFormatado : minutosFormatado}`;
        }, 1000);
        document.querySelector("button#play-btn").classList.replace("bi-play", "bi-pause")
        document.querySelector("button#play-btn").classList.replace("btn-outline-success", "btn-outline-danger")
        return switch_Começar, intervalo, localStorage.getItem("switch_Começar");
    } else {
        clearInterval(intervalo);
        document.querySelector("button#play-btn").classList.replace("bi-pause", "bi-play")
        document.querySelector("button#play-btn").classList.replace("btn-outline-danger", "btn-outline-success")
        switch_Começar = true
        localStorage.setItem("switch_Começar", switch_Começar)
        console.log(localStorage)
        return switch_Começar, localStorage.getItem("switch_Começar");
    }
}

function verificador() {
    if (modifier % 2 == 0) {
        document.querySelectorAll(".bg-dark").forEach(i => { i.classList.replace("bg-dark", "bg-light") });
        document.querySelectorAll(".text-light").forEach(i => { i.classList.replace("text-light", "text-dark") });
        document.querySelectorAll(".btn-outline-light").forEach(i => { i.classList.replace("btn-outline-light", "btn-outline-dark") });
        document.querySelector("main").style.backdropFilter = "brightness(90%)"
        localStorage.setItem("modifier", modifier)
        return modifier++;
    } else {
        document.querySelectorAll(".bg-light").forEach(i => { i.classList.replace("bg-light", "bg-dark") });
        document.querySelectorAll(".text-dark").forEach(i => { i.classList.replace("text-dark", "text-light") });
        document.querySelectorAll(".btn-outline-dark").forEach(i => { i.classList.replace("btn-outline-dark", "btn-outline-light") });
        document.querySelector("main").style.backdropFilter = "brightness(100%)"
        localStorage.setItem("modifier", modifier)
        return modifier++;
    }
}

document.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        Começar();
    }
});

document.querySelector("button#copy-btn").addEventListener("click", function () {
    audio.play();
    return navigator.clipboard.writeText(minutos.textContent);
});

window.addEventListener("keyup", function (event) {
    if (event.ctrlKey && event.key == "c") {
        document.querySelector("button#copy-btn").style.transition = "all 0.2s"
        document.querySelector("button#copy-btn").classList.replace("btn-outline-danger", "btn-danger")
        navigator.clipboard.writeText(minutos.value);
        audio.play();
    }
    this.setTimeout(() => {
        document.querySelector("button#copy-btn").classList.replace("btn-danger", "btn-outline-danger")
    }, 500)
})
document.querySelector("button#play-btn").addEventListener("click", Começar);
document.getElementById("darker-btn").addEventListener("click", verificador)
document.addEventListener("DOMContentLoaded", Começar)
document.addEventListener("DOMContentLoaded", verificador)
