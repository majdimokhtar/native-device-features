import { View, StyleSheet, Pressable } from 'react-native'
import {Ionicons} from '@expo/vector-icons'

export default function IconBtn({icon,color,size,onPress}) {
  return (
    <Pressable style={({pressed})=>[styles.btn ,pressed && styles.pressed ]} onPress={onPress} >
      <Ionicons name={icon} size={size} color={color}  />
    </Pressable>
  )
}


const styles = StyleSheet.create({
    btn :{
        padding : 8,
        // margin : 4,
        justifyContent : "center",
        alignItems : "center"
    },
    pressed : {
        opacity : 0.75
    }
})


