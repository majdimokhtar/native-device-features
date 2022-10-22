import React, { useState } from "react"
import { useCallback } from "react"
import { View, StyleSheet, Text, ScrollView, TextInput } from "react-native"
import { Colors } from "../../constants/colors"
import { Place } from "../../models/place"
import Button from "../UI/Button"
import ImagePicker from "./ImagePicker"
import LocationPicker from "./LocationPicker"

const PlaceForm = ({ onCreatePlace }) => {
  const [entredeTitle, setEntredTitle] = useState("")
  const [selectImage, setSelectImage] = useState()
  const [pickedLocation, setPickedLocation] = useState()
  function changeTitelHandler(entredText) {
    setEntredTitle(entredText)
  }
  function savePlaceHandler() {
    const placeDate = new Place(entredeTitle,selectImage,pickedLocation)
    onCreatePlace(placeDate)
  }

  function takeImageHandler(imageUri) {
    setSelectImage(imageUri)
  }
  const pickLocationHandler = useCallback((location) => {
    setPickedLocation(location)
  }, [])
  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>The Place Form</Text>
        <TextInput
          onChangeText={changeTitelHandler}
          value={entredeTitle}
          style={styles.input}
        />
      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
})

export default PlaceForm
