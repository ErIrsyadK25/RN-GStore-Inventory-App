import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  FlatList,
  Text,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';
import {getProducts} from '../src/actions/products';

import {connect} from 'react-redux';

import Card from '../components/card/Card';
import {NavigationEvents, withNavigation} from 'react-navigation';
import URL from '../src/actions/URL';

export class Categories extends Component {
  static navigationOptions = {
    title: 'Categories',
  };

  state = {
    categories: [],
  };

  componentDidMount() {
    // this.getCategories();
    // // const { sort, sortBy, limit, page, key } = this.state;
    // axios.get(`http://192.168.1.18:4000/products`).then(response =>
    //   this.setState({
    //     products: response.data.data,
    //   }),
    // );
    // console.log(this.state);
  }

  getCategories() {
    // () => {
    // const { sort, sortBy, limit, page, key } = this.state;
    URL.get(`/categories`).then(response =>
      this.setState({
        categories: response.data.values,
      }),
      console.log(this.state)
    );
    console.log(this.state.categories);
    // };
  }

  // async componentDidMount() {
  //   await this.props.dispatch(getProducts());
  //   this.setState({
  //     products: this.props.products.productList.data.data,
  //   });
  // }

  render() {
    const item = this.state.categories;
    return (
      <React.Fragment>
        <NavigationEvents
          onDidFocus={() => {
            this.getCategories();
          }}
        />
        <View style={{justifyContent: 'center', alignItems: 'center', padding: 2}}>
          <Text style={{padding: 5, color: '#04D361', fontSize: 25}}>List of Available Categories</Text>
        </View>
        <View
          style={{flex: 1, backgroundColor: '#f1f2f6', position: 'relative'}}>
          <FlatList
            style={styles.container}
            data={this.state.categories}
            renderItem={({item}) => (
              <TouchableOpacity
                style={{
                  height: 40,
                  width: 150,
                  backgroundColor: '#04D361',
                  margin: 10,
                  alignItems: 'center',
                  paddingTop: 5,
                  borderRadius: 30,
                }}
                onPress={() =>
                  this.props.navigation.navigate('CategoryById', {
                    id: item.id,
                  })
                }>
                <Text style={{color: '#fff', fontSize: 20}}>{item.name}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={({id}, index) => id.toString()}
          />

          <TouchableOpacity
            style={{
              position: 'absolute',
              backgroundColor: 'black',
              width: 200,
              height: 40,
              left: 220,
              bottom: 20,
              borderRadius: 30,
              alignItems: 'center',
              paddingBottom: 10,
            }}
            onPress={() => this.props.navigation.navigate('AddCategory')}>
            <Text style={{fontSize: 18, color: '#04D361', marginTop: 7, marginRight: 50}}>Add Category</Text>
          </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#04D361',
    padding: 12,
    width: 300,
    marginTop: 12,
  },
  text: {
    color: '#fff',
  },
});

export default withNavigation(Categories);
