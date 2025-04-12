export class LoadingIndicator extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="loading-wrapper">
        <div class="spinner"></div>
        <span>Loading...</span>
      </div>
    `;
    this.classList.add("loading-indicator");
  }
}

customElements.define("loading-indicator", LoadingIndicator);
