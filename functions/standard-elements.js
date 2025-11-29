// these are standard elements used in my scripts .. given that I will always use the same styling, I have decided to make them kind of a library for reuse. I want to use them as @require in my userscripts.

function createAdxDialog(dialogId, cssText, scrollCssText) { // create a dialog, scrollable, nice, fixed to bottom right, and non intrusive.
  const dialog = document.createElement("div");
  dialog.id = dialogId || `unnamed-dialog-${Date.now()}`;
  dialog.style.cssText = cssText || `
            position: fixed !important;
            bottom: 80px !important;
            right: 20px !important;
            background: #2d2d2d !important;
            border: 1px solid #555 !important;
            border-radius: 6px !important;
            box-shadow: 0 2px 10px rgba(0,0,0,0.5) !important;
            z-index: 2147483647 !important;
            width: 280px !important;
            max-height: 70vh !important;
            font-family: Arial, sans-serif !important;
            font-size: 13px !important;
            color: #ffffff !important;
            display: flex !important;
            flex-direction: column !important;
        `;
  const scrollContainer = document.createElement("div");
  scrollContainer.style.cssText = scrollCssText || `
            overflow-y: auto !important;
            overflow-x: hidden !important;
            max-height: calc(70vh - 24px) !important;
            padding: 12px !important;
            scrollbar-width: thin !important;
            scrollbar-color: #555 #2d2d2d !important;
        `;
  dialog.appendChild(scrollContainer);
  document.body.appendChild(dialog);
};
function createAdxHeadingElement(content, level, cssText) { // create a heading element (pass h1, h2, h3, etc as string)
  // level is "h1", "h2", "h3", "h4", etc
  const heading = document.createElement(level);
  heading.style.cssText = cssText || `margin: 0 0 12px 0; color: #ffffff`;
  heading.textContent = content;
  return heading;
}
function createAdxDivContainer(cssText) { // a div container for grouping elements
  const container = document.createElement("div");
  container.style.cssText = cssText || `text-align: center; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #555;`;
  return container;
}
function createAdxButton(buttonText, backgroundColor, textColor, fontSize, cssText) { // create a button with standard styling
  const button = document.createElement("button");
  const buttonId = `button-${buttonText.replace(/\s+/g, "").toLowerCase()}`;
  button.id = buttonId;
  button.textContent = buttonText;
  button.style.cssText = cssText || `
        border: none;
        padding: 6px 12px;
        border-radius: 3px;
        cursor: pointer;
        font-size: ${fontSize || "12px"};
        background: ${backgroundColor || "#19312aff"}; 
        color: ${textColor} || "#ffffff"};
    `;
  return button;
}
function createAdxTextInput(placeholderText, cssText) { // create a text input with standard styling
  const input = document.createElement("input");
  const inputId = `input-${placeholderText.replace(/\s+/g, "").toLowerCase()}`;
  input.id = inputId;
  input.type = "text";
  input.placeholder = placeholderText;
  input.style.cssText = cssText || `
        flex: 1;
        padding: 4px;
        border: 1px solid #555;
        border-radius: 3px;
        background: #404040;
        color: #ffffff;
        font-size: 11px;
    `;
  return input;
};
function showToast(message, type = "info") { // show a toast notification ("info", "success", "error"). Defaults to "info".
  const toast = document.createElement("div");
  toast.className = `fixed top-4 right-4 p-4 rounded-md z-50 ${
    type === "error"
      ? "bg-red-500 text-white"
      : type === "success"
      ? "bg-green-500 text-white"
      : "bg-blue-500 text-white"
  }`;
  toast.innerHTML = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3000);
};
function createAdxDropdown(dropdownId, optionsArray, cssText) { // create a dropdown (select) element
  const select = document.createElement("select");
  select.id = dropdownId;
  select.className = "w-full p-1 text-xs border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white";
  if (cssText) select.style.cssText = cssText;
  optionsArray.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option.value;
    optionElement.textContent = option.text;
    select.appendChild(optionElement);
  });
  return select;
};
function createAdxLabeledCheckbox(labelText, isChecked = false, cssText) { // create a labeled checkbox
  const label = document.createElement("label");
  label.className = "flex items-center text-xs text-gray-600 dark:text-gray-400 ml-2";
  if (cssText) label.style.cssText = cssText;
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = labelText.toLowerCase().replace(/\s+/g, "-") + "-checkbox";
  if (isChecked) {
    checkbox.checked = true;
  }
  checkbox.className = "mr-1";
  const textNode = document.createTextNode(labelText);
  label.appendChild(checkbox);
  label.appendChild(textNode);
  return label;
};
function createAdxTextarea(placeholderText, textContent = "", cssText) { // create a textarea with standard styling
  const textarea = document.createElement("textarea");
  textarea.id = placeholderText.toLowerCase().replace(/\s+/g, "-") + "-textarea";
  textarea.rows = 2;
  textarea.className = "w-full p-1 text-xs border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white";
  if (cssText) textarea.style.cssText = cssText;
  textarea.placeholder = placeholderText;
  textarea.textContent = textContent;
  return textarea;
}
function createAdxSimpleLabel(labelText, cssText) { // create a simple label element
  const label = document.createElement("label");
  label.className = "block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1";
  if (cssText) label.style.cssText = cssText;
  label.textContent = labelText;
  return label;
}