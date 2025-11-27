// uiUtils.js

window.UIUtils = {
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
