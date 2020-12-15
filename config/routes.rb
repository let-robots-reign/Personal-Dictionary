Rails.application.routes.draw do
  devise_for :users
  root to: 'words#index'

  get 'update_language', to: 'words#update_language'
  get 'word_data', to: 'words#data_by_word'
  delete 'delete_words', to: 'words#delete_by_word'

  resources :words
end
