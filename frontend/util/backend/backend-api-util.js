export const fetchPage = (title) => (
  $.ajax({
    url: `/api/pages/${title}`,
    method: 'GET'
  })
);

export const fetchPageRanks = titles => (
  $.ajax({
    url: '/api/pages/page_ranks',
    method: 'GET',
    data: {
      titles
    }
  })
);
