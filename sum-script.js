chrome.storage.local.get(["minutos_BACKGROUND"]).then((result) => {
    if (location.href.match(/^https:\/\/\w*\.zendesk\.com/gm)) {
        if (parseInt(document.querySelector(`[data-test-id="ticket-form-field-numeric-field-8286937996941"]`).children[1].value) + parseInt(result.minutos_BACKGROUND) != NaN) {
            console.log("sum");
            document.querySelector(`[data-test-id="ticket-form-field-numeric-field-8286937996941"]`).classList.add("data-garden-focus-visible");
            document.querySelector(`[data-test-id="ticket-form-field-numeric-field-8286937996941"]`).children[1].value = parseInt(document.querySelector(`[data-test-id="ticket-form-field-numeric-field-8286937996941"]`).children[1].value) + parseInt(result.minutos_BACKGROUND);
        } else {
            return false;
        }
    }
});
