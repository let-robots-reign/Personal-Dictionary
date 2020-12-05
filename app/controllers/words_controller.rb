class WordsController < ApplicationController
  before_action :set_word, only: %i[show edit update destroy]

  # GET /words
  # GET /words.json
  def index
    @words = Word.all
  end

  # GET /words/1
  # GET /words/1.json
  def show
  end

  # GET /words/new
  def new
    @word = Word.new
  end

  # GET /words/1/edit
  def edit
  end

  # POST /words
  # POST /words.json
  def create
    params = fill_optional_fields(word_params)
    @word = Word.new(params)

    respond_to do |format|
      if @word.save
        format.html { redirect_to action: 'index', notice: 'Word was successfully created.' }
        format.json { render :show, status: :created, location: @word }
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

  private

  def set_word
    @word = Word.find(params[:id])
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
