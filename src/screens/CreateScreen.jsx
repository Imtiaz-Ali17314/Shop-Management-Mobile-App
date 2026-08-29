import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

const CreateScreen = () => {
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
    </View>
  );
};

export default CreateScreen;

const styles = StyleSheet.create({
  container: {
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
});
