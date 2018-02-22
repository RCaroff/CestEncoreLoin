import React from 'react'
import { FlatList } from 'react-native'
import PropTypes from 'prop-types'
import CELHistoryListItem from './CELHistoryListItem'

export default class CELHistoryList extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      data : [{ key:'Marseille' }, { key:'Strasbourg' }, { key:'Rennes' }],
    }
  }

  onPressCELItem = (desti) => {
    this.props.onSelectDestination(desti)
  }

  renderCELItem = ({ item }) => (
    <CELHistoryListItem
      id={item.key}
      title={item.key}
      onPressItem={() => this.onPressCELItem(item.key)}
    />
  )

  render() {
    return (
      <FlatList
        data={this.state.data}
        extraData={this.state}
        renderItem={this.renderCELItem}
      />
    )
  }
}

CELHistoryList.propTypes = {
  onSelectDestination: PropTypes.func.isRequired,
}
