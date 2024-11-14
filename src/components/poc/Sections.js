import { LitElement, html, css, unsafeCSS } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { subscribe } from '@strifeapp/strife';
//import { subscribe } from '/Users/marcus/Projects/private/strife.nosync/wieldy/src/sdk/js/src/packages/strife/index.js';
import './Hero.js';
import './Toc.js';
import './Content.js';
import './News.js';
import './Bento.js';
import './RichText.js';
import sheet from '../../styles/global.css?inline' assert { type: 'css' };


const deepEqualWithChanges = (obj1, obj2, path = '') => {
  let changes = [];

  const compare = (obj1, obj2, currentPath) => {
    if (obj1 === obj2) {
      return;
    }

    if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
      changes.push({
        type: 'change',
        path: currentPath,
        before: obj1,
        after: obj2
      });
      return;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    keys1.forEach(key => {
      if (!keys2.includes(key)) {
        changes.push({
          type: 'removed',
          path: `${currentPath}${currentPath ? '.' : ''}${key}`,
          before: obj1[key],
          after: undefined
        });
      } else {
        compare(obj1[key], obj2[key], `${currentPath}${currentPath ? '.' : ''}${key}`);
      }
    });

    keys2.forEach(key => {
      if (!keys1.includes(key)) {
        changes.push({
          type: 'added',
          path: `${currentPath}${currentPath ? '.' : ''}${key}`,
          before: undefined,
          after: obj2[key]
        });
      }
    });
  };

  compare(obj1, obj2, path);

  return changes;
};


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