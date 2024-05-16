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
    text: { type: String }
  };

  constructor() {
    super();
    this.align = 'center';
    this.text = '';
  }

  render() {
    return html`
      <section class="my-16 md:my-20 lg:my-28">
        <div class="container">
          <div class=${classMap({
            "prose": true,
            "text-center": this.align === "center"
            })}>
            ${unsafeHTML(this.text)}
          </div>
        </div>
      </section>`;
  }
}

customElements.define('poc-rich-text', RichText);