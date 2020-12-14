class WordsController < ApplicationController
  ENGLISH_LANG_CODE = 1
  SPANISH_LANG_CODE = 2
  FRENCH_LANG_CODE = 3

  before_action :set_word, only: %i[show edit update destroy]
  before_action :authenticate_user!, only: %i[new show create update destroy edit]
  before_action :set_language, only: %i[create index]
  # GET /words
  # GET /words.json
  def index
    p "INDEX #{@current_language}"
    if current_user
      @words = Word.where(language_id: @current_language, user_id: current_user.id).order('created_at DESC')
    else
      @words = []
    end
  end

  # GET /words/1
  # GET /words/1.json
  def show; end

  # GET /words/new
  def new
    @word = Word.new
  end

  # GET /words/1/edit
  def edit; end

  # POST /words
  # POST /words.json
  def create
    params = fill_optional_fields(word_params)
    @word = Word.new(params.merge({ language_id: @current_language, user_id: current_user.id }))

    respond_to do |format|
      if @word.save
        format.html { redirect_to action: 'index', notice: 'Word was successfully created.' }
        format.json { render :index, status: :created, location: @word }
      else
        format.html { render :new }
        format.json { render json: @word.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /words/1
  # PATCH/PUT /words/1.json
  def update
    respond_to do |format|
      params = fill_optional_fields(word_params)
      if @word.update(params)
        format.html { redirect_to action: 'index', notice: 'Word was successfully updated.' }
        format.json { render :show, status: :ok, location: @word }
      else
        format.html { render :edit }
        format.json { render json: @word.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /words/1
  # DELETE /words/1.json
  def destroy
    @word.destroy
    respond_to do |format|
      format.js
      format.html { redirect_to words_url, notice: 'Word was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def update_language
    cookies[:current_language] = params[:current_language]
    p "UPDATE: #{cookies[:current_language]}"
    respond_to do |format|
      format.json { render json: { status: 'success' } }
    end
  end

  private

  def set_word
    @word = Word.find(params[:id])
  end

  def set_language
    p "SET: #{cookies[:current_language] || ENGLISH_LANG_CODE}"
    @current_language = cookies[:current_language] || ENGLISH_LANG_CODE
  end

  def word_params
    params.require(:word).permit(:word, :translation, :synonyms, :example)
  end

  def fill_optional_fields(params)
    params[:synonyms] = '-' if params[:synonyms].eql?('')
    params[:example] = '-' if params[:example].eql?('')
    params
  end
end
