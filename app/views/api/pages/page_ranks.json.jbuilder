unless @errors
  json.array! @pages do |page|
    json.title page.title
    json.pageRank page.page_rank
  end
end
