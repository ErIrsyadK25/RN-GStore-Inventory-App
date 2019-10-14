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
import {editProduct, getProductById} from '../src/actions/products';

import {connect} from 'react-redux';
import {NavigationEvents, withNavigation} from 'react-navigation';
import {Button} from 'react-native-elements';

import Card from '../components/card/Card';

export class EditProduct extends Component {
  // static navigationOptions = {
  //   title: 'Details',
  // };

  state = {
    product_name: '',
    description: '',
    image: '',
    id_category: '',
    quantity: '',
    // date_added: '',
  };

  async componentDidMount() {
    const id = this.props.navigation.getParam('id');

    await this.props.dispatch(getProductById(id));
    this.setState({
      product_name: this.props.products.productList.data.data[0].product_name,
      description: this.props.products.productList.data.data[0].description,
      image: this.props.products.productList.data.data[0].image,
      id_category: this.props.products.productList.data.data[0].id_category,
      quantity: this.props.products.productList.data.data[0].quantity,
      date_added: this.props.products.productList.data.data[0].date_added,
    });
  }

  handlerSubmit = async () => {
    const id = this.props.navigation.getParam('id');
    console.log(id);
    console.log(this.state);
    await this.props.dispatch(editProduct(id, this.state));
    alert('Succesfully Update Data!');
    this.props.navigation.navigate('ListProduct');

    // console.log('cobaain');
  };

  render() {
    const item = this.state.products;
    return (
      <View style={styles.container}>
        {/* <KeyboardAvoidingView style={styles.form} behavior="padding"> */}
        {/* <ScrollView> */}
        <Text style={{color: '#04D361', fontSize: 25, marginLeft: 80, alignItems: 'center', padding: 10, margin: 15, height: 50}}>
        Edit Product
        </Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Name Product"
          name="product_name"
          value={this.state.product_name}
          onChangeText={product_name => this.setState({product_name})}
        />

        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Description"
          name="description"
          value={this.state.description}
          onChangeText={description => this.setState({description})}
        />

        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Image"
          name="image"
          value={this.state.image}
          onChangeText={image => this.setState({image})}
        />

        <TextInput
          style={styles.input}
          keyboardType={'numeric'}
          autoComplete={'off'}
          underlineColorAndroid="transparent"
          placeholder="ID Category"
          name="id_category"
          value={`${this.state.id_category}`}
          onChangeText={id_category => this.setState({id_category})}
        />

        <TextInput
          style={styles.input}
          keyboardType={'numeric'}
          autoComplete={'off'}
          underlineColorAndroid="transparent"
          placeholder="Quantity"
          name="quantity"
          value={`${this.state.quantity}`}
          onChangeText={quantity => this.setState({quantity})}
        />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => this.handlerSubmit()}>
          <Text style={styles.submitButtonText}> Edit Product </Text>
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
    paddingTop: 5,
    color: 'white',
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
    products: state.products,
  };
};
export default withNavigation(connect(mapStateToProps)(EditProduct));
