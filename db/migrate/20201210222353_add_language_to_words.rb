class AddLanguageToWords < ActiveRecord::Migration[6.0]
  def change
    add_column :words, :language_id, :integer
    add_foreign_key :words, :languages
  end
end
