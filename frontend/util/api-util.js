import wiki from 'wikijs';
import { removeExtraneousLinks, extractLinks } from './helpers';

const getLinks = page => (
  // page is human-readable page title
  wiki().page(page)
    .then(page => page.html())
    .then(html => removeExtraneousLinks(html))
    .then(html => extractLinks(html))
);

export default {
  getLinks
};
