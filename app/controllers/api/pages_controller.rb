class Api::PagesController < ApplicationController

  def show
    @page = Page.find_by(title: params[:title])
    if @page
      render "api/pages/show"
    else
      @errors = ["Cannot find page with name #{params[:title]}"]
      render "api/pages/show", status: 404
    end
  end
end
