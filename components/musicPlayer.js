import React, { useState } from "react";
import { View, Text, Image, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";

const MusicPlayer = ({ visible, onClose, title, artist }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0.4);

    return (
        <Modal visible={visible} animationType="slide" transparent={false}>
            <View style={styles.container}>
                {/* Close Button */}
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <Ionicons name="close" size={32} color="black" />
                </TouchableOpacity>

                {/* Song Art */}
                <Image
                    source={require("../assets/images/Simple_Music.png")}
                    style={styles.songArt}
                />

                {/* Song Title & Artist */}
                <Text style={styles.songTitle}>{title}</Text>
                <Text style={styles.songArtist}>{artist}</Text>

                {/* Progress Bar */}
                <Slider
                    style={styles.progressBar}
                    value={progress}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor="#1DB954"
                    maximumTrackTintColor="#ccc"
                    thumbTintColor="#1DB954"
                    onValueChange={(value) => setProgress(value)}
                />

                {/* Music Controls */}
                <View style={styles.controls}>
                    <TouchableOpacity>
                        <Ionicons name="play-skip-back" size={32} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setIsPlaying(!isPlaying)}>
                        <Ionicons
                            name={isPlaying ? "pause-circle" : "play-circle"}
                            size={60}
                            color="black"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Ionicons name="play-skip-forward" size={32} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f8f8",
        padding: 20,
    },
    closeButton: {
        position: "absolute",
        top: 40,
        right: 20,
    },
    songArt: {
        width: 250,
        height: 250,
        borderRadius: 10,
        marginBottom: 20,
    },
    songTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#333",
    },
    songArtist: {
        fontSize: 18,
        color: "#777",
        marginBottom: 20,
    },
    progressBar: {
        width: "80%",
        height: 40,
        marginBottom: 20,
    },
    controls: {
        flexDirection: "row",
        alignItems: "center",
        gap: 30,
    },
});

export default MusicPlayer;
