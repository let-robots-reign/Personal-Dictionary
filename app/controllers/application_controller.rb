class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action do
    I18n.locale = cookies[:locale] || I18n.default_locale
  end
end
