class Member < ApplicationRecord
    include HeaderParser
    before_create :set_slug

    def set_slug
        loop do
            self.url_slug = SecureRandom.hex(3)
            break unless Member.where(url_slug: url_slug).exists?
        end
    end

    def friends
        fs = Friendship
             .where("member_id = ? OR friend_id = ?", self.id, self.id)
             .pluck(:member_id, :friend_id).flatten - [self.id]
        Member.where(id: fs)
    end

    def non_friends
        Member.where.not(id: friends.ids)
    end

    def friend_count
        friends.count
    end

    def find_expert(topic)
        headers = Header.where("header LIKE '%#{topic}%'").where.not(member: self).where.not(member: self.friends)
        return nil unless headers.any?

        headers.map do |header|
            route = find_friend(header.member, [])
            if route
                route.shift
                {route: route.append(header.member), header: header} 
            end
        end.compact
    end

    def is_friend?(member)
        self.friends.include?(member)
    end

    # Recursive function to return route to author
    def find_friend(member, route)
        return nil if route.include?(self)

        r = route.dup.append(self)
        return r if is_friend?(member)

        friends.each do |f|
            found_route = f.find_friend(member, r)
            return found_route unless found_route.nil?
        end
        return nil
    end
end
