import { useState, useEffect } from "react";
import { View, TextInput, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";

function AddSong({ visible, onAddSong, onCancel, existingSong }) {
    const [songTitle, setSongTitle] = useState("");
    const [songArtist, setSongArtist] = useState("");

    useEffect(() => {
        if (existingSong) {
            setSongTitle(existingSong.title);
            setSongArtist(existingSong.artist);
            setSongTitle("");
            setSongArtist("");
        } else {
            setSongTitle("");
            setSongArtist("");
        }
    }, [existingSong]);

    function addSongHandler() {
        if (!songTitle.trim() || !songArtist.trim()) return;
        onAddSong(songTitle, songArtist);
    }

    return (
        <Modal visible={visible} animationType="slide">
            <View style={styles.inputContainer}>
                <Text style={styles.textStyle}>Add to Playlist</Text>

                <TextInput
                    style={styles.textInput}
                    placeholder="Song Title"
                    onChangeText={setSongTitle}
                    value={songTitle}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Song Artist"
                    onChangeText={setSongArtist}
                    value={songArtist}
                />
                
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancel}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.addButton]} onPress={addSongHandler}>
                        <Text style={styles.buttonText}>{existingSong ? "Update" : "Add"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

export default AddSong;

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#0073CF",
    },
    textInput: {
        borderWidth: 1,
        borderColor: "#F6EFDD",
        backgroundColor: "#F6EFDD",
        color: "#120438",
        borderRadius: 6,
        width: "90%",
        padding: 12,
        marginBottom: 10,
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "90%",
        marginTop: 15,
    },
    button: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 6,
        alignItems: "center",
        marginHorizontal: 5,
    },
    cancelButton: {
        backgroundColor: "#b9cfd5",
    },
    addButton: {
        backgroundColor: "#5F909F",
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    textStyle: {
        color: "#F6EFDD",
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
});
