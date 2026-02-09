const OVERLAY_ID = "yts-only-overlay";
const TEXT_ID = "yts-only-text";

let isDisabled = false;

function removeUI() {
  document.getElementById(OVERLAY_ID)?.remove();
  document.getElementById(TEXT_ID)?.remove();
}

function applyBlur() {
  if (isDisabled) {
    removeUI();
    return;
  }

  const grid = document.querySelector("ytd-rich-grid-renderer #contents");
  if (!grid) return;

  if (grid.querySelector(`#${OVERLAY_ID}`)) return;

  grid.style.position = "relative";

  // блюр
  const overlay = document.createElement("div");
  overlay.id = OVERLAY_ID;
  overlay.style.position = "absolute";
  overlay.style.inset = "0";
  overlay.style.backdropFilter = "blur(12px)";
  overlay.style.background = "rgb(0 0 0 / 68%)";
  overlay.style.zIndex = "10";

  // Placeholder in the viewport center
  if (!document.getElementById(TEXT_ID)) {
    const text = document.createElement("div");
    text.id = TEXT_ID;
    text.style.position = "absolute";
    text.style.top = "40vh";
    text.style.left = "50%";
    text.style.transform = "translate(-50%, 0)";
    text.style.textAlign = "center";
    text.style.zIndex = "11";
    text.style.maxWidth = "80vw";

    const mainText = document.createElement("div");
    mainText.textContent = "Thumbnails are hidden to help you focus";
    mainText.style.color = "rgb(148 148 148 / 85%)";
    mainText.style.fontSize = "16px";
    mainText.style.fontWeight = "500";
    mainText.style.lineHeight = "1.4";

    const hintText = document.createElement("div");
    hintText.textContent = "Press Esc to show recommendations";
    hintText.style.marginTop = "8px";
    hintText.style.color = "rgb(148 148 148 / 60%)";
    hintText.style.fontSize = "12px";

    text.appendChild(mainText);
    text.appendChild(hintText);

    overlay.appendChild(text);
  }

  grid.appendChild(overlay);
}

// Esc handler
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;

  isDisabled = true;
  removeUI();
});

const observer = new MutationObserver(applyBlur);

observer.observe(document.documentElement, {
  childList: true,
  subtree: true,
});

applyBlur();
