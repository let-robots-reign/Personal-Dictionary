class Word < ApplicationRecord
  validates :word, presence: true, uniqueness: { scope: :user_id }
  validates :translation, presence: true

  has_one :language
end
