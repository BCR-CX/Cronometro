chrome.storage.local.get(["minutos_BACKGROUND"]).then((result) => {
    if (location.href.match(/^https:\/\/\w*\.zendesk\.com/gm)) {
        document.querySelector(`[data-test-id="ticket-form-field-numeric-field-8286937996941"]`).classList.add("data-garden-focus-visible");
        document.querySelector(`[data-test-id="ticket-form-field-numeric-field-8286937996941"]`).children[1].value = result.minutos_BACKGROUND;
    }
    else if (location.href.match(/^https:\/\/\github\.com\/orgs\/\w/gm)) {
        document.querySelector(`[data-testid='sidebar-field-Tempo (min)']`).children[1].children[0].value = result.minutos_BACKGROUND;
    } else {
        return false
    }
});



