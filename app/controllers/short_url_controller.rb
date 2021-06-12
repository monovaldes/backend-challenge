class ShortUrlController < ApplicationController
  def index
    url = Member.find_by(url_slug: params[:slug]).url
    redirect_to url
  end
end
