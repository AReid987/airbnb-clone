# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

#30.2672 97.7431

center_point = { lat: 30.2672, lng: 97.7431 }

1.upto(1000) do |i|
  Place.create!(
    name: Faker::Address.city,
    description: Faker::Lorem.paragraph(8),
    longitude: center_point[:lng] + rand(-10.00..10.00),
    latitude: center_point[:lat] + rand(-10.00..10.00),
    price: rand(1..500)
  )
end
