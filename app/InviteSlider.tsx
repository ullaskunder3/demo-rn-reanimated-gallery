import { Marquee } from "@animatereactnative/marquee";
import { useState } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import Animated, { FadeIn, FadeOut, runOnJS, useAnimatedReaction, useSharedValue } from "react-native-reanimated";
const images = [
    "https://images.unsplash.com/photo-1636652283221-49892fed88f0?q=80&w=961&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1668877119549-ba556a4a09ff?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1670106461861-7c17b8b0c366?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YWJzdGFyY3R8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1549462124-fe3c8d10570c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGFic3RhcmN0fGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1678623947483-03a88c1ec08b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGFic3RhcmN0fGVufDB8fDB8fHww",
];

const { width } = Dimensions.get("window");
const _itemWidth = width * 0.62;
const _itemHeight = _itemWidth * 1.67
const _spacing = 16
const _itemSize = _itemWidth + _spacing
function InviteSlider() {
    const [activeImage, setActiveImage] = useState(0);
    const offset = useSharedValue(0);
    useAnimatedReaction(() => {
        const floatIndex = ((offset.value + width / 2) / _itemSize) % images.length;
        return Math.abs(Math.floor(floatIndex))
    }, (value) => {
        runOnJS(setActiveImage)(value)
    })
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "black" }}>
            <View style={[StyleSheet.absoluteFillObject, { opacity: 0.5 }]}>
                <Animated.Image key={`image-${activeImage}`} style={{ flex: 1 }} source={{
                    uri: images[activeImage]
                }} blurRadius={50} entering={FadeIn.duration(500)} exiting={FadeOut.duration(500)} />
            </View>
            <Marquee spacing={_spacing}
                position={offset}
            >
                <View style={{ flexDirection: "row", gap: _spacing }}>
                    {images.map((image, index) => (
                        <Item key={`image-${image}`} image={image} index={index} />
                    ))}
                </View>
            </Marquee>
        </View>
    )
}
function Item({ image, index }: { image: string, index: number }) {
    return (
        <View style={{
            width: _itemWidth,
            height: _itemHeight,
        }}>
            <Image source={{ uri: image }} style={{ flex: 1, borderRadius: 10 }} />
        </View>
    )
}
export default InviteSlider