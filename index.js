//Conexão entre index.js e background.js 
chrome.runtime.connect()

// Variáveis função Começar();
let minutos = document.querySelector("span#minutos");
let segundos = document.querySelector("span#segundos");
var minutosFormatado;
let intervalo;
let switch_Começar;
let i;
let j;

// Variáveis função Verificador() e demais;
let modifier
const audio = new Audio("assets/audio.mp3");

// Reseta todos valores de minutos e segundos para 0;
function Começar() {
    clearInterval(intervalo);
    if (switch_Começar == true) {
        intervalo = setInterval(function () {
            // Aumenta o contador i, a cada ciclo/intervalo  
            i++;
            segundos.textContent = "0" + i;
            segundos.value = i;
            // Se i for maior que 59, reinicia o valor de segundos para 0   
            if (i > 59) {
                i = 0;
                segundos.textContent = 0;
                segundos.value = 0;
                // Se j for maior ou igual a 9, aparecerá j sem um zero na frente.   
                if (j >= 9) {
                    minutos.textContent = ++j;
                    minutos.value = j;
                    return j
                }
                // Se j for menor ou igual a 9, aparecerá j com um zero na frente.   
                else {
                    minutos.textContent = "0" + ++j;
                    minutos.value = j;
                }
            }
            // Se i for maior ou igual a 10, aparecerá i sem um zero na frente.   
            if (i >= 10) {
                segundos.textContent = i;
                segundos.value = i;
            }
            // 
            minutosFormatado = j % 60;
            localStorage.setItem("segundos", i);
            localStorage.setItem("minutos", j);
            document.querySelector("span#Horas").innerHTML = `${Math.floor(j / 60)}:${minutosFormatado < 10 ? "0" + minutosFormatado : minutosFormatado}`;
            chrome.storage.local.set({ minutos_BACKGROUND: localStorage.getItem("minutos"), segundos_BACKGROUND: localStorage.getItem("segundos") });
        }, 1000);
        // 
        document.querySelector("button#play-btn").classList.replace("bi-play", "bi-pause");
        document.querySelector("button#play-btn").classList.replace("btn-outline-success", "btn-outline-danger");

        // 
        switch_Começar = false;
        localStorage.setItem("switch_Começar", switch_Começar);
        chrome.storage.local.set({ minutos_BACKGROUND: localStorage.getItem("minutos"), segundos_BACKGROUND: localStorage.getItem("segundos"), switch_Começar_BACKGROUND: switch_Começar })

        return switch_Começar, intervalo, localStorage.getItem("switch_Começar");
    } else {
        // 
        document.querySelector("button#play-btn").classList.replace("btn-outline-danger", "btn-outline-success")
        document.querySelector("button#play-btn").classList.replace("bi-pause", "bi-play")

        // 
        switch_Começar = true;
        localStorage.setItem("switch_Começar", switch_Começar);
        chrome.storage.local.set({ minutos_BACKGROUND: localStorage.getItem("minutos"), segundos_BACKGROUND: localStorage.getItem("segundos"), switch_Começar_BACKGROUND: switch_Começar })

        return switch_Começar, localStorage.getItem("switch_Começar");
    }
}

try {
    // Definindo no index.HTML os textos dos elementos span#minutos e span#segundos;
    minutos.textContent = localStorage.getItem("minutos");
    segundos.textContent = localStorage.getItem("segundos")
    minutos.value = localStorage.getItem("minutos");
    segundos.value = localStorage.getItem("segundos");

    // Definindo contadores de minutos e segundos;
    i = localStorage.getItem("segundos");
    j = localStorage.getItem("minutos");

    // Definindo verificador de modificação de tema;
    if (localStorage.getItem("modifier") != false) {
        modifier = localStorage.getItem("modifier");
    } else {
        localStorage.setItem("modifier", 0);
        modifier = localStorage.getItem("modifier");
    }

    // Definindo verificador de execução da função Começar();
    if (localStorage.getItem("switch_Começar") == Boolean()) {
        switch_Começar = localStorage.getItem("switch_Começar");
        if (switch_Começar == Boolean(true)) {
            document.querySelector("button#play-btn").classList.replace("btn-outline-danger", "btn-outline-success")
            document.querySelector("button#play-btn").classList.replace("bi-pause", "bi-play")
        } else {
            document.querySelector("button#play-btn").classList.replace("btn-outline-success", "btn-outline-danger");
            document.querySelector("button#play-btn").classList.replace("bi-play", "bi-pause");
        }
    } else {
        switch_Começar = true
        localStorage.setItem("switch_Começar", switch_Começar)
    }
} catch {
    minutos.innerHTML = "00";
    segundos.innerHTML = "00";
    switch_Começar = true
    modifier = 0;
}

