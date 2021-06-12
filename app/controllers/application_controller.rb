class ApplicationController < ActionController::API
    rescue_from ActionController::ParameterMissing do |e|
        render json: { error: 'Some paramenters are missing, please refer to official challenge documentation' }, status: :bad_request
    end
    rescue_from ActiveRecord::RecordNotFound do |e|
        render json: { error: 'What you are looking for is not here' }, status: :not_found
    end
end
