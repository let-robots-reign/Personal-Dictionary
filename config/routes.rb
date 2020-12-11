Rails.application.routes.draw do
  devise_for :users
  root to: 'words#index'

  get 'update_language', to: 'words#update_language'

  resources :words
end
