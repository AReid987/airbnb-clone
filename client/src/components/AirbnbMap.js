import React, { Component } from 'react'
import { withGoogleMap, GoogleMap } from 'react-google-maps'
import { PlaceMarker } from './PlaceMarker'

export const AirbnbMap = withGoogleMap(props => (
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

export default AirbnbMap
