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
  }

  get urlIdentifier() {
    return this.constructor.encodeIdentifier(this.title)
  }

  get url() {
    return `https://www.wikipedia.org/wiki/${this.urlIdentifier}`;
  }

  getLinks = () => APIUtil.getLinks(this.title);
  getSummary = () => APIUtil.getSummary(this.title);
  getImages = () => APIUtil.getImages(this.title);
  getMainImage = () => APIUtil.getMainImage(this.title);

  toString = () => this.title;
}

export default Page;
