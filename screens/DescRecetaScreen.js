import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList
} from 'react-native';
import { useNavigation } from '@react-navigation/core'
import { db } from '../firebase'


const DescRecetaScreen = ({route}) => {

    const {recetaKey} = route.params;

    const[receta, setReceta] = useState(false);
    const[ingredientes, setIngredientes] = useState([]);
    
    const navigation = useNavigation()

    useEffect(() => {
        db.ref('/recetas').child(recetaKey).on('value', snapshot => {
          let data = snapshot.val();
          if(data != null){
            setReceta(data);
            const items = Object.values(data.ingredientes);
            setIngredientes(items)
          }else{
            setReceta(null);
          }
        });
      }, []);

      

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{alignItems:'center', marginHorizontal:10}}>
            <Image style={styles.productImg} source={{uri: receta.imagen}}/>
            <Text style={styles.name}>{receta.nombre}</Text>
            <View style={styles.contentSize}>
                <TouchableOpacity style={styles.btnSize}><Text style={{ textAlign: 'center'}}>{receta.dificultad}</Text></TouchableOpacity> 
                <TouchableOpacity style={styles.btnSize}><Text style={{ textAlign: 'center'}}>{receta.duracion}</Text></TouchableOpacity> 
                <TouchableOpacity style={styles.btnSize}><Text style={{ textAlign: 'center'}}>{receta.comensales}</Text></TouchableOpacity> 
            </View>
            {/*<FlatList
                style={styles.notificationList}
                data={ingredientes}
                keyExtractor= {(item) => {
                return item.nombre;
                }}
                renderItem={({item}) => {
                return (
                    <TouchableOpacity style={[styles.card, {borderColor:'#4f6367'}]}>
                        <View style={styles.cardContent}>
                            <Text style={styles.name}>{item.nombre}</Text>
                        </View>
                        <View style={[styles.cardContent, styles.tagsContent]}>
                            <TouchableOpacity style={styles.btnColor}>
                                <Text>{item.cantidad}{item.unidad}</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )
                }}/>*/}
            <Text style={styles.description}>{receta.descripcion}</Text>
          </View>
            <View style={styles.separator}></View>
            <View style={styles.addToCarContainer}>
                <TouchableOpacity style={styles.shareButton} onPress={()=> navigation.goBack() }>
                <Text style={styles.shareButtonText}>Atrás</Text>  
                </TouchableOpacity>
            </View> 
        </ScrollView>
      </View>
    );
  
}

export default DescRecetaScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:20,
  },
  productImg:{
    width:768,
    height:150,
    marginBottom: 20
  },
  name:{
    textAlign: 'center',
    fontSize:28,
    color:"#696969",
    fontWeight:'bold'
  },
  notificationList:{
    marginTop:5,
    padding:5,
  },
  description:{
    textAlign:'justify',
    marginTop:10,
    color:"#696969",
  },
  btnSize: {
    height:40,
    width:80,
    borderRadius:40,
    borderColor:'#778899',
    borderWidth:1,
    marginHorizontal:3,
    backgroundColor:'#eee',
  
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentSize:{ 
    justifyContent:'center', 
    marginHorizontal:30, 
    flexDirection:'row', 
    marginTop:20
  },
  separator:{
    height:2,
    backgroundColor:"#eeeeee",
    marginTop:20,
    marginHorizontal:30
  },
  shareButton: {
    marginTop:10,
    marginBottom: 20,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
    backgroundColor: '#4f6367',
  },
  shareButtonText:{
    color: "#FFFFFF",
    fontSize:20,
  },
  addToCarContainer:{
    marginHorizontal:30
  }
});    