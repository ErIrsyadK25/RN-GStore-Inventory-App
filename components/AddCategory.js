import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import {connect} from 'react-redux';
import {addCategory} from '../src/actions/categories';
import {withNavigation} from 'react-navigation';

class AddCategory extends Component {
  static navigationOptions = {
    title: 'Add Category',
  };

  state = {
    name: '',
  };

  handlerSubmit = async () => {
    // window.event.preventDefault();
    console.log('woi ini dia');
    console.log(this.state);
    await this.props.dispatch(addCategory(this.state));
    alert('New Product Added!');
    this.props.navigation.navigate('Categories');
    // this.props.history.push('/products');
    console.log('habis props dong');
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <KeyboardAvoidingView style={styles.form} behavior="padding"> */}
        {/* <ScrollView> */}
        <Text style={{color: '#04D361', fontSize: 25, marginLeft: 80, alignItems: 'center', padding: 10, margin: 15, height: 50}}>
        Add Category
        </Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Category"
          name="name"
          onChangeText={name => this.setState({name})}
        />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => this.handlerSubmit()}>
          <Text style={styles.submitButtonText}> Add Category </Text>
        </TouchableOpacity>

        {/* </KeyboardAvoidingView> */}
        {/* </KeyboardAvoidingView> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 23,
    padding: 25
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
});

const mapStateToProps = state => {
  return {
    categories: state.categories,
  };
};

export default withNavigation(connect(mapStateToProps)(AddCategory));
