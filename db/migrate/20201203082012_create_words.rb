class CreateWords < ActiveRecord::Migration[6.0]
  def change
    create_table :words do |t|
      t.string :word
      t.string :translation
      t.string :synonyms
      t.string :example

      t.timestamps
    end
  end
end
