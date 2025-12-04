// ==UserScript==
// @name          Splitter using my elements
// @namespace    http://tampermonkey.net/
// @version      2025-06-17
// @description  Split long prompts for ChatGPT
// @author       You
// @match        https://chatgpt.com/*
// @match        https://chat.openai.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=openai.com
// @require      https://raw.githubusercontent.com/adxxxbox/adx-public/refs/heads/main/functions/standard-elements.js
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_xmlhttpRequest
// ==/UserScript==

const { createElement } = require("react");

(function () {
  "use strict";
  // these are standard elements used in my scripts .. given that I will always use the same styling, I have decided to make them kind of a library for reuse. I want to use them as @require in my userscripts.
  // @require https://raw.githubusercontent.com/adxxxbox/adx-public/refs/heads/main/functions/standard-elements.js
          // Helper to append multiple children to a parent
          function appendChildren(parent, children) {
            children.forEach(child => parent.appendChild(child));
            return parent;
          }
  function createAdxDialog(dialogId, cssText, scrollCssText) {
    // create a dialog, scrollable, nice, fixed to bottom right, and non intrusive.
    const dialog = document.createElement("div");
    dialog.id = dialogId || `unnamed-dialog-${Date.now()}`;
    dialog.style.cssText =
      cssText ||
      `
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
    scrollContainer.style.cssText =
      scrollCssText ||
      `
            overflow-y: auto !important;
            overflow-x: hidden !important;
            max-height: calc(70vh - 24px) !important;
            padding: 12px !important;
            scrollbar-width: thin !important;
            scrollbar-color: #555 #2d2d2d !important;
        `;
    dialog.appendChild(scrollContainer);
    document.body.appendChild(dialog);
  }
  function createAdxHeadingElement(content, level, cssText) {
    // create a heading element (pass h1, h2, h3, etc as string)
    // level is "h1", "h2", "h3", "h4", etc
    const heading = document.createElement(level);
    heading.style.cssText = cssText || `margin: 0 0 12px 0; color: #ffffff`;
    heading.textContent = content;
    return heading;
  }
  function createAdxDivContainer(cssText) {
    // a div container for grouping elements
    const container = document.createElement("div");
    container.style.cssText =
      cssText ||
      `text-align: center; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #555;`;
    return container;
  }
  function createAdxButton(
    buttonText,
    backgroundColor,
    textColor,
    fontSize,
    cssText
  ) {
    // create a button with standard styling
    const button = document.createElement("button");
    const buttonId = `button-${buttonText.replace(/\s+/g, "").toLowerCase()}`;
    button.id = buttonId;
    button.textContent = buttonText;
    button.style.cssText =
      cssText ||
      `
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
  function createAdxTextInput(placeholderText, cssText) {
    // create a text input with standard styling
    const input = document.createElement("input");
    const inputId = `input-${placeholderText
      .replace(/\s+/g, "")
      .toLowerCase()}`;
    input.id = inputId;
    input.type = "text";
    input.placeholder = placeholderText;
    input.style.cssText =
      cssText ||
      `
        flex: 1;
        padding: 4px;
        border: 1px solid #555;
        border-radius: 3px;
        background: #404040;
        color: #ffffff;
        font-size: 11px;
    `;
    return input;
  }
  function showToast(message, type = "info") {
    // show a toast notification ("info", "success", "error"). Defaults to "info".
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
  }
  function createAdxDropdown(dropdownId, optionsArray, cssText) {
    // create a dropdown (select) element
    const select = document.createElement("select");
    select.id = dropdownId;
    select.className =
      "w-full p-1 text-xs border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white";
    if (cssText) select.style.cssText = cssText;
    optionsArray.forEach((option) => {
      const optionElement = document.createElement("option");
      optionElement.value = option.value;
      optionElement.textContent = option.text;
      select.appendChild(optionElement);
    });
    return select;
  }
  function createAdxLabeledCheckbox(labelText, isChecked = false, cssText) {
    // create a labeled checkbox
    const label = document.createElement("label");
    label.className =
      "flex items-center text-xs text-gray-600 dark:text-gray-400 ml-2";
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
  }
  function createAdxTextarea(placeholderText, textContent = "", cssText) {
    // create a textarea with standard styling
    const textarea = document.createElement("textarea");
    textarea.id =
      placeholderText.toLowerCase().replace(/\s+/g, "-") + "-textarea";
    textarea.rows = 2;
    textarea.className =
      "w-full p-1 text-xs border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white";
    if (cssText) textarea.style.cssText = cssText;
    textarea.placeholder = placeholderText;
    textarea.textContent = textContent;
    return textarea;
  }
  function createAdxSimpleLabel(labelText, cssText) {
    // create a simple label element
    const label = document.createElement("label");
    label.className =
      "block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1";
    if (cssText) label.style.cssText = cssText;
    label.textContent = labelText;
    return label;
  }

  //================
  //================
  //================
  //================
  //================
  //================
  //================
  //================

  // Configuration object for easy reconfiguration
  // Only keep chunk prompt in config
  const CONFIG = {
    API: {
      ENABLED: true,
      URL: "https://script.google.com/macros/s/AKfycbwhzJXqzziExl5uLY2djhOiaEtzfLCKprWYIAJTK7tqTw7KCFf5kFKH9Lfl9LGXCdlFnw/exec",
      TIMEOUT: 10000,
    },
    UI: {
      SEND_DELAY: 300,
      RESPONSE_CHECK_INTERVAL: 1000,
      INITIAL_RESPONSE_DELAY: 2000,
      RANDOM_DELAY_MIN: 100,
      RANDOM_DELAY_MAX: 500,
    },
    SPLITTER: {
      DEFAULT_DELIMITER: "\n\n---\n\n",
      DEFAULT_CHUNK_PROMPT: "And this.",
    },
    DEBUG: {
      ENABLED: true,
      LOG_CHUNKS: true,
      LOG_TIMING: true,
    },
  };

  // Storage Manager - handles saving/loading all splitter settings as a single object
  const StorageManager = {
    // Loads settings object from GM storage, or returns defaults if not found
    getSplitterSettings() {
      // Try to get the JSON string from storage
      const saved = GM_getValue("splitter_settings", null);
      if (saved) {
        try {
          // Parse and return the object if found
          const obj = JSON.parse(saved);
          // Print the loaded settings object for debugging and learning
          console.log("[Splitter Settings Loaded]", obj);
          return obj;
        } catch (e) {
          // If parsing fails, fall back to defaults
          console.warn("Failed to parse saved settings, using defaults.", e);
        }
      }
      // Only keep chunkPrompt in defaults
      const defaults = {
        delimiter: CONFIG.SPLITTER.DEFAULT_DELIMITER,
        chunkPrompt: CONFIG.SPLITTER.DEFAULT_CHUNK_PROMPT,
        useRegex: false,
        randomDelayMin: CONFIG.UI.RANDOM_DELAY_MIN,
        randomDelayMax: CONFIG.UI.RANDOM_DELAY_MAX,
      };
      // Print the default settings object for debugging and learning
      console.log("[Splitter Settings Defaults]", defaults);
      return defaults;
    },
    // Saves the settings object as a JSON string in GM storage
    setSplitterSettings(settings) {
      // Save the whole object as a JSON string
      GM_setValue("splitter_settings", JSON.stringify(settings));
    },
    getLastState() {
      const defaults = {
        text: "",
        source: null,
        fileName: "",
        lastConfigIndex: 0,
        timestamp: 0,
      };
      const saved = GM_getValue("splitter_last_state", null);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          return { ...defaults, ...parsed };
        } catch (error) {
          console.warn(
            "Failed to parse saved splitter state, using defaults.",
            error
          );
        }
      }
      return { ...defaults };
    },
    setLastState(state) {
      const current = this.getLastState();
      const updatedState = {
        ...current,
        ...state,
        timestamp: Date.now(),
      };
      GM_setValue("splitter_last_state", JSON.stringify(updatedState));
    },
    updateLastState(partialState) {
      this.setLastState(partialState);
    },
  };

  // UI Utilities - helper functions for interface management
  const UIUtils = {
    isDarkMode() {
      return (
        document.documentElement.classList.contains("dark") ||
        document.body.classList.contains("dark")
      );
    },
    showToast(message, type = "info") {
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
    },
    debounce(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    },
    closeModal(modalId) {
      const modal = document.querySelector(`#${modalId}`);
      if (modal) {
        modal.remove();
      }
    },
  };

  // Splitter functionality - handles text splitting and chunk generation
  const TextSplitter = {
    // Splits text into chunks using delimiter or regex
    splitText(text, delimiter, useRegex = false) {
      if (!text || !delimiter) return [text];
      try {
        if (useRegex) {
          const regex = new RegExp(delimiter);
          return text.split(regex).filter((chunk) => chunk.trim().length > 0);
        } else {
          return text
            .split(delimiter)
            .filter((chunk) => chunk.trim().length > 0);
        }
      } catch (error) {
        console.error("Error splitting text:", error);
        return [text];
      }
    },
    // For each chunk, append the chunkPrompt after the chunk (for all chunks)
    generateChunks(text, settings) {
      const { delimiter, chunkPrompt, useRegex } = settings;
      const textChunks = this.splitText(text, delimiter, useRegex);
      const chunks = [];
      textChunks.forEach((chunk, index) => {
        // Simple format: chunk with chunkPrompt after it
        let formattedChunk = `[CHUNK ${index + 1} / ${
          textChunks.length
        }]\n${chunk.trim()}\n[END CHUNK ${index + 1} / ${textChunks.length}]`;
        if (chunkPrompt && chunkPrompt.trim()) {
          formattedChunk += `\n\n${chunkPrompt}`;
        }
        chunks.push(formattedChunk);
      });
      return chunks;
    },
  };

  // Text Input Manager - simple module to handle both file and paste text input
  // This keeps track of what text we're working with, whether from file or paste
  const TextInputManager = {
    currentText: "", // Stores the text we'll split
    source: null,
    fileName: "",

    // Sets text from a file upload - returns a promise since file reading is async
    setTextFromFile(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.currentText = e.target.result;
          this.source = "file";
          this.fileName = file ? file.name : "";
          StorageManager.updateLastState({
            text: this.currentText,
            source: this.source,
            fileName: this.fileName,
          });
          const charCount = this.currentText.length;
          updateFileInputDisplay(
            this.fileName
              ? `Loaded "${this.fileName}" (${charCount} chars)`
              : `File text ready (${charCount} chars)`
          );
          resolve(this.currentText);
        };
        reader.onerror = reject;
        reader.readAsText(file);
      });
    },

    // Sets text directly from paste - simple and immediate
    setTextFromPaste(text) {
      this.currentText = text;
      this.source = "paste";
      this.fileName = "";
      StorageManager.updateLastState({
        text: this.currentText,
        source: this.source,
        fileName: this.fileName,
      });
      return this.currentText;
    },

    // Gets whatever text we currently have loaded
    getCurrentText() {
      return this.currentText;
    },

    restoreFromState(state) {
      this.currentText = state.text || "";
      this.source = state.source || null;
      this.fileName = state.fileName || "";
    },

    // Clears the current text (useful when starting fresh)
    clearText() {
      this.currentText = "";
      this.source = null;
      this.fileName = "";
      StorageManager.updateLastState({
        text: this.currentText,
        source: this.source,
        fileName: this.fileName,
      });
    },
  };

  // Chunk Chain Manager - handles sequential sending of chunks with pause/resume controls
  const ChunkChainManager = {
    currentChunks: [],
    currentIndex: 0,
    isRunning: false,
    isPaused: false,
    totalChunks: 0,
    pause() {
      this.isPaused = true;
      this.updateControlButtons();
      this.updateStatus();
      if (CONFIG.DEBUG.ENABLED) console.log("[DEBUG] Process paused by user");
    },
    resume() {
      this.isPaused = false;
      this.updateControlButtons();
      this.updateStatus();
      if (CONFIG.DEBUG.ENABLED) console.log("[DEBUG] Process resumed by user");
      if (this.currentIndex < this.currentChunks.length) {
        this.waitForResponseAndInsertNext();
      }
    },
    stop() {
      this.isRunning = false;
      this.isPaused = false;
      this.currentChunks = [];
      this.currentIndex = 0;
      this.totalChunks = 0;
      this.updateControlButtons();
      const statusElement = document.querySelector("#splitter-status");
      if (statusElement) {
        statusElement.textContent = "";
      }
      if (CONFIG.DEBUG.ENABLED) console.log("[DEBUG] Process stopped by user");
      UIUtils.showToast("Process stopped", "info");
    },
    start(chunks) {
      this.currentChunks = chunks;
      this.currentIndex = 0;
      this.totalChunks = chunks.length;
      this.isRunning = true;
      this.isPaused = false;
      this.updateControlButtons();
      if (CONFIG.DEBUG.ENABLED) {
        console.log(
          `ChunkChainManager: Starting with ${this.totalChunks} chunks`
        );
        if (CONFIG.DEBUG.LOG_CHUNKS) {
          chunks.forEach((chunk, index) => {
            console.log(`Chunk ${index + 1}:`, chunk.substring(0, 100) + "...");
          });
        }
      }
      this.updateStatus();
      this.sendCurrentChunk();
    },
    sendCurrentChunk() {
      if (!this.isRunning || this.currentIndex >= this.currentChunks.length) {
        this.finish();
        return;
      }
      const textArea = document.querySelector("#prompt-textarea");
      if (!textArea) {
        this.stop();
        return;
      }
      const currentChunk = this.currentChunks[this.currentIndex];
      // Add text to existing content instead of replacing it
      const existingContent = textArea.innerHTML || "";
      const separator = existingContent.trim() ? "<br><br>" : "";
      textArea.innerHTML =
        existingContent +
        separator +
        `<p>${currentChunk.replace(/\n/g, "</p><p>")}</p>`;
      textArea.dispatchEvent(new Event("input", { bubbles: true }));
      setTimeout(() => {
        const sendButton = document.querySelector(
          '[data-testid*="send-button"]'
        );
        if (sendButton && !sendButton.disabled) {
          sendButton.click();
          this.currentIndex++;
          this.updateStatus();
          if (this.currentIndex < this.currentChunks.length) {
            this.waitForResponseAndInsertNext();
          } else {
            this.finish();
          }
        } else {
          this.stop();
        }
      }, CONFIG.UI.SEND_DELAY);
    },
    waitForResponseAndInsertNext() {
      if (this.isPaused || !this.isRunning) {
        if (CONFIG.DEBUG.ENABLED)
          console.log("[DEBUG] Process paused or stopped, waiting...");
        return;
      }
      const checkForResponseCompletion = () => {
        if (this.isPaused || !this.isRunning) {
          if (CONFIG.DEBUG.ENABLED)
            console.log(
              "[DEBUG] Process paused or stopped during response check"
            );
          return;
        }
        const stopButton = document.querySelector(
          '[data-testid*="stop-button"]'
        );
        if (stopButton === null) {
          this.insertNextChunkText();
        } else {
          setTimeout(
            checkForResponseCompletion,
            CONFIG.UI.RESPONSE_CHECK_INTERVAL
          );
        }
      };
      setTimeout(checkForResponseCompletion, CONFIG.UI.INITIAL_RESPONSE_DELAY);
    },
    insertNextChunkText() {
      if (!this.isRunning || this.currentIndex >= this.currentChunks.length) {
        this.finish();
        return;
      }
      const textArea = document.querySelector("#prompt-textarea");
      if (!textArea) {
        this.stop();
        return;
      }
      const currentChunk = this.currentChunks[this.currentIndex];
      // Add text to existing content instead of replacing it
      const existingContent = textArea.innerHTML || "";
      const separator = existingContent.trim() ? "<br><br>" : "";
      textArea.innerHTML =
        existingContent +
        separator +
        `<p>${currentChunk.replace(/\n/g, "</p><p>")}</p>`;
      textArea.dispatchEvent(new Event("input", { bubbles: true }));
      this.waitForSendButtonAndClick();
    },
    waitForSendButtonAndClick() {
      const checkForSendButton = () => {
        const sendButton = document.querySelector(
          '[data-testid*="send-button"]'
        );
        if (
          sendButton &&
          !sendButton.disabled &&
          sendButton.offsetParent !== null
        ) {
          // Get delay values from stored settings instead of CONFIG defaults
          const settings = StorageManager.getSplitterSettings();
          const delay = getRandomDelay(
            settings.randomDelayMin,
            settings.randomDelayMax
          );
          if (CONFIG.DEBUG.ENABLED && CONFIG.DEBUG.LOG_TIMING) {
            console.log(
              `[DEBUG] Waiting ${delay}ms before sending chunk ${
                this.currentIndex + 1
              }`
            );
          }
          setTimeout(() => {
            sendButton.click();
            this.currentIndex++;
            this.updateStatus();
            if (this.currentIndex < this.currentChunks.length) {
              this.waitForResponseAndInsertNext();
            } else {
              this.finish();
            }
          }, delay);
        } else {
          setTimeout(checkForSendButton, CONFIG.UI.RESPONSE_CHECK_INTERVAL);
        }
      };
      setTimeout(checkForSendButton, 200);
    },
    updateStatus() {
      const statusElement = document.querySelector("#splitter-status");
      if (statusElement) {
        if (this.isRunning) {
          if (this.isPaused) {
            statusElement.textContent = `Paused at message ${
              this.currentIndex + 1
            } out of ${this.totalChunks}`;
            statusElement.className = "text-orange-600 text-sm ml-2";
          } else {
            statusElement.textContent = `Awaiting to send message ${
              this.currentIndex + 1
            } out of ${this.totalChunks}`;
            statusElement.className = "text-lightgray-600 text-sm ml-2";
          }
        }
      }
    },
    updateControlButtons() {
      const pauseResumeBtn = document.querySelector(
        "#pause-resume-splitter-button"
      );
      const stopBtn = document.querySelector("#stop-splitter-button");
      if (pauseResumeBtn && stopBtn) {
        if (this.isRunning) {
          pauseResumeBtn.style.display = "flex";
          stopBtn.style.display = "flex";
          if (this.isPaused) {
            pauseResumeBtn.textContent = "RESUME";
            pauseResumeBtn.title = "Resume Processing";
            pauseResumeBtn.className =
              "btn flex justify-center items-center btn-primary border rounded-md";
          } else {
            pauseResumeBtn.textContent = "PAUSE";
            pauseResumeBtn.title = "Pause Processing";
            pauseResumeBtn.className =
              "btn flex justify-center items-center btn-secondary border rounded-md";
          }
        } else {
          pauseResumeBtn.style.display = "none";
          stopBtn.style.display = "none";
        }
      }
    },
    finish() {
      this.isRunning = false;
      this.updateControlButtons();
      const statusElement = document.querySelector("#splitter-status");
      if (statusElement) {
        statusElement.textContent = "Finished all";
        statusElement.className = "text-green-600 text-sm ml-2";
        setTimeout(() => {
          statusElement.textContent = "";
        }, 3000);
      }
      UIUtils.showToast("All chunks sent successfully!", "success");
    },
    stop() {
      this.isRunning = false;
      this.isPaused = false;
      this.currentChunks = [];
      this.currentIndex = 0;
      this.totalChunks = 0;
      this.updateControlButtons();
      const statusElement = document.querySelector("#splitter-status");
      if (statusElement) {
        statusElement.textContent = "";
      }
    },
  };

  // Track if API fetch has already been done (per page load)
  let splitterApiFetched = false;
  let splitterApiConfig = null;

  // Create the splitter modal popup (fields update if API fetch finishes later)
  // Modified splitter modal to include config dropdown and refresh button
  function createSplitterModal() {
    let currentSettings = StorageManager.getSplitterSettings();
    const lastState = StorageManager.getLastState();
    let configs = getAllSplitterConfigs();
    const maxIndex = Math.max(configs.length - 1, 0);
    const preferredIndex =
      typeof lastState.lastConfigIndex === "number"
        ? Math.min(Math.max(lastState.lastConfigIndex, 0), maxIndex)
        : 0;

    // Build dropdown options from configs using their title property
    let dropdownOptions = configs
      .map((cfg, idx) => {
        // Use the title property if available, else fallback to 'Config {number}'
        const title = cfg.title ? cfg.title : `Config ${idx + 1}`;
        const selectedAttr = idx === preferredIndex ? " selected" : "";
        return `<option value="${idx}"${selectedAttr}>${title}</option>`;
      })
      .join("");

    const settings = currentSettings;
    // I will modify the below code to use standard functions for creating elements
    const adxDialog = createAdxDialog("splitter-modal");
    const splitterTitleHeading = createAdxHeadingElement("Text Splitter", "h2");
    const headingForDropdown = createAdxDivContainer(
      "Choose your settings below:"
    );
    const dropdownForConfigs = createAdxDropdown(
      "splitter-config-dropdown",
      dropdownOptions
    );
    const refreshButton = createAdxButton("⟳", "darkblue", "white", "14px");
    const fileAndPasteDiv = createAdxDivContainer()
      .appendChild(createElement("input", (type = "file")))
      .appendChild(createAdxButton("Paste", "green", "white", "12px"));
    const delimiterLabel = createAdxSimpleLabel("Delimiter String");
    const checkboxForRegex = createAdxLabeledCheckbox(
      "Regex",
      settings.useRegex
    );
    const delimiterInputField = createAdxTextInput(
      "Enter delimiter string",
      settings.delimiter
    );
    const chunkPromptTextareaLabel = createAdxSimpleLabel(
      "Chunk Prompt (after each chunk)"
    );
    const chunkPromptTextarea = createAdxTextarea(
      "Prompt to append after each chunk",
      settings.chunkPrompt
    );
    const randomDelayDiv = createAdxDivContainer();
    const randomDelayLabel = createAdxSimpleLabel("Random delay between");
    const adxrandomDelayMinInput = createAdxTextInput(
      "Min",
      settings.randomDelayMin
    );
    const adxrandomDelayMaxInput = createAdxTextInput(
      "Max",
      settings.randomDelayMax
    );
    appendChildren(randomDelayDiv, [
      randomDelayLabel,
      adxrandomDelayMinInput,
      adxrandomDelayMaxInput,
    ]);
    const cancelButton = createAdxButton("Cancel", "gray", "white", "12px");
    const startButton = createAdxButton("Start", "blue", "white", "12px");
    const bottomButtonsDiv = createAdxDivContainer();
    appendChildren(bottomButtonsDiv, [cancelButton, startButton]);

    // now lets generate the whole modal .. the first div should have the rest of the elemenets appeneded to it
    const modal = appendChildren(adxDialog, [
      splitterTitleHeading,
      headingForDropdown,
      dropdownForConfigs,
      refreshButton,
      fileAndPasteDiv,
      delimiterLabel,
      checkboxForRegex,
      delimiterInputField,
      chunkPromptTextareaLabel,
      chunkPromptTextarea,
      randomDelayDiv,
      bottomButtonsDiv,
    ]);

    document.body.appendChild(modal);

    const dropdownEl = document.getElementById("splitter-config-dropdown");
    if (dropdownEl && String(preferredIndex) !== dropdownEl.value) {
      dropdownEl.value = String(preferredIndex);
    }

    const delimiterInput = document.getElementById("delimiter-input");
    const chunkPromptInput = document.getElementById("chunk-prompt-input");
    const regexCheckbox = document.getElementById("regex-checkbox");
    const randomDelayMinInput = document.getElementById(
      "random-delay-min-input"
    );
    const randomDelayMaxInput = document.getElementById(
      "random-delay-max-input"
    );
    const fileInputEl = document.getElementById("text-file-input");

    const deriveSettingsFromInputs = () => {
      const parsedMin = parseInt(randomDelayMinInput.value, 10);
      const parsedMax = parseInt(randomDelayMaxInput.value, 10);
      return {
        ...currentSettings,
        delimiter: delimiterInput.value || currentSettings.delimiter,
        chunkPrompt: chunkPromptInput.value,
        useRegex: !!regexCheckbox.checked,
        randomDelayMin: Number.isFinite(parsedMin)
          ? parsedMin
          : currentSettings.randomDelayMin,
        randomDelayMax: Number.isFinite(parsedMax)
          ? parsedMax
          : currentSettings.randomDelayMax,
      };
    };

    const persistModalSettings = () => {
      currentSettings = deriveSettingsFromInputs();
      StorageManager.setSplitterSettings(currentSettings);
    };

    const debouncedPersistModalSettings = UIUtils.debounce(
      persistModalSettings,
      250
    );

    delimiterInput.addEventListener("input", debouncedPersistModalSettings);
    chunkPromptInput.addEventListener("input", debouncedPersistModalSettings);
    regexCheckbox.addEventListener("change", persistModalSettings);
    randomDelayMinInput.addEventListener(
      "input",
      debouncedPersistModalSettings
    );
    randomDelayMaxInput.addEventListener(
      "input",
      debouncedPersistModalSettings
    );

    // When dropdown changes, update modal fields
    dropdownEl.addEventListener("change", (e) => {
      const idx = parseInt(e.target.value);
      configs = getAllSplitterConfigs(); // update in case refreshed
      if (!isNaN(idx) && configs[idx]) {
        updateModalFieldsFromConfig(configs[idx]);
        currentSettings = {
          ...currentSettings,
          delimiter: configs[idx].delimiter ?? currentSettings.delimiter,
          chunkPrompt: configs[idx].chunkPrompt ?? currentSettings.chunkPrompt,
          useRegex:
            typeof configs[idx].useRegex === "boolean"
              ? configs[idx].useRegex
              : currentSettings.useRegex,
          randomDelayMin:
            typeof configs[idx].randomDelayMin === "number"
              ? configs[idx].randomDelayMin
              : currentSettings.randomDelayMin,
          randomDelayMax:
            typeof configs[idx].randomDelayMax === "number"
              ? configs[idx].randomDelayMax
              : currentSettings.randomDelayMax,
        };
        StorageManager.setSplitterSettings(currentSettings);
        StorageManager.updateLastState({ lastConfigIndex: idx });
      }
    });

    // Add refresh button logic
    document
      .getElementById("refresh-configs-btn")
      .addEventListener("click", () => {
        // Show a quick loading indicator
        const btn = document.getElementById("refresh-configs-btn");
        btn.textContent = "...";
        fetchSplitterConfigsFromAPI().then((apiData) => {
          btn.textContent = "⟳";
          configs = getAllSplitterConfigs();
          // Rebuild dropdown options
          dropdownEl.innerHTML = configs
            .map((cfg, idx) => {
              const title = cfg.title ? cfg.title : `Config ${idx + 1}`;
              return `<option value='${idx}'>${title}</option>`;
            })
            .join("");
          // Update modal fields to first config
          if (configs[0]) {
            updateModalFieldsFromConfig(configs[0]);
            currentSettings = {
              ...currentSettings,
              delimiter: configs[0].delimiter ?? currentSettings.delimiter,
              chunkPrompt:
                configs[0].chunkPrompt ?? currentSettings.chunkPrompt,
              useRegex:
                typeof configs[0].useRegex === "boolean"
                  ? configs[0].useRegex
                  : currentSettings.useRegex,
              randomDelayMin:
                typeof configs[0].randomDelayMin === "number"
                  ? configs[0].randomDelayMin
                  : currentSettings.randomDelayMin,
              randomDelayMax:
                typeof configs[0].randomDelayMax === "number"
                  ? configs[0].randomDelayMax
                  : currentSettings.randomDelayMax,
            };
            StorageManager.setSplitterSettings(currentSettings);
            StorageManager.updateLastState({ lastConfigIndex: 0 });
          }
        });
      });

    // Only close the modal when the Cancel button is clicked
    document.getElementById("cancel-splitter").addEventListener("click", () => {
      UIUtils.closeModal("splitter-modal");
    });
    document.getElementById("start-splitter").addEventListener("click", () => {
      startSplitting();
    });

    if (lastState.text) {
      TextInputManager.restoreFromState(lastState);
      const statusLabel =
        lastState.source === "file"
          ? lastState.fileName
            ? `Restored cached "${lastState.fileName}" (${lastState.text.length} chars)`
            : `Restored cached file text (${lastState.text.length} chars)`
          : `Restored pasted text (${lastState.text.length} chars)`;
      updateFileInputDisplay(statusLabel);
    }

    // Add paste text button functionality
    document
      .getElementById("paste-text-button")
      .addEventListener("click", () => {
        createPasteTextDialog();
      });

    // Handle file input changes to clear pasted text status
    fileInputEl.addEventListener("change", (e) => {
      const { files } = e.target;
      const file = files && files[0] ? files[0] : null;
      if (file) {
        TextInputManager.setTextFromFile(file).catch((error) => {
          UIUtils.showToast("Error reading file: " + error.message, "error");
        });
      } else {
        TextInputManager.clearText();
        const statusMsg = document.getElementById("file-input-status");
        if (statusMsg) {
          statusMsg.remove();
        }
      }
    });

    // If API fetch hasn't been done yet, do it once and update fields if modal is still open
    if (!splitterApiFetched) {
      splitterApiFetched = true;
      fetchSplitterConfigsFromAPI().then((apiData) => {
        if (apiData && Array.isArray(apiData) && apiData.length > 0) {
          splitterApiConfig = apiData[0];
          const shouldApplyDefaults = lastState.timestamp === 0;
          if (shouldApplyDefaults) {
            currentSettings = {
              ...currentSettings,
              ...splitterApiConfig,
            };
            StorageManager.setSplitterSettings(currentSettings);
          }
          // If modal is still open, update the fields with new config
          const modalEl = document.getElementById("splitter-modal");
          if (modalEl && shouldApplyDefaults) {
            delimiterInput.value = splitterApiConfig.delimiter;
            chunkPromptInput.value = splitterApiConfig.chunkPrompt;
            regexCheckbox.checked = !!splitterApiConfig.useRegex;
            randomDelayMinInput.value = splitterApiConfig.randomDelayMin;
            randomDelayMaxInput.value = splitterApiConfig.randomDelayMax;
          }
        }
      });
    }

    // Persist current control values immediately so closing the modal keeps updates
    persistModalSettings();
  }

  // Helper to get all splitter configs (from API or local)
  function getAllSplitterConfigs() {
    // Use API configs if available, else just the current settings
    if (
      CURRENT_SPLITTER &&
      Array.isArray(CURRENT_SPLITTER) &&
      CURRENT_SPLITTER.length > 0
    ) {
      return CURRENT_SPLITTER;
    }
    // Fallback: just use the current settings as a single config
    return [StorageManager.getSplitterSettings()];
  }

  // Helper to update modal fields when a config is selected
  function updateModalFieldsFromConfig(config) {
    document.getElementById("delimiter-input").value = config.delimiter;
    document.getElementById("chunk-prompt-input").value = config.chunkPrompt;
    document.getElementById("regex-checkbox").checked = !!config.useRegex;
    document.getElementById("random-delay-min-input").value =
      config.randomDelayMin;
    document.getElementById("random-delay-max-input").value =
      config.randomDelayMax;
  }

  // Handle the splitting process when Start button is clicked
  function startSplitting() {
    const fileInput = document.getElementById("text-file-input");
    const delimiterInput = document.getElementById("delimiter-input");
    const chunkPromptInput = document.getElementById("chunk-prompt-input");
    const regexCheckbox = document.getElementById("regex-checkbox");
    const randomDelayMinInput = document.getElementById(
      "random-delay-min-input"
    );
    const randomDelayMaxInput = document.getElementById(
      "random-delay-max-input"
    );
    // Get selected config index
    const configDropdown = document.getElementById("splitter-config-dropdown");
    let selectedConfig = null;
    let selectedIndex = 0;
    if (configDropdown) {
      const idx = parseInt(configDropdown.value);
      const configs = getAllSplitterConfigs();
      if (!isNaN(idx) && configs[idx]) {
        selectedConfig = configs[idx];
        selectedIndex = idx;
      }
    }
    StorageManager.updateLastState({ lastConfigIndex: selectedIndex });
    // Check if we have text from either file or paste
    const file = fileInput.files[0];
    const currentText = TextInputManager.getCurrentText();
    if (!file && !currentText) {
      UIUtils.showToast("Please select a file or paste text", "error");
      return;
    }
    // Get user-configured delay values
    const randomDelayMin =
      parseInt(randomDelayMinInput.value) || CONFIG.UI.RANDOM_DELAY_MIN;
    const randomDelayMax =
      parseInt(randomDelayMaxInput.value) || CONFIG.UI.RANDOM_DELAY_MAX;
    // Use selected config if available, else use current modal values
    const settings = selectedConfig
      ? {
          ...selectedConfig,
          delimiter: delimiterInput.value || selectedConfig.delimiter,
          chunkPrompt: chunkPromptInput.value || selectedConfig.chunkPrompt,
          useRegex: regexCheckbox.checked,
          randomDelayMin: randomDelayMin,
          randomDelayMax: randomDelayMax,
        }
      : {
          delimiter: delimiterInput.value || CONFIG.SPLITTER.DEFAULT_DELIMITER,
          chunkPrompt:
            chunkPromptInput.value || CONFIG.SPLITTER.DEFAULT_CHUNK_PROMPT,
          useRegex: regexCheckbox.checked,
          randomDelayMin: randomDelayMin,
          randomDelayMax: randomDelayMax,
        };
    StorageManager.setSplitterSettings(settings);
    if (currentText) {
      processTextForSplitting(currentText, settings);
    } else if (file) {
      TextInputManager.setTextFromFile(file)
        .then((text) => {
          processTextForSplitting(text, settings);
        })
        .catch((error) => {
          UIUtils.showToast("Error reading file: " + error.message, "error");
        });
    }
  }

  // Helper function to process text and start splitting (keeps the logic clean)
  function processTextForSplitting(text, settings) {
    const chunks = TextSplitter.generateChunks(text, settings);

    if (chunks.length === 0) {
      UIUtils.showToast("No chunks generated from the text", "error");
      return;
    }

    UIUtils.closeModal("splitter-modal");
    ChunkChainManager.start(chunks);
  }

  // Create paste text dialog - simple popup for pasting text directly
  // This creates a compact modal with a small, resizable textarea (3 rows, can be dragged to expand)
  function createPasteTextDialog() {
    // Create modal overlay with semi-transparent background
    const pasteModal = document.createElement("div");
    pasteModal.id = "paste-text-modal";
    pasteModal.className =
      "fixed inset-0 flex items-center justify-center z-50";
    pasteModal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";

    // Modal content with a small, resizable textarea for pasting text
    pasteModal.innerHTML = `
      <div class="bg-white dark:bg-gray-800 rounded-lg p-3 w-64 max-w-90vw max-h-90vh">
        <h2 class="text-base font-bold mb-2 text-gray-900 dark:text-white">Paste Text</h2>
        <div class="space-y-2">
          <div>
            <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Paste your text here:
            </label>
            <textarea id="paste-text-area" rows="3"
                      class="w-full p-1 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white resize-vertical text-xs"
                      placeholder="Paste your text content here..."></textarea>
          </div>
        </div>
        <div class="flex justify-end space-x-2 mt-3">
          <button id="cancel-paste-text"
                  class="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-xs">
            Cancel
          </button>
          <button id="confirm-paste-text"
                  class="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs">
            Use Text
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(pasteModal);

    // Handle cancel button - close the paste dialog
    document
      .getElementById("cancel-paste-text")
      .addEventListener("click", () => {
        UIUtils.closeModal("paste-text-modal");
      });

    // Handle confirm button - use the pasted text
    document
      .getElementById("confirm-paste-text")
      .addEventListener("click", () => {
        const textArea = document.getElementById("paste-text-area");
        const pastedText = textArea.value.trim();

        if (!pastedText) {
          UIUtils.showToast("Please paste some text first", "error");
          return;
        }

        // Set the text in our manager and update UI
        TextInputManager.setTextFromPaste(pastedText);
        updateFileInputDisplay("Pasted text ready");
        UIUtils.closeModal("paste-text-modal");
        UIUtils.showToast("Text loaded successfully!", "success");
      });
  }

  // Helper function to update the file input display text
  // This shows a status message to let user know what text is currently loaded
  function updateFileInputDisplay(message) {
    const fileInput = document.getElementById("text-file-input");
    if (fileInput) {
      // Create or update a status message near the file input
      let statusMsg = document.getElementById("file-input-status");
      if (!statusMsg) {
        statusMsg = document.createElement("div");
        statusMsg.id = "file-input-status";
        statusMsg.className = "text-sm text-green-600 dark:text-green-400 mt-1";
        fileInput.parentNode.appendChild(statusMsg);
      }
      statusMsg.textContent = message;
    }
  }

  // Initialize the splitter button and status display with control buttons
  function initializeSplitterButton() {
    const existingWrapper = document.querySelector("#splitter-button-wrapper");
    if (existingWrapper) return;
    const splitterWrapper = document.createElement("div");
    splitterWrapper.id = "splitter-button-wrapper";
    splitterWrapper.className = "flex items-center";
    splitterWrapper.style =
      "z-index:20; position:absolute; top:-44px; right:10px;";
    const splitterButton = document.createElement("button");
    splitterButton.id = "splitter-button";
    splitterButton.type = "button";
    splitterButton.textContent = "SPLIT";
    splitterButton.title = "Text Splitter";
    splitterButton.style = "width:auto; height:38px;";
    splitterButton.className =
      "btn flex justify-center items-center btn-secondary border rounded-md";
    splitterButton.addEventListener("click", () => {
      createSplitterModal();
    });
    const pauseResumeButton = document.createElement("button");
    pauseResumeButton.id = "pause-resume-splitter-button";
    pauseResumeButton.type = "button";
    pauseResumeButton.textContent = "PAUSE";
    pauseResumeButton.title = "Pause Processing";
    pauseResumeButton.style =
      "width:auto; height:38px; margin-left:5px; display:none;";
    pauseResumeButton.className =
      "btn flex justify-center items-center btn-secondary border rounded-md";
    pauseResumeButton.addEventListener("click", () => {
      if (ChunkChainManager.isPaused) {
        ChunkChainManager.resume();
      } else {
        ChunkChainManager.pause();
      }
    });
    const stopButton = document.createElement("button");
    stopButton.id = "stop-splitter-button";
    stopButton.type = "button";
    stopButton.textContent = "STOP";
    stopButton.title = "Stop Processing";
    stopButton.style =
      "width:auto; height:38px; margin-left:5px; display:none;";
    stopButton.className =
      "btn flex justify-center items-center btn-danger border rounded-md";
    stopButton.addEventListener("click", () => {
      ChunkChainManager.stop();
    });
    const statusDisplay = document.createElement("span");
    statusDisplay.id = "splitter-status";
    statusDisplay.className = "text-sm ml-2";
    splitterWrapper.appendChild(splitterButton);
    splitterWrapper.appendChild(pauseResumeButton);
    splitterWrapper.appendChild(stopButton);
    splitterWrapper.appendChild(statusDisplay);
    const inputForm = document.querySelector("main form");
    if (inputForm) {
      inputForm.style.marginTop = "20px";
      inputForm.appendChild(splitterWrapper);
    }
  }

  // Add a helper function to get a random delay (in milliseconds)
  function getRandomDelay(
    min = CONFIG.UI.RANDOM_DELAY_MIN,
    max = CONFIG.UI.RANDOM_DELAY_MAX
  ) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Placeholder for storing fetched splitter configs from API
  let CURRENT_SPLITTER = null;

  // Fetch splitter configurations from external API using GM_xmlhttpRequest
  // This function is simple and returns a Promise that resolves to the data or false if failed
  function fetchSplitterConfigsFromAPI() {
    // Check if API is enabled in config
    if (!CONFIG.API.ENABLED) {
      console.log("[API] Disabled. Using local config.");
      return Promise.resolve(false);
    }

    console.log("[API] Fetching splitter configs from API...");

    return new Promise((resolve) => {
      GM_xmlhttpRequest({
        method: "GET",
        url: CONFIG.API.URL,
        timeout: CONFIG.API.TIMEOUT,
        onload: (response) => {
          console.log("[API] Response received:", response.status);
          try {
            if (response.status === 200) {
              const data = JSON.parse(response.responseText);
              console.log("[API] Successfully fetched data:", data);
              // Validate that data is an array of splitter configs
              if (
                Array.isArray(data) &&
                data.length > 0 &&
                data.every(
                  (item) =>
                    item.delimiter &&
                    item.useRegex !== undefined &&
                    item.chunkPrompt
                )
              ) {
                CURRENT_SPLITTER = data;
                resolve(data);
              } else {
                console.error(
                  "[API] Invalid data structure. Using local config."
                );
                resolve(false);
              }
            } else {
              console.error(
                "[API] HTTP Error:",
                response.status,
                response.statusText
              );
              resolve(false);
            }
          } catch (error) {
            console.error("[API] Error parsing response:", error);
            resolve(false);
          }
        },
        onerror: (error) => {
          console.error("[API] Network error:", error);
          // Helpful message for CORS/connect issues
          if (error.error && error.error.includes("blocked by the user")) {
            console.error(
              "[API] SOLUTION: Add '@connect script.google.com' to your userscript header"
            );
          }
          resolve(false);
        },
        ontimeout: () => {
          console.error(
            "[API] Request timed out after",
            CONFIG.API.TIMEOUT,
            "ms"
          );
          resolve(false);
        },
      });
    });
  }

  // Initialize the userscript
  function initializeUserScript() {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        setTimeout(() => initializeSplitterButton(), 500);
      });
    } else {
      setTimeout(() => initializeSplitterButton(), 500);
    }
    const observer = new MutationObserver(
      UIUtils.debounce(() => {
        const form = document.querySelector("main form");
        const existingWrapper = document.querySelector(
          "#splitter-button-wrapper"
        );
        if (form && !existingWrapper) {
          initializeSplitterButton();
        }
      }, 100)
    );
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  // Start the userscript
  initializeUserScript();
})();
