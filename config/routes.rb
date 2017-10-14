Rails.application.routes.draw do

  root 'static_pages#root'
  namespace :api, defaults: {format: :json} do
    post '/page_ranks', to: 'pages#page_ranks'
    get '/pages/:title', to: 'pages#show'
  end
  get '*path', to: 'static_pages#root'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html


end
