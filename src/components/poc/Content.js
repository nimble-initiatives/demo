import { LitElement, html, css, unsafeCSS, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import sheet from '../../styles/global.css?inline' assert { type: 'css' };

export default class Content extends LitElement {
  #video;

  static styles = css`
    ${unsafeCSS(sheet)}
  `;

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
  }

  updated(changedProperties) {
    if (changedProperties.get('video')?.playing !== this.video?.playing ||
      changedProperties.get('video')?.url !== this.video?.url ||
      changedProperties.get('video')?.loop !== this.video?.loop ||
      changedProperties.get('video')?.startTime !== this.video?.startTime ||
      changedProperties.get('video')?.poster?.source?.url !== this.video?.poster?.source?.url) {
      this.#video?.load();
    }
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
        <picture>
          <source srcset=${this.image?.mobile?.source.url}
                  media="(max-width: 500px)"
                  width="600" height="300"
                  data-property-media="mobile">
          <source srcset=${this.image?.tablet?.source.url}
                  media="(max-width: 861px) and (min-width: 501px)"
                  width="728" height="364"
                  data-property-media="tablet">
          <source srcset=${this.image?.desktop?.source.url}
                  media="(min-width: 862px)"
                  width="716" height="537"
                  data-property-media="desktop">
          <img src=${this.image?.desktop?.source.url} loading="lazy" alt="" width="716" height="537" class="w-full block rounded-2xl aspect-2/1 lg:aspect-4/3 object-cover">
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