import React, {Component} from 'react';
import axios from 'axios';
import {Image, StyleSheet, Text, View, FlatList} from 'react-native';
import {Card, ListItem, Button, Icon} from 'react-native-elements';
import {TabNavigator} from 'react-navigation';
// import Icon from 'react-native-ionicons';
import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import Rpm from 'redux-promise-middleware';
import reducer from './src/reducers/index';
import {Provider} from 'react-redux';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import AddProduct from './screens/AddProduct';
import ListProduct from './screens/ListProduct';
import ProductById from './components/ProductById';
import {createBottomTabNavigator, BottomTabBar} from 'react-navigation-tabs';
import Settings_Activity from './screens/Settings_Activity';
import EditProduct from './components/EditProduct';
import DeleteProduct from './components/DeleteProduct';
import Login from './components/Login';
import LoadingScreen from './components/LoadingScreen';
import Logout from './components/Profile';
import Register from './components/Register';
import Categories from './components/Categories';
import AddCategory from './components/AddCategory';
import CategoryById from './components/CategoryById';
import EditCategory from './components/EditCategory';
// import MainApp from './screens/footer/footer';

const logger = createLogger();

// import Routes from './Routes';

// axios.defaults.baseURL = 'http://192.168.1.18:4000';
const store = createStore(reducer, applyMiddleware(logger, Rpm));

const Routes = createStackNavigator(
  {
    ProductById,
    AddProduct,
    ListProduct,
    Settings_Activity,
    EditProduct,
    DeleteProduct,
    AddCategory,
    CategoryById,
    EditCategory,
  },
  {
    initialRouteName: 'ListProduct',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const MainNavigator = createBottomTabNavigator(
  {
    Products: Routes,
    AddProduct,
    Categories,
    Logout,
  },
  {
    initialRouteName: 'Products',
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        if (routeName === 'Products') {
          return (
            <Icon
              name="home"
              // source={require('./src/public/icon/home.png')}
              style={{
                width: 30,
                height: 30,
              }}
              // color="blue"
            />
          );
        }
        if (routeName === 'AddProduct') {
          return (
            <Icon
              name="add-circle-outline"
              // source={require('./src/public/icon/home.png')}
              style={{
                width: 30,
                height: 30,
              }}
              // color="blue"
            />
          );
        }
        if (routeName === 'Categories') {
          return <Icon name="whatshot" style={{width: 30, height: 30}} />;
        } else {
          return <Icon name="power" style={{width: 30, height: 30}} />;
        }
      },
    }),
    tabBarOptions: {
      activeTintColor: '#04D361',
      inactiveTintColor: '#263238',
      style: {
        backgroundColor: '#fff',
      },
    },
  },
);

const AuthNavigator = createSwitchNavigator(
  {
    LoadingScreen,
    Login,
    Register,
    App: MainNavigator,
  },
  {
    initialRouteName: 'LoadingScreen',
  },
);

const Navigation = createAppContainer(AuthNavigator);

const App = props => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
  // }
};
export default App;
