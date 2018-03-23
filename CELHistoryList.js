import React from 'react'
import { FlatList } from 'react-native'
import PropTypes from 'prop-types'
import CELHistoryListItem from './CELHistoryListItem'
import axios from 'react-native-axios'

export default class CELHistoryList extends React.PureComponent {

  constructor(props) {
    super(props)
  }

  historyKeyExtractor = (item, index) => item._id || item

  onPressCELItem = (desti) => {
    this.props.onSelectDestination(desti)
  }

  renderCELItem = ({ item }) => (
    <CELHistoryListItem
      id={item._id}
      title={item.address}
      onPressItem={() => this.onPressCELItem(item.address)}
    />
  )

  render() {
    return (
      <FlatList
        data={this.props.data}
        renderItem={this.renderCELItem}
        keyExtractor={this.historyKeyExtractor}
      />
    )
  }
}

CELHistoryList.propTypes = {
  onSelectDestination: PropTypes.func.isRequired,
}
