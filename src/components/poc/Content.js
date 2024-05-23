import { LitElement, html, css, unsafeCSS, nothing } from 'lit';
// import { render as renderPicture } from '@strifeapp/picture';
import { render as renderPicture } from '/Users/marcus/Projects/private/strife.nosync/wieldy/src/sdk/js/src/packages/picture/index.js';
import { classMap } from 'lit/directives/class-map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import {ref, createRef} from 'lit/directives/ref.js';
import sheet from '../../styles/global.css?inline' assert { type: 'css' };

const ensureHttps = (url) => {
  if (!url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('//')) {
    return 'https://' + url;
  } else if (url.startsWith('//')) {
    return 'https:' + url;
  }
  return url;
}

export default class Content extends LitElement {
  #video;
  #picture;
  #image;
  inputRef = createRef();
  static styles = [
    css`
      ${unsafeCSS(sheet)}
    `,
    css`
      img.previewing {
        --img-previewing-url: '';
        --img-previewing-size: 100%;
        --img-previewing-position: 0px 0px;
        background-image: var(--img-previewing-url);
        background-repeat: no-repeat;
        background-position: var(--img-previewing-position);
        background-size: var(--img-previewing-size);
      }
      img.previewing.previewing--empty {
        background-image: repeating-linear-gradient(
          45deg,
          var(--str-placeholder-background-color) 0,
          transparent 1px,
          transparent 0,
          transparent 50%
        );
        background-repeat: repeat;
        background-position: 0 0;
        background-size: 15px 15px;
        outline: solid 1px var(--str-placeholder-background-color);
        opacity: var(--str-placeholder-background-opacity);
      }
    `,
  ];

  static properties = {
    text: { type: String },
    image: { type: Object },
    video: { type: Object },
    imageAlign: { type: String },
    background: { type: Boolean }
  };

  constructor() {
    super();
    this.text = '';
    this.image = {};
    this.video = {};
    this.imageAlign = '';
    this.background = false;
  }

  firstUpdated() {
    this.#video = this.shadowRoot.querySelector('video');
    this.#picture = this.shadowRoot.querySelector('picture');
    this.#image = this.shadowRoot.querySelector('img');

    console.log('firstUpdated', this.#image.dataset.propertyMedia, window.name);
    // renderPicture(this.#picture, this.image);
  }

  // shouldUpdate(changedProperties) {
  //   return hasRequiredProperties(changedProperties.get('image'));
  // }

  willUpdate(changedProperties) {
    // render new and old value, the the old value is the reactive property in this case
    // changedProperties.forEach((oldValue, prop) => {
    //   if (prop === 'image') {
    //     console.group('image changed');
    //     console.log(`oldValue:`, oldValue);
    //     console.log(`newValue:`, this[prop]);
    //     console.groupEnd();
    //   }
    // });
  }

  updated(changedProperties) {

    if (changedProperties.get('video')?.playing !== this.video?.playing ||
      changedProperties.get('video')?.url !== this.video?.url ||
      changedProperties.get('video')?.loop !== this.video?.loop ||
      changedProperties.get('video')?.startTime !== this.video?.startTime ||
      changedProperties.get('video')?.poster?.source?.url !== this.video?.poster?.source?.url) {
      this.#video?.load();
    }

    console.log('updated', this.#image.dataset.propertyMedia, window.name);

    renderPicture(this.#picture, this.image);

  }

  render() {
    return html`
      <section
        class=${classMap({
      'py-16': this.background,
      'md:py-20': this.background,
      'lg:py-28': this.background,
      'bg-zinc-200': this.background,
      'my-16': !this.background,
      'md:my-20': !this.background,
      'lg:my-28': !this.background,
    })}>
  <div class="container">
    <div
      class="grid grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-10 xl:gap-16 items-center"
    >
      <div
        class=${classMap({
      'w-full': true,
      'lg:order-2': this.imageAlign === 'right',
    })}
      >
      ${!this.video?.__media ? html`
        <picture ${ref(this.inputRef)}>
          <source srcset="${ensureHttps(this.image?.mobile?.source.url)}"
            media="(max-width: 500px)"
            width="600" height="300"
            data-property-media="mobile">
          <source srcset="${ensureHttps(this.image?.tablet?.source.url)}"
            media="(min-width: 501px) and (max-width: 861px)"
            width="728" height="364"
            data-property-media="tablet">
          <source srcset="${ensureHttps(this.image?.desktop?.source.url)}"
            media="(min-width: 862px)"
            width="716" height="537"
            data-property-media="desktop">
          <img src="${ensureHttps(this.image?.desktop?.source.url)}" alt="" width="716" height="537">
      </picture>
      ` : ''}

      ${this.video?.__media ? html`
        <video class="w-full block rounded-2xl object-cover aspect-2/1 lg:aspect-4/3" playsinline poster="${this.video?.poster?.source?.url ?? nothing}" ?controls=${this.video?.controls} muted ?loop=${this.video?.loop} ?autoplay=${this.video?.playing}>
          <source src="${this.video.url}#t=${this.video.startTime}" type="video/mp4" />
        </video>
      ` : ''}
      </div>
      <div
          class=${classMap({
      'w-full': true,
      'prose': true,
      'lg:prose-lg': true,
      'lg:order-1': this.imageAlign === 'right'
    })}>${unsafeHTML(this.text)}</div>
    </div>
  </div>
</section>
    `;
  }

}

customElements.define('poc-content', Content);