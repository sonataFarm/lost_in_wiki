export const findUsableLinks = (pagesSlice, title, maxPageRank, numLinks) => {
  //Returns an array of page titles of links the player is allowed
  //to use.
  Object.freeze(pagesSlice);
  const allLinks = pagesSlice[title].links;
  let newLinks = allLinks.filter( (link) => (
    pagesSlice[link] && pagesSlice[link].pageRank < maxPageRank
  ));
  newLinks.sort(
    (a, b) => (pagesSlice[a].pageRank - pagesSlice[b].pageRank)
  );
  return newLinks.slice(0, numLinks);
};
