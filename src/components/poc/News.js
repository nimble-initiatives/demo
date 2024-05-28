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
            class="w-full grid grid-cols-12 auto-rows-max gap-y-10 md:gap-x-12 lg:gap-x-12 row-span"
          >
            ${
              this.items?.map((item, index) => {
                return html`
                  <div class="col-span-full md:col-span-6 lg:col-span-4">
                  <picture>
                    <source srcset="${item.image?.tabletList?.source?.url}"
                            media="(max-width: 1024px)"
                            width="728" height="546"
                            data-property-media="tablet">
                    <source srcset="${item.image?.desktopList?.source?.url}"
                            media="(min-width: 1023px)"
                            width="466" height="233"
                            data-property-media="desktop">
                    <img src="${item.image?.desktopList?.source?.url}" loading="lazy" alt="" width="466" height="233" class="block w-full h-auto rounded-xl mb-5 lg:aspect-2/1 aspect-4/3 object-cover">
                  </picture>
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