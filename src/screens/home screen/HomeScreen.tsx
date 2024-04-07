import { onAuthStateChanged, signOut, updateProfile } from 'firebase/auth'
import React, { Fragment, useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Avatar, Button, Divider, FAB, Icon, IconButton, MD3Colors, Modal, Portal, Text, TextInput } from 'react-native-paper'
import { auth, dbRealTime } from '../../configs/firebaseConfig'
import { styles } from '../../theme/style'
import firebase from 'firebase/auth'
import { LetterCardComponent } from './components/LetterCardComponent'
import { NewLetterComponent } from './components/NewLetterComponent'
import { onValue, ref } from 'firebase/database'
import { CommonActions, useNavigation } from '@react-navigation/native'

interface UserForm{
  name: string
}

//interface para trabajar la data de la carta
export interface Letter{
  id: string,
  to: string,
  subject: string,
  message: string 
}

export const HomeScreen = () => {

//hook de navegacion
const navigationHook = useNavigation();

//funcion deslogueo
const logOut=()=>{
 const signOutDB = signOut(auth).then(() => {
    // Sign-out successful.
    console.log("deslogueo correcto")
    rechargePage()
    //navigationHook.dispatch(CommonActions.navigate({name:'Register'}))
  }).catch((error) => {
    console.log(error)
    // An error happened.
  }); 
} 

//funcion recarga pagina
const rechargePage = async () =>{
  await new Promise(resolve => setTimeout(resolve, 3000));
  window.location.reload()
  //navigationHook.goBack()
}



//hook use state controlar la visibilidad del modal new note
const [showModalLetter, setShowModalLetter] = useState(false)

//funcin para oberner las cartas almacenadas 
const getAllLetters=()=>{
  const dbRef=ref(dbRealTime, 'letters')
  onValue(dbRef, (snapshot)=>{
    const data=snapshot.val()
    const getKeys=Object.keys(data)
    const listLetters: Letter[]=[]
    getKeys.forEach((key)=>{
      const value={...data[key], id:key}
      listLetters.push(value)
    })
    setLetters(listLetters)
  })
}

const [userForm, setUserForm] = useState<UserForm>({
  name: ''
})

const [userAuth, setUserAuth] = useState<firebase.User | null>(null)

//hook use state toma la lista de cartas
const [letters, setLetters] = useState<Letter[]>([])

//hook use effect para capturar datos del cliente
useEffect(()=>{
      setUserAuth(auth.currentUser) //datos del usuario logeado
      setUserForm({name: auth.currentUser?.displayName ?? ''})
      getAllLetters()
}, [])

//funcion para tomar los datos del formulario y actualizar la data
const handlerUpdateUserForm=(key: string, value: string)=>{
  setUserForm({...userForm, [key]:value})
}



  return (
    <Fragment>
      <View style={styles.contentHome}>
        <View style={styles.headerHome}>
            <Avatar.Image size={55}  source={require('./img/notas-ancladas.png')}/>
            <View>
                <Text variant='displayLarge'> Bloc personal de notas </Text>
                <Text variant='labelLarge'> {userForm.name} </Text>
                <View style={styles.iconProfile}>
                <IconButton
                  icon="logout"
                  iconColor='orange'
                  size={20} 
                  mode='contained'
                  onPress={() => logOut()}
                />
                </View>

            </View>
            
        </View>    
        <FlatList
              data={letters}
              renderItem={({item}) => <LetterCardComponent letter={item}/>}
              keyExtractor={item => item.id}
            />
    </View>
   
    <FAB
      icon="plus"
      style={styles.fab}
      color='orange'
      onPress={() => setShowModalLetter(true)}
    />
    <NewLetterComponent visible={showModalLetter} setVisible={setShowModalLetter}/>
    </Fragment>
    
  )
}


  
