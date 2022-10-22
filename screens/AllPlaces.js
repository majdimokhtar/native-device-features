import { useIsFocused } from "@react-navigation/native"
import React, { useEffect } from "react"
import { useState } from "react"
import { View, StyleSheet } from "react-native"
import PlacesList from "../components/places/PlacesList"
import { fetchPlaces } from "../util/database"

const AllPlaces = ({ route }) => {
  const [loadedPlaces, setLoadedPlaces] = useState([])
  const isFocused = useIsFocused()
  useEffect(() => {
    async function loadPlaces() {
      const places = await fetchPlaces()
      setLoadedPlaces(places)
    }

    if (isFocused) {
      loadPlaces()
      // setLoadedPlaces((curentPlace) => [...curentPlace, route.params.place])
    }
  }, [isFocused])
  return <PlacesList places={loadedPlaces} />
}

const styles = StyleSheet.create({})

export default AllPlaces
