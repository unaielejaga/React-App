import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/core'
import { db } from '../firebase'
import { SafeAreaView } from 'react-native-safe-area-context';


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

    const ListHeader = () => {
      return(
        <View>
        <View style={{alignItems:'center', marginHorizontal:10}}>
          <Image style={styles.productImg} source={{uri: receta.imagen}}/>
          <Text style={styles.name}>{receta.nombre}</Text>
          <View style={styles.contentSize}>
              <TouchableOpacity style={styles.btnSize}><Text style={{ textAlign: 'center'}}>{receta.dificultad}</Text></TouchableOpacity> 
              <TouchableOpacity style={styles.btnSize}><Text style={{ textAlign: 'center'}}>{receta.duracion}</Text></TouchableOpacity> 
              <TouchableOpacity style={styles.btnSize}><Text style={{ textAlign: 'center'}}>{receta.comensales}</Text></TouchableOpacity> 
          </View>
        </View>
        <View>
          <Text style={styles.subname}>Ingredientes: </Text>
        </View>
        </View>
      );
    } 
    
    const ListFooter = () => {
      return(
        <View>
          <View>
            <Text style={styles.subname}>Descripción: </Text>
          </View>
          <View style={{alignItems:'center', marginHorizontal:10}}> 
            <Text style={styles.description}>{receta.descripcion}</Text>
              <View style={styles.separator}></View>
              <View style={styles.addToCarContainer}>
                <TouchableOpacity style={styles.shareButton} onPress={()=> navigation.goBack() }>
                  <Text style={styles.shareButtonText}>Atrás</Text>  
                </TouchableOpacity>
              </View>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <SafeAreaView style={{flex: 1}}>
        <FlatList
          data={ingredientes}
          keyExtractor={(item) => ingredientes.indexOf(item)}
          ListHeaderComponent={ListHeader}
          ListFooterComponent={ListFooter}
          style={{backgroundColor: '#FFFFFF'}}
          renderItem={({item}) => {
            return (
              <View style={styles.ingre}>
                <View style={{alignItems: 'center'}}>
                    <View>
                        <Text style={styles.nameIngre}>{item.nombre}</Text>
                    </View>
                    <View style={[styles.cardContent, styles.tagsContent]}>
                        <TouchableOpacity style={styles.btnColor}>
                            <Text>{item.cantidad}{item.unidad}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
              </View>
            )
            }}/>
        </SafeAreaView> 
      </View>
    
    );
  
}

export default DescRecetaScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:20,
  },
  ingre:{
    marginTop: 5,
    marginHorizontal: 40,
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 10,
    paddingVertical: 5
  },
  nameIngre:{
    textAlign: 'center',
    fontSize:15,
    color:"#696969",
    fontWeight:'bold'
  },
  productImg:{
    width:768,
    height:150,
    marginBottom: 20
  },
  tagsContent:{
    marginTop:5,
    flexWrap:'wrap'
  },
  cardContent:{
    flexDirection:'row',
    marginLeft:10, 
  },
  btnColor: {
    padding:10,
    borderRadius:40,
    marginHorizontal:3,
    backgroundColor: "#FFFFFF",
    marginTop:5,
    borderColor:'#778899',
    borderWidth:1,
  },
  name:{
    textAlign: 'center',
    fontSize:28,
    color:"#696969",
    fontWeight:'bold'
  },
  subname:{
    textAlign: 'left',
    fontSize:20,
    color:"#696969",
    fontWeight:'bold',
    marginVertical: 20,
    marginLeft: 20
  },
  notificationList:{
    marginTop:5,
    padding:5,
  },
  description:{
    textAlign:'justify',
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
    textAlign: 'center',
    width: 200
  },
  addToCarContainer:{
    marginHorizontal:30
  }
});    