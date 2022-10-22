import React from "react"
import { View, StyleSheet } from "react-native"
import PlaceForm from "../components/places/PlaceForm"
import { insertPlace } from "../util/database"

const AddPlace = ({ navigation }) => {
  async function createPlaceHandler(place) {
    await insertPlace(place)
    navigation.navigate("AllPlaces")
  }
  return <PlaceForm onCreatePlace={createPlaceHandler} />
}

const styles = StyleSheet.create({})

export default AddPlace
