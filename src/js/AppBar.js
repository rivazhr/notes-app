import icon from "../images/icon.svg";
class AppBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header>
        <div class="container">
          <img src="${icon}" role="icon"/>
          <h1>Notes App</h1>
        </div>
      </header>
    `;
  }
}
customElements.define("app-bar", AppBar);
