import urlencode from 'urlencode';
import APIUtil from './api-util';

class Page {
  static encodeIdentifier(title) {
    // encode url identifier from page title
    return urlencode.encode(title.replace(/\s/g, '_'));
  }

  static decodeIdentifier(identifier) {
    // decode page title from url identifier
    return urlencode.decode(identifier.replace(/_/g, ' '))
  }

  constructor(title) {
    // title is one of:
    //   - page title
    //   - URL identifier
    this.title = this.constructor.decodeIdentifier(title);
    this.fetchMainImage();
  }

  get urlIdentifier() {
    return this.constructor.encodeIdentifier(this.title)
  }

  get url() {
    return `https://www.wikipedia.org/wiki/${this.urlIdentifier}`;
  }

  fetchLinks = () => APIUtil.fetchLinks(this.title)
    .then(links => this.links = links);

  fetchSummary = () => APIUtil.fetchSummary(this.title)
    .then(summary => this.summary = summary);

  fetchImages = () => APIUtil.fetchImages(this.title)
    .then(images => this.images = images);

  fetchMainImage = () => APIUtil.fetchMainImage(this.title)
    .then(mainImage => this.mainImage = mainImage);

  toString = () => this.title;
}

export default Page;
