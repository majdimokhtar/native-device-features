import React from "react"
import { View, StyleSheet, Pressable } from "react-native"
import { Colors } from "../../constants/colors"

const PlaceItem = ({ place, onSelecet }) => {
  return (
    <Pressable
      onPress={onSelecet.bind(this, place.id)}
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
    >
      <Image source={{ uri: place.ImageUri }} style={styles.image} />
      <View>
        <View style={styles.title}>{place.title} </View>
        <View style={styles.address}>{place.address} </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 6,
    marginVertical: 12,
    backgroundColor: Colors.accent500,
    elevation: 2,
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    flex: 1,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    height: 100,
  },
  info: {
    flex: 2,
    padding: 12,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: Colors.gray700,
  },
  address: {
    fontSize: 12,
    color: Colors.gray700,
  },
})

export default PlaceItem
