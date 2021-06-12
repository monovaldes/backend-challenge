# Overrides devise's RegistrationsController to work as an API endpoint
class Users::RegistrationsController < Devise::RegistrationsController
    respond_to :json

    private

    def respond_with(resource, _opts = {})
        register_success && return if resource.persisted?

        register_failure
    end

    def register_success
        render json: { message: 'You have been registered.' }, status: :ok
    end

    def register_failure(resource, _opts = {})
        render json: { message: 'Registration has failed.' }, status: :conflict
    end
end