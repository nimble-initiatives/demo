import { LitElement, html, css, unsafeCSS } from 'lit';
import sheet from '../../styles/global.css?inline' assert { type: 'css' };

export default class Toc extends LitElement {

  static styles = css`
  ${unsafeCSS(sheet)}
`;
  static properties = {
    heading: { type: String },
    items: { type: Array }
  };

  constructor() {
    super();
    this.heading = '';
    this.items = [];
  }

  firstUpdated() {
    this.items = [...globalThis.tocRoots].map(item => {
      const section = item.querySelector('section');
      return {
        id: section.id,
        text: item.querySelector('h1')?.textContent || item.querySelector('h2')?.textContent || item.querySelector('h3')?.textContent
      };
    });
  }

  render() {
    return html`
      <section class="my-16 md:my-20 lg:my-28">
        <div class="container">
          <div class="bg-zinc-200 p-5 md:p-10 max-w-5xl">
            <p class="font-bold text-xl md:text-2xl lg:text-3xl">${this.heading}</p>
            <ol class="mt-5 space-y-2" id="toc">
              ${[...this.items].map(item => html`
                <li><a href="#${item.id}">${item.text}</a></li>
              `)}
            </ol>
          </div>
        </div>
      </section>`;
  }
}

customElements.define('poc-toc', Toc);