let mirrored = false;

function setMirrorState(state) {
    mirrored = state;
    mirrorVideos();
}

function mirrorVideos() {
    document.querySelectorAll("video").forEach(video => {
        video.style.transform = mirrored ? "scaleX(-1)" : "";
    });

    document.querySelectorAll("vk-video-player").forEach(player => {
        player.style.transform = mirrored ? "scaleX(-1)" : "";
    });
}

// Получаем сохранённое состояние
chrome.storage.local.get(["mirrored"], result => {
    setMirrorState(result.mirrored ?? false);
});

// Переключение
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "toggleMirror") {
        setMirrorState(!mirrored);

        chrome.storage.local.set({
            mirrored: mirrored
        });

        sendResponse({
            mirrored: mirrored
        });
    }
});

// Отслеживаем динамические изменения страницы
const observer = new MutationObserver(() => {
    if (mirrored) {
        mirrorVideos();
    }
});

observer.observe(document.documentElement, {
    childList: true,
    subtree: true
});