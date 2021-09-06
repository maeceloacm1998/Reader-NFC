import React from "react";
import {} from "react-native";
import NfcManager, { NfcTech } from "react-native-nfc-manager";

class NfcProxy {
  async Support() {
    const supported = await NfcManager.isSupported();
    if (supported) {
      await NfcManager.start();
    }
    return supported;
  }

  async isEnabled() {
    return NfcManager.isEnabled();
  }

  readTag = async () => {
    let tag = null;

    try {
      await NfcManager.requestTechnology([NfcTech.Ndef]);

      tag = await NfcManager.getTag();
      tag.ndefStatus = await NfcManager.ndefHandler.getNdefStatus();
      NfcManager.cancelTechnologyRequest().catch(() => 0);
    } catch (ex) {
      console.log(ex);
    }

    return tag;
  };
}

export default new NfcProxy();
