import { useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAvoidingView, Platform } from 'react-native';

const CreateScreen = ({ data }) => {
  const [itemName, setItemName] = useState('');
  const [stockAmt, setStockAmt] = useState('');
  const [itemsData, setItemsData] = useState(data);
  const [editingItemId, setEditingItemId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const validateInput = () => {
    if (!itemName || !stockAmt) {
      alert('Please enter both item name and stock amount.');
      return false;
    }
    if (isNaN(stockAmt) || parseInt(stockAmt) < 0) {
      alert('Please enter a valid stock amount (only numbers).');
      return false;
    }
    if (!isNaN(itemName)) {
      alert('Please enter a valid item name (letters only).');
      return false;
    }
    return true;
  };

  const handleAddItem = () => {
    setIsEdit(false);

    if (!validateInput()) {
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      name: itemName,
      stock: parseInt(stockAmt),
    };
    setItemsData([newItem, ...itemsData]);

    setItemName('');
    setStockAmt('');
  };

  const handleDelete = itemId => {
    const updatedItems = itemsData.filter(item => item.id !== itemId);
    setItemsData(updatedItems);
  };

  const handleEdit = itemId => {
    setIsEdit(true);
    const itemToEdit = itemsData.find(item => item.id === itemId);
    if (itemToEdit) {
      setItemName(itemToEdit.name);
      setStockAmt(itemToEdit.stock.toString());
      setEditingItemId(itemId);
    }
  };

  const handleUpdateItem = () => {
    if (!validateInput()) {
      return;
    }
    const updatedItems = itemsData.map(item => {
      if (item.id === editingItemId) {
        return { ...item, name: itemName, stock: parseInt(stockAmt) };
      }
      return item;
    });

    setItemsData(updatedItems);

    setIsEdit(false);
    setItemName('');
    setStockAmt('');
    setEditingItemId(null);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
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

          <TouchableOpacity
            style={styles.button}
            onPress={isEdit ? handleUpdateItem : handleAddItem}
          >
            <Text style={styles.buttonText}>
              {isEdit ? 'UPDATE ITEM' : 'ADD ITEM IN THE STOCK'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.headingText}>All Items in the Stock</Text>

          <FlatList
            data={itemsData}
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

                  <Pressable
                    style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
                    onPress={() => handleEdit(item.id)}
                  >
                    <Text style={styles.itemText}>Edit</Text>
                  </Pressable>
                  <Pressable
                    style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
                    onPress={() => handleDelete(item.id)}
                  >
                    <Text style={styles.itemText}>Delete</Text>
                  </Pressable>
                </View>
              </View>
            )}
            contentContainerStyle={{
              gap: 10,
              paddingBottom: 45,
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default CreateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: '#72C37AFF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 7,
  },

  button: {
    backgroundColor: '#CAA6EAFF',
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
