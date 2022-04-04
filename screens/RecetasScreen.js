import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { useNavigation } from '@react-navigation/core'
import { db } from '../firebase'

const RecetasScreen = () => {

    const navigation = useNavigation();

    const [itemsArray, setItemsArray] = useState([]);

    useEffect(() => {
        db.ref('/recetas').on('value', snapshot => {
          let data = snapshot.val();
          if(data != null){
            const items = Object.values(data);
            setItemsArray(items);
          }else{
            setItemsArray(null);
          }
        });
      }, []);

    let cardClickEventListener = (item) => {
        navigation.navigate('DescReceta', {recetaKey: item.receta})
    }

    const renderTags = (item) =>{
        return (
        <View style={{flexDirection:'row'}}>
            <TouchableOpacity style={styles.btnColor}>
                <Text>{item.dificultad}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnColor}>
                <Text>{item.duracion}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnColor}>
                <Text>{item.comensales}</Text>
            </TouchableOpacity>
        </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recetas Recomendadas:</Text>
            <FlatList 
                style={styles.notificationList}
                data={itemsArray}
                keyExtractor= {(item) => {
                return item.url;
                }}
                renderItem={({item}) => {
                return (
                    <TouchableOpacity style={[styles.card, {borderColor:'#4f6367'}]} onPress={() => {cardClickEventListener(item)}}>
                    <View style={styles.cardContent}>
                        <Text style={styles.name}>{item.nombre}</Text>
                    </View>
                    <View style={[styles.cardContent, styles.tagsContent]}>
                        {renderTags(item)}
                    </View>
                    </TouchableOpacity>
                )
                }}/>
            <Text style={styles.title}>Todas las Recetas:</Text>
            <FlatList 
                style={styles.notificationList}
                data={itemsArray}
                keyExtractor= {(item) => {
                return item.url;
                }}
                renderItem={({item}) => {
                return (
                    <TouchableOpacity style={[styles.card, {borderColor:'#4f6367'}]} onPress={() => {cardClickEventListener(item)}}>
                    <View style={styles.cardContent}>
                        <Text style={styles.name}>{item.nombre}</Text>
                    </View>
                    <View style={[styles.cardContent, styles.tagsContent]}>
                        {renderTags(item)}
                    </View>
                    </TouchableOpacity>
                )
                }}/>
        </View>
    );
}

export default RecetasScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
  formContent:{
    flexDirection: 'row',
    marginTop:30,
  },
  title: {
    marginTop: 20,
    fontSize: 25,
    fontWeight: '700',
    textAlign: 'center',
    color: '#4f6367',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    borderBottomWidth: 1,
    height:45,
    flexDirection: 'row',
    alignItems:'center',
    flex:1,
    margin:10,
  },
  icon:{
    width:30,
    height:30,
  },
  iconBtnSearch:{
    alignSelf:'center'
  },
  inputs:{
    height:45,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1,
  },
  inputIcon:{
    marginLeft:15,
    justifyContent: 'center'
  },
  notificationList:{
    marginTop:5,
    padding:5,
    height: '35%',
    flexGrow: 0
  },
  card: {
    height:null,
    paddingTop:10,
    paddingBottom:10,
    marginTop:5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    borderTopWidth:40,
    marginBottom:20,
  },
  cardContent:{
    flexDirection:'row',
    marginLeft:10, 
  },
  imageContent:{
    marginTop:-40,
  },
  tagsContent:{
    marginTop:10,
    flexWrap:'wrap'
  },
  image:{
    width:60,
    height:60,
    borderRadius:30,
  },
  name:{
    fontSize:20,
    fontWeight: 'bold',
    marginLeft:10,
    alignSelf: 'center'
  },
  btnColor: {
    padding:10,
    borderRadius:40,
    marginHorizontal:3,
    backgroundColor: "#eee",
    marginTop:5,
  },
});  