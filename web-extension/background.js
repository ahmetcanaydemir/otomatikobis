chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        fetch("https://otomatik-obis.herokuapp.com", {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                redirect: "follow",
                referrer: "no-referrer",
                body: JSON.stringify({
                    base64: request.base64
                }),
            })
            .then(response => {
                const responseCopy = response.clone();
                return responseCopy.json().catch(_ => response.text());
            }).then(data => {
                sendResponse(data.result);
            });
        return true;
    });