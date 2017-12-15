import React from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'

export default class CELHomeScreen extends React.Component<{
  navigation: any,
}, {
  firstValue: string,
  secondValue: string,
}> {

  constructor(props) {
    super(props)
    this.state = {
      firstValue: '',
      secondValue: '',
    }
  }

  render() {

    return (
      <View style={styles.container}>
        <Text>Hello World</Text>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => { this.updateStateWithText(text, 0) }}
        />
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => { this.updateStateWithText(text, 1) }}
        />
        <Button
          title="Details"
          onPress={() => this.props.navigation.navigate('Details', { ...this.state })}
          style={styles.buttonStyle}
        />
      </View>
    )
  }

  updateStateWithText(text, index) {
    if (index === 0) {
      this.setState({ firstValue: text })
    } else {
      this.setState({ secondValue: text })
    }

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
    marginTop: 20,
    paddingLeft: 10,
  },

  buttonStyle: {
    marginTop: 20,
  },
})
