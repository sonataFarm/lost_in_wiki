export const removeExtraneousLinks = htmlString => (
  removeAnchorLinks(removeImageLinks(removeLists(htmlString)))
);

export const extractLinks = htmlString => {
  // extract all outlinks from a wikipedia html source string
  const regex = /href="\/wiki\/([^"]+)"/g;

  const links = [];
  let matches;

  while(matches = regex.exec(htmlString)) {
    links.push(matches[1]);
  }

  return links;
}

const removeLists = htmlString => {
  // remove all list tags and their children from an html string
  const source = document.implementation.createHTMLDocument();
  source.write(htmlString);

  const lists = source.querySelectorAll('ul,ol');
  for (let i = 0; i < lists.length; i++) {
    let list = lists[i];
    list.parentElement.removeChild(list);
  }

  return source.documentElement.innerHTML;
};

const removeImageLinks = htmlString => {
  const regex = /<a href=".*\.(jpg|jpeg|png|gif|svg)"[^>]*>/g;
  return htmlString.replace(regex, "");
}

const removeAnchorLinks = htmlString => {
  const regex = /<a href="[^>]*#[^>]*>/g;
  return htmlString.replace(regex, "");
}
