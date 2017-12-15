import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Location, Permissions } from 'expo'

export default class CELHomeScreen extends React.Component<void, {
  coords?: {
    latitude: number,
    longitude: number,
  },
}> {

  state = {}

  componentWillMount() {
    this.getLocation()
  }

  getLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      return
    }
    Location.watchPositionAsync({ enableHighAccuracy: true }, ({ coords }) => {
      this.setState({ coords })
    })

  }

  render() {
    // const { params } = this.props.navigation.state
    const { coords } = this.state
    return (

      <View style={styles.container}>
        <Text>{coords ? `${coords.latitude} : ${coords.longitude} : ${coords.heading}` : 'Pas de GPS'}</Text>
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

  textInputStyle: {
    height: 30,
    width: 200,
    borderColor: 'black',
    borderWidth:1,
    paddingTop: 20,
  },
})
