/**
 * Modal Utilities for Userscripts
 * Provides reusable modal creation and management functions
 * with Tailwind CSS dark mode support
 */

/**
 * Creates a modal dialog with customizable content and buttons
 * 
 * @param {string} modalId - Unique ID for the modal element
 * @param {Object} options - Modal configuration options
 * @param {string} options.title - Modal title text
 * @param {string|HTMLElement} options.content - HTML string or DOM element for modal body
 * @param {Array<Object>} options.buttons - Array of button configurations
 * @param {string} options.buttons[].text - Button label text
 * @param {string} options.buttons[].style - Button style: 'primary', 'secondary', 'success', 'danger', or 'cancel'
 * @param {Function} options.buttons[].onClick - Click handler function
 * @param {boolean} [options.buttons[].closeOnClick=true] - Whether to close modal after click
 * @param {string} [options.width='w-72'] - Tailwind width class (e.g., 'w-64', 'w-96')
 * @param {string} [options.padding='p-4'] - Tailwind padding class
 * @param {boolean} [options.scrollable=false] - Whether to make content scrollable
 * @param {Function} [options.onClose] - Optional callback when modal is closed
 * @returns {HTMLElement} The created modal element
 * 
 * @example
 * createModal('my-modal', {
 *   title: 'Confirm Action',
 *   content: '<p>Are you sure?</p>',
 *   buttons: [
 *     { text: 'Cancel', style: 'cancel', onClick: () => {} },
 *     { text: 'Confirm', style: 'primary', onClick: () => console.log('Confirmed!') }
 *   ]
 * });
 */
function createModal(modalId, options = {}) {
  const {
    title = 'Modal',
    content = '',
    buttons = [],
    width = 'w-72',
    padding = 'p-4',
    scrollable = false,
    onClose = null
  } = options;

  // Button style presets
  const buttonStyles = {
    primary: 'px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs',
    secondary: 'px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-xs',
    success: 'px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs',
    danger: 'px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs',
    cancel: 'px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-xs'
  };

  // Create modal overlay
  const modal = document.createElement('div');
  modal.id = modalId;
  modal.className = 'fixed inset-0 flex items-center justify-center z-50';
  modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';

  // Build buttons HTML
  const buttonsHtml = buttons.map((btn, index) => {
    const btnStyle = buttonStyles[btn.style] || buttonStyles.secondary;
    const btnId = `${modalId}-btn-${index}`;
    return `<button id="${btnId}" class="${btnStyle}">${btn.text}</button>`;
  }).join('');

  // Determine scrollable class
  const scrollClass = scrollable ? 'overflow-y-auto' : '';

  // Build modal HTML
  modal.innerHTML = `
    <div class="bg-white dark:bg-gray-800 rounded-lg ${padding} ${width} max-w-90vw max-h-90vh ${scrollClass}">
      <h2 class="text-lg font-bold mb-3 text-gray-900 dark:text-white">${title}</h2>
      <div id="${modalId}-content" class="space-y-3">
        ${typeof content === 'string' ? content : ''}
      </div>
      ${buttonsHtml ? `<div class="flex justify-end space-x-2 mt-4">${buttonsHtml}</div>` : ''}
    </div>
  `;

  // If content is a DOM element, append it
  if (content instanceof HTMLElement) {
    const contentContainer = modal.querySelector(`#${modalId}-content`);
    contentContainer.innerHTML = '';
    contentContainer.appendChild(content);
  }

  // Append to body
  document.body.appendChild(modal);

  // Attach button event handlers
  buttons.forEach((btn, index) => {
    const btnElement = document.getElementById(`${modalId}-btn-${index}`);
    if (btnElement && btn.onClick) {
      btnElement.addEventListener('click', () => {
        btn.onClick();
        // Auto-close unless explicitly disabled
        if (btn.closeOnClick !== false) {
          closeModal(modalId);
          if (onClose) onClose();
        }
      });
    }
  });

  return modal;
}

/**
 * Closes and removes a modal from the DOM
 * 
 * @param {string} modalId - The ID of the modal to close
 * @returns {boolean} True if modal was found and closed, false otherwise
 * 
 * @example
 * closeModal('my-modal');
 */
function closeModal(modalId) {
  const modal = document.querySelector(`#${modalId}`);
  if (modal) {
    modal.remove();
    return true;
  }
  return false;
}

/**
 * Check if a modal is currently open
 * 
 * @param {string} modalId - The ID of the modal to check
 * @returns {boolean} True if modal exists in DOM
 */
function isModalOpen(modalId) {
  return !!document.querySelector(`#${modalId}`);
}
