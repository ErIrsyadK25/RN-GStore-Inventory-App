import React, {useState, useEffect, Component} from 'react';
import {connect} from 'react-redux';
import {logout} from '../src//actions/users';

import {
  View,
  Text,
  AsyncStorage,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
// import {Button} from 'native-base';
import {withNavigation} from 'react-navigation';

export class Logout extends Component {
  static navigationOptions = {
    title: 'Logout',
  };
  async logout() {
    AsyncStorage.clear();
    await this.props.dispatch(logout());
    this.props.navigation.navigate('Login');
  }
  render() {
    return (
      <View>
        <Image
          source={require('../src/public/img/logout.png')}
          style={{
          width: "100%",
          height: "100%",
          alignItems: 'center',
          position: 'relative',
          }}
        />
        <Text style={{position: 'absolute', marginTop: 350, marginLeft: 80, color: '#fff', fontSize: 20}}>Are you sure to Logout?</Text>
        <TouchableOpacity
          onPress={() => this.logout()}
          style={{
            position: 'absolute',
            width: 70,
            height: 45,
            backgroundColor: '#0d9b10',
            borderRadius: 5,
            padding: 10,
            marginLeft: 80,
            marginTop: 400,
          }}>
          <Text style={{color: '#fff', fontSize: 15, marginLeft: 2}}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('ListProduct')}
          style={{
            position: 'absolute',
            width: 70,
            height: 45,
            backgroundColor: '#d8d8d8',
            borderRadius: 5,
            padding: 10,
            marginLeft: 160,
            marginTop: 400,
          }}>
          <Text style={{color: '#fff', fontSize: 15, marginLeft: 2}}>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
});

export default withNavigation(connect(mapStateToProps)(Logout));
