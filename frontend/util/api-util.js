import wiki from 'wikijs';
import { removeListTags, extractLinks } from './helpers';

const getLinks = page => (
  wiki().page(page)
    .then(page => page.html())
    .then(html => removeListTags(html))
    .then(html => extractLinks(html))
);

export default {
  getLinks
};
