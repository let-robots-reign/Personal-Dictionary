class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action do
    I18n.locale = :ru # Or whatever logic you use to choose.
  end
end
