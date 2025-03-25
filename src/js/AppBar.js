class AppBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header>
        <div class="container">
          <img src="src/images/icon.svg" role="icon"/>
          <h1>Notes App</h1>
        </div>
      </header>
    `;
  }
}
customElements.define('app-bar', AppBar);