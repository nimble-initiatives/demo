import { LitElement, html, css, unsafeCSS } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { subscribe, ready } from '@strifeapp/strife';
import './Hero.js';
import './Toc.js';
import './Content.js';
import './News.js';
import './Bento.js';
import './RichText.js';
import sheet from '../../styles/global.css?inline' assert { type: 'css' };

export default class Sections extends LitElement {

  static styles = [
    css`
      ${unsafeCSS(sheet)}
    `,
  ];

  static properties = {
    sections: { type: Array },
  };

  constructor() {
    super();
    this.sections = [];
  }

  firstUpdated() {
    this.unsubscribe = subscribe((data) => {
      this.sections = data.sections;
    });
    ready();

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
              .id="test-${index}"
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
              .id="test-${index}"
              .text=${item.text}
              .image=${item.image}
              .video=${item.video}
              imageAlign="${item.imageAlign}"
              .background=${!!+item.background}
            ></poc-content>
          `;
        case 'nyheter':
          return html`<poc-news .id="test-${index}" heading=${item.heading} .items=${item.content?.documents}></poc-news>`;
        case 'bento':
          return html`<poc-bento .id="test-${index}" .style=${Number(item.style)} .items=${item.items}></poc-bento>`;
        case 'text':
          return html`<poc-rich-text .id="test-${index}" align="${item.align}" .background=${!!+item.background} .text=${item.content}></poc-rich-text>`;
        default:
          return html`<p>Template not found: ${item['@strife'].template}</p>`;
      }
    });
  }
}

customElements.define('poc-sections', Sections);