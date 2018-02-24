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

  historyKeyExtractor = (item, index) => item._id

  componentWillMount() {
    this.getHistory()
  }

  getHistory = () => {
    axios.get('http://localhost:1337/api/history')
      .then((response) => {
        console.log(`destination response : ${JSON.stringify(response.data)}`)
        console.log(`address of first : ${response.data.history[0].address}`)
        console.log(`history after filtering : ${JSON.stringify(response.data.history)}`)
        this.setState({history: response.data.history})
      })
      .catch((err) => {
        console.log(err)
      })
  }

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
