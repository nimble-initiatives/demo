# Getting started
## Connect to the Strife API and interact with your data in a few steps:
### 1. Install Strife SDK

```bash
npm i @strifeapp/strife ravendb
```

### 2. Create and initialize a Strife store [[open file](src/store/index.js)]
```js
import { DocumentStore } from 'ravendb';

const certificate = import.meta.env.STRIFE_CERTIFICATE;

let authOptions = {
  certificate: Buffer.from(certificate, 'base64'),
  type: 'pfx',
  password: import.meta.env.STRIFE_CERTIFICATE_PASSWORD,
};

const store = new DocumentStore(
  import.meta.env.STRIFE_DATABASE_URLS.split(','),
  import.meta.env.STRIFE_DATABASE,
  authOptions
);

export default store.initialize();
```
### 3. Query your pages [[open file](src/pages/[...slug].astro)]
Using async await syntax:

```js
import store from '@/store/index';

const session = store.openSession();

let page = await session
  .query({ indexName: 'Content/ByUrl' })
  .whereEquals('url', Astro.url.pathname)
  .firstOrNull();

console.log(`Found page with ${page.heading}`);
```

Or promises:

```js
session.query({ collection: "Articles" })
  .all()
  .then((articles) => {
    if(articles.length) {
      articles.map(article => console.log(`${article.displayName} was published: ${article.publishedAt}`));
    } else {
      console.log('No articles found');
    }
  });
```

### 4. Setup Real time preview
Use in web component by subscribing to the Strife studio's events and call the provided callback function.

```js
import { subscribe } from '@strifeapp/strife';

export default class Sections extends LitElement {

  static properties = {
    sections: { type: Array },
  };

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
    return repeat(this.sections, (item) => item.id, (item, index) => {…});
  }
}
```