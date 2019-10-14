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
} from 'react-native';
import {getProductById, deleteProduct} from '../src/actions/products';

import {connect} from 'react-redux';
import {NavigationEvents, withNavigation} from 'react-navigation';
import {Button} from 'react-native-elements';

import Card from '../components/card/Card';
import axios from 'axios';

export class ProductById extends Component {
  // static navigationOptions = {
  //   title: 'Details',
  // };

  state = {
    products: [],
  };

  async componentDidMount() {
    console.log(this.props.products.isLoading);
    const id = this.props.navigation.getParam('id');

    await this.props.dispatch(getProductById(id));
    this.setState({
      products: this.props.products.productList.data.data,
    });
  }

  handlerSubmit = async () => {
    const id = this.props.navigation.getParam('id');
    // window.event.preventDefault();
    console.log('woi ini dia');
    console.log(this.state);
    await this.props.dispatch(deleteProduct(id));
    alert('this product has been deleteds');
    this.props.navigation.navigate('ListProduct');
    // this.props.history.push('/products');
    console.log('habis props dong');
  };

  // async deleteProduct() {
  //   const id = this.props.navigation.getParam('id');
  //   await axios.delete(`/products/users/${id}`);
  // }

  render() {
    const item = this.state.products;
    return (
      <React.Fragment>
        <View style={{flex: 1}}>
          <FlatList
            style={styles.container}
            data={this.state.products}
            keyExtractor={({id}, index) => id.toString()}
            renderItem={({item}) => (
              <ScrollView>
                <View style={{padding: 15}}>
                  <NavigationEvents onDidFocus={() => getProductById()} />
                  <View style={{alignItems: 'center'}}>
                    <View>
                      <Image
                        source={{uri: item.image}}
                        style={{width: 250, height: 250, paddingBottom: 15}}
                        resizeMode="contain"
                      />
                    </View>
                  </View>
                  <View>
                    <View>
                      <Text style={styles.text}>Name: {item.product_name}</Text>
                      <Text style={styles.text}>Stocks: {item.quantity}</Text>
                      <Text style={styles.text}>Description: </Text>
                      <Text style={styles.text}>{item.description}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      float: 'right',
                    }}>
                    <TouchableOpacity
                      style={{
                        height: 35,
                        width: 70,
                        margin: 5,
                        padding: 10,
                        backgroundColor: '#04D361',
                        alignItems: 'center',
                        borderRadius: 5,
                      }}
                      onPress={() =>
                        this.props.navigation.navigate('EditProduct', {
                          id: item.id,
                        })
                      }>
                      <Text style={{color: 'white'}}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        height: 35,
                        width: 70,
                        margin: 5,
                        padding: 10,
                        backgroundColor: '#d8d8d8',
                        alignItems: 'center',
                        borderRadius: 5,
                      }}
                      onPress={() => this.handlerSubmit()}>
                      <Text style={{color: 'white'}}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            )}
          />
        </View>
      </React.Fragment>
    );
  }
}
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
    padding: 11,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#43A047',
    padding: 12,
    width: 280,
    marginTop: 12,
  },
  text: {
    paddingBottom: 5,
    fontSize: 16,
    marginLeft: 10,
  },
  button: {
    height: 35,
    width: 70,
    padding: 5,
    backgroundColor: 'yellow',
    alignItems: 'center',
    borderRadius: 5,
  },
});

const mapStateToProps = state => {
  return {
    products: state.products,
  };
};
export default withNavigation(connect(mapStateToProps)(ProductById));
