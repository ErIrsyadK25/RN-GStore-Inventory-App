import React, {PureComponent} from 'react';
import {StyleSheet, TouchableOpacity, Image, Text, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {withNavigation} from 'react-navigation';

class Card extends PureComponent {
  render() {
    limdes = this.props.item.product_name.slice(0, 15) + '...';
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          this.props.navigation.navigate('ProductById', {
            id: this.props.item.id,
          })
        }>
        <View>
          <Image 
            style={styles.cardImage}
            source={{uri: this.props.item.image}}
          />
            <Text style={{color: '#707c80', paddingLeft: 20}} numberOfLines={1}>
              {limdes}
            </Text>
          <View>
            {/* <Text style={styles.cardText}>{this.props.item.name}</Text> */}
              <Text
                style={{
                  fontSize: 13,
                  paddingLeft: 20,
                  color: '#232b2b',
                }}>
                <Text color="#232b2b">Stock: </Text>
                {this.props.item.quantity}
              </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 23,
    padding: 25,
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 5,
    margin: 15,
    width: 250,
    height: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    borderRadius: 3,
  },
  cardImage: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 105,
    height: 110,
    resizeMode: 'cover',
    borderRadius: 3,
    borderColor: '#ddd',
    marginLeft: 25,
    marginRight: 25,
    marginTop: 20,
    marginBottom: 10,
  },
});

export default withNavigation(Card);
