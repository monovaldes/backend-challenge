Rails.application.routes.draw do
  get "short_url/:slug" => 'short_url#index'
  resources :friendships
  resources :members
  # Devise routes for authentication
  devise_for :users, controllers: {
    # Devise controllers overrides
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
end
