import { LitElement, html } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import './Hero.js';
import './Toc.js';
import './Content.js';
import './Expandable.js';
import './News.js';
import './Bento.js';
import './RichText.js'
export default class Sections extends LitElement {

  static properties = {
    sections: { type: Array },
  };

  constructor() {
    super();
    this.sections = [];
  }

  firstUpdated() {
    import('@strifeapp/strife').then((strife) => {
      this.unsubscribe = strife.subscribe((data) => {
        this.sections = data.sections;
      });
      strife.ready();
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.unsubscribe();
  }

  render() {
    return repeat(this.sections, (item) => item.id, (item, index) => {
      switch (item['@strife'].template) {
        case 'hero':
          return html`
            <hero-chapter
              heading="${item.heading}"
              text="${item.text}"
              .cta=${item.cta}
              size="${item.size}"
              align="${item.align}"
              .video=${item.video}
              .image=${item.image}
            ></hero-chapter>
          `;
        case 'innehallsfortackning':
          return html`<poc-toc heading="${item.heading}"></poc-toc>`;
        case 'innehall':
          return html`
            <poc-content
              .text=${item.text}
              image="${item.image?.desktop.source.url}"
              .video=${item.video}
              imageAlign="${item.imageAlign}"
              .background=${!!+item.background}
            ></poc-content>
          `;
        case 'expanderbar':
          return html`<poc-expandable .text=${item.text} .background=${!!+item.background}></poc-expandable>`;
        case 'nyheter':
          return html`<poc-news heading=${item.heading} .items=${item.content?.documents}></poc-news>`;
        case 'bento':
          return html`<poc-bento .style=${Number(item.style)} .items=${item.items}></poc-bento>`;
        case 'text':
          return html`<poc-rich-text align="${item.align}" .text=${item.content}></poc-rich-text>`;
        default:
          return html`<p>Default content</p>`;
      }
    });
  }
}

customElements.define('poc-sections', Sections);