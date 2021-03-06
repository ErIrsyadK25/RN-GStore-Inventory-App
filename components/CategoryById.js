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
import {getCategoryById, deleteCategories} from '../src/actions/categories';

import {connect} from 'react-redux';
import {NavigationEvents, withNavigation} from 'react-navigation';
import {Button} from 'react-native-elements';

import Card from '../components/card/Card';
import axios from 'axios';

export class CategoryById extends Component {
  // static navigationOptions = {
  //   title: 'Details',
  // };

  state = {
    categories: [],
  };

  async componentDidMount() {
    const id = this.props.navigation.getParam('id');

    await this.props.dispatch(getCategoryById(id));
    console.log(this.props);
    this.setState({
      categories: this.props.categories.categoryList.data.data,
    });
    console.log(this.state.categories);
  }

  handlerSubmit = async () => {
    const id = this.props.navigation.getParam('id');
    // window.event.preventDefault();
    console.log(this.state);
    await this.props.dispatch(deleteCategories(id));
    alert('this category has been deleted!');
    this.props.navigation.navigate('Categories');
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
            data={this.state.categories}
            keyExtractor={({id}, index) => id.toString()}
            renderItem={({item}) => (
              <ScrollView>
                <View style={{padding: 15}}>
                  <NavigationEvents onDidFocus={() => getCategoryById()} />
                  <View>
                    <View>
                      <Text style={styles.text}>Category ID: {item.id}</Text>
                    </View>
                    <View>
                      <Text style={styles.text}>Category: {item.name}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'center',
                    }}>
                    <TouchableOpacity
                      style={{
                        height: 35,
                        width: 70,
                        margin: 10,
                        padding: 10,
                        backgroundColor: '#04D361',
                        alignItems: 'center',
                        borderRadius: 5,
                      }}
                      onPress={() =>
                        this.props.navigation.navigate('EditCategory', {
                          id: item.id,
                        })
                      }>
                      <Text style={{color: '#fff'}}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        height: 35,
                        width: 70,
                        margin: 10,
                        padding: 10,
                        backgroundColor: '#d8d8d8',
                        alignItems: 'center',
                        borderRadius: 5,
                      }}
                      onPress={() => this.handlerSubmit()}>
                      <Text style={{color: '#fff'}}>Delete</Text>
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
    backgroundColor: '#04D361',
    padding: 12,
    width: 280,
    marginTop: 12,
  },
  text: {
    paddingBottom: 5,
    fontSize: 16,
    paddingLeft: 85,
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
    categories: state.categories,
  };
};
export default withNavigation(connect(mapStateToProps)(CategoryById));
