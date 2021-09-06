import React, { useState } from "react";
import { StyleSheet, View, Modal, Text, Image } from "react-native";

import AppIntroSlider from "react-native-app-intro-slider";
import { FontAwesome5 } from "@expo/vector-icons";

const slides = [
  {
    key: 1,
    title: "Tutorial:",
    text: "Para testar se seu celular tem suporte para NFC, basta clicar nesse botão",
    image: require("../../assets/slide1.png"),
    backgroundColor: "#59b2ab",
  },
  {
    key: 2,
    title: "Tutorial:",
    text: "Caso teha suporte, ira aparecer um card assim:",
    image: require("../../assets/slide2.png"),
    backgroundColor: "#59b2ab",
  },
  {
    key: 3,
    title: "Tutorial:",
    text: "Caso seu celular tenha suporte,\nvocê pode testar a leitura do\nNFC clicando nesse botão. ",
    image: require("../../assets/slide3.png"),
    backgroundColor: "#22bcb5",
  },
];

export function ModalSllides({ onDone }) {
  const renderItem = ({ item }) => {
    return (
      <View>
        <Text style={styles.TextSlide}>{item.title}</Text>
        <Text style={styles.SubscriptionSlide}>{item.text}</Text>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <Image source={item.image} />
        </View>
      </View>
    );
  };

  const renderNextButton = () => {
    return (
      <View style={styles.ButtonCircle}>
        <FontAwesome5 name="arrow-right" size={22} color="#FECD38" />
      </View>
    );
  };

  const renderSkipButton = () => {
    return (
      <View style={{ marginTop: 10 }}>
        <Text style={{ fontSize: 19, fontFamily: "Roboto_400Regular" }}>
          Skip
        </Text>
      </View>
    );
  };

  const renderDoneButton = () => {
    return (
      <View style={styles.ButtonCircle}>
        <FontAwesome5 name="check" size={20} color="#FECD38" />
      </View>
    );
  };

  return (
    <Modal visible={true} transparent animationType="fade">
      <View style={styles.Background}>
        <View style={styles.Container}>
          <AppIntroSlider
            activeDotStyle={{ backgroundColor: "#FECD38" }}
            showSkipButton={true}
            renderItem={renderItem}
            renderNextButton={renderNextButton}
            renderSkipButton={renderSkipButton}
            renderDoneButton={renderDoneButton}
            data={slides}
            onDone={onDone}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  Background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3d3d3d5c",
  },
  Container: {
    height: 320,
    width: "80%",
    padding: 20,
    backgroundColor: "#FFF",
    borderRadius: 10,
  },
  TextSlide: {
    marginBottom: 5,
    fontSize: 24,
    fontFamily: "Nunito_700Bold",
  },
  SubscriptionSlide: {
    fontSize: 16,
    fontFamily: "Roboto_400Regular",
  },
  ButtonCircle: {
    width: 45,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3d3d3d",
    borderRadius: 50,
  },
});
