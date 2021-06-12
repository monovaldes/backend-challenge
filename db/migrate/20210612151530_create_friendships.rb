class CreateFriendships < ActiveRecord::Migration[5.1]
  def change
    create_table :friendships do |t|
      t.references :member, foreign_key: true
      t.integer :friend_id, foreign_key: {to_table: :members}

      t.timestamps
    end
  end
end
