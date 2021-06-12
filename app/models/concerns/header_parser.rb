require 'nokogiri'
require 'faraday'

module HeaderParser
    extend ActiveSupport::Concern
    included do
        validate :check_site
        after_save :add_headers
    end

    def check_site
        return if Rails.env.test?
        response = Faraday.get self.url
    rescue
        self.errors.add :url, 'The URL you provided cannot be reached'
    end

    def add_headers
        return if Rails.env.test?

        response = Faraday.get self.url
        doc = Nokogiri::HTML::DocumentFragment.parse(response.body)
        doc.css('h1, h2, h3, h4').each do |text|
            Header.create(member: self, header: text.text)
        end
    rescue
        self.errors.add :url, 'The URL you provided cannot be parsed'
    end
end