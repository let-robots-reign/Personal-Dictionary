require 'test_helper'

class WordsControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    @language = languages(:en)
    @word = words(:one)
    @user = users(:one)
    sign_in @user
  end

  test 'should get index' do
    get words_url
    assert_response :success
  end

  test 'should be redirected without login' do
    logout
    get new_word_url
    assert_redirected_to '/users/sign_in'

    get edit_word_url(@word)
    assert_redirected_to '/users/sign_in'

    delete word_url(@word)
    assert_redirected_to '/users/sign_in'

    get update_language_url(@language)
    assert_response 401

  end

  test 'should get new' do
    get new_word_url
    assert_response :success
  end

  test 'should create word' do
    assert_difference('Word.count') do
      post words_url, params: { word: { example: @word.example, synonyms: @word.synonyms,
                                        translation: @word.translation, word: @word.word } }
    end

    assert_includes @response.redirect_url, 'http://www.example.com/?notice='
  end

  test 'should show word' do
    get word_url(@word)
    assert_response :success
  end

  test 'should get edit' do
    get edit_word_url(@word)
    assert_response :success
  end

  test 'should update word' do
    patch word_url(@word), params: { word: { example: @word.example, synonyms: @word.synonyms, translation: @word.translation, word: @word.word } }
    assert_response :redirect
    assert_includes @response.redirect_url, 'http://www.example.com/?notice='
  end

  test 'should destroy word' do
    assert_difference('Word.count', -1) do
      delete word_url(@word)
    end

    assert_redirected_to words_url
  end
end
