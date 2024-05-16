import { LitElement, html, css, unsafeCSS } from 'lit';
import sheet from '../../styles/global.css?inline' assert { type: 'css' };

export default class Toc extends LitElement {

  static styles = css`
  ${unsafeCSS(sheet)}
`;
  static properties = {
    heading: { type: String }
  };

  constructor() {
    super();
    this.heading = '';
  }

  render() {
    return html`
      <section class="my-16 md:my-20 lg:my-28">
        <div class="container">
          <div class="bg-zinc-200 p-5 md:p-10 max-w-5xl">
            <p class="font-bold text-xl md:text-2xl lg:text-3xl">${this.heading}</p>

            <ol class="mt-5 space-y-2" id="toc"></ol>
          </div>
        </div>
      </section>`;
  }
}

customElements.define('poc-toc', Toc);