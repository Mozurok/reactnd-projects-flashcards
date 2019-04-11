import React from 'react'
import { View, Platform, StatusBar, StyleSheet, Text } from 'react-native'
import { Constants } from 'expo'
import {white, gray} from "./utils/colors"
import { createBottomTabNavigator, createMaterialTopTabNavigator, createAppContainer, createStackNavigator  } from 'react-navigation'
import { setLocalNotification, clearLocalNotification } from './utils/helpers'
import DeckList from './components/DeckList'
import CreateDeck from './components/CreateDeck'
import DeckDetail from './components/DeckDetail'
import AddCard from './components/AddCard'
import DeckQuiz from './components/DeckQuiz'
import {FontAwesome, Ionicons} from '@expo/vector-icons'

function CustomStatusBar ({backgroundColor, ...props}) {
    return (
        <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
          <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
}

const RouteConfigs = {
    DeckList: {
        screen: DeckList,
        navigationOptions: {
            tabBarLabel: "Decks",
            tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
        }
    },
    AddDeck: {
        screen: CreateDeck,
        navigationOptions: {
            tabBarLabel: "Create Deck",
            tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
        }
    },
};

const TabNavigatorConfig = {
    navigationOptions: {
        header: null
    },
    tabBarOptions: {
        activeTintColor: Platform.OS === "ios" ? gray : white,
        style: {
            height: 56,
            backgroundColor: Platform.OS === "ios" ? white : gray,
            shadowColor: "rgba(0, 0, 0, 0.25)",
            shadowOffset: {
                width: 0,
                height: 3
            },
            shadowRadius: 6,
            shadowOpacity: 1
        }
    }
};

const TabsPure =
    Platform.OS === "ios"
        ? createBottomTabNavigator(RouteConfigs, TabNavigatorConfig)
        : createMaterialTopTabNavigator(RouteConfigs, TabNavigatorConfig);

const Tabs = createAppContainer(TabsPure)

const MainNavigatorPure = createStackNavigator({
    Home: {
        screen: Tabs,
        navigationOptions: {
            header: null
        }
    },
    DeckDetail: {
        screen: DeckDetail,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: gray,
            }
        }
    },
    DeckAddCard: {
        screen: AddCard,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: gray,
            }
        }
    },
    DeckQuiz: {
        screen: DeckQuiz,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: gray,
            }
        }
    }
})

const MainNavigator = createAppContainer(MainNavigatorPure)

export default class App extends React.Component {
    componentDidMount() {
      clearLocalNotification()
      setLocalNotification()
    }
  render() {
    return (
      <View style={styles.container}>
        <CustomStatusBar backgroundColor={gray} barStyle="light-content" />
        <MainNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});
