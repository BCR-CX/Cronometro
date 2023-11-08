let segundos_BACKGROUND
let minutos_BACKGROUND
let switch_Começar_BACKGROUND
let intervalo_BACKGROUND;


chrome.tabs.onActivated.addListener((tab) => {
    console.log(tab)
    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            if (request.greeting == "Fill_Fields") {
                console.log(location.href)
                console.log(tab.tabId)
                chrome.scripting.executeScript({
                    target: { tabId: tab.tabId },
                    files: ["fill-script.js"]
                });
            }
            else if (request.greeting == "Sum_Field_Values") {
                console.log(location.href)
                console.log(tab.tabId)
                chrome.scripting.executeScript({
                    target: { tabId: tab.tabId },
                    files: ["sum-script.js"]
                });
            }
        }
    );
});


function ComeçarBackGround(i, j, switch_Começar) {
    console.log("Case 4");
    clearInterval(intervalo_BACKGROUND);
    if (switch_Começar == true) {
        console.log("Case 5 true");
        clearInterval(intervalo_BACKGROUND);
        chrome.storage.local.set({ segundos_BACKGROUND: i, minutos_BACKGROUND: j, switch_Começar_BACKGROUND: switch_Começar })
        return switch_Começar;
    } else {
        console.log("Case 5 false");
        intervalo_BACKGROUND = setInterval(function () {
            i++;
            if (i > 59) {
                return ++j, i = 0;
            }
            console.log(j, i)
            return segundos_BACKGROUND = i, minutos_BACKGROUND = j;
        }, 1000);
        return switch_Começar, intervalo_BACKGROUND;
    }
}

chrome.runtime.onConnect.addListener(function (externalPort) {
    externalPort.onDisconnect.addListener(function () {
        console.log("Case 1")
        chrome.storage.local.get(["segundos_BACKGROUND", "minutos_BACKGROUND", "switch_Começar_BACKGROUND"]).then((result) => {
            segundos_BACKGROUND = result.segundos_BACKGROUND;
            minutos_BACKGROUND = result.minutos_BACKGROUND;
            switch_Começar_BACKGROUND = new Boolean(result.switch_Começar_BACKGROUND);
            console.log("Case 2")
            if (switch_Começar_BACKGROUND == Boolean(true)) {
                console.log("Case 3 false")
                return false
            }
            else if (switch_Começar_BACKGROUND == Boolean(false)) {
                () => {
                    i++;
                    if (i > 59) {
                        return ++j, i = 0;
                    }
                    return segundos_BACKGROUND = i, minutos_BACKGROUND = j, switch_Começar_BACKGROUND = switch_Começar;
                };
                console.log("Case 3 true")
                ComeçarBackGround(++segundos_BACKGROUND, minutos_BACKGROUND, switch_Começar_BACKGROUND);
            }
        })
    });
})

chrome.runtime.onConnect.addListener(function () {
    if (switch_Começar_BACKGROUND == Boolean(true)) {
        return false;
    }
    else if (switch_Começar_BACKGROUND == Boolean(false)) {
        clearInterval(intervalo_BACKGROUND);
        (async () => {
            const response = await chrome.runtime.sendMessage({greeting: "StopwatchContinue", minutos_BACKGROUND: minutos_BACKGROUND, segundos_BACKGROUND: segundos_BACKGROUND});
            console.log(response);
        })();
    }
})