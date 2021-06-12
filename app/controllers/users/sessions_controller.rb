require 'jwt'
# Overrides devise's SessionsController to work as an API endpoint
class Users::SessionsController < Devise::SessionsController
    respond_to :json

    private

    def respond_with(resource, _opts = {})
        if resource.persisted?
            render json: { message: 'You are logged in.' }, status: :ok
        else
            render json: { message: 'Login Failed.' }, status: :unauthorized
        end
    end

    def respond_to_on_destroy
        log_out_success && return if current_user

        log_out_failure
    end

    def log_out_success
        render json: { message: 'You have been logged out.' }, status: :ok
    end

    def log_out_failure(resource, _opts = {})
        render json: { message: 'Logout has failed.' }, status: :unauthorized
    end
end