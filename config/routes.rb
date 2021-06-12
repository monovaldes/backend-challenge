Rails.application.routes.draw do
  # Devise routes for authentication
  devise_for :users, controllers: {
    # Devise controllers overrides
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
end
