import React from 'react'
import { View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import { styles } from '../../../theme/style'
import { Letter } from '../HomeScreen'
import { CommonActions, useNavigation } from '@react-navigation/native'

interface Props{
  letter: Letter 
}

export const LetterCardComponent = ({letter}:Props) => {

  const navigation= useNavigation()

  return (
    <View>
        <View>
            <Text variant='labelLarge'>Ingreso: {letter.to}</Text>
            <Text variant='bodyMedium'>Descripcion: {letter.subject}</Text>
        </View>
        <View style={styles.contentLetter}>
        <IconButton
            icon="pen"
            style={styles.iconProfile}
            size={20}
            onPress={() => navigation.dispatch(CommonActions.navigate({name:'Detail', params:{letter}}))}
        />
        </View>
    </View>
  )
}


