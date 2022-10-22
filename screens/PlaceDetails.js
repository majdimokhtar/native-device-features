import React, { useState } from "react"
import { View, StyleSheet, ScrollView, Image, Text } from "react-native"
import OutlineBtn from "../components/UI/OutlineBtn"
import { Colors } from "../constants/colors"
import { fetchPlaceDetails } from "../util/database"

const PlaceDetails = ({ route, navigation }) => {
  const [fetchPlace, setFetchPlace] = useState()
  function showOnMapHandler() {
    navigation.navigate("Map",{
      initialLat : fetchPlace.location.lat,
      initialLng : fetchPlace.location.lng
    })
  }
  const selectedPlaceId = route.params.placeId
  useEffect(() => {
    // use selectedPlaceId to fetch data
    async function loadPlaceData() {
      const place = await fetchPlaceDetails(selectedPlaceId)
      setFetchPlace(place)
      navigation.setOptions({
        title: place.title,
      })
    }
    loadPlaceData()
  }, [selectedPlaceId])

  if (!fetchPlace) {
    return (
      <View style={styles.fallBack}>
        <Text>loading Place Data.....</Text>
      </View>
    )
  }
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: fetchPlace.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchPlace.address} </Text>
        </View>
        <OutlineBtn icon="map" onPress={showOnMapHandler}>
          View On Map
        </OutlineBtn>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  fallBack: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
})

export default PlaceDetails
