require 'application_system_test_case'

class WordsTest < ApplicationSystemTestCase
  include Devise::Test::IntegrationHelpers

  setup do
    @language = languages(:en)
    @word = words(:one)
    @user = users(:one)
    sign_in @user
    I18n.default_locale = :en
  end

  test 'visiting the index' do
    visit words_url
    assert_selector 'p.h1', text: I18n.t('your_dictionary')
    assert_selector 'a#add-word', text: I18n.t('add')
    find('.nav__expand').click
    assert_selector 'li', text: I18n.t('english'), class: 'nav__listitem-active'
    assert_selector 'li', text: I18n.t('spanish')
    assert_selector 'li', text: I18n.t('french')

    find('#spanish').click
    assert_selector 'li', text: I18n.t('spanish'), class: 'nav__listitem-active'

    find('#french').click
    assert_selector 'li', text: I18n.t('french'), class: 'nav__listitem-active'
  end

  test 'creating a Word' do
    visit words_url
    click_on I18n.t('add')

    fill_in I18n.t('word'), with: @word.word
    fill_in I18n.t('translation'), with: @word.translation
    fill_in I18n.t('synonyms'), with: @word.synonyms
    fill_in I18n.t('example'), with: @word.example
    click_on I18n.t('create')

    # asserting we are back to index
    assert_selector 'p.h1', text: I18n.t('your_dictionary')
  end

  test 'updating a Word' do
    visit words_url

    click_on I18n.t('add')

    fill_in I18n.t('word'), with: @word.word
    fill_in I18n.t('translation'), with: @word.translation
    fill_in I18n.t('synonyms'), with: @word.synonyms
    fill_in I18n.t('example'), with: @word.example
    click_on I18n.t('create')

    sleep(1)
    find('.edit-word svg').click
    fill_in I18n.t('word'), with: @word.word + " new"
    fill_in I18n.t('translation'), with: @word.translation + " new"
    fill_in I18n.t('synonyms'), with: ''
    fill_in I18n.t('example'), with: ''
    click_on I18n.t('update')

    # asserting we are back to index
    assert_selector 'p.h1', text: I18n.t('your_dictionary')
  end

  test 'destroying a Word' do
    visit words_url
    page.accept_confirm do
      find('a.delete-word').click
    end

    assert_text 'Word was successfully destroyed'
  end
end
