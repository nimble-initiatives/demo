import { LitElement, html, css, unsafeCSS } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import sheet from '../../styles/global.css?inline' assert { type: 'css' };

export default class RichText extends LitElement {

  static styles = css`
  ${unsafeCSS(sheet)}
`;
  static properties = {
    align: { type: String },
    background: { type: Boolean },
    text: { type: String }
  };

  constructor() {
    super();
    this.align = 'center';
    this.background = false;
    this.text = '';
  }

  connectedCallback() {
    super.connectedCallback();
    globalThis.tocRoots.add(this.shadowRoot);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    globalThis.tocRoots.delete(this.shadowRoot);
  }

  render() {
    return html`
      <section .id=${this.id} class=${classMap({
        'py-16': this.background,
        'md:py-20': this.background,
        'lg:py-28': this.background,
        'bg-zinc-200': this.background,
        'my-16': !this.background,
        'md:my-20': !this.background,
        'lg:my-28': !this.background,
      })}>
        <div class="container">
          <div class=${classMap({
            "prose": true,
            "text-center": this.align === "center",
            })}>
            ${unsafeHTML(this.text)}
          </div>
        </div>
      </section>`;
  }
}

customElements.define('poc-rich-text', RichText);