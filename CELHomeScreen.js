import React from 'react'
import { StyleSheet, Text, View, TextInput, Button, Dimensions } from 'react-native'
import CELHistoryList from './CELHistoryList'
import axios from 'react-native-axios'

export default class CELHomeScreen extends React.Component<{
  navigation: any,
}, {
  destinationAddress: string,
}> {

  constructor(props) {
    super(props)
    this.state = {
      destinationAddress: '',
      history: [],
    }
  }

  componentWillMount() {
    this.getHistory()
  }

  postDestination = (callback) => {
    axios.post('http://localhost:1337/api/history', {
      params: {
        address: this.state.destinationAddress,
      },
    })
      .then((response) => {
        const newCity = {
          _id: response.data.destination,
          address: response.data.destination,
        }

        this.setState({ history: [...this.state.history, newCity] })
        callback(true)
      })
      .catch((err) => {
        console.log(err)
        callback(false)
      })
  }

  selectDestination = (destinationAddress) => {
    this.setState({ destinationAddress }, () => {
      console.log(`passed destination : ${destinationAddress} | destinationAddress : ${this.state.destinationAddress}`)
      this.goToSelectedDestination()
    })
  }

  goToSelectedDestination = () => {
    this.postDestination((success) => {
      if (success) {
        this.props.navigation.navigate('Details', { ...this.state })
        this.textInput.clear()
      }
    })
  }

  getHistory = () => {
    axios.get('http://localhost:1337/api/history')
      .then((response) => {
        console.log(`destination response : ${JSON.stringify(response.data)}`)
        console.log(`address of first : ${response.data.history[0].address}`)
        console.log(`history after filtering : ${JSON.stringify(response.data.history)}`)
        this.setState({ history: response.data.history })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.labelStyle}>
          <Text style={[styles.subtitle, styles.center]}>
          Enter your destination address
          </Text>
        </View>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => { this.setState({ destinationAddress:text }) }}
          ref={(input) => { this.textInput = input }}
        />
        <Button
          title="Go"
          onPress={() => this.goToSelectedDestination()}
          style={styles.buttonStyle}
        />
        <View style={[styles.labelStyle]}>
          <Text style={styles.subtitle}>
            History :
          </Text>
        </View>
        <CELHistoryList
          onSelectDestination={desti => this.selectDestination(desti)}
          data={this.state.history}
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

  center: {
    textAlign: 'center',
  },

  labelStyle: {
    marginTop: 30,
    width: Dimensions.get('window').width * 0.8,
  },

  subtitle: {
    fontSize: 16,
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
