
chrome.storage.local.get(["minutos_BACKGROUND"]).then((result) => {
    if (location.href.match(/^https:\/\/\w*\.zendesk\.com/gm)) {
        console.log("fill");
        document.querySelector(`[data-test-id="ticket-form-field-numeric-field-8286937996941"]`).classList.add("data-garden-focus-visible");
        document.querySelector(`[data-test-id="ticket-form-field-numeric-field-8286937996941"]`).children[1].value = result.minutos_BACKGROUND;
    }
});



