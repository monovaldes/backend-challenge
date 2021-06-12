# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

urls = [
    "https://getbootstrap.com/docs/5.0/content/typography/",
    "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Location",
    "https://developer.mozilla.org/en-US/docs/Web",
    "https://developer.mozilla.org/en-US/docs/MDN/Contribute"
]

last_member = nil
urls.each_with_index do |url, idx|
    m = Member.create(first_name: "Name #{idx}", last_name: "Surname #{idx}", url: url)
    Friendship.create(member_id: m.id, friend_id: last_member.id) if last_member
    last_member = m
end