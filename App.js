import { useState } from "react";
import { View, FlatList, StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AddSong from "./components/addSong";
import SongItem from "./components/SongItem";

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [songList, setSongList] = useState([]);
  const [editingSong, setEditingSong] = useState(null);

  function startAppHandler() {
    setModalIsVisible(true);
  }

  function endAppHandler() {
    setModalIsVisible(false);
    setEditModalVisible(false);
  }

  function addSong(songTitle, songArtist) {
    setSongList((currentSongs) => [
      ...currentSongs,
      { title: songTitle, artist: songArtist, id: Math.random().toString() },
    ]);
    endAppHandler();
  }

  function deleteSongHandler(id) {
    setSongList((currentSongs) => currentSongs.filter((song) => song.id !== id));
  }

  function editSongHandler(song) {
    setEditingSong(song);
    setEditModalVisible(true);
  }

  function updateSongHandler(id, newTitle, newArtist) {
    setSongList((currentSongs) =>
      currentSongs.map((song) =>
        song.id === id ? { ...song, title: newTitle, artist: newArtist } : song
      )
    );
    endAppHandler();
  }

  return (
    <SafeAreaView style={styles.appContainer}>
      <View>
        <Text style={styles.appHeader}>Music Player App</Text>
      </View>

      <ScrollView style={styles.bodyContainer}>
        <AddSong visible={modalIsVisible} onAddSong={addSong} onCancel={endAppHandler} />
        {editingSong && (
          <AddSong
            visible={editModalVisible}
            onAddSong={(title, artist) => updateSongHandler(editingSong.id, title, artist)}
            onCancel={endAppHandler}
            existingSong={editingSong}
          />
        )}
        <FlatList
          data={songList}
          renderItem={({ item }) => (
            <SongItem
              title={item.title}
              artist={item.artist}
              id={item.id}
              onDeleteItem={deleteSongHandler}
              onEditItem={() => editSongHandler(item)}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </ScrollView>

      {/* Floating Add Button */}
      <TouchableOpacity style={styles.floatingButton} onPress={startAppHandler}>
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: "#F2F0EF",
  },

  bodyContainer: {
    paddingHorizontal: 10,
    paddingBottom: 80, // Add padding to avoid overlap with floating button
  },

  appHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
    backgroundColor: "#0073CF",
    color: "#FFFFFF",
    paddingVertical: 16,
  },

  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#5F909F",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },

  floatingButtonText: {
    fontSize: 30,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
