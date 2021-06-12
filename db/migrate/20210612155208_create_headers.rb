class CreateHeaders < ActiveRecord::Migration[5.1]
  def change
    create_table :headers do |t|
      t.references :member, foreign_key: true
      t.text :header

      t.timestamps
    end
  end
end
