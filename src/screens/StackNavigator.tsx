import { NavigationContainer } from '@react-navigation/native'
import React, { Fragment, useEffect, useState } from 'react'
import { RegisterScreens } from './RegisterScreens'
import { LogginScreen } from './LogginScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeScreen } from './home screen/HomeScreen'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../configs/firebaseConfig';
import { StyleSheet, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { DetailLetterScreen } from './home screen/DetailLetterScreen'

//interface definir propiedades rutas

interface Routes{
    name: string,
    screen: ()=> JSX.Element,
    headerShow?: boolean,
    title?: string
}

const Stack = createNativeStackNavigator();

export const StackNavigator = () => {

    //hook verificar si esta logeado o no
    const [isAuth, setIsAuth] = useState(false)

    //hook para controlar carga inicial de screen 
    const [isLoading, setIsLoading] = useState(false)

    //hook use effect cual es el estado de autenticacion
    useEffect(()=>{
        setIsLoading(true)
        onAuthStateChanged(auth, (user)=>{
            if(user){
                setIsAuth(true);
                console.log(user);
            }
            setIsLoading(false)
        })
    }, [])

    //arreglo de rutas para el usuario no logeado
    const routesNoAuth: Routes[] =[
        {name: "Loggin", screen: LogginScreen},
        {name: "Register", screen: RegisterScreens}
    ]

    //arreglo de rutas para el usuario autenticado
    const routesAuth: Routes[]=[
        {name: "Home", screen: HomeScreen},
        {name: "Detail", screen: DetailLetterScreen, headerShow:true, title:'Actualizar nota'}
    ]

  return (
    <Fragment>
        {
            isLoading ? (
                <View style={styles.content}>
                    <ActivityIndicator size={35}/>
                </View>
            )
                
            :(
                <Stack.Navigator>
        {
            !isAuth ?
            routesNoAuth.map((item, index)=>(
                <Stack.Screen key={index} name={item.name} options={{headerShown:false}} component={item.screen} />
            ))
            :
            routesAuth.map((item, index)=>(
                <Stack.Screen key={index} name={item.name} options={{headerShown:item.headerShow ?? false, title:item.title}} component={item.screen} />
            ))
        }
        {/*<Stack.Screen name="Register" options={{title:"Registrar"}} component={RegisterScreens} />*/}
    </Stack.Navigator>
            )

        }
        
    
    </Fragment>
    
  )
}

const styles=StyleSheet.create(
    {
      content:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:10,
        gap: 10
      },
      inputs:{
        width:'90%'
      },
      buttons:{
        width:'90%'
      },
      textNavigation:{
        marginTop: 20,
        fontSize: 15,
        color: '#53OE69',
        fontWeight: 'bold'
      }
    }
  );


