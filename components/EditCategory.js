import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  FlatList,
  AsyncStorage,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {editCategories, getCategoryById} from '../src/actions/categories';

import {connect} from 'react-redux';
import {NavigationEvents, withNavigation} from 'react-navigation';
import {Button} from 'react-native-elements';

import Card from '../components/card/Card';
import axios from 'axios';

export class EditCategory extends Component {
  // static navigationOptions = {
  //   title: 'Details',
  // };

  state = {
    name: '',
    // date_added: '',
  };

  async componentDidMount() {
    const id = this.props.navigation.getParam('id');

    await this.props.dispatch(getCategoryById(id));
    this.setState({
      name: this.props.categories.categoryList.data.data[0].name,
    });
  }

  handlerSubmit = async () => {
    const id = this.props.navigation.getParam('id');
    console.log(id);
    console.log(this.state);
    await this.props.dispatch(editCategories(id, this.state));
    alert('Data Updated!');
    this.props.navigation.navigate('Categories');

    // console.log('cobaain');
  };

  render() {
    const item = this.state.products;
    return (
      <View style={styles.container}>
        <Text style={{color: '#04D361', fontSize: 25, marginLeft: 80, alignItems: 'center', padding: 10, margin: 15, height: 50}}>
         Edit Category
        </Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Name Category"
          name="name"
          value={this.state.name}
          onChangeText={name => this.setState({name})}
        />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => this.handlerSubmit()}>
          <Text style={styles.submitButtonText}> Edit Category </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 23,
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
    alignItems: 'center',
    backgroundColor: '#04D361',
    padding: 10,
    margin: 15,
    height: 50,
    borderRadius: 30,
  },
  submitButtonText: {
    color: '#fff',
    paddingTop: 5,
    fontSize: 16,
  },
  form: {
    // flex: 1,
    justifyContent: 'space-between',
  },
  //   });
});

const mapStateToProps = state => {
  return {
    categories: state.categories,
  };
};
export default withNavigation(connect(mapStateToProps)(EditCategory));
