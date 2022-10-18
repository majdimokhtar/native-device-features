import React from "react"
import { View, StyleSheet, Pressable } from "react-native"

const PlaceItem = ({ place ,onSelecet }) => {
  return (
    <Pressable onPress={onSelecet} >
      <Image source={{ uri: place.ImageUri }} />
      <View>
        <View>{place.title} </View>
        <View>{place.address} </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    
})

export default PlaceItem
