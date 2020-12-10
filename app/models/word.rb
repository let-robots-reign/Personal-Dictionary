class Word < ApplicationRecord
  validates :word, presence: true, uniqueness: true
  validates :translation, presence: true

  has_one :language
end
