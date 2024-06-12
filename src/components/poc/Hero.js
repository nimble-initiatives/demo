import { LitElement, html, css, unsafeCSS, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { preview as renderPreview, update as preparePreview } from '@strifeapp/picture';
import sheet from '../../styles/global.css?inline' assert { type: 'css' };

export default class Hero extends LitElement {
  #video;
  #picture;

  static styles = css`
    ${unsafeCSS(sheet)}
  `;

  static properties = {
    heading: { type: String },
    text: { type: String },
    cta: { type: Object },
    size: { type: String },
    align: { type: String },
    video: { type: Object },
    image: { type: Object }
  };

  constructor() {
    super();
    this.heading = '';
    this.text = '';
    this.cta = {};
    this.size = "small";
    this.align = "center";
    this.video = {};
    this.image = {};
  }

  firstUpdated() {
    this.#video = this.shadowRoot.querySelector('video');
    this.#picture = this.shadowRoot.querySelector('picture');
  }

  updated(changedProperties) {
    if(changedProperties.get('video')?.playing !== this.video?.playing ||
      changedProperties.get('video')?.startTime !== this.video?.startTime) {
      const videoElement = this.renderRoot.querySelector('video');
      if(videoElement) {
        videoElement.load();
      }
    }

    preparePreview(this.#picture, this.image);
    renderPreview(this.#picture, this.image);
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
      <section
        .id=${this.id}
        class=${classMap({
          "relative": true,
          "text-white": true,
          "antialiased": true,
          "h-hero": this.size === "small",
          "h-screen": this.size === "large",
          "max-h-[900px]": this.size === "large",
        })}
      >
  <div
    class="absolute inset-0 z-20 bg-zinc-900 bg-opacity-75 flex justify-center flex-col"
  >
    <div
      class=${classMap({
      "container": true,
      "mx-auto": true,
      "flex": true,
      "flex-col": true,
      "text-center": this.align === "center",
      "items-center": this.align === "center",
    })}
      >
      <h1 class="text-2xl md:text-4xl lg:text-7xl font-bold mb-2 max-w-4xl" data-placeholder="Här kan vi skriva en placeholder-text">${this.heading}</h1>
      <p class="max-w-2xl text-lg mb-7" data-placeholder="Här kan vi skriva en placeholder-text">${this.text}</p>
      ${this.cta?.text && this.cta?.href ? html`
      <p class="max-w-2xl">
        <a
          href=${this.cta.href}
          class="font-bold underline underline-offset-4 hover:no-underline"
          target=${this.cta.target === '_blank' ? '_blank' : nothing}
          >${this.cta.text}</a
        >
      </p>` : ''}
    </div>
  </div>

  ${!this.video?.__media ? html`
    <picture>
      <source srcset="${this.image?.mobile?.source?.url}"
              media="(max-width: 400px)"
              width="400" height="500"
              data-property-media="mobile">
      <source srcset="${this.image?.tablet?.source?.url}"
              media="(min-width: 401px) and (max-width: 860px)"
              width="860" height="500"
              data-property-media="tablet">
      <source srcset="${this.image?.desktop?.source?.url}"
              media="(min-width: 861px)"
              width="1366" height="500"
              data-property-media="desktop">
      <img src="${this.image?.desktop?.source?.url}" loading="lazy" alt="" width="1366" height="500" class="w-full h-full object-cover">
  </picture>
  ` : ''}

  ${this.video?.__media ? html`
    <video class="w-full h-full object-cover" playsinline ?controls=${this.video?.controls} muted ?loop=${this.video?.loop} ?autoplay=${this.video?.playing} poster=${this.video?.poster?.source.url ?? nothing}>
      <source src="${this.video.url}#t=${this.video.startTime}" type="video/mp4" />
    </video>
  ` : ''}

  </section>`;
  }

}

customElements.define('hero-chapter', Hero);
