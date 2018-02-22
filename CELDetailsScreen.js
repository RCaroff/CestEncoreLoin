import React from 'react'
import { StyleSheet, Text, View, ProgressViewIOS } from 'react-native'
import { Location, Permissions } from 'expo'
import axios from 'react-native-axios'

// Google API Key : AIzaSyC4OtTByJFi4bsonK7kB4MjJJThrmncc-s

export default class CELHomeScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      startingCoordinates: {
        lat: null,
        lng: null,
      },
      currentCoordinates: {
        lat: 0,
        lng: 0,
      },
      destinationCoords: {
        lat: 0,
        lng: 0,
      },
      distance: '',
      duration: '',

      totalDistanceValue: null,
      currentDistanceValue: 0,
      progressValue: 0,
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
    Location.watchPositionAsync({ enableHighAccuracy: true }, (callback) => {
      const { latitude, longitude } = callback.coords
      console.log(`watchPositionAsync = ${callback.coords}`)
      console.log(`watchPositionAsync = ${latitude}, ${longitude}`)
      if (this.state.startingCoordinates.lat === null) {
        this.setState({ startingCoordinates: {
          lat: latitude,
          lng: longitude,
        } })
      }
      this.setState({ currentCoordinates: {
        lat: latitude,
        lng: longitude,
      } })
      this.getGeocode(this.props.navigation.state.params.destinationAddress)
    })

  }

  getGeocode(address) {
    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address,
        key: 'AIzaSyC4OtTByJFi4bsonK7kB4MjJJThrmncc-s',
      },
    })
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
        origins: `${this.state.currentCoordinates.lat},${this.state.currentCoordinates.lng}`,
        destinations: `${this.state.destinationCoords.lat},${this.state.destinationCoords.lng}`,
        language: 'fr',
        key: 'AIzaSyC4OtTByJFi4bsonK7kB4MjJJThrmncc-s',
      },
    })
      .then((response) => {
        console.log(response)
        const { distance, duration } = response.data.rows[0].elements[0]
        if (this.state.totalDistanceValue === null) {
          this.setState({
            totalDistanceValue: distance.value,
          })
        }
        this.setState({
          distance: distance.text,
          duration: duration.text,
          currentDistanceValue: distance.value,
        })
        this.getProgressValue()
      })
      .catch((error) => {
        console.log(`error getting distance and time : ${error}`)
      })
  }

  getProgressValue() {
    const value = (this.state.totalDistanceValue - this.state.currentDistanceValue) / this.state.currentDistanceValue
    this.setState({
      progressValue: value,
    })
  }

  render() {
    // const { params } = this.props.navigation.state
    return (
      <View style={styles.container}>
        <Text style={styles.durationTitleLabel}>Temps restant</Text>
        <Text style={styles.durationLabel}>{`${this.state.duration}`}</Text>
        <Text style={styles.distanceTitleLabel}>Distance restante</Text>
        <Text style={styles.distanceLabel}>{`${this.state.distance}`}</Text>
        <ProgressViewIOS style={styles.progressBarStyle} trackTintColor="#eaf7f1" progressTintColor="#2fb675" progress={this.state.progressValue} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  durationTitleLabel: {
    marginTop: 40,
  },

  durationLabel: {
    fontSize: 20,
    color: '#444',
  },

  distanceTitleLabel: {
    marginTop: 20,
  },

  distanceLabel: {
    fontSize: 20,
    color: '#444',
  },

  progressBarStyle: {
    width: 280,
    marginTop: 40,
  },
})
