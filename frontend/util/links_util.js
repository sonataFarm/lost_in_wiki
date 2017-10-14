export const findUsableLinks = (pagesSlice, title, difficulty) => {
  //Returns an array of page titles of links the player is allowed
  //to use.
  Object.freeze(pagesSlice);
  const allLinks = pagesSlice[title].links;
  let newLinks = allLinks.filter( (link) => (
    pagesSlice[link] && pagesSlice[link].pageRank < difficulty
  ));
  newLinks.sort(
    (a, b) => (pagesSlice[a].pageRank - pagesSlice[b].pageRank)
  );
  //30 is arbitrary placeholder variable here
  return newLinks.slice(0, 30);
};
