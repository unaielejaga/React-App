import { NavigationContainer } from '@react-navigation/native';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
} from 'react-native';

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [
        {id:1,  title: "Perfil",      color:"#4f6367", image:"https://img.icons8.com/doodle/48/000000/test-account.png"},
        {id:2,  title: "Despensa",     color:"#7a9e9f", image:"https://img.icons8.com/doodle/48/000000/taco.png"},
        {id:3,  title: "Recetas",     color:"#4f6367", image:"https://img.icons8.com/doodle/48/000000/tableware.png"},
        {id:4,  title: "Compra",     color:"#7a9e9f", image:"https://img.icons8.com/doodle/48/000000/checklist--v1.png"},
      ]
    };
  }

  clickEventListener(item) {
   this.props.navigation.navigate(item.title)
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={this.state.data}
          horizontal={false}
          numColumns={2}
          keyExtractor= {(item) => {
            return item.id;
          }}
          renderItem={({item}) => {
            return (
              <View>
                <TouchableOpacity style={[styles.card, {backgroundColor:item.color}]} onPress={() => {this.clickEventListener(item)}}>
                  <Image style={styles.cardImage} source={{uri:item.image}}/>
                </TouchableOpacity>

                <View style={styles.cardHeader}>
                  <View style={{alignItems:"center", justifyContent:"center"}}>
                    <Text style={[styles.title, {color:item.color}]}>{item.title}</Text>
                  </View>
                </View>
              </View>
            )
          }}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingTop:40,
    backgroundColor:'#fff',
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor:"#fff",
  },
  listContainer:{
    alignItems:'center'
  },
  /******** card **************/
  card:{
    shadowColor: '#474747',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
    marginVertical: 20,
    marginHorizontal: 40,
    backgroundColor:"#e2e2e2",
    //flexBasis: '42%',
    width:120,
    height:120,
    borderRadius:60,
    alignItems:'center',
    justifyContent:'center'
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    alignItems:"center", 
    justifyContent:"center"
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage:{
    height: 50,
    width: 50,
    alignSelf:'center'
  },
  title:{
    fontSize:24,
    flex:1,
    alignSelf:'center',
    fontWeight:'bold'
  },
});     
                                            