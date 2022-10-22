import React from "react"
import { View, StyleSheet } from "react-native"
import PlaceForm from "../components/places/PlaceForm"

const AddPlace = ({ navigation }) => {
  function createPlaceHandler(place) {
    navigation.navigate("AllPlaces", {
      place: place,
    })
  }
  return <PlaceForm onCreatePlace={createPlaceHandler} />
}

const styles = StyleSheet.create({})

export default AddPlace
