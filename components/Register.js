import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  TextInput,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  Platform,
  Image,
  AsyncStorage,
} from 'react-native';
import {withNavigation} from 'react-navigation';

// import {AsyncStorage} from '@react-native-community/async-storage';

import {register} from '../src/actions/users';
import {connect} from 'react-redux';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export class Register extends Component {
  state = {
    full_name: '',
    email: '',
    password: '',
    // token: '',
  };

  handlerSubmit = async () => {
    if (!this.state.full_name || !this.state.email || !this.state.password) {
      alert('Required fields. Please try again!');
    } else {
      await this.props.dispatch(register(this.state));
      alert('Sign Up Successful!');
      this.props.navigation.navigate('Login');
    }
  };


  render() {
    return (
      <View style={styles.container}>
      <Image style={styles.productImage} source={require('../src/assets/images/splash_logo.png')} />
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Full Name"
          name="full_name"
          required
          onChangeText={full_name => this.setState({full_name})}
        />

        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Email"
          name="email"
          required
          onChangeText={email => this.setState({email})}
        />

        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Password"
          required
          secureTextEntry
          name="password"
          onChangeText={password => this.setState({password})}
        />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => this.handlerSubmit()}>
          <Text style={styles.submitButtonText}> Register </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => this.props.navigation.navigate('Login')}>
          <Text style={styles.registerButtonText}>Have an Account? Login Now! </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
  },
  input: {
    margin: 15,
    marginBottom: 0,
    paddingHorizontal: 20,
    borderRadius: 30,
    borderColor: '#ccc',
    borderWidth: 1,
    fontSize: 16,
  },
  submitButton: {
    justifyContent: 'space-between',
    textAlign: 'center',
    alignItems: 'center',
    backgroundColor: '#04D361',
    padding: 12,
    margin: 15,
    height: 50,
    borderRadius: 30,
  },
  registerButton: {
    justifyContent: 'space-between',
    textAlign: 'center',
    alignItems: 'center',
    top: '16%',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 15,
  },
  registerButtonText: {
    color: '#393939',
    fontSize: 12,
  },
  form: {
    // flex: 1,
    justifyContent: 'space-between',
  },
  productImage: {
    width: 180,
    height: 180,
    alignSelf: 'center',
    marginRight: 12,
  },
});

const mapStateToProps = state => {
  return {
    users: state.users,
  };
};

export default withNavigation(connect(mapStateToProps)(Register));
