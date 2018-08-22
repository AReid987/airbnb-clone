class Api::V1:PlacesController < Api::V1::BaseController
  def index
    places = Place.search(search_params.to_h.symbolize_keys)
    respond_with places
  end

  private

  def search_params
    params.permit(:min_lng, :max_lng, :min_lat, :max_lat)
  end
end
