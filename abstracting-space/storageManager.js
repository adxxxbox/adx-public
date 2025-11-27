// storageManager.js

window.createStorageManager = function({
  getValue,
  setValue,
  config,
  keys = {
    splitterSettings: "splitter_settings",
    splitterLastState: "splitter_last_state",
  },
}) {
  function getSplitterSettings() {
    const saved = getValue(keys.splitterSettings, null);
    if (saved) {
      try {
        const obj = JSON.parse(saved);
        console.log("[Splitter Settings Loaded]", obj);
        return obj;
      } catch (e) {
        console.warn("Failed to parse saved settings, using defaults.", e);
      }
    }
    const defaults = {
      delimiter: config.SPLITTER.DEFAULT_DELIMITER,
      chunkPrompt: config.SPLITTER.DEFAULT_CHUNK_PROMPT,
      useRegex: false,
      randomDelayMin: config.UI.RANDOM_DELAY_MIN,
      randomDelayMax: config.UI.RANDOM_DELAY_MAX,
    };
    console.log("[Splitter Settings Defaults]", defaults);
    return defaults;
  }

  function setSplitterSettings(settings) {
    setValue(keys.splitterSettings, JSON.stringify(settings));
  }

  function getLastState() {
    const defaults = {
      text: "",
      source: null,
      fileName: "",
      lastConfigIndex: 0,
      timestamp: 0,
    };
    const saved = getValue(keys.splitterLastState, null);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...defaults, ...parsed };
      } catch (error) {
        console.warn("Failed to parse saved splitter state, using defaults.", error);
      }
    }
    return { ...defaults };
  }

  function setLastState(state) {
    const current = getLastState();
    const updatedState = {
      ...current,
      ...state,
      timestamp: Date.now(),
    };
    setValue(keys.splitterLastState, JSON.stringify(updatedState));
  }

  function updateLastState(partialState) {
    setLastState(partialState);
  }

  return {
    getSplitterSettings,
    setSplitterSettings,
    getLastState,
    setLastState,
    updateLastState,
  };
};
