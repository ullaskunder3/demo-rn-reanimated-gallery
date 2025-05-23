import { useState } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import Animated, {
  clamp,
  Extrapolation,
  FadeIn,
  FadeOut,
  interpolate,
  interpolateColor,
  runOnJS,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
const images = [
  "https://images.unsplash.com/photo-1636652283221-49892fed88f0?q=80&w=961&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1668877119549-ba556a4a09ff?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1670106461861-7c17b8b0c366?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YWJzdGFyY3R8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1549462124-fe3c8d10570c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGFic3RhcmN0fGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1678623947483-03a88c1ec08b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGFic3RhcmN0fGVufDB8fDB8fHww",
];
const { width } = Dimensions.get("screen");
const _itemSize = width * 0.24;
const _spacing = 12;
const _itemTotalSize = _itemSize + _spacing;

function CircularSlider() {
  const [activeImage, setActiveImage] = useState(0);
  const scrollX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((e) => {
    scrollX.value = clamp(
      e.contentOffset.x / _itemTotalSize,
      0,
      images.length - 1
    );
    const newActiveImage = Math.round(scrollX.value);
    if (activeImage !== newActiveImage) {
      runOnJS(setActiveImage)(newActiveImage);
    }
  });
  return (
    <View
      style={{ flex: 1, justifyContent: "flex-end", backgroundColor: "black" }}
    >
      <View style={[StyleSheet.absoluteFillObject]}>
        <Animated.Image
          key={`image-${activeImage}`}
          source={{ uri: images[activeImage] }}
          style={{ flex: 1 }}
          entering={FadeIn.duration(375)}
          exiting={FadeOut.duration(375)}
        />
      </View>
      <Animated.FlatList
        data={images}
        keyExtractor={(_, index) => String(index)}
        renderItem={({ item, index }) => {
          return (
            <CarosalItem imageUrl={item} index={index} scorllX={scrollX} />
          );
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 0, height: _itemSize * 2 }}
        onScroll={onScroll}
        scrollEventThrottle={1000 / 60}
        contentContainerStyle={{
          paddingHorizontal: (width - _itemSize) / 2,
          gap: _spacing,
        }}
        snapToInterval={_itemTotalSize}
        decelerationRate={"fast"}
      />
    </View>
  );
}

function CarosalItem({
  imageUrl,
  index,
  scorllX,
}: {
  imageUrl: string;
  index: number;
  scorllX: SharedValue<number>;
}) {
  const styleZ = useAnimatedStyle(() => {
    const scale = interpolate(
      scorllX.value,
      [index - 1, index, index + 1],
      [0.5, 1, 0.5],
      Extrapolation.CLAMP
    );

    const rotation = interpolate(
      scorllX.value,
      [index - 1, index, index + 1],
      [-25, 0, 25],
      Extrapolation.CLAMP
    );

    const opacity = interpolate(
      scorllX.value,
      [index - 1, index, index + 1],
      [0.7, 1, 0.7],
      Extrapolation.CLAMP
    );

    return {
      transform: [
        {
          translateY: interpolate(
            scorllX.value,
            [index - 1, index, index + 1],
            [_itemSize / 3, 0, _itemSize / 3]
          ),
        },
        { scale },
        { rotateZ: `${rotation}deg` },
      ],
      borderWidth: 3,
      borderColor: interpolateColor(
        scorllX.value,
        [index - 1, index, index + 1],
        ["transparent", "white", "transparent"]
      ),
      opacity,
    };
  });
  return (
    <Animated.View
      key={index}
      style={[
        {
          width: _itemSize,
          height: _itemSize,
          borderRadius: _itemSize / 2,
          backgroundColor: "black",
        },
        styleZ,
      ]}
    >
      <Image
        source={{ uri: imageUrl }}
        style={{
          flex: 1,
          borderRadius: _itemSize / 2,
        }}
      />
    </Animated.View>
  );
}

export default CircularSlider;
