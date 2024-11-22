import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type FilterMenuScreenProps = NativeStackScreenProps<RootStackParamList, 'FilterMenu'>;

export default function FilterMenuScreen({ navigation, route }: FilterMenuScreenProps) {
  const { menuItems } = route.params;
  const [selectedCourse, setSelectedCourse] = useState<string>('All');
  const [filteredItems, setFilteredItems] = useState(menuItems);

  // Sync filteredItems with menuItems on initial render or when menuItems change
  useEffect(() => {
    setFilteredItems(menuItems);
  }, [menuItems]);

  // Function to handle course selection and filter menu items
  const handleFilter = (course: string) => {
    setSelectedCourse(course);
    if (course === 'All') {
      setFilteredItems(menuItems);
    } else {
      const filtered = menuItems.filter((item) => item.course === course);
      setFilteredItems(filtered);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filter Menu</Text>

      {/* Buttons for filtering */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => handleFilter('All')} style={styles.button}>
          <Text style={styles.buttonText}>All Dish</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilter('Starters')} style={styles.button}>
          <Text style={styles.buttonText}>Starters</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilter('Mains')} style={styles.button}>
          <Text style={styles.buttonText}>Mains</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilter('Desserts')} style={styles.button}>
          <Text style={styles.buttonText}>Desserts</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>Selected Course: {selectedCourse}</Text>

      {/* Display filtered menu items */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text>{item.dishName} - {item.course}</Text>
            <Text>{item.description}</Text>
            <Text>${item.price.toFixed(2)}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#f207fa',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  menuItem: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    marginVertical: 5,
    width: '100%',
  },
});

