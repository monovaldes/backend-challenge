require 'rails_helper'

RSpec.describe Member, type: :model do
  it 'finds topic route' do
    [Header, Friendship, Member].each { |m| m.destroy_all }
    5.times do |i|
      m = Member.create(first_name: "#{i}_firstname", last_name: "#{i}_lastname", url: "#{i}dummyUrl")
      next if i.zero?

      Friendship.create(member_id: m.id, friend_id: m.id - 1)
    end
    Header.create(member: Member.last, header: 'this superTopic is powerful')
    expect Member.first.find_expert('superTopic')[:route].last.id == Member.last.id 
  end
end
