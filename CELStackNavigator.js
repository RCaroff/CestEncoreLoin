import { StackNavigator } from 'react-navigation'
import CELDetailsScreen from './CELDetailsScreen'
import CELHomeScreen from './CELHomeScreen'


export default StackNavigator({
  Home: {
    screen: CELHomeScreen,
  },
  Details: {
    screen: CELDetailsScreen,
  },
})
