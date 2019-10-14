import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  FlatList,
  AsyncStorage,
  Picker,
} from 'react-native';
import {getProducts} from '../src/actions/products';

import {connect} from 'react-redux';

import Card from '../components/card/Card';
import {NavigationEvents} from 'react-navigation';
import {SearchBar} from 'react-native-elements';
import URL from '../src/actions/URL';

export class ListProduct extends Component {
  // static navigationOptions = {
  //   title: null,
  //   headerMode: 'screen',
  // };

  state = {
    products: [],
    search: '',
    sortBy: '',
    sort: ''
  };

  updateSearch = (search) => {
    this.setState({search: search}, () => this.getProd())
  }
  
  updateSort = (sort) => {
    this.setState({sort: sort}, () => this.getProd())
  }
  
  updateSortBy = (sortBy) => {
    this.setState({sortBy: sortBy}, () => this.getProd())
  }

  getProd() {
    // () => {
    // const { sort, sortBy, limit, page, key } = this.state;
    URL.get(`/products?search=${this.state.search}&sort=${this.state.sort}&sortBy=${this.state.sortBy}`).then(response =>
      this.setState({
        products: response.data.data,
      }),
    );
    // console.log(this.state);
    // };
  }

  // async componentDidMount() {
  //   await this.props.dispatch(getProducts());
  //   this.setState({
  //     products: this.props.products.productList.data.data,
  //   });
  // }

  render() {
    // const item = this.state.products;
    return (
      <React.Fragment>
        <NavigationEvents
          onDidFocus={() => {
            this.getProd();
          }}
        />
        <SearchBar
        containerStyle={{backgroundColor: 'white'}}
          round
          lightTheme
          showLoading={false}
          clearIcon={true}
          placeholder="Type Here..."
          name="search"
          placeholderTextColor="white"
          onChangeText={this.updateSearch}
          value={this.state.search}
          cancelButtonTitle='Cancel'
      />
        <View style={{ flex: 1, backgroundColor: '#04D361'}}>
          <View style={{flexDirection: 'row'}}>
            <Picker
              selectedValue={this.state.sort}
              value={this.state.sort}
              style={{height: 50, flex: 1, color: '#fff'}}
              onValueChange={this.updateSort}>
              <Picker.Item label="Ascending" value='asc' />
              <Picker.Item label="Descending" value='desc' />
            </Picker>
            
            <Picker
              selectedValue={this.state.sortBy}
              value={this.state.sortBy}
              style={{height: 50, flex: 1, color: '#fff'}}
              onValueChange={this.updateSortBy}>
              <Picker.Item label="Id" value='id' />
              <Picker.Item label="Name" value='name' />
              <Picker.Item label="Quantity" value='quantity' />
            </Picker>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{padding: 5, color: 'white'}}>List of Available Products</Text>
          </View>
          <FlatList
            numColumns={2}
            style={styles.container}
            data={this.state.products}
            renderItem={({item}) => <Card item={item} />}
            keyExtractor={({id}, index) => id.toString()}
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
    backgroundColor: '#04D361',
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
    color: '#fff',
  },
});

// const mapStateToProps = state => {
//   return {
//     products: state.products,
//   };
// };
// export default connect(mapStateToProps)(ListProduct);
export default ListProduct;
