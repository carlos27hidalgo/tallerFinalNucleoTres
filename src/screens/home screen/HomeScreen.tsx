import { onAuthStateChanged, updateProfile } from 'firebase/auth'
import React, { Fragment, useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Avatar, Button, Divider, FAB, Icon, IconButton, MD3Colors, Modal, Portal, Text, TextInput } from 'react-native-paper'
import { auth, dbRealTime } from '../../configs/firebaseConfig'
import { styles } from '../../theme/style'
import firebase from 'firebase/auth'
import { LetterCardComponent } from './components/LetterCardComponent'
import { NewLetterComponent } from './components/NewLetterComponent'
import { onValue, ref } from 'firebase/database'

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


//hook controla la visivilidad del modal
const [showModalProfile, setShowModalProfile] = useState(false)

//hook use state controlar la visibilidad del modal new letter
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

//funcion actuliza la data del usuario
const handlerUpdateUser=async()=>{
  try {
    await updateProfile(userAuth!, {displayName: userForm.name})
    console.log(userForm)
  } catch (error) {
    console.log(error)
  }
  
  setShowModalProfile(false)
}

  return (
    <Fragment>
      <View style={styles.contentHome}>
        <View style={styles.headerHome}>
            <Avatar.Text size={55} label="CH" />
            <View>
                <Text variant='bodySmall'> bienvenido </Text>
                <Text variant='labelLarge'> {userForm.name} </Text>
                <View style={styles.iconProfile}>
                <IconButton
                  icon="cog"
          
                  size={20}
                  mode='contained'
                  onPress={() => setShowModalProfile(true)}
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
    <Portal>
      <Modal visible={showModalProfile} contentContainerStyle={styles.modal}>
        <View style={styles.headerModal}>
          <Text variant='headlineLarge'>Mi perfil</Text>
          <IconButton icon='close' onPress={()=>setShowModalProfile(false)}/>
        </View>
        <Divider bold/>
        <View>
          <TextInput 
          mode='outlined'
          label='Nombre'
          value={userForm.name}
          onChangeText={(value)=>handlerUpdateUserForm('name', value)}
          />
          <TextInput 
          mode='outlined'
          label='Correo'
          value={userAuth?.email!}
          disabled
          />
          <View>
          
          </View>
          
        </View>
        
        <Button mode='contained' onPress={()=>handlerUpdateUser()}>Actualizar</Button>
      </Modal>

    </Portal>
    <FAB
      icon="plus"
      style={styles.fab}
      onPress={() => setShowModalLetter(true)}
    />
    <NewLetterComponent visible={showModalLetter} setVisible={setShowModalLetter}/>
    </Fragment>
    
  )
}


  
