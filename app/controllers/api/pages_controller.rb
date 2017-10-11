class Api::PagesController < ApplicationController

  def show
    @page = Page.find_by(name: params[:name])
    if @page
      render "api/pages/show"
    else
      @errors = ["Cannot find page with name #{params[:name]}"]
      render "api/pages/show", status: 404
    end
  end
end
