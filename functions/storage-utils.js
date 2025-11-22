// ==UserScript==
// @name         Storage Utilities
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Reusable storage functions for userscripts
// @author       You
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

/**
 * Storage Utilities Library
 * Provides simple functions to save and load data from browser storage
 */

/**
 * Save data to browser storage
 * @param {string} key - The name to save the data under
 * @param {any} value - The data to save (will be converted to JSON)
 * @returns {void}
 */
function saveToStorage(key, value) {
  try {
    GM_setValue(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Failed to save to storage (key: ${key}):`, error);
  }
}

/**
 * Load data from browser storage
 * @param {string} key - The name of the data to retrieve
 * @param {any} defaultValue - What to return if nothing is saved or if parsing fails
 * @returns {any} The saved data or the default value
 */
function loadFromStorage(key, defaultValue = null) {
  const saved = GM_getValue(key, null);
  
  if (saved === null) {
    return defaultValue;
  }
  
  try {
    return JSON.parse(saved);
  } catch (error) {
    console.warn(`Failed to parse saved data (key: ${key}), using default value.`, error);
    return defaultValue;
  }
}

/**
 * Update specific properties in stored data without replacing everything
 * @param {string} key - The name of the data to update
 * @param {object} updates - The properties to update
 * @param {object} defaultValue - Default value if nothing exists yet
 * @returns {object} The updated data
 */
function updateStorage(key, updates, defaultValue = {}) {
  const current = loadFromStorage(key, defaultValue);
  const updated = { ...current, ...updates };
  saveToStorage(key, updated);
  return updated;
}

/**
 * Remove data from storage
 * @param {string} key - The name of the data to remove
 * @returns {void}
 */
function removeFromStorage(key) {
  try {
    GM_setValue(key, null);
  } catch (error) {
    console.error(`Failed to remove from storage (key: ${key}):`, error);
  }
}

/**
 * Check if a key exists in storage
 * @param {string} key - The key to check
 * @returns {boolean} True if the key exists
 */
function storageHasKey(key) {
  return GM_getValue(key, null) !== null;
}
