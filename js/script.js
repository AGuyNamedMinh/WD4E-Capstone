const themeButton = document.getElementById("theme-toggle");

const themeIcon = document.getElementById("theme-icon");

const savedMode = localStorage.getItem("theme") ?? "system";

const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

applyTheme(savedMode);

systemTheme.addEventListener("change", () => {

    const mode = localStorage.getItem("theme") ?? "system";

    if (mode === "system") {
        applyTheme("system");
    }
});

themeButton.addEventListener("click", () => {

    const currentMode = localStorage.getItem("theme") ?? "system";

    let nextMode;

    switch (currentMode) {

        case "system":
            nextMode = "light";
            break;

        case "light":
            nextMode = "dark";
            break;

        default:
            nextMode = "system";

    }

    if (nextMode === "system") {
        localStorage.removeItem("theme");
    } else {
        localStorage.setItem("theme", nextMode);
    }

    applyTheme(nextMode);

});

function applyTheme(mode) {

    let actualTheme;

    switch (mode) {

        case "light":
            actualTheme = "light";
            break;

        case "dark":
            actualTheme = "dark";
            break;

        default:
            actualTheme = systemTheme.matches ? "dark" : "light";
    }

    document.documentElement.dataset.theme = actualTheme;

    updateThemeIcon(mode);
    updateButtonLabels(mode);
}

function updateThemeIcon(mode) {

    themeIcon.className = "fa-solid";

    switch (mode) {

        case "light":
            themeIcon.classList.add("fa-sun");
            break;

        case "dark":
            themeIcon.classList.add("fa-moon");
            break;

        default:
            themeIcon.classList.add("fa-circle-half-stroke");
    }

}

function updateButtonLabels(mode) {

    const label = `Theme: ${mode.charAt(0).toUpperCase() + mode.slice(1)}`;

    console.log("Setting label:", label);

    themeButton.title = label;
    themeButton.setAttribute("aria-label", label);
    }