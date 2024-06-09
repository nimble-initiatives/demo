import { LitElement, css, unsafeCSS } from 'lit';
import { html, literal } from 'lit/static-html.js';
import { classMap } from 'lit/directives/class-map.js';
import sheet from '../../styles/global.css?inline' assert { type: 'css' };

export default class Bento extends LitElement {

  static styles = css`
  ${unsafeCSS(sheet)}
`;

  static properties = {
    style: { type: Number },
    items: { type: Array },
  };

  constructor() {
    super();
    this.style = 1;
    this.items = [];
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
      <section .id=${this.id} class="my-16 md:my-20 lg:my-28">
        <div class="container">
          <div class="w-full grid grid-cols-12 auto-rows-max gap-5 row-span">
            ${
              this.items?.map((item, index) => {
                const tag = item.link ? literal`a` : literal`div`;
                return html`
                <${tag} .href="${item.link?.href}"
                  class=${classMap({
                    'relative rounded-xl col-span-12 p-10 pt-52': true,
                    'col-span-full': true,
                    'lg:col-span-6': (this.style === 1 && [3, 4].includes(index)) || (this.style === 2 && index > 3) || (this.style === 4 && [2, 3].includes(index)),
                    'lg:col-span-8': (this.style === 2 && [1, 2].includes(index)) || (this.style === 3 && index === 0),
                    'lg:row-span-2': this.style === 3 && index === 1,
                    'lg:col-span-3': this.style === 4 && [0, 1, 4, 5].includes(index),
                    'lg:col-span-4': (this.style === 3 && index > 0) || (this.style === 2 && [0, 3].includes(index)) || (this.style === 1 && index < 3),
                  })}>
                  <img src="${item.image?.source.url}" alt="${item.image?.alt}" class="absolute top-0 left-0 w-full h-full object-cover rounded-xl -z-10" />
                  <div class="absolute bottom-0 left-0 right-0 top-0 bg-zinc-900 bg-opacity-75 rounded-xl -z-10"></div>
                  <h3 class="text-2xl font-bold mb-3 text-white">${item.heading}</h3>
                  <p class="text-white">${item.text}</p>
                </${tag}>`
              })
            }
          </div>
        </div>
      </section>`;
  }
}

customElements.define('poc-bento', Bento);