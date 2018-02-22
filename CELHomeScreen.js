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
        <Text style={styles.labelStyle}>Enter your destination address</Text>
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
