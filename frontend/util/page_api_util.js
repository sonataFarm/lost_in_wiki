export const fetchPage = (title) => (
  $.ajax({
    url: `/api/pages/${title}`,
    method: 'GET'
  })
);
