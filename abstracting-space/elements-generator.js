/**
 * Lightweight helpers and corrected element generators
 */

/** Deep merge for nested defaults */
function mergeDeep(target = {}, ...sources) {
    for (const src of sources) {
        if (!src) continue;
        for (const key of Object.keys(src)) {
            const val = src[key];
            if (val && typeof val === "object" && !Array.isArray(val)) {
                target[key] = mergeDeep(target[key] || {}, val);
            } else {
                target[key] = val;
            }
        }
    }
    return target;
}

/** Apply style object (camelCase or dashed) to element */
function applyStyles(el, styles = {}) {
    const parts = [];
    for (const key in styles) {
        // accept both camelCase and CSS property names
        const cssKey = key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
        parts.push(`${cssKey}: ${styles[key]}`);
    }
    el.style.cssText = parts.join("; ");
    return el;
}

/** Create a page tail (centered overlay container) */
function createPageTail(tailId, style = {}) {
    const defaultStyle = {
        id: tailId || "page-tail",
        inset: "0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: "50",
    };
    const pageTail = document.createElement("div");
    pageTail.id = defaultStyle.id;
    applyStyles(pageTail, mergeDeep({}, defaultStyle, style));
    return pageTail;
}

/** Create a bottom-right dialog (returns element with scroll container appended) */
function createRightBottomDialog(dialogSettings = {}) {
    const defaultDialogSettings = {
        outerContainerSettings: {
            id: "write-id-here",
            position: "fixed",
            bottom: "80px",
            right: "20px",
            background: "#2d2d2d",
            border: "1px solid #555",
            borderRadius: "6px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.5)",
            width: "280px",
            maxHeight: "70vh",
            fontFamily: "Arial, sans-serif",
            fontSize: "13px",
            color: "#ffffff",
            display: "flex",
            flexDirection: "column",
            zIndex: "2147483647",
            padding: "0",
        },
        innerContainerSettings: {
            id: "",
            scrollable: "auto",
            padding: "8px",
            overflowX: "hidden",
            scrollbarWidth: "thin",
        },
    };

    const settings = mergeDeep({}, defaultDialogSettings, dialogSettings);

    const rightBottomDialog = document.createElement("div");
    rightBottomDialog.id = settings.outerContainerSettings.id || "";
    applyStyles(rightBottomDialog, settings.outerContainerSettings);

    const scrollContainer = document.createElement("div");
    if (settings.innerContainerSettings.id) scrollContainer.id = settings.innerContainerSettings.id;
    applyStyles(scrollContainer, {
        overflowY: settings.innerContainerSettings.scrollable,
        overflowX: settings.innerContainerSettings.overflowX || "hidden",
        maxHeight: "inherit",
        padding: settings.innerContainerSettings.padding,
        scrollbarWidth: settings.innerContainerSettings.scrollbarWidth,
        background: "transparent",
    });

    rightBottomDialog.appendChild(scrollContainer);

    // expose a small API on the element for convenience
    rightBottomDialog.content = () => scrollContainer;
    rightBottomDialog.setContent = (nodeOrHtml) => {
        scrollContainer.innerHTML = "";
        if (typeof nodeOrHtml === "string") {
            scrollContainer.innerHTML = nodeOrHtml;
        } else {
            scrollContainer.appendChild(nodeOrHtml);
        }
    };

    return rightBottomDialog;
}

/** Create header element (returns DOM element) */
function createHeader(headerStyle = {}) {
    const defaultHeaderStyle = {
        headerNumber: 4,
        headerText: "Header Text Here",
        margin: "0 0 12px 0",
        color: "inherit",
        fontSize: "14px",
    };
    const cfg = mergeDeep({}, defaultHeaderStyle, headerStyle);
    const h = document.createElement(`h${cfg.headerNumber}`);
    h.textContent = cfg.headerText;
    applyStyles(h, { margin: cfg.margin, color: cfg.color, fontSize: cfg.fontSize });
    return h;
}

/** Create button element (returns DOM element) */
function createButton(buttonStyle = {}) {
    const defaultButtonStyle = {
        buttonId: "button-id",
        buttonText: "Button",
        backgroundColor: "#525557ff",
        color: "white",
        border: "none",
        padding: "6px 12px",
        borderRadius: "3px",
        cursor: "pointer",
        marginRight: "5px",
        fontSize: "12px",
    };
    const cfg = mergeDeep({}, defaultButtonStyle, buttonStyle);
    const btn = document.createElement("button");
    btn.id = cfg.buttonId;
    btn.textContent = cfg.buttonText;
    applyStyles(btn, {
        background: cfg.backgroundColor,
        color: cfg.color,
        border: cfg.border,
        padding: cfg.padding,
        borderRadius: cfg.borderRadius,
        cursor: cfg.cursor,
        marginRight: cfg.marginRight,
        fontSize: cfg.fontSize,
    });
    return btn;
}

/** Create a div with content functions -> returns element */
function createDivWithContent(divId = "div-id", divStyle = "display: flex; gap: 4px; margin-bottom: 4px; align-items: center;", contentFunctions = []) {
    const div = document.createElement("div");
    div.id = divId;
    div.style.cssText = divStyle;
    contentFunctions.forEach((func) => {
        const result = func();
        if (typeof result === "string") {
            // append as HTML snippet
            const wrapper = document.createElement("span");
            wrapper.innerHTML = result;
            while (wrapper.firstChild) div.appendChild(wrapper.firstChild);
        } else if (result instanceof Node) {
            div.appendChild(result);
        }
    });
    return div;
}

/** Create input element */
function createInputField(inputStyle = {}) {
    const defaultInputStyle = {
        inputId: "input-id",
        inputType: "text",
        inputPlaceholder: "Enter value",
        inputStyle: {
            flex: "1",
            padding: "4px",
            border: "1px solid #555",
            borderRadius: "3px",
            background: "#404040",
            color: "#ffffff",
            fontSize: "11px",
        },
    };
    const cfg = mergeDeep({}, defaultInputStyle, inputStyle);
    const input = document.createElement("input");
    input.type = cfg.inputType;
    input.id = cfg.inputId;
    input.placeholder = cfg.inputPlaceholder;
    applyStyles(input, cfg.inputStyle);
    return input;
}

/** Create span element */
function createSpan(spanStyle = {}) {
    const defaultSpanStyle = {
        spanText: "Span Text Here",
        spanStyle: {
            color: "#ccc",
            fontSize: "11px",
        },
    };
    const cfg = mergeDeep({}, defaultSpanStyle, spanStyle);
    const s = document.createElement("span");
    s.textContent = cfg.spanText;
    applyStyles(s, cfg.spanStyle);
    return s;
}
