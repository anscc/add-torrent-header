function copyToClipboard(text) {
    function oncopy(event) {
        document.removeEventListener("copy", oncopy, false);
        // Hide the event from the page to prevent tampering.
        event.stopImmediatePropagation();

        // Overwrite the clipboard content.
        event.preventDefault();
        event.clipboardData.setData("text/plain", text);
    }
    document.addEventListener("copy", oncopy, false);
    document.execCommand("copy");
}
