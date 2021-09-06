import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import { getStatusBarHeight } from "react-native-status-bar-height";
const barHeight = getStatusBarHeight();

import AppLoading from "expo-app-loading";
import { useFonts, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { Roboto_400Regular, Roboto_500Medium } from "@expo-google-fonts/roboto";

import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomSheet from "react-native-simple-bottom-sheet";
import LottieView from "lottie-react-native";
import NFCScanner from "./src/services/NFCScanner";

import { Card } from "./src/components/Cards";
import { ModalSllides } from "./src/components/ModalSlides";

import Logo from "./src/assets/Logo.png";
import searchNFC from "./src/assets/searchnfc.json";
import errorNFC from "./src/assets/fail.json";
import successfulNFC from "./src/assets/successful.json";

export default function App() {
  const [showSlides, setShowSlides] = useState(true);
  const [showButtonTabsSupport, setShowButtonTabsSupport] = useState(false);
  const [showButtonTabsReader, setShowButtonTabsReader] = useState(false);
  const [support, setSupport] = useState(null);
  const [reader, setReader] = useState("");
  const panelRef = useRef(null);

  useEffect(() => {
    async function renderSlides() {
      const getStatusSlide = await AsyncStorage.getItem("@NGO:slides");
      const slides = JSON.parse(getStatusSlide);

      setShowSlides(slides);
    }

    renderSlides();
    supportNFC();
  }, []);

  async function supportNFC() {
    // Init NFC
    await NFCScanner.isEnabled();

    const support = await NFCScanner.Support();

    await new Promise(function (resolve, reject) {
      setTimeout(resolve, 2000);
    });

    setSupport(support);
  }

  async function readerNFC() {
    // Init NFC
    await NFCScanner.isEnabled();

    const tag = await NFCScanner.readTag();

    setReader(tag);
  }

  async function setShowSlidesInLocalStorage() {
    setShowSlides(false);

    await AsyncStorage.setItem("@NGO:slides", JSON.stringify(false));
  }

  let [fontsLoaded] = useFonts({
    Nunito_700Bold,
    Roboto_400Regular,
    Roboto_500Medium,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.Container}>
        <StatusBar style="light" backgroundColor="#3d3d3d" />
        <View style={styles.ContainerHeader}>
          <Image source={Logo} style={styles.Logo} />
          <Text style={styles.TitleHeader}>Teste NFC</Text>
        </View>

        <View style={styles.ContainerCards}>
          <Card
            icon={
              <MaterialCommunityIcons
                name="nfc-search-variant"
                size={35}
                color="#3d3d3d"
              />
            }
            onPressCard={() => {
              setShowButtonTabsReader(false);
              panelRef.current.togglePanel();
              setShowButtonTabsSupport(true);
            }}
            text="Testar suporte para NFC"
          />

          <Card
            icon={
              <MaterialCommunityIcons
                name="cellphone-nfc"
                size={35}
                color="black"
              />
            }
            onPressCard={() => {
              setShowButtonTabsSupport(false);
              panelRef.current.togglePanel();
              setShowButtonTabsReader(true);
            }}
            text="Testar leitura de NFC"
          />
        </View>

        {showSlides && (
          <ModalSllides
            onDone={() => {
              setShowSlidesInLocalStorage();
            }}
          />
        )}

        <BottomSheet children ref={(ref) => (panelRef.current = ref)}>
          {showButtonTabsSupport ? (
            <View style={styles.ContainerReaderNfc}>
              {support === true ? (
                <>
                  <LottieView
                    source={successfulNFC}
                    autoPlay
                    loop={false}
                    style={{ width: 200, height: 200 }}
                  />
                  <Text style={styles.TitleReaderNfc}>
                    O celular tem suporte !
                  </Text>
                </>
              ) : (
                support === false && (
                  <>
                    <LottieView
                      source={errorNFC}
                      autoPlay
                      loop={false}
                      style={{ width: 200, height: 200 }}
                    />
                    <Text style={styles.TitleReaderNfc}>
                      O celular não tem suporte!
                    </Text>
                  </>
                )
              )}
            </View>
          ) : (
            showButtonTabsReader && (
              <View style={styles.ContainerReaderNfc}>
                {reader !== "" ? (
                  <>
                    <Text style={styles.TitleReaderNfc}>
                      Seu nº NFC é: {`\n`}
                      {reader}{" "}
                    </Text>
                    <LottieView
                      source={successfulNFC}
                      autoPlay
                      loop={false}
                      style={{ width: 180, height: 180 }}
                    />
                  </>
                ) : (
                  <>
                    <Text style={styles.TitleReaderNfc}>
                      Aproxime o cartão na parte traseira do celular
                    </Text>
                    <LottieView
                      source={searchNFC}
                      autoPlay
                      loop
                      style={{ width: 180, height: 180 }}
                    />
                  </>
                )}
              </View>
            )
          )}
        </BottomSheet>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    marginTop: barHeight,
    backgroundColor: "#fff",
  },
  ContainerHeader: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#3d3d3d",
  },
  Logo: {
    marginRight: 15,
  },
  TitleHeader: {
    fontSize: 20,
    fontFamily: "Nunito_700Bold",
    color: "#FFF",
  },
  ContainerCards: {
    justifyContent: "center",
    alignItems: "center",
  },
  ContainerReaderNfc: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  TitleReaderNfc: {
    fontSize: 20,
    fontFamily: "Nunito_700Bold",
    textAlign: "center",
    color: "#3d3d3d",
  },
});
