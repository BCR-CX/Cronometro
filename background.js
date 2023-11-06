let segundos_BACKGROUND
let minutos_BACKGROUND
let switch_Começar_BACKGROUND
let intervalo_BACKGROUND;

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.greeting === "RunInBackground")
            chrome.storage.local.get(["segundos_BACKGROUND", "minutos_BACKGROUND", "switch_Começar_BACKGROUND"]).then((result) => {
                segundos_BACKGROUND = result.segundos_BACKGROUND;
                minutos_BACKGROUND = result.minutos_BACKGROUND;
                switch_Começar_BACKGROUND = result.switch_Começar_BACKGROUND;
                console.log(switch_Começar_BACKGROUND, segundos_BACKGROUND, minutos_BACKGROUND);
            });
            sendResponse({ farewell: "RunningInBackground" });
            return switch_Começar_BACKGROUND, segundos_BACKGROUND, minutos_BACKGROUND;
    }
);

function ComeçarBackGround(i, j, switch_Começar) {
    clearInterval(intervalo_BACKGROUND);
    if (switch_Começar == true) {
        clearInterval(intervalo_BACKGROUND);
        chrome.storage.local.set({ segundos_BACKGROUND: i, minutos_BACKGROUND: j, switch_Começar_BACKGROUND: switch_Começar })
        return switch_Começar;
    } else {
        intervalo_BACKGROUND = setInterval(function () {
            i++
            if (i > 59) {
                return ++j, i = 0;
            }
            console.log(j, i)
            chrome.storage.local.set({ segundos_BACKGROUND: i, minutos_BACKGROUND: j, switch_Começar_BACKGROUND: switch_Começar });
        }, 1000);
        return switch_Começar, intervalo_BACKGROUND;
    }
}


chrome.runtime.onConnect.addListener(function (externalPort) {
    console.log("Connect Background")
    externalPort.onDisconnect.addListener(function () {
        chrome.storage.local.get(["segundos_BACKGROUND", "minutos_BACKGROUND", "switch_Começar_BACKGROUND"]).then((result) => {
            segundos_BACKGROUND = result.segundos_BACKGROUND;
            minutos_BACKGROUND = result.minutos_BACKGROUND;
            switch_Começar_BACKGROUND = new Boolean(result.switch_Começar_BACKGROUND);
            console.log("result.segundos_BACKGROUND", result.segundos_BACKGROUND)
            console.log("result.minutos_BACKGROUND", result.minutos_BACKGROUND)
            console.log("result.switch_Começar_BACKGROUND", switch_Começar_BACKGROUND)
            console.log("result.switch_Começar_BACKGROUND.valueOf", switch_Começar_BACKGROUND.valueOf)
            console.log("result.switch_Começar_BACKGROUND == false", switch_Começar_BACKGROUND == Boolean(false))
            console.log("result.switch_Começar_BACKGROUND == true", switch_Começar_BACKGROUND == Boolean(true))
            if (switch_Começar_BACKGROUND == Boolean(true)) {
                return false
            }
            else if (switch_Começar_BACKGROUND == Boolean(false)) {
                ComeçarBackGround(segundos_BACKGROUND,minutos_BACKGROUND,switch_Começar_BACKGROUND);
            }
        })
    });
})

chrome.runtime.onConnect.addListener( function() {
    if (switch_Começar_BACKGROUND == Boolean(true)) {
        return false;
    }
    else if(switch_Começar_BACKGROUND == Boolean(false)) {
        clearInterval(intervalo_BACKGROUND);
        console.log("greeting");
        (async () => {
            const response = await chrome.runtime.sendMessage({ greeting: "StopwatchContinue" });
            console.log(response);
        })();
    }
})