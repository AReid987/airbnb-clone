import React, { Component } from 'react'
import { withGoogleMap, GoogleMap } from 'react-google-maps'
import { PlaceMarker } from './PlaceMarker'

const AirbnbMap = withGoogleMap(props => (
  <GoogleMap
  ref={props.onMapMounted}
    onZoomChanged={props.handleMapChanged}
    onDragEnds={props.handleMapChanged}
    onBoundsChanged={props.handleMapFullyLoaded}
    defaultCenter={props.center}
    defaultZoom={props.zoom} >
    {props.places.length > 0 && props.places.map(place => (
      <PlaceMarker key={`place${place.id}`}
                     id={place.id}
                     lat={place.latitude}
                     lng={place.longitude}
                     description={place.description}
                     name={place.name}
                     price={place.price} />
      ))
    }
  </GoogleMap>
));

export class Map extends Component {
  constructor(props) {
    super(props)

    this.xMapBounds = { min: null, max: null }
    this.yMapBounds = { min: null, max: null }

    this.mapFullyLoaded = false
    this.zoom = 7

    this.state = {
      places: [],
      lat: 30.2672,
      lng: 97.7431
    }
  }

  handleMapChanged() {
    this.getMapBounds()
    this.setMapCenterPoint()
    this.fetchPlacesFromApi()
  }

  handleMapMounted(map) {
    this.map = map
  }

  handleMapFullyLoaded() {
    if (this.mapFullyLoaded)
      return

    this.mapFullyLoaded = true
    this.handleMapChanged()
  }

  setMapCenterPoint() {
    this.setState({
      lat: this.map.getCenter().lat(),
      lng: this.map.getCenter().lng()
    })
  }

  fetchPlacesFromApi() {
    this.setState({ places: [] })

    fetch(`/api/places?min_lng=${this.xMapBounds.min}&max_lng=${this.xMapBounds.max}&min_lat=${this.yMapBounds.min}&max_lat=${this.yMapBounds.max}`,
      { method: 'GET' })
      .then((response) => response.json())
      .then((response) => this.setState({ places: response }))
  }

  getMapBounds() {
    let mapBounds = this.map.getBounds()
    let xMapBounds = mapBounds.b
    let yMapBounds = mapBounds.f

    this.xMapBounds.min = xMapBounds.b
    this.xMapBounds.max = xMapBounds.f

    this.yMapBounds.min = yMapBounds.f
    this.yMapBounds.max = yMapBounds.b
  }

  render(){
    const { lat, lng } = this.state
    const places = [<PlaceMarker lat={lat} lng={lng} price={20} name={"hotel"} description={"hotel description"} />]

    return(
      <div style={{width: `750px`, height: `750px`}}>
        <ul>
          <li>lng: {lng}</li>
          <li>lat: {lat}</li>
          <li>xMapBounds.min: {this.xMapBounds.min}</li>
          <li>xMapBounds.max: {this.xMapBounds.max}</li>
          <li>yMapBounds.min: {this.yMapBounds.min}</li>
          <li>yMapBounds.max: {this.yMapBounds.max}</li>
        </ul>
        <AirbnbMap
          onMapMounted={this.handleMapMounted.bind(this)}
          handleMapChanged={this.handleMapChanged.bind(this)}
          handleMapFullyLoaded={this.handleMapFullyLoaded.bind(this)}
          center={{
            lat: lat,
            lng: lng
          }}
          zoom={this.zoom}
          containerElement={
            <div style={{ height: `100%` }} />
          }
          mapElement={
            <div style={{ height: `100%` }} />
          }
          places={places}
        />
      </div>
    );
  }
}

export default Map;
