import { useState } from 'react';
import { StyleSheet, View, Text, Pressable, Image, TouchableOpacity, Modal } from 'react-native';
import MusicPlayer from './musicPlayer';

function SongItem({ id, title, artist, onDeleteItem, onEditItem, onPlay }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [isPlayerVisible, setIsPlayerVisible] = useState(false);

    return (
        <View style={styles.songItem}>
            <Pressable onPress={() => setIsPlayerVisible(true)} android_ripple={{ color: '#9D9D9D' }} style={styles.pressable}>
                <Image
                    source={require("../assets/images/Simple_Music.png")}
                    style={styles.image}
                />
                <View style={styles.songDetails}>
                    <Text style={styles.songTitle}>{title}</Text>
                    <Text style={styles.songArtist}>{artist}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    {/* Play Button */}
                    <TouchableOpacity onPress={() => setIsPlayerVisible(true)}>
                        <Text style={styles.playButton}>▶️</Text>
                    </TouchableOpacity>

                    {/* 3-dot menu */}
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Text style={styles.menuButton}>⋮</Text>
                    </TouchableOpacity>
                </View>
            </Pressable>

            {/* Music Player Modal */}
            <MusicPlayer
                title={title}
                artist={artist}
                visible={isPlayerVisible}
                onClose={() => setIsPlayerVisible(false)}
            />

            {/* Modal for 3-dot menu */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Pressable onPress={() => { onEditItem(id); setModalVisible(false); }}>
                            <Text style={styles.modalOption}>Edit Song</Text>
                        </Pressable>
                        <Pressable onPress={() => { onDeleteItem(id); setModalVisible(false); }}>
                            <Text style={styles.modalOptionDelete}>Delete Song</Text>
                        </Pressable>
                        <Pressable onPress={() => setModalVisible(false)}>
                            <Text style={styles.modalOptionCancel}>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default SongItem;

const styles = StyleSheet.create({
    songItem: {
        borderRadius: 6,
        backgroundColor: '#FFF',
        marginTop: 10,
    },
    pressable: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    image: {
        width: 26,
        height: 26,
    },
    songDetails: {
        flex: 1,
        marginLeft: 10,
    },
    songTitle: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
    },
    songArtist: {
        color: '#AAA',
        fontSize: 14,
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    playButton: {
        fontSize: 20,
        color: '#000',
    },
    menuButton: {
        fontSize: 20,
        color: '#000',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 200,
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        width: '60%',
        color: '#000',
    },
    modalOption: {
        fontSize: 16,
        paddingVertical: 8,
    },
    modalOptionDelete: {
        fontSize: 16,
        paddingVertical: 8,
    },
    modalOptionCancel: {
        fontSize: 16,
        paddingVertical: 8,
    },
});
