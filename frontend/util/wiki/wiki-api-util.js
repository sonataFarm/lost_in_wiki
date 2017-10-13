import wiki from 'wikijs';
import { removeExtraneousLinks, extractLinks } from './helpers';
import Page from './page';

export const fetchLinks = title => (
  wiki().page(title)
    .then(page => page.html())
    .then(html => removeExtraneousLinks(html))
    .then(html => extractLinks(html))
);

export const fetchSummary = title => (
  wiki().page(title)
    .then(page => page.summary())
);

export const fetchMainImage = title => (
  wiki().page(title)
    .then(page => page.mainImage())
);

export const fetchImages = title => (
  wiki().page(title)
    .then(page => page.images())
);
