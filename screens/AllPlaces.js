import { useIsFocused } from "@react-navigation/native"
import React, { useEffect } from "react"
import { useState } from "react"
import { View, StyleSheet } from "react-native"
import PlacesList from "../components/places/PlacesList"

const AllPlaces = ({ route }) => {
  const [loadedPlaces, setLoadedPlaces] = useState([])
  const isFocused = useIsFocused()
  useEffect(() => {
    if (isFocused && route.params) {
      setLoadedPlaces((curentPlace) => [...curentPlace, route.params.place])
    }
  }, [isFocused, route])
  return <PlacesList  places={loadedPlaces} />
}

const styles = StyleSheet.create({})

export default AllPlaces
