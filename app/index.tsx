import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CircularSlider from "./CircularSlider";
export default function Index() {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        {/* <InviteSlider /> */}
        <CircularSlider />
      </GestureHandlerRootView>
    </View>
  );
}
