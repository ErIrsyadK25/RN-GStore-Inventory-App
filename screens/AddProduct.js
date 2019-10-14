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
import {addProduct} from '../src/actions/products';
import {withNavigation} from 'react-navigation';

class AddProduct extends Component {
  static navigationOptions = {
    title: 'Add Product',
  };

  state = {
    product_name: '',
    description: '',
    image: '',
    id_category: '',
    quantity: '',
  };

  handlerSubmit = async () => {
    // window.event.preventDefault();
    console.log('woi ini dia');
    console.log(this.state);
    await this.props.dispatch(addProduct(this.state));
    alert('Succesfully Add New Product!');
    this.props.navigation.navigate('ListProduct');
    // this.props.history.push('/products');
    console.log('habis props dong');
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <KeyboardAvoidingView style={styles.form} behavior="padding"> */}
        {/* <ScrollView> */}
        <Text style={{color: '#04D361', fontSize: 25, marginLeft: 80, alignItems: 'center', padding: 10, margin: 15, height: 50}}>
        Add Product
        </Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Name Product"
          name="product_name"
          onChangeText={product_name => this.setState({product_name})}
        />

        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Description"
          name="description"
          onChangeText={description => this.setState({description})}
        />

        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Image"
          name="image"
          onChangeText={image => this.setState({image})}
        />

        <TextInput
          style={styles.input}
          keyboardType={'numeric'}
          autoComplete={'off'}
          underlineColorAndroid="transparent"
          placeholder="ID Category"
          name="id_category"
          onChangeText={id_category => this.setState({id_category})}
        />

        <TextInput
          style={styles.input}
          keyboardType={'numeric'}
          autoComplete={'off'}
          underlineColorAndroid="transparent"
          placeholder="Quantity"
          name="quantity"
          onChangeText={quantity => this.setState({quantity})}
        />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => this.handlerSubmit()}>
          <Text style={styles.submitButtonText}> Add Product </Text>
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
});

const mapStateToProps = state => {
  return {
    products: state.products,
  };
};

export default withNavigation(connect(mapStateToProps)(AddProduct));
