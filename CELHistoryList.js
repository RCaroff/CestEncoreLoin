import React from 'react'
import { FlatList } from 'react-native'
import PropTypes from 'prop-types'
import CELHistoryListItem from './CELHistoryListItem'
import axios from 'react-native-axios'

export default class CELHistoryList extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      history: [],
    }
  }

  historyKeyExtractor = (item, index) => item.destination

  componentWillMount() {
    this.getHistory()
  }

  getHistory = () => {
    axios.get('http://localhost:1337')
      .then((response) => {
        console.log(`destination response : ${JSON.stringify(response)}`)
        this.setState({ history:response.data.history })
      })
  }

  onPressCELItem = (desti) => {
    this.props.onSelectDestination(desti)
  }

  renderCELItem = ({ item }) => (
    <CELHistoryListItem
      id={item.destination}
      title={item.destination}
      onPressItem={() => this.onPressCELItem(item.destination)}
    />
  )

  render() {
    return (
      <FlatList
        data={this.state.history}
        extraData={this.state}
        renderItem={this.renderCELItem}
        keyExtractor={this.historyKeyExtractor}
      />
    )
  }
}

CELHistoryList.propTypes = {
  onSelectDestination: PropTypes.func.isRequired,
}
