json.extract! @page, :id, :title, :page_rank unless @errors

json.array! @errors if @errors
