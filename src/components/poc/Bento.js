import { LitElement, html, css, unsafeCSS } from 'lit';
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

  render() {
    return html`
      <section class="my-16 md:my-20 lg:my-28">
        <div class="container">
          <div class="w-full grid grid-cols-12 auto-rows-max gap-5 row-span">
            ${
              this.items?.map((item, index) => {
                return html`
                <div
                  class=${classMap({
                    'bg-zinc-200 rounded-xl col-span-12 p-10 pt-52': true,
                    'col-span-full': true,
                    'lg:col-span-6': (this.style === 1 && [3, 4].includes(index)) || (this.style === 2 && index > 3) || (this.style === 4 && [2, 3].includes(index)),
                    'lg:col-span-8': (this.style === 2 && [1, 2].includes(index)) || (this.style === 3 && index === 0),
                    'lg:row-span-2': this.style === 3 && index === 1,
                    'lg:col-span-3': this.style === 4 && [0, 1, 4, 5].includes(index),
                    'lg:col-span-4': (this.style === 3 && index > 0) || (this.style === 2 && [0, 3].includes(index)) || (this.style === 1 && index < 3)
                  })}>
                  <h3 class="text-2xl font-bold mb-3">${item.heading}</h3>
                  <p>${item.text}</p>
                </div>`
              })
            }
          </div>
        </div>
      </section>`;
  }
}

customElements.define('poc-bento', Bento);