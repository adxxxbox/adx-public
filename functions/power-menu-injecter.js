/**
 * Power Menu Helper Module
 * Provides utilities for adding custom items to ChatGPT's power popup menu
 * 
 * Usage:
 * PowerMenuHelper.addMenuButton({
 *     text: 'Your Button Text',
 *     className: 'your-unique-class',
 *     onClick: async () => { your code here }
 * });
 */

const PowerMenuHelper = (function() {
    'use strict';

    /**
     * Adds a custom button to the power popup menu
     * @param {Object} config - Configuration object
     * @param {string} config.text - Button text to display
     * @param {string} config.className - CSS class name for the button (must be unique)
     * @param {Function} config.onClick - Click handler function
     * @param {Object} [config.styles] - Optional custom styles object
     * @param {string} [config.position] - Where to insert: 'first' (default) or 'last'
     */
    function addMenuButton(config) {
        const {
            text,
            className,
            onClick,
            styles = {},
            position = 'first'
        } = config;

        // Validate required parameters
        if (!text || !className || !onClick) {
            console.error('PowerMenuHelper: text, className, and onClick are required');
            return;
        }

        function insertButton() {
            const menu = document.getElementById('power-popup-menu');
            
            // Skip if menu doesn't exist or button already added
            if (!menu || menu.querySelector(`.${className}`)) return;

            // Create button element
            const btn = document.createElement('div');
            btn.className = className;
            btn.textContent = text;

            // Apply default styles
            const defaultStyles = {
                padding: '10px 16px',
                cursor: 'pointer',
                transition: 'background 0.2s',
                border: 'none',
                margin: '0',
                color: '#fff'
            };

            // Merge default and custom styles
            const finalStyles = { ...defaultStyles, ...styles };
            btn.style.cssText = Object.entries(finalStyles)
                .map(([key, value]) => `${key}: ${value}`)
                .join('; ');

            // Add hover effects
            btn.addEventListener('mouseenter', () => btn.style.background = '#444');
            btn.addEventListener('mouseleave', () => btn.style.background = 'transparent');

            // Add click handler
            btn.addEventListener('click', async function(e) {
                e.stopPropagation();
                await onClick(e);
                menu.remove(); // Close popup after click
            });

            // Insert button at specified position
            if (position === 'last') {
                menu.appendChild(btn);
            } else {
                menu.insertBefore(btn, menu.firstChild);
            }
        }

        // Set up observer to watch for menu appearance
        const observer = new MutationObserver(insertButton);
        observer.observe(document.body, { childList: true, subtree: true });

        // Try to insert immediately if menu already exists
        insertButton();
    }

    /**
     * Add multiple buttons at once
     * @param {Array<Object>} buttons - Array of button config objects
     */
    function addMultipleButtons(buttons) {
        buttons.forEach(config => addMenuButton(config));
    }

    // Public API
    return {
        addMenuButton,
        addMultipleButtons
    };
})();

// Export for userscripts
if (typeof window !== 'undefined') {
    window.PowerMenuHelper = PowerMenuHelper;
}
