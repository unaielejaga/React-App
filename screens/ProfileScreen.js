
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

export default class ProfileScreen extends Component {

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
                <Image style={styles.avatar} source={{uri: 'https://img.icons8.com/doodle/192/000000/homer-simpson.png'}}/>
                <Text style={styles.name}>
                  NombreUsuario
                </Text>
            </View>
          </View>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.desc}>Email: </Text>
              <Text style={styles.desc}>Nº Tel: </Text>
              <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.goBack()}>
                <Text style={{color:'#fff',  fontSize:16, fontWeight:'bold'}}>Atrás</Text>  
              </TouchableOpacity> 
              <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.goBack()}>
                <Text style={{color:'#fff',  fontSize:16, fontWeight:'bold'}}>Cerrar Sesión</Text>  
              </TouchableOpacity> 
            </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#4f6367",
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  desc:{
    fontSize:20,
    color:"#4f6367",
    alignItems: 'center',
    justifyContent:'center',
    fontWeight:'bold',
    marginBottom:20
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
    marginTop:30
  },
  textInfo:{
    fontSize:18,
    marginTop:20,
    color: "#696969",
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#4f6367",
  },
});
