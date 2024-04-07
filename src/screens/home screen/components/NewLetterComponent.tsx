import React, { useState } from 'react'
import { Button, Divider, IconButton, Modal, Portal, Text, TextInput } from 'react-native-paper'
import { styles } from '../../../theme/style';
import { View } from 'react-native'
import { push, ref, set } from 'firebase/database'
import { dbRealTime } from '../../../configs/firebaseConfig'

//interface que indica los props que este componente va a manejar
interface Props{
    visible: boolean,
    setVisible: Function
}

interface LetterForm{
  to: string,
  subject: string,
  message: string
}

export const NewLetterComponent = ({visible, setVisible}:Props) => {

  //hook use state para actualizar datos del formulario
  const [letterForm, setLetterForm] = useState<LetterForm>({
    to: '',
    subject: '',
    message: ''
  })

  //funcion que capture y actualice los valores del formulario
  const handlerSetLetterForm= (key: string, value: string)=>{
    setLetterForm({...letterForm, [key]:value})
  }

  //funcion guardar cartas 
  const handlerSaveLetter= async()=>{
    if(!letterForm.to || !letterForm.subject || !letterForm.message){
      return
    }
    console.log(letterForm);
    const dbRef = ref(dbRealTime, 'letters')
    const saveLetter = push(dbRef)
    try {
      await set(saveLetter, letterForm)
      //limpiar valores formulario
      setLetterForm({
        message: '',
        subject: '',
        to: ''
      })
    } catch (error) {
      console.log(error)
    }
    setVisible(false)
  }

  return (
   
        <Portal>
        <Modal visible={visible} contentContainerStyle={styles.modal}>
          <View style={styles.headerModal}>
            <Text variant='headlineMedium'>Nueva nota</Text>
            <IconButton icon='close' onPress={()=>setVisible(false)}/>
          </View>
          <Divider bold/>
          <TextInput
            label='Prom'
            mode='outlined'
            onChangeText={(value)=>handlerSetLetterForm('to', value)}
          />
          <TextInput
            label='Detalle'
            mode='outlined'
            onChangeText={(value)=>handlerSetLetterForm('subject', value)}
          />
          <TextInput
            label='Nota'
            mode='outlined'
            onChangeText={(value)=>handlerSetLetterForm('message', value)}
            multiline={true}
            numberOfLines={7}
          />
          <Button 
          buttonColor='orange'
          style={{marginTop:20}}
          mode='contained'
          onPress={()=>handlerSaveLetter()}
          >Guardar</Button>
        </Modal>
      </Portal>
  
    
  )
}
