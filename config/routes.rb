Rails.application.routes.draw do

  root 'static_pages#root'
  get '*path', to: 'static_pages#root'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: {format: :json} do
    resources :pages, only: [:show]
  end

end
