chrome.commands.onCommand.addListener(async (command) => {
    if (command !== "toggle-mirror") {
        return;
    }

    const tabs = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });

    const tab = tabs[0];

    if (!tab || !tab.id) {
        return;
    }

    try {
        await chrome.tabs.sendMessage(tab.id, {
            action: "toggleMirror"
        });
    } catch (error) {
        console.log("Не удалось отправить команду:", error);
    }
});