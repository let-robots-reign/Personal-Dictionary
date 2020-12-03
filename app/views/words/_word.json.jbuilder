json.extract! word, :id, :word, :translation, :synonyms, :example, :created_at, :updated_at
json.url word_url(word, format: :json)
