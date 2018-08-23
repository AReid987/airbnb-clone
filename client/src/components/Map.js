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
      <PlaceMarker lat={30.2672}
                   lng={97.7431}
                   description={'Description'}
                   name={'Hotel'}
                   price={'10'} />
      ))
    }
  </GoogleMap>
));

export class Map extends Component {
  constructor(props) {
    super(props)

    this.zoom = 7

    this.state = {
      lat: 30.2672,
      lng: 97.7431
    }
  }

  render(){
    const { lat, lng } = this.state
    const places = [<PlaceMarker lat={lat} lng={lng} price={20} name={"hotel"} description={"hotel description"} />]

    return(
      <div style={{width: `750px`, height: `750px`}}>
        <AirbnbMap
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
