// ==UserScript==
// @name         Power Popup
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Shows a popup icon in bottom-right corner on hover, performs action on click
// @author       You
// @match        *://*/*
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

// TODO: add Highlight All button
// TODO: make the dialog bigger .. cuz small text and difficult to read
// TODO: remove the debug console logs
// TODO: saving and deleting is showing alot of warnings in UI .. removethem
// TODO: 

(function() {
    'use strict';

    // Configuration
    const config = {
        iconSize: '40px',
        cornerDistance: '0px',
        hoverArea: '40px',
        iconSymbol: '🛠️',
        backgroundColor: '#212121',
        hoverColor: '#505153ac'
    };

    // Highlighting configuration - easy to modify for different appearance
    const highlightConfig = {
        outlineWidth: '2px',
        outlineStyle: 'solid',
        outlineOffset: '1px',
        dataAttribute: 'data-regex-highlighted' // Used to track highlighted elements
    };

    // Configuration for multiple pattern storage - now with dynamic pattern count
    const multiPatternConfig = {
        maxPatterns: 3, // Default number of patterns (can be changed dynamically)
        maxAllowedPatterns: 10, // Maximum number of patterns allowed to prevent UI issues
        defaultColors: ['#ffff00', '#00ff00', '#ff8c00', '#ff69b4', '#00bfff', '#ffa500', '#98fb98', '#dda0dd', '#f0e68c', '#add8e6'] // Extended default colors
    };

    // Functions to manage dynamic pattern count configuration
    function savePatternCount(count) {
        // Validate the count is within allowed limits
        const validCount = Math.max(1, Math.min(count, multiPatternConfig.maxAllowedPatterns));
        GM_setValue('pattern_count', validCount);
        multiPatternConfig.maxPatterns = validCount;
        return validCount;
    }

    // Load saved pattern count or use default
    function loadPatternCount() {
        const savedCount = GM_getValue('pattern_count', 3);
        multiPatternConfig.maxPatterns = Math.max(1, Math.min(savedCount, multiPatternConfig.maxAllowedPatterns));
        return multiPatternConfig.maxPatterns;
    }

    // Enhanced storage functions for multiple patterns
    function savePatternData(slotIndex, pattern, color) {
        GM_setValue(`regex_pattern_${slotIndex}`, pattern);
        GM_setValue(`regex_color_${slotIndex}`, color);
    }

    function getPatternData(slotIndex) {
        return {
            pattern: GM_getValue(`regex_pattern_${slotIndex}`, ''),
            color: GM_getValue(`regex_color_${slotIndex}`, multiPatternConfig.defaultColors[slotIndex] || '#ffff00')
        };
    }

    function getAllSavedPatterns() {
        const patterns = [];
        for (let i = 0; i < multiPatternConfig.maxPatterns; i++) {
            patterns.push(getPatternData(i));
        }
        return patterns;
    }

    // JSON configuration export/import functions
    function exportConfigToJSON() {
        const config = {
            version: '1.0',
            exportDate: new Date().toISOString(),
            patterns: getAllSavedPatterns()
        };
        
        // Create downloadable JSON file
        const jsonString = JSON.stringify(config, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        // Create temporary download link
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = `regex-highlighter-config-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        
        // Clean up the URL object
        URL.revokeObjectURL(url);
    }

    // Load configuration from JSON file - automatically updates pattern count
    function importConfigFromJSON(file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const config = JSON.parse(e.target.result);
                
                // Validate the JSON structure
                if (!config.patterns || !Array.isArray(config.patterns)) {
                    throw new Error('Invalid configuration file format');
                }
                
                // Clear existing highlights before loading new config
                clearHighlights();
                
                // Count how many patterns have actual content (not empty)
                const patternsWithContent = config.patterns.filter(p => p.pattern && p.pattern.trim() !== '');
                const importedPatternCount = Math.max(patternsWithContent.length, 1); // At least 1 pattern
                
                // Update pattern count to match imported config (within allowed limits)
                const newPatternCount = Math.min(importedPatternCount, multiPatternConfig.maxAllowedPatterns);
                const oldPatternCount = multiPatternConfig.maxPatterns;
                savePatternCount(newPatternCount);
                
                // Load patterns into storage and update UI
                config.patterns.forEach((patternData, index) => {
                    if (index < multiPatternConfig.maxPatterns) {
                        // Save to storage
                        savePatternData(index, patternData.pattern || '', patternData.color || multiPatternConfig.defaultColors[index]);
                        
                        // Update UI if dialog is open
                        const patternInput = document.querySelector(`#regexPattern${index}`);
                        const colorInput = document.querySelector(`#highlightColor${index}`);
                        if (patternInput && colorInput) {
                            patternInput.value = patternData.pattern || '';
                            colorInput.value = patternData.color || multiPatternConfig.defaultColors[index];
                        }
                    }
                });
                
                // If pattern count changed, refresh the dialog to show new pattern count
                if (newPatternCount !== oldPatternCount) {
                    // Close current dialog and open a new one with updated pattern count
                    const currentDialog = document.getElementById('regex-highlighter-dialog');
                    if (currentDialog) {
                        document.body.removeChild(currentDialog);
                        createHighlighterDialog();
                    }
                    alert(`Configuration loaded successfully! Pattern count updated to ${newPatternCount}.`);
                } else {
                    alert('Configuration loaded successfully!');
                }
                
            } catch (error) {
                alert('Error loading configuration: ' + error.message);
            }
        };
        reader.readAsText(file);
    }

    // Configuration management functions for saving/loading named configs
    function saveNamedConfig(configName) {
        if (!configName || configName.trim() === '') {
            alert('Please enter a configuration name');
            return false;
        }
        
        // Get current pattern configuration including pattern count
        const configData = {
            patterns: getAllSavedPatterns(),
            patternCount: multiPatternConfig.maxPatterns,
            savedDate: new Date().toISOString()
        };
        
        // Save to GM storage with a prefix to identify saved configs
        GM_setValue(`saved_config_${configName}`, JSON.stringify(configData));
        
        // Add to the tracking list if it's not already there
        const savedList = JSON.parse(GM_getValue('saved_config_list', '[]'));
        if (!savedList.includes(configName)) {
            savedList.push(configName);
            GM_setValue('saved_config_list', JSON.stringify(savedList));
        }
        
        return true;
    }

    // Load a named configuration and apply it
    function loadNamedConfig(configName) {
        const configDataString = GM_getValue(`saved_config_${configName}`, null);
        
        if (!configDataString) {
            alert('Configuration not found: ' + configName);
            return false;
        }
        
        try {
            const configData = JSON.parse(configDataString);
            
            // Clear existing highlights first
            clearHighlights();
            
            // Load pattern count if available (for newer saved configs)
            if (configData.patternCount) {
                savePatternCount(configData.patternCount);
                // Update the UI input if dialog is open
                const patternCountInput = document.querySelector('#patternCount');
                if (patternCountInput) {
                    patternCountInput.value = configData.patternCount;
                }
            }
            
            // Load patterns into current storage and update UI
            configData.patterns.forEach((patternData, index) => {
                if (index < multiPatternConfig.maxPatterns) {
                    // Save to current storage
                    savePatternData(index, patternData.pattern || '', patternData.color || multiPatternConfig.defaultColors[index]);
                    
                    // Update UI if dialog is open
                    const patternInput = document.querySelector(`#regexPattern${index}`);
                    const colorInput = document.querySelector(`#highlightColor${index}`);
                    if (patternInput && colorInput) {
                        patternInput.value = patternData.pattern || '';
                        colorInput.value = patternData.color || multiPatternConfig.defaultColors[index];
                    }
                }
            });
            
            return true;
            
        } catch (error) {
            alert('Error loading configuration: ' + error.message);
            return false;
        }
    }

    // Get list of all saved configuration names - uses a simple tracking list
    function getSavedConfigNames() {
        // We maintain a list of saved config names in GM storage for easy retrieval
        const savedList = JSON.parse(GM_getValue('saved_config_list', '[]'));
        
        // Filter out any configs that may have been deleted but still in the list
        const validConfigs = savedList.filter(configName => {
            const configData = GM_getValue(`saved_config_${configName}`, null);
            return configData !== null;
        });
        
        // Update the list to remove any invalid entries
        if (validConfigs.length !== savedList.length) {
            GM_setValue('saved_config_list', JSON.stringify(validConfigs));
        }
        
        return validConfigs;
    }

    // Delete a saved configuration
    function deleteNamedConfig(configName) {
        GM_setValue(`saved_config_${configName}`, null);
        
        // Update the saved config list
        const configList = JSON.parse(GM_getValue('saved_config_list', '[]'));
        const updatedList = configList.filter(name => name !== configName);
        GM_setValue('saved_config_list', JSON.stringify(updatedList));
        
        return true;
    }

    // Configuration for precise text highlighting - supports multiple patterns
    const preciseHighlightConfig = {
        baseClassName: 'regex-precise-highlight', // Base CSS class for highlighted spans
        dataAttribute: 'data-regex-highlighted', // Used to track highlighted elements
        slotAttribute: 'data-highlight-slot' // Used to track which slot a highlight belongs to
    };

    function createContainer() {
        const container = document.createElement('div');
        container.style.cssText = `
            position: fixed !important;
            bottom: 0 !important;
            right: 0 !important;
            width: ${config.hoverArea} !important;
            height: ${config.hoverArea} !important;
            z-index: 2147483647 !important;
            pointer-events: all !important;
            margin: 0 !important;
            padding: 0 !important;
        `;
        return container;
    }

    function createPopupIcon() {
        const icon = document.createElement('div');
        icon.innerHTML = config.iconSymbol;
        icon.style.cssText = `
            position: absolute !important;
            bottom: ${config.cornerDistance} !important;
            right: ${config.cornerDistance} !important;
            width: ${config.iconSize} !important;
            height: ${config.iconSize} !important;
            background-color: ${config.backgroundColor} !important;
            border-radius: 50% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            color: white !important;
            font-size: 20px !important;
            cursor: pointer !important;
            opacity: 0 !important;
            transform: scale(0.8) !important;
            transition: all 0.3s ease !important;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3) !important;
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
            z-index: 2147483647 !important;
        `;
        return icon;
    }

    // Creates and shows the multi-pattern regex highlighting dialog
    function createHighlighterDialog() {
        // Load saved pattern count first
        loadPatternCount();
        
        // Load all saved pattern data
        const savedPatterns = getAllSavedPatterns();
        
        // Create compact dialog container positioned in bottom-right corner with scrollable content
        const dialog = document.createElement('div');
        // Give the dialog a unique id for easy recognition
        dialog.id = 'regex-highlighter-dialog';
        dialog.style.cssText = `
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

        // Create scrollable content container
        const scrollContainer = document.createElement('div');
        scrollContainer.style.cssText = `
            overflow-y: auto !important;
            overflow-x: hidden !important;
            max-height: calc(70vh - 24px) !important;
            padding: 12px !important;
            scrollbar-width: thin !important;
            scrollbar-color: #555 #2d2d2d !important;
        `;
        
        // Add custom scrollbar styles for WebKit browsers
        const scrollbarStyle = document.createElement('style');
        scrollbarStyle.textContent = `
            #regex-highlighter-dialog ::-webkit-scrollbar {
                width: 6px;
            }
            #regex-highlighter-dialog ::-webkit-scrollbar-track {
                background: #2d2d2d;
            }
            #regex-highlighter-dialog ::-webkit-scrollbar-thumb {
                background: #555;
                border-radius: 3px;
            }
            #regex-highlighter-dialog ::-webkit-scrollbar-thumb:hover {
                background: #666;
            }
        `;
        document.head.appendChild(scrollbarStyle);

        // Create dialog content with main controls at top, then sections, then patterns
        let dialogHTML = `
            <h4 style="margin: 0 0 12px 0; color: #ffffff; font-size: 14px;">Multi-Pattern Regex Highlighter</h4>
            
            <!-- Main Controls at Top -->
            <div style="text-align: center; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #555;">
                <button id="highlightAllBtn" style="background: #28a745; color: white; border: none; padding: 6px 12px; border-radius: 3px; cursor: pointer; margin-right: 5px; font-size: 12px;">Highlight All</button>
                <button id="clearAllBtn" style="background: #dc3545; color: white; border: none; padding: 6px 12px; border-radius: 3px; cursor: pointer; margin-right: 5px; font-size: 12px;">Clear All</button>
                <button id="closeBtn" style="background: #6c757d; color: white; border: none; padding: 6px 12px; border-radius: 3px; cursor: pointer; font-size: 12px;">Close</button>
            </div>
            
            <!-- Config Management Section -->
            <div style="margin-bottom: 8px; padding: 8px; border: 1px solid #666; border-radius: 4px; background: #333;">
                <div style="margin-bottom: 6px; font-size: 12px; color: #ccc; font-weight: bold;">Saved Configurations:</div>
                <div style="display: flex; gap: 4px; margin-bottom: 6px;">
                    <input type="text" id="configName" placeholder="Config name" 
                           style="flex: 1; padding: 4px; border: 1px solid #555; border-radius: 3px; background: #404040; color: #ffffff; font-size: 11px;">
                    <button id="saveConfigBtn" style="background: #28a745; color: white; border: none; padding: 4px 8px; border-radius: 3px; cursor: pointer; font-size: 11px;">Save</button>
                </div>
                <div id="configList" style="max-height: 100px; overflow-y: auto; margin-bottom: 6px;">
                    <!-- Config list will be populated here -->
                </div>
                <!-- File Import/Export Section -->
                <div style="display: flex; gap: 4px; border-top: 1px solid #555; padding-top: 6px;">
                    <button id="exportBtn" style="background: #28a745; color: white; border: none; padding: 4px 8px; border-radius: 3px; cursor: pointer; font-size: 11px; flex: 1;">Export Config</button>
                    <button id="importBtn" style="background: #17a2b8; color: white; border: none; padding: 4px 8px; border-radius: 3px; cursor: pointer; font-size: 11px; flex: 1;">Import Config</button>
                    <input type="file" id="importFile" accept=".json" style="display: none;">
                </div>
            </div>
            
            <!-- Pattern Count Configuration -->
            <div style="margin-bottom: 8px; padding: 8px; border: 1px solid #666; border-radius: 4px; background: #333;">
                <div style="margin-bottom: 6px; font-size: 12px, color: #ccc, font-weight: bold;">Pattern Count Settings:</div>
                <div style="display: flex; gap: 4px; align-items: center; margin-bottom: 4px;">
                    <span style="color: #ccc; font-size: 11px;">Number of patterns:</span>
                    <input type="number" id="patternCount" min="1" max="${multiPatternConfig.maxAllowedPatterns}" value="${multiPatternConfig.maxPatterns}"
                           style="width: 60px; padding: 4px; border: 1px solid #555; border-radius: 3px; background: #404040; color: #ffffff; font-size: 11px;">
                    <button id="updatePatternCountBtn" style="background: #17a2b8; color: white; border: none; padding: 4px 8px; border-radius: 3px; cursor: pointer; font-size: 11px;">Update</button>
                </div>
                <div style="color: #999; font-size: 10px;">Dialog will auto-refresh when updated</div>
            </div>
        `;
        
        // Generate pattern slots dynamically
        for (let i = 0; i < multiPatternConfig.maxPatterns; i++) {
            const pattern = savedPatterns[i];
            dialogHTML += `
                <div style="margin-bottom: 12px; padding: 8px; border: 1px solid #555; border-radius: 4px; background: #333;">
                    <div style="margin-bottom: 6px; font-size: 12px; color: #ccc;">Pattern ${i + 1}:</div>
                    <div style="display: flex; gap: 5px; margin-bottom: 6px;">
                        <input type="text" id="regexPattern${i}" placeholder="Enter regex pattern" value="${pattern.pattern}"
                               style="flex: 1; padding: 4px; border: 1px solid #555; border-radius: 3px; background: #404040; color: #ffffff; font-size: 12px;">
                        <input type="color" id="highlightColor${i}" value="${pattern.color}" 
                               style="width: 30px; height: 26px; border: 1px solid #555; border-radius: 3px; cursor: pointer; background: #404040;">
                    </div>
                    <div style="display: flex; gap: 4px; align-items: center;">
                        <button id="highlightBtn${i}" style="background: transparent; border: none; padding: 4px; cursor: pointer;" title="Highlight pattern">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M5.25 2C4.00736 2 3 3.00736 3 4.25V7.25C3 8.49264 4.00736 9.5 5.25 9.5H18.75C19.9926 9.5 21 8.49264 21 7.25V4.25C21 3.00736 19.9926 2 18.75 2H5.25Z" fill="${pattern.color}"/>
                                <path d="M5 11.75V11H19V11.75C19 12.9926 17.9926 14 16.75 14H7.25C6.00736 14 5 12.9926 5 11.75Z" fill="${pattern.color}"/>
                                <path d="M7.50294 15.5H16.5013L16.5017 16.7881C16.5017 17.6031 16.0616 18.3494 15.36 18.7463L15.2057 18.8259L8.57101 21.9321C8.10478 22.1504 7.57405 21.8451 7.50953 21.3536L7.503 21.2529L7.50294 15.5Z" fill="${pattern.color}"/>
                            </svg>
                        </button>
                        <button id="clearBtn${i}" style="background: transparent; border: none; padding: 4px; cursor: pointer;" title="Clear highlights">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M5.50506 11.4096L6.03539 11.9399L5.50506 11.4096ZM3 14.9522H2.25H3ZM9.04776 21V21.75V21ZM11.4096 5.50506L10.8792 4.97473L11.4096 5.50506ZM17.9646 12.0601L12.0601 17.9646L13.1208 19.0253L19.0253 13.1208L17.9646 12.0601ZM6.03539 11.9399L11.9399 6.03539L10.8792 4.97473L4.97473 10.8792L6.03539 11.9399ZM6.03539 17.9646C5.18538 17.1146 4.60235 16.5293 4.22253 16.0315C3.85592 15.551 3.75 15.2411 3.75 14.9522H2.25C2.25 15.701 2.56159 16.3274 3.03 16.9414C3.48521 17.538 4.1547 18.2052 4.97473 19.0253L6.03539 17.9646ZM4.97473 10.8792C4.1547 11.6993 3.48521 12.3665 3.03 12.9631C2.56159 13.577 2.25 14.2035 2.25 14.9522H3.75C3.75 14.6633 3.85592 14.3535 4.22253 13.873C4.60235 13.3752 5.18538 12.7899 6.03539 11.9399L4.97473 10.8792ZM12.0601 17.9646C11.2101 18.8146 10.6248 19.3977 10.127 19.7775C9.64651 20.1441 9.33665 20.25 9.04776 20.25V21.75C9.79649 21.75 10.423 21.4384 11.0369 20.97C11.6335 20.5148 12.3008 19.8453 13.1208 19.0253L12.0601 17.9646ZM4.97473 19.0253C5.79476 19.8453 6.46201 20.5148 7.05863 20.97C7.67256 21.4384 8.29902 21.75 9.04776 21.75V20.25C8.75886 20.25 8.449 20.1441 7.9685 19.7775C7.47069 19.3977 6.88541 18.8146 6.03539 17.9646L4.97473 19.0253ZM17.9646 6.03539C18.8146 6.88541 19.3977 7.47069 19.7775 7.9685C20.1441 8.449 20.25 8.75886 20.25 9.04776H21.75C21.75 8.29902 21.4384 7.67256 20.97 7.05863C20.5148 6.46201 19.8453 5.79476 19.0253 4.97473L17.9646 6.03539ZM19.0253 13.1208C19.8453 12.3008 20.5148 11.6335 20.97 11.0369C21.4384 10.423 21.75 9.79649 21.75 9.04776H20.25C20.25 9.33665 20.1441 9.64651 19.7775 10.127C19.3977 10.6248 18.8146 11.2101 17.9646 12.0601L19.0253 13.1208ZM19.0253 4.97473C18.2052 4.1547 17.538 3.48521 16.9414 3.03C16.3274 2.56159 15.701 2.25 14.9522 2.25V3.75C15.2411 3.75 15.551 3.85592 16.0315 4.22253C16.5293 4.60235 17.1146 5.18538 17.9646 6.03539L19.0253 4.97473ZM11.9399 6.03539C12.7899 5.18538 13.3752 4.60235 13.873 4.22253C14.3535 3.85592 14.6633 3.75 14.9522 3.75V2.25C14.2035 2.25 13.577 2.56159 12.9631 3.03C12.3665 3.48521 11.6993 4.1547 10.8792 4.97473L11.9399 6.03539Z" fill="#ffffff"/>
                                <path opacity="0.5" d="M13.2411 17.8444C13.534 18.1372 14.0089 18.1372 14.3018 17.8444C14.5946 17.5515 14.5946 17.0766 14.3018 16.7837L13.2411 17.8444ZM7.21637 9.69831C6.92347 9.40541 6.4486 9.40541 6.15571 9.69831C5.86281 9.9912 5.86281 10.4661 6.15571 10.759L7.21637 9.69831ZM14.3018 16.7837L7.21637 9.69831L6.15571 10.759L13.2411 17.8444L14.3018 16.7837Z" fill="#ffffff"/>
                                <path opacity="0.5" d="M9 21H21" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"/>
                            </svg>
                        </button>
                        <button id="deleteBtn${i}" style="background: transparent; border: none; padding: 4px; cursor: pointer;" title="Delete this pattern">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff4757" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="3 6 5 6 21 6"/>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                <line x1="10" y1="11" x2="10" y2="17"/>
                                <line x1="14" y1="11" x2="14" y2="17"/>
                            </svg>
                        </button>
                    </div>
                </div>
            `;
        }

        // Add the content to the scrollable container
        scrollContainer.innerHTML = dialogHTML;
        dialog.appendChild(scrollContainer);
        document.body.appendChild(dialog);

        // Add event listeners for each pattern slot with simpler approach
        for (let i = 0; i < multiPatternConfig.maxPatterns; i++) {
            const patternInput = dialog.querySelector(`#regexPattern${i}`);
            const colorInput = dialog.querySelector(`#highlightColor${i}`);
            const highlightBtn = dialog.querySelector(`#highlightBtn${i}`);
            const clearBtn = dialog.querySelector(`#clearBtn${i}`);
            const deleteBtn = dialog.querySelector(`#deleteBtn${i}`);

            // Check if buttons were found
            if (!highlightBtn || !clearBtn || !deleteBtn) {
                continue;
            }

            // Store the slot index as a data attribute for easy access
            highlightBtn.setAttribute('data-slot', i);
            clearBtn.setAttribute('data-slot', i);
            deleteBtn.setAttribute('data-slot', i);

            // Individual highlight button for this slot - using data attribute
            highlightBtn.addEventListener('click', function() {
                const slotIndex = parseInt(this.getAttribute('data-slot'));
                const pattern = patternInput.value.trim();
                const color = colorInput.value;
                if (pattern) {
                    // Save the values before highlighting
                    savePatternData(slotIndex, pattern, color);
                    highlightMatches(pattern, color, slotIndex);
                } else {
                    alert(`Please enter a regex pattern for slot ${slotIndex + 1}`);
                }
            });

            // Individual clear button for this slot - using data attribute
            clearBtn.addEventListener('click', function() {
                const slotIndex = parseInt(this.getAttribute('data-slot'));
                
                if (!isNaN(slotIndex)) {
                    clearHighlights(slotIndex);
                } else {
                    clearHighlights();
                }
            });

            // Individual delete button for this slot - clears pattern and color inputs
            deleteBtn.addEventListener('click', function() {
                const slotIndex = parseInt(this.getAttribute('data-slot'));
                
                if (!isNaN(slotIndex)) {
                    // Clear the highlights for this slot
                    clearHighlights(slotIndex);
                    
                    // Clear the input fields
                    patternInput.value = '';
                    colorInput.value = multiPatternConfig.defaultColors[slotIndex] || '#ffff00';
                    
                    // Clear from storage
                    savePatternData(slotIndex, '', colorInput.value);
                }
            });
        }

        // Global controls
        const highlightAllBtn = dialog.querySelector('#highlightAllBtn');
        const clearAllBtn = dialog.querySelector('#clearAllBtn');
        const closeBtn = dialog.querySelector('#closeBtn');
        const exportBtn = dialog.querySelector('#exportBtn');
        const importBtn = dialog.querySelector('#importBtn');
        const importFile = dialog.querySelector('#importFile');
        const saveConfigBtn = dialog.querySelector('#saveConfigBtn');
        const configNameInput = dialog.querySelector('#configName');
        const configListDiv = dialog.querySelector('#configList');
        const updatePatternCountBtn = dialog.querySelector('#updatePatternCountBtn');
        const patternCountInput = dialog.querySelector('#patternCount');

        // Pattern count update functionality with auto-refresh
        updatePatternCountBtn.addEventListener('click', function() {
            const newCount = parseInt(patternCountInput.value);
            if (isNaN(newCount) || newCount < 1 || newCount > multiPatternConfig.maxAllowedPatterns) {
                alert(`Please enter a valid number between 1 and ${multiPatternConfig.maxAllowedPatterns}`);
                patternCountInput.value = multiPatternConfig.maxPatterns; // Reset to current value
                return;
            }
            
            // Save the new pattern count
            const actualCount = savePatternCount(newCount);
            
            // Close current dialog and open a new one with updated pattern count
            document.body.removeChild(dialog);
            createHighlighterDialog();
        });

        // Populate the saved configurations list
        function populateConfigList() {
            const savedConfigs = getSavedConfigNames();
            configListDiv.innerHTML = '';
            
            if (savedConfigs.length === 0) {
                configListDiv.innerHTML = '<div style="color: #999; font-size: 11px; padding: 4px;">No saved configurations</div>';
                return;
            }
            
            savedConfigs.forEach(configName => {
                const configRow = document.createElement('div');
                configRow.style.cssText = 'display: flex; gap: 4px; margin-bottom: 4px; align-items: center;';
                
                configRow.innerHTML = `
                    <span style="flex: 1; color: #ccc; font-size: 11px; padding: 2px;">${configName}</span>
                    <button class="load-config-btn" data-config="${configName}" style="background: #007bff; color: white; border: none; padding: 2px 6px; border-radius: 2px; cursor: pointer; font-size: 10px;">Load</button>
                    <button class="delete-config-btn" data-config="${configName}" style="background: #dc3545; color: white; border: none; padding: 2px 6px; border-radius: 2px; cursor: pointer; font-size: 10px;">Del</button>
                `;
                
                configListDiv.appendChild(configRow);
            });
            
            // Add event listeners for load and delete buttons
            configListDiv.querySelectorAll('.load-config-btn').forEach(btn => {
                btn.addEventListener('click', function(event) {
                    // Prevent event from bubbling up to document click listener
                    event.stopPropagation();
                    
                    const configName = this.getAttribute('data-config');
                    
                    // Get the current pattern count before loading
                    const currentPatternCount = multiPatternConfig.maxPatterns;
                    
                    if (loadNamedConfig(configName)) {
                        // Check if pattern count changed and refresh dialog if needed
                        if (multiPatternConfig.maxPatterns !== currentPatternCount) {
                            // Close current dialog and open a new one with updated pattern count
                            document.body.removeChild(dialog);
                            createHighlighterDialog();
                        } else {
                            alert(`Configuration "${configName}" loaded successfully!`);
                        }
                    }
                });
            });
            
            configListDiv.querySelectorAll('.delete-config-btn').forEach(btn => {
                btn.addEventListener('click', function(event) {
                    // Prevent event from bubbling up to document click listener
                    event.stopPropagation();
                    
                    const configName = this.getAttribute('data-config');
                    if (confirm(`Delete configuration "${configName}"?`)) {
                        deleteNamedConfig(configName);
                        populateConfigList(); // Refresh the list
                        // alert(`Configuration "${configName}" deleted.`);
                    }
                });
            });
        }

        // Initial population of config list
        populateConfigList();

        // Save configuration button
        saveConfigBtn.addEventListener('click', function(event) {
            // Prevent event from bubbling up to document click listener
            event.stopPropagation();
            
            const configName = configNameInput.value.trim();
            
            if (saveNamedConfig(configName)) {
                alert(`Configuration "${configName}" saved successfully!`);
                configNameInput.value = ''; // Clear the input
                populateConfigList(); // Refresh the list
            }
        });

        // Allow Enter key to save configuration
        configNameInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                saveConfigBtn.click();
            }
        });

        // Highlight All button - applies all patterns that have content
        highlightAllBtn.addEventListener('click', function() {
            // Clear all existing highlights first
            clearHighlights();
            
            // Go through each pattern slot and highlight if it has content
            for (let i = 0; i < multiPatternConfig.maxPatterns; i++) {
                const patternInput = dialog.querySelector(`#regexPattern${i}`);
                const colorInput = dialog.querySelector(`#highlightColor${i}`);
                
                if (patternInput && colorInput) {
                    const pattern = patternInput.value.trim();
                    const color = colorInput.value;
                    
                    if (pattern) {
                        // Save the pattern data and highlight
                        savePatternData(i, pattern, color);
                        highlightMatches(pattern, color, i);
                    }
                }
            }
        });

        clearAllBtn.addEventListener('click', function() {
            clearHighlights(); // Clear all highlights
        });
        
        closeBtn.addEventListener('click', function() {
            document.body.removeChild(dialog);
        });

        // Export configuration to JSON file
        exportBtn.addEventListener('click', function() {
            exportConfigToJSON();
        });

        // Import configuration from JSON file
        importBtn.addEventListener('click', function() {
            importFile.click(); // Trigger file picker
        });

        // Handle file selection for import
        importFile.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                importConfigFromJSON(file);
                // Reset the file input so the same file can be selected again
                importFile.value = '';
            }
        });

        // Close dialog when clicking outside (only on actual clicks, not drag releases)
        // Track mouse state to distinguish between clicks and drag releases
        let mouseDownInsideDialog = false;
        let mouseDownOutsideDialog = false;
        
        // Track mousedown events to detect if user started clicking inside or outside dialog
        document.addEventListener('mousedown', function(e) {
            if (dialog.contains(e.target)) {
                mouseDownInsideDialog = true;
                mouseDownOutsideDialog = false;
            } else {
                mouseDownInsideDialog = false;
                mouseDownOutsideDialog = true;
            }
        });
        
        // Only close dialog on click if both mousedown and mouseup happened outside dialog
        document.addEventListener('click', function closeDialog(e) {
            // Only close if this was a genuine click outside (not a drag release)
            if (!dialog.contains(e.target) && mouseDownOutsideDialog && !mouseDownInsideDialog) {
                if (document.body.contains(dialog)) {
                    document.body.removeChild(dialog);
                    // Clean up event listeners
                    document.removeEventListener('click', closeDialog);
                    document.removeEventListener('mousedown', arguments.callee);
                }
            }
            // Reset tracking variables after each click
            mouseDownInsideDialog = false;
            mouseDownOutsideDialog = false;
        });
    }

    // Helper function to determine if a color is light or dark
    function isLightColor(hexColor) {
        // Remove the # if present
        const hex = hexColor.replace('#', '');
        
        // Convert hex to RGB values
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        
        // Calculate brightness using standard luminance formula
        // Values closer to 255 are lighter, closer to 0 are darker
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        
        // Return true if bright (light color), false if dark
        return brightness > 128;
    }

    // Creates a CSS style for highlighting that automatically adjusts text color for a specific slot
    function createHighlightStyle(highlightColor, slotIndex) {
        // Remove any existing highlight style for this slot to avoid conflicts
        const existingStyle = document.getElementById(`regex-highlight-style-${slotIndex}`);
        if (existingStyle) {
            existingStyle.remove();
        }
        
        // Determine the appropriate text color based on highlight color
        const textColor = isLightColor(highlightColor) ? '#000000' : '#ffffff';
        
        // Create new style element for our highlights
        const style = document.createElement('style');
        style.id = `regex-highlight-style-${slotIndex}`;
        style.textContent = `
            .${preciseHighlightConfig.baseClassName}-${slotIndex} {
                background-color: ${highlightColor} !important;
                color: ${textColor} !important;
                border-radius: 2px !important;
                box-shadow: 0 0 0 1px rgba(0,0,0,0.1) !important;
            }
        `;
        document.head.appendChild(style);
    }

    // Highlights only the exact text that matches the pattern (not the whole element) for a specific slot
    function highlightMatches(pattern, color, slotIndex) {
        try {
            // Clear any previous highlights for this slot first
            clearHighlights(slotIndex);
            
            // Create the CSS style for highlighting with appropriate text color for this slot
            createHighlightStyle(color, slotIndex);
            
            // Create regex from user's pattern
            const regex = new RegExp(pattern, 'gi');
            
            // Walk through all text nodes on the page
            const walker = document.createTreeWalker(
                document.body,
                NodeFilter.SHOW_TEXT,
                null,
                false
            );
            
            // Collect text nodes that contain matches (we'll process them after walking)
            const nodesToProcess = [];
            let textNode;
            while (textNode = walker.nextNode()) {
                regex.lastIndex = 0; // Reset regex for each text node
                if (regex.test(textNode.textContent)) {
                    nodesToProcess.push(textNode);
                }
            }
            
            // Process each text node that contains matches
            nodesToProcess.forEach(function(textNode) {
                highlightTextInNode(textNode, pattern, color, slotIndex);
            });
            
        } catch (error) {
            alert('Invalid regex pattern: ' + error.message);
        }
    }

    // Helper function that replaces matching text with highlighted spans in a single text node
    function highlightTextInNode(textNode, pattern, color, slotIndex) {
        const text = textNode.textContent;
        const regex = new RegExp(pattern, 'gi');
        
        // Only process if there are actual matches
        if (!regex.test(text)) {
            return;
        }
        
        // Reset regex and create highlighted HTML
        regex.lastIndex = 0;
        const highlightedHTML = text.replace(regex, function(match) {
            return `<span class="${preciseHighlightConfig.baseClassName}-${slotIndex}" ${preciseHighlightConfig.slotAttribute}="${slotIndex}">${match}</span>`;
        });
        
        // Only replace if highlighting actually occurred
        if (highlightedHTML !== text) {
            // Create a temporary container to hold the new HTML
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = highlightedHTML;
            
            // Replace the text node with the new highlighted content
            const parent = textNode.parentNode;
            while (tempDiv.firstChild) {
                parent.insertBefore(tempDiv.firstChild, textNode);
            }
            parent.removeChild(textNode);
            
            // Mark the parent so we can find it later for cleanup
            parent.setAttribute(preciseHighlightConfig.dataAttribute, 'true');
        }
    }

    // Removes highlights and restores original text - works for specific slots or all slots
    function clearHighlights(slotIndex) {
        if (slotIndex !== undefined) {
            // Clear highlights for a specific slot only
            const highlightSpans = document.querySelectorAll(`[${preciseHighlightConfig.slotAttribute}="${slotIndex}"]`);
            
        // Replace each highlighted span with plain text
        highlightSpans.forEach(function(span) {
            const textNode = document.createTextNode(span.textContent);
            const parent = span.parentNode;
            if (parent) {
                parent.replaceChild(textNode, span);
                // Only normalize if parent is an element (not a text node)
                if (parent.nodeType === Node.ELEMENT_NODE) {
                    parent.normalize();
                }
            }
        });            // Remove the CSS style for this specific slot
            const style = document.getElementById(`regex-highlight-style-${slotIndex}`);
            if (style) {
                style.remove();
            }
        } else {
            // Clear all highlights from all slots
            for (let i = 0; i < multiPatternConfig.maxPatterns; i++) {
                // Clear highlights for each slot individually
                const slotSpans = document.querySelectorAll(`[${preciseHighlightConfig.slotAttribute}="${i}"]`);
                slotSpans.forEach(function(span) {
                    const textNode = document.createTextNode(span.textContent);
                    const parent = span.parentNode;
                    if (parent) {
                        parent.replaceChild(textNode, span);
                    }
                });
                
                // Remove the CSS style for this slot
                const style = document.getElementById(`regex-highlight-style-${i}`);
                if (style) {
                    style.remove();
                }
            }
            
            // Clean up any remaining tracking attributes and normalize elements
            const highlightedElements = document.querySelectorAll(`[${preciseHighlightConfig.dataAttribute}="true"]`);
            highlightedElements.forEach(function(element) {
                element.removeAttribute(preciseHighlightConfig.dataAttribute);
                // Only normalize if it's actually an element
                if (element.nodeType === Node.ELEMENT_NODE) {
                    element.normalize();
                }
            });
        }
    }

    // Helper function to create a menu item with consistent styling and behavior
    // This makes it easy to add new tools without repeating code
    function createMenuItem(text, clickHandler, isDisabled = false) {
        const menuItem = document.createElement('div');
        menuItem.textContent = text;
        menuItem.style.cssText = `
            padding: 10px 16px !important;
            cursor: pointer !important;
            transition: background 0.2s !important;
            border: none !important;
            margin: 0 !important;
            ${isDisabled ? 'color: #888 !important;' : ''}
        `;

        // Add hover effects
        menuItem.addEventListener('mouseenter', function() {
            menuItem.style.background = '#444';
        });
        menuItem.addEventListener('mouseleave', function() {
            menuItem.style.background = 'transparent';
        });

        // Add click handler
        menuItem.addEventListener('click', clickHandler);

        return menuItem;
    }

    // Creates a simple popup menu with tool options
    // This menu shows when you click the corner icon
    function createPopupMenu(buttonElement = null) {
        // Remove any existing menu first
        const existingMenu = document.getElementById('power-popup-menu');
        if (existingMenu) {
            existingMenu.remove();
            return; // Add this to prevent reopening if we're just closing
        }

        // Create the menu container
        const menu = document.createElement('div');
        menu.id = 'power-popup-menu';

        // Position the menu based on whether it was triggered by a button or not
        if (buttonElement && buttonElement.classList.contains('power-popup-model-button')) {
            // For model selector buttons - position below the button
            const buttonRect = buttonElement.getBoundingClientRect();
            menu.style.cssText = `
                position: fixed !important;
                top: ${buttonRect.bottom + 5}px !important;
                left: ${buttonRect.left}px !important;
                background: #2d2d2d !important;
                border: 1px solid #555 !important;
                border-radius: 6px !important;
                box-shadow: 0 2px 10px rgba(0,0,0,0.5) !important;
                z-index: 2147483647 !important;
                min-width: 150px !important;
                font-family: Arial, sans-serif !important;
                font-size: 14px !important;
                color: #ffffff !important;
                padding: 4px 0 !important;
            `;
        } else {
            // For corner icon - position near bottom right
            menu.style.cssText = `
                position: fixed !important;
                bottom: 50px !important;
                right: 10px !important;
                background: #2d2d2d !important;
                border: 1px solid #555 !important;
                border-radius: 6px !important;
                box-shadow: 0 2px 10px rgba(0,0,0,0.5) !important;
                z-index: 2147483647 !important;
                min-width: 150px !important;
                font-family: Arial, sans-serif !important;
                font-size: 14px !important;
                color: #ffffff !important;
                padding: 4px 0 !important;
            `;
        }

        // Add menu items using the helper function
        // This is much cleaner and easier to maintain!
        
        // Highlighter tool - opens the existing highlighter dialog
        const highlighterItem = createMenuItem('Highlighter', function() {
            menu.remove();
            createHighlighterDialog();
        });

        // Placeholder tool - shows instructions for adding new tools
        const placeholderItem = createMenuItem('Another Tool (Coming Soonaa)', function() {
            menu.remove();
            alert('This is a placeholder for future tools!\n\nTo add a new tool:\n1. Create your tool function\n2. Call createMenuItem() with your text and function\n3. Add it to the menu with menu.appendChild()');
        }, true); // true = disabled styling

        // Add all menu items to the menu
        menu.appendChild(highlighterItem);
        menu.appendChild(placeholderItem);

        // Add the menu to the page
        document.body.appendChild(menu);
        
        // Set up click-outside-to-close functionality
        // Wait longer so the current click doesn't immediately close the menu
        setTimeout(function() {
            function handleClickOutside(event) {
                if (!menu.contains(event.target)) {
                    menu.remove();
                    document.removeEventListener('click', handleClickOutside);
                }
            }
            document.addEventListener('click', handleClickOutside);
        }, 100); // Increased from 10ms to 100ms
    }

    // Main function called when icon is clicked
    // Shows the popup menu instead of opening dialog directly
    function performAction(event) {
        // Check if menu is already open and close it, otherwise show it
        const existingMenu = document.getElementById('power-popup-menu');
        if (existingMenu) {
            existingMenu.remove();
        } else {
            // Pass the clicked button element if the event exists
            createPopupMenu(event?.currentTarget);
        }
    }

    function createModelSelectorButton() {
        const button = document.createElement('button');
        button.innerHTML = config.iconSymbol;
        button.style.cssText = `
            width: 36px !important;
            height: 36px !important;
            background-color: ${config.backgroundColor} !important;
            border-radius: 8px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            color: white !important;
            font-size: 20px !important;
            cursor: pointer !important;
            margin-left: 8px !important;
            border: none !important;
            transition: all 0.3s ease !important;
        `;

        // Add hover effects
        button.addEventListener('mouseenter', function() {
            button.style.backgroundColor = config.hoverColor;
            button.style.transform = 'scale(1.05)';
        });

        button.addEventListener('mouseleave', function() {
            button.style.backgroundColor = config.backgroundColor;
            button.style.transform = 'scale(1)';
        });

        // Add click handler
        button.addEventListener('click', function(event) {
            event.stopPropagation();
            performAction(event);
        });

        return button;
    }

    function addButtonsToModelSelectors() {
        // Find all model selector containers
        const modelSelectors = document.querySelectorAll('div.flex.items-center > button[data-testid="model-switcher-dropdown-button"]');
        
        modelSelectors.forEach(selector => {
            // Check if we already added a button to this selector
            const container = selector.parentElement;
            if (container && !container.querySelector('.power-popup-model-button')) {
                const button = createModelSelectorButton();
                button.classList.add('power-popup-model-button');
                container.appendChild(button);
            }
        });
    }

    function initializePowerPopup() {
        // Wait a bit to ensure the page is fully loaded
        setTimeout(function() {
            // Create the corner popup
            const container = createContainer();
            const icon = createPopupIcon();

            // Container events to show/hide icon
            container.addEventListener('mouseenter', function() {
                icon.style.setProperty('opacity', '1', 'important');
                icon.style.setProperty('transform', 'scale(1)', 'important');
            });

            container.addEventListener('mouseleave', function() {
                icon.style.setProperty('opacity', '0', 'important');
                icon.style.setProperty('transform', 'scale(0.8)', 'important');
            });

            // Icon hover effects
            icon.addEventListener('mouseenter', function() {
                icon.style.setProperty('background-color', config.hoverColor, 'important');
                icon.style.setProperty('transform', 'scale(1.1)', 'important');
            });

            icon.addEventListener('mouseleave', function() {
                icon.style.setProperty('background-color', config.backgroundColor, 'important');
                icon.style.setProperty('transform', 'scale(1)', 'important');
            });

            // Icon click action - prevent event from bubbling to avoid immediate menu closure
            icon.addEventListener('click', function(event) {
                event.stopPropagation();
                performAction(null); // Pass null to indicate this is the corner icon
            });

            // Add icon to container, and container to body
            container.appendChild(icon);
            document.body.appendChild(container);

            // Add buttons next to model selectors
            addButtonsToModelSelectors();

            // Set up a MutationObserver to watch for new model selectors
            const observer = new MutationObserver((mutations) => {
                addButtonsToModelSelectors();
            });

            // Start observing the body for changes
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }, 1000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializePowerPopup);
    } else {
        initializePowerPopup();
    }
})();
