import wiki from 'wikijs';
import { removeExtraneousLinks, extractLinks } from './helpers';
import Page from './page';

const getLinks = title => (
  wiki().page(title)
    .then(page => page.html())
    .then(html => removeExtraneousLinks(html))
    .then(html => extractLinks(html))
    .then(linkTitles => linkTitles.map(
      title => new Page(title))
    )
);

const getSummary = title => (
  wiki().page(title)
    .then(page => page.summary())
);

const getMainImage = title => (
  wiki().page(title)
    .then(page => page.mainImage())
);

const getImages = title => (
  wiki().page(title)
    .then(page => page.images())
);

export default {
  getLinks,
  getSummary,
  getMainImage,
  getImages
};
