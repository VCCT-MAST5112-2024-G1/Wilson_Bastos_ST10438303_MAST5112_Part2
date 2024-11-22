import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type AddMenuScreenProps = NativeStackScreenProps<RootStackParamList, 'AddMenu'>;

export default function AddMenuScreen({ navigation, route }: AddMenuScreenProps) {
  const { menuItems } = route.params;
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('Starters');
  const [price, setPrice] = useState('');
  const [addedItems, setAddedItems] = useState(menuItems);  // Holds the list of added menu items

  const handleSubmit = () => {
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice)) {
      alert('Please enter a valid price.');
      return;
    }

    const newItem = { dishName, description, course, price: parsedPrice };
    const updatedMenuItems = [...addedItems, newItem];
    setAddedItems(updatedMenuItems);  // Update the state with the new item
    setDishName('');
    setDescription('');
    setPrice('');  // Clear input fields after submission
  };

  const handleRemoveItem = (index: number) => {
    const updatedMenuItems = addedItems.filter((_, i) => i !== index);
    setAddedItems(updatedMenuItems);  // Remove the item from the list
  };

  const handleSaveMenu = () => {
    navigation.navigate('Home', { menuItems: addedItems });  // Pass the updated list back to the Home screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Dish Name:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setDishName}
        value={dishName}
        placeholder="Enter dish name"
      />

      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setDescription}
        value={description}
        placeholder="Enter description"
        multiline
      />

      <Text style={styles.label}>Course:</Text>
      <View style={styles.courseContainer}>
        <TouchableOpacity
          style={[styles.courseButton, course === 'Starters' && styles.selectedButton]}
          onPress={() => setCourse('Starters')}
        >
          <Text style={styles.courseButtonText}>Starters</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.courseButton, course === 'Mains' && styles.selectedButton]}
          onPress={() => setCourse('Mains')}
        >
          <Text style={styles.courseButtonText}>Mains</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.courseButton, course === 'Desserts' && styles.selectedButton]}
          onPress={() => setCourse('Desserts')}
        >
          <Text style={styles.courseButtonText}>Desserts</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Price:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPrice}
        value={price}
        placeholder="Enter price"
        keyboardType="numeric"
      />

      <View style={styles.buttonContainer}>
        <Button title="Add Dish" onPress={handleSubmit} />
      </View>

      {/* Display the list of added items with the option to remove */}
      <Text style={styles.label}>Added Dishes:</Text>
      <FlatList
        data={addedItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.menuItem}>
            <Text style={styles.dishName}>{item.dishName} - {item.course}</Text>
            <Text>{item.description}</Text>
            <Text>${item.price.toFixed(2)}</Text>

            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => handleRemoveItem(index)}
            >
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSaveMenu}
      >
        <Text style={styles.saveButtonText}>Save Menu</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  courseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  courseButton: {
    backgroundColor: '#f207fa',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  courseButtonText: {
    color: 'white',
    fontSize: 16,
  },
  selectedButton: {
    backgroundColor: '#f207fa',
  },
  buttonContainer: {
    marginTop: 20,
  },
  menuItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  dishName: {
    fontSize: 18,
    fontWeight: '600',
  },
  removeButton: {
    marginTop: 10,
    backgroundColor: '#f207fa',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#f207fa',
    fontSize: 16,
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: '#f207fa',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

