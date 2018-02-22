import React from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import CELHistoryList from './CELHistoryList'


export default class CELHomeScreen extends React.Component<{
  navigation: any,
}, {
  destinationAddress: string,
}> {

  constructor(props) {
    super(props)
    this.state = {
      destinationAddress: '',
    }
  }

  selectDestination = (destinationAddress) => {
    this.setState({ destinationAddress }, () => {
      console.log(`passed destination : ${destinationAddress} | drestinationAddress : ${this.state.destinationAddress}`)
      this.goToSelectedDestination()
    })
  }

  goToSelectedDestination = () => {
    this.props.navigation.navigate('Details', { ...this.state })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.labelStyle}>Enter your destination address</Text>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => { this.setState({ destinationAddress:text }) }}
        />
        <Button
          title="Go"
          onPress={() => this.goToSelectedDestination()}
          style={styles.buttonStyle}
        />
        <CELHistoryList
          onSelectDestination={desti => this.selectDestination(desti)}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  labelStyle: {
    marginTop: 30,
  },

  textInputStyle: {
    height: 30,
    width: 250,
    borderColor: '#ddd',
    borderWidth:1,
    marginTop: 20,
    paddingLeft: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomWidth: 2,
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  buttonStyle: {
    marginTop: 40,
  },
})
