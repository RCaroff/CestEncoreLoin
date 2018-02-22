import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

export default class CELHistoryListItem extends React.PureComponent<{
  onPressItem: any
}> {
  onPress = () => {
    this.props.onPressItem(this.props.title)
  };

  render() {
    const textColor = this.props.selected ? 'red' : 'black'
    return (
      <TouchableOpacity onPress={() => this.onPress()}>
        <View>
          <Text style={{ color : textColor }}>
            {this.props.title}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}
