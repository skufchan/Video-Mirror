const button = document.getElementById("mirrorButton");
const buttonText = document.getElementById("buttonText");
const statusText = document.getElementById("statusText");
const statusDot = document.getElementById("statusDot");

async function updateUI() {
    const result = await chrome.storage.local.get(["mirrored"]);
    const mirrored = result.mirrored ?? false;

    if (mirrored) {
        buttonText.textContent = "Выключить отзеркаливание";
        statusText.textContent = "Включено";
        statusDot.classList.add("active");
    } else {
        buttonText.textContent = "Включить отзеркаливание";
        statusText.textContent = "Выключено";
        statusDot.classList.remove("active");
    }
}

button.addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });

    if (!tab || !tab.id) {
        return;
    }

    try {
        await chrome.tabs.sendMessage(tab.id, {
            action: "toggleMirror"
        });

        await updateUI();

    } catch (error) {
        console.error(
            "Не удалось отправить команду:",
            error
        );
    }
});

updateUI();