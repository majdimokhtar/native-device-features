import { useNavigation } from "@react-navigation/native"
import React from "react"
import { View, StyleSheet, FlatList, Text } from "react-native"
import { Colors } from "../../constants/colors"
import PlaceItem from "./PlaceItem"

const PlacesList = ({ places }) => {
  const navigation = useNavigation()
  function selecePlaceHandler(id) {
    navigation.navigate("PlaceDetails", {
      placeId: id,
    })
  }
  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbacktext}>
          No places added yet - start add some !
        </Text>
      </View>
    )
  }
  return (
    <FlatList
      style={styles.list}
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PlaceItem place={item} onSelecet={selecePlaceHandler} />
      )}
    />
  )
}

const styles = StyleSheet.create({
  list: {
    margin: 24,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbacktext: {
    fontSize: 16,
    color: Colors.primary100,
  },
})

export default PlacesList
