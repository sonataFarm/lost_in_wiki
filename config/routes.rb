Rails.application.routes.draw do

  root 'static_pages#root'
  namespace :api, defaults: {format: :json} do
    get '/pages/:title', to: 'pages#show'
    get '/pages/page_ranks', to: 'pages#page_ranks'
  end
  get '*path', to: 'static_pages#root'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html


end