document.querySelector("button#fill-btn").addEventListener("click", function () {
    return false;
});

// Reseta todos valores de minutos e segundos para 0;
document.querySelector("button#restart-btn").addEventListener("click", function () {
    if (minutos.innerHTML != "0" || segundos.innerHTML != "0") {
        localStorage.setItem("minutos", 0)
        localStorage.setItem("segundos", 0)
        minutos.innerHTML = "00";
        segundos.innerHTML = "00";
        minutos.value = 0;
        segundos.value = 0;
        i = 0;
        j = 0;
    }
});

chrome.runtime.onConnect
document.querySelector("button#play-btn").addEventListener("click", function () {
    chrome.storage.local.set({ minutos_BACKGROUND: localStorage.getItem("minutos"), segundos_BACKGROUND: localStorage.getItem("segundos"), switch_Começar_BACKGROUND: localStorage.getItem("switch_Começar") });
    chrome.storage.local.get(["minutos_BACKGROUND", "segundos_BACKGROUND", "switch_Começar_BACKGROUND"]).then((result) => {
        console.log("result.segundos_BACKGROUND", result.segundos_BACKGROUND);
        console.log("result.minutos_BACKGROUND", result.minutos_BACKGROUND);
        console.log("result.switch_Começar_BACKGROUND", result.switch_Começar_BACKGROUND);
    });
    (async () => {
        const response = await chrome.runtime.sendMessage({ greeting: "RunInBackground" });
        console.log(response);
    })();
    Começar();
});

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        let result_BACKGROUND
        if (request.greeting === "StopwatchContinue")
            chrome.storage.local.get(["segundos_BACKGROUND", "minutos_BACKGROUND", "switch_Começar_BACKGROUND"]).then((result) => {
                // Definindo no index.HTML os textos dos elementos span#minutos e span#segundos;
                minutos.textContent = result.minutos_BACKGROUND;
                segundos.textContent = result.segundos_BACKGROUND;
                minutos.value = result.minutos_BACKGROUND;
                segundos.value = result.segundos_BACKGROUND;

                // Definindo contadores de minutos e segundos;
                i = result.segundos_BACKGROUND;
                j = result.minutos_BACKGROUND;
                console.log(segundos)
                console.log(minutos)
                localStorage.setItem("segundos", result.segundos_BACKGROUND)
                localStorage.setItem("minutos", result.minutos_BACKGROUND)
                console.log("Antes", result.segundos_BACKGROUND , result.minutos_BACKGROUND, "valores index.js" ,segundos.textContent, minutos.textContent, segundos.value, minutos.textContent, i, j, localStorage.getItem("minutos"), localStorage.getItem("segundos"));
                Começar()
                return segundos, minutos, i, j, localStorage.getItem("minutos"), localStorage.getItem("segundos")
            })
    }
);


function verificador() {
    if (modifier % 2 == 0) {
        document.querySelectorAll(".bg-dark").forEach(i => { i.classList.replace("bg-dark", "bg-light") });
        document.querySelectorAll(".text-light").forEach(i => { i.classList.replace("text-light", "text-dark") });
        document.querySelectorAll(".btn-outline-light").forEach(i => { i.classList.replace("btn-outline-light", "btn-outline-dark") });
        document.querySelector("button#fill-btn").style.filter = "invert(1) hue-rotate(50deg) brightness(100%)";
        document.querySelector("main").style.backdropFilter = "brightness(90%)"
        localStorage.setItem("modifier", modifier)
        return ++modifier;
    } else {
        document.querySelectorAll(".bg-light").forEach(i => { i.classList.replace("bg-light", "bg-dark") });
        document.querySelectorAll(".text-dark").forEach(i => { i.classList.replace("text-dark", "text-light") });
        document.querySelectorAll(".btn-outline-dark").forEach(i => { i.classList.replace("btn-outline-dark", "btn-outline-light") });
        document.querySelector("button#fill-btn").style.filter = "hue-rotate(0deg)";
        document.querySelector("main").style.backdropFilter = "brightness(100%)"
        localStorage.setItem("modifier", modifier)
        return ++modifier;
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

document.getElementById("darker-btn").addEventListener("click", verificador);
document.addEventListener("DOMContentLoaded", verificador);
