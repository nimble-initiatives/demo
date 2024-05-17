import { LitElement, html, css, unsafeCSS, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import sheet from '../../styles/global.css?inline' assert { type: 'css' };

export default class Hero extends LitElement {
  #video;
  #image;
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
    image: { type: String }
  };

  constructor() {
    super();
    this.heading = '';
    this.text = '';
    this.cta = {};
    this.size = "small";
    this.align = "center";
    this.video = {};
    this.image = '';
  }

  firstUpdated() {
    this.#video = this.shadowRoot.querySelector('video');
  }

  updated(changedProperties) {
    if(changedProperties.get('video')?.playing !== this.video?.playing ||
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
      <h1 class="text-2xl md:text-4xl lg:text-7xl font-bold mb-2 max-w-4xl">
        ${this.heading}
      </h1>
      <p class="max-w-2xl text-lg mb-7">${this.text}</p>
      <p class="max-w-2xl">
        <a
          href=${this.cta.href}
          class="font-bold underline underline-offset-4 hover:no-underline"
          target=${this.cta.target === '_blank' ? '_blank' : nothing}
          >${this.cta.text}</a
        >
      </p>
    </div>
  </div>

  ${this.image?.source.url && !this.video?.__media ? html`
    <img src="${this.image.source.url}" alt="Golf image" class="w-full h-full object-cover" width="1366" height="768" />
  ` : ''}

  ${this.video?.__media ? html`
    <video class="w-full h-full object-cover" playsinline ?controls=${this.video?.controls} muted ?loop=${this.video?.loop} ?autoplay=${this.video?.playing}>
      <source src="${this.video.url}#t=${this.video.startTime}" type="video/mp4" />
    </video>
  ` : ''}

  </section>`;
  }

}

customElements.define('hero-chapter', Hero);
