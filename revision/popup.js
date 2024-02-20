document.getElementById('generateLink').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: "generateLink" });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "sendLink") {
        const linkElement = document.getElementById('prefilledLink');
        linkElement.textContent = "Generated GitHub Link";
        linkElement.href = message.url;
    }
});
