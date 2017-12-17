import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Location, Permissions } from 'expo'
import axios from 'react-native-axios'

// Google API Key : AIzaSyC4OtTByJFi4bsonK7kB4MjJJThrmncc-s

export default class CELHomeScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      coords: {
        latitude: 0,
        longitude: 0,
      },
      destinationCoords: {
        lat: 0,
        lng: 0,
      },
      distance: '',
      duration: '',
    }
  }

  componentWillMount() {
    this.getCurrentLocation()
  }

  getCurrentLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      return
    }
    Location.watchPositionAsync({ enableHighAccuracy: true }, ({ coords }) => {
      this.setState({ coords })
      this.getGeocode(this.props.navigation.state.params.destinationAddress)
    })

  }

  getGeocode(address) {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyC4OtTByJFi4bsonK7kB4MjJJThrmncc-s`)
      .then((response) => {
        console.log(response)
        const destLoc = response.data.results[0].geometry.location
        console.log(`destinationCoords : ${destLoc.lat}, ${destLoc.lng}`)
        this.setState({
          destinationCoords : response.data.results[0].geometry.location,
        })
        this.getDistanceAndTime()
      }).catch((error) => { // catch is called after then
        console.log(error)
        // this.setState({ error: error.message })
      })
  }

  getDistanceAndTime() {
    axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', {
      params: {
        units: 'metric',
        origins: `${this.state.coords.latitude},${this.state.coords.longitude}`,
        destinations: `${this.state.destinationCoords.lat},${this.state.destinationCoords.lng}`,
        language: 'fr',
        key: 'AIzaSyC4OtTByJFi4bsonK7kB4MjJJThrmncc-s',
      },
    })
      .then((response) => {
        console.log(response)
        const { distance, duration } = response.data.rows[0].elements[0]
        this.setState({
          distance: distance.text,
          duration: duration.text,
        })
      })
      .catch((error) => {
        console.log(`error getting distance and time : ${error}`)
      })
  }

  render() {
    // const { params } = this.props.navigation.state
    const { coords } = this.state
    const { destinationCoords } = this.state
    return (

      <View style={styles.container}>
        <Text>{coords ? `Votre position : ${coords.latitude}, ${coords.longitude}` : 'Pas de GPS'}</Text>
        <Text>{destinationCoords ? `Votre destination : ${destinationCoords.lat}, ${destinationCoords.lng}` : 'Destination non trouvée'}</Text>
        <Text>{`Temps restant : ${this.state.duration}`}</Text>
        <Text>{`Distance restante : ${this.state.distance}`}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
