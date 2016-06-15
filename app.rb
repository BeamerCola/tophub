require 'sinatra'
require 'sprockets'
require 'uglifier'
require 'sass'

class TopHub < Sinatra::Base
  set :environment, Sprockets::Environment.new

  # append assets paths
  environment.append_path "assets/stylesheets"
  environment.append_path "assets/javascripts"
  environment.append_path "bower_components"

  # compress assets
  environment.js_compressor  = :uglify
  environment.css_compressor = :scss

  get "/assets/*" do
    env["PATH_INFO"].sub!("/assets", "")
    settings.environment.call(env)
  end

  get "/" do
    erb :index, layout: :application
  end

end
