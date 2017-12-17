import React from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'

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

  render() {

    return (
      <View style={styles.container}>
        <Text>Enter your destination address</Text>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => { this.setState({ destinationAddress:text }) }}
        />
        <Button
          title="Go"
          onPress={() => this.props.navigation.navigate('Details', { ...this.state })}
          style={styles.buttonStyle}
        />
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
    width: 300,
    borderColor: 'black',
    borderWidth:1,
    marginTop: 20,
    paddingLeft: 10,
  },

  buttonStyle: {
    marginTop: 20,
  },
})
