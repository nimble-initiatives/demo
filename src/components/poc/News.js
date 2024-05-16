import { LitElement, html, css, unsafeCSS } from 'lit';
import sheet from '../../styles/global.css?inline' assert { type: 'css' };

export default class News extends LitElement {

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

  render() {
    return html`
      <section class="my-16 md:my-20 lg:my-28">
        <div class="container">
          <h2 class="font-bold text-2xl md:text-3xl lg:text-4xl mb-6">${this.heading}</h2>
          <div
            class="w-full grid grid-cols-12 auto-rows-max gap-y-10 lg:gap-x-12 row-span"
          >
            ${
              this.items?.map((item, index) => {
                return html`
                  <div class="col-span-full lg:col-span-4">
                    <img
                      src="${item.image?.source.url}"
                      alt=""
                      class="block w-full h-auto rounded-xl mb-5 lg:aspect-2/1 aspect-4/3 object-cover"
                    />
                    <h3 class="text-2xl font-bold mb-3 leading-tight">${item.heading}</h3>
                    <p>${item.text}</p>
                    <p class="mt-4">
                      <a
                        href="${item.url}"
                        class="font-bold underline underline-offset-4 hover:no-underline"
                      >
                        Läs artikel
                      </a>
                    </p>
                  </div>
                `
              })
            }
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('poc-news', News);