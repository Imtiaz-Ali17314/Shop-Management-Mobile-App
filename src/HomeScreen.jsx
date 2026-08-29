import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import AllItemsScreen from './screens/AllItemsScreen';
import StockScreen from './screens/StockScreen';
import CreateScreen from './screens/CreateScreen';
import { ItemsData } from './data/itmesData';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  const [view, setView] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <View style={styles.btnContainer}>
        <Pressable
          style={[
            styles.button,
            view === 0 && { backgroundColor: '#72C37AFF' },
          ]}
          onPress={() => setView(0)}
        >
          <Text style={[styles.btnText, view === 0 && { color: 'white' }]}>
            All items
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.button,
            view === 1 && { backgroundColor: '#72C37AFF' },
          ]}
          onPress={() => setView(1)}
        >
          <Text style={[styles.btnText, view === 1 && { color: 'white' }]}>
            Low stock
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.button,
            view === 2 && { backgroundColor: '#72C37AFF' },
          ]}
          onPress={() => setView(2)}
        >
          <Text style={[styles.btnText, view === 2 && { color: 'white' }]}>
            Create
          </Text>
        </Pressable>
      </View>

      {view === 0 && <AllItemsScreen data={ItemsData} />}
      {view === 1 && (
        <StockScreen data={ItemsData.filter(item => item.stock < 20)} />
      )}
      {view === 2 && <CreateScreen data={ItemsData} />}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    padding: '4%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  btnContainer: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 10,
  },
  button: {
    paddingVertical: 3.5,
    paddingHorizontal: 10,
    borderRadius: 50,
    borderWidth: 0.5,
    borderColor: '#72C37AFF',
  },
  btnText: {
    color: '#72C37AFF',
    fontSize: 12,
  },
});
