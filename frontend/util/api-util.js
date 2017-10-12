import wiki from 'wikijs';
import { removeExtraneousLinks, extractLinks } from './helpers';
import Page from './page';

const fetchLinks = title => (
  wiki().page(title)
    .then(page => page.html())
    .then(html => removeExtraneousLinks(html))
    .then(html => extractLinks(html))
    .then(linkTitles => linkTitles.map(
      title => new Page(title))
    )
);

const fetchSummary = title => (
  wiki().page(title)
    .then(page => page.summary())
);

const fetchMainImage = title => (
  wiki().page(title)
    .then(page => page.mainImage())
);

const fetchImages = title => (
  wiki().page(title)
    .then(page => page.images())
);

export default {
  fetchLinks,
  fetchSummary,
  fetchMainImage,
  fetchImages
};
