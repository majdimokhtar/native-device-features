import MapView, { Marker } from "react-native-maps"
import { View, StyleSheet, Alert } from "react-native"
import { useState } from "react"
import { useLayoutEffect } from "react"
import IconBtn from "../components/UI/IconBtn"
import { useCallback } from "react"

const Map = ({ navigation, route }) => {
  const initLocation = route.params
  ? {
      lat: route.params.initialLat,
      lng: route.params.initialLng,
    }
  : null
  const [selectedLocation, setSelectedLocation] = useState(initLocation)

  const region = {
    latitude: initLocation ? initLocation.lat : 37.78,
    longitude: initLocation ? initLocation.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }
  function selectLocationHandler(event) {
    // console.log(event)
    const lat = event.nativeEvent.coordinate.latitude
    const lng = event.nativeEvent.coordinate.longitude
    setSelectedLocation({ lat: lat, lng: lng })
  }

  // fuction is used as dependency as another effect avoid infinit loop
  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "No location picked",
        "you have to pick a location by tapping on the map"
      )
      return
    }
    navigation.navigate("AddPlace", {
      pickedLat: selectedLocation.lat,
      picketLng: selectedLocation.lng,
    })
  }, [navigation, selectedLocation])

  useLayoutEffect(() => {
    if (initLocation) {
      return
    }
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconBtn
          icon="save"
          size={24}
          color={tintColor}
          onPress={savePickedLocationHandler}
        />
      ),
    })
  }, [navigation, savePickedLocationHandler,initLocation])
  return (
    <MapView
      initialRegion={region}
      style={styles.map}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker
          title="picked location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      )}
    </MapView>
  )
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
})

export default Map
