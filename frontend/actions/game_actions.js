export const UPDATE_CURRENT_PAGE = 'UPDATE_CURRENT_PAGE';
export const UPDATE_FOCUS_PAGE = 'UPDATE_FOCUS_PAGE';
export const updateCurrentPage = (pageTitle) => ({
  type: UPDATE_CURRENT_PAGE,
  pageTitle
});

export const updateFocusPage = (pageTitle) => ({
  type: UPDATE_FOCUS_PAGE,
  pageTitle
});
