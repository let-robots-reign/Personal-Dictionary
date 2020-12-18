class AddUserToWords < ActiveRecord::Migration[6.0]
  def change
    add_column :words, :user_id, :integer
    add_foreign_key :words, :users
  end
end
