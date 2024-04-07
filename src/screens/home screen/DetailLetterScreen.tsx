import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Button, Divider, Text, TextInput } from 'react-native-paper'
import { styles } from '../../theme/style'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Letter } from './HomeScreen';
import { dbRealTime } from '../../configs/firebaseConfig'
import { ref, remove, update } from 'firebase/database'

export const DetailLetterScreen = () => {

  const navigation = useNavigation()

  //acceder a los parametros de navegacion
  const route = useRoute()
  //@ts-ignore
  const {letter} = route.params
  console.log(letter);

  const [detailForm, setDetailForm] = useState<Letter>({
    id:'',
    to:'',
    subject: '',
    message: ''
  })

  //hook que carga los datos recibidos en el detailform
  useEffect(()=>{
    setDetailForm(letter)
  },[])


  //funcion que permita actualizar la data del formulario
  const handlerSetDetailForm = (key: string, value: string)=>{
    setDetailForm({...detailForm, [key]:value})
  }

  //hook para actualizar
  const handlerUpdateLetter= async ()=>{
    //referencia a la base de datos
    const dbRef=ref(dbRealTime, 'letters/'+detailForm.id)
    await update(dbRef, {subject: detailForm.subject, message: detailForm.message})
    //validar en consola
    console.log(detailForm)

    navigation.goBack()
  }

  //funcion para eliminar la carta 
  const handlerDeleteLetter = async() =>{
    //referencia a la base de datos
    const dbRef=ref(dbRealTime, 'letters/'+detailForm.id)
    await remove(dbRef)
    //validar en consola
    console.log("eliminado con exito")

    navigation.goBack()
  }

  return (
    <View style={styles.contentDetailLetter}>
        <View style={styles.subjectLetter}>
            <Text variant='headlineSmall'>Detalle:</Text>
            <TextInput
                value={detailForm.subject}
                onChangeText={(value)=>handlerSetDetailForm('subject', value)}
                style={{flex:1}}
            />
        </View>
        <Divider bold/>
        <View >
          <Text variant='bodyLarge'>Prom: {detailForm.to}</Text>
        </View>
        <Divider bold/>
        <View>
          <Text style={styles.textMessage} >Nota</Text>
          <TextInput
          value={detailForm.message}
          multiline={true}
          numberOfLines={7}
          onChangeText={(value)=>handlerSetDetailForm('message', value)}
          />
        </View>
        <Button mode='contained' icon='update' style={styles.buttons} onPress={()=>handlerUpdateLetter()}>Actualizar</Button>
        <Button mode='contained' icon='delete' style={styles.buttons} onPress={()=>handlerDeleteLetter()}>Eliminar</Button>
    </View>
  )
}


