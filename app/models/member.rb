class Member < ApplicationRecord
    include HeaderParser
    before_create :set_slug

    def set_slug
        loop do
            self.url_slug = SecureRandom.hex(3)
            break unless Member.where(url_slug: url_slug).exists?
        end
    end
end
