export const fetchPage = (title) => (
  $.ajax({
    url: `/api/pages/${title}`,
    method: 'GET'
  })
);

export const fetchPageRanks = titles => (
  $.ajax({
    url: '/api/page_ranks',
    method: 'POST',
    data: {
      titles
    }
  })
);
