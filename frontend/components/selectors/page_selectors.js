export const getAllLinks = (pages) => {
  let links = [];
  pages.forEach( (page) => {
    links = links.concat(page.links);
  });
};
