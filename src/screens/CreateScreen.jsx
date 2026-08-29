import { useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CreateScreen = ({ data }) => {
  const [itemName, setItemName] = useState('');
  const [stockAmt, setStockAmt] = useState('');
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter an item name..."
        placeholderTextColor="#999"
        style={styles.input}
        value={itemName}
        onChangeText={setItemName}
      />

      <TextInput
        placeholder="Enter stock amount..."
        placeholderTextColor="#999"
        style={styles.input}
        value={stockAmt}
        onChangeText={setStockAmt}
        keyboardType="numeric"
      />

      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>ADD ITEM IN THE STOCK</Text>
      </Pressable>

      <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
        <Text style={styles.headingText}>All Items in the Stock</Text>

        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View
              style={[
                styles.itemContainer,
                { backgroundColor: item.stock < 20 ? '#ffcccc' : '#D7F6BF' },
              ]}
            >
              <Text style={styles.itemText}>{item.name}</Text>

              <View style={{ flexDirection: 'row', gap: 15 }}>
                <Text style={[styles.itemText, { marginEnd: 50 }]}>
                  {item.stock}
                </Text>

                <Text style={styles.itemText}>Edit</Text>
                <Text style={styles.itemText}>Delete</Text>
              </View>
            </View>
          )}
          contentContainerStyle={{ gap: 10 }}
        />
      </SafeAreaView>
    </View>
  );
};

export default CreateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: '4%',
    gap: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: '#72C37AFF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 7,
  },

  button: {
    backgroundColor: '#CABFEEFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },

  headingText: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 5,
    marginBottom: 15,
  },

  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 7,
  },

  itemText: {
    fontSize: 15,
  },
});
