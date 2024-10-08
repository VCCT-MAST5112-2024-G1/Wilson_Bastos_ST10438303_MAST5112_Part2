// screens/HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

interface MenuItem {
  dishName: string;
  description: string;
  course: string;
  price: number;
}

export default function HomeScreen({ navigation, route }: HomeScreenProps) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const newItem = route.params?.newItem as MenuItem;
    if (newItem) {
      setMenuItems((prevItems) => [...prevItems, newItem]);
    }
  }, [route.params?.newItem]);

  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.menuItem}>
      <Text style={styles.menuItemText}>{item.dishName} - {item.course}</Text>
      <Text style={styles.descriptionText}>{item.description}</Text>
      <Text style={styles.priceText}>${item.price.toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chef's Menu</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddMenu')}>
        <Text style={styles.buttonText}>Add Menu</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FilterMenu')}>
        <Text style={styles.buttonText}>Filter Menu</Text>
      </TouchableOpacity>

      <Text style={styles.totalItemsText}>Total Items: {menuItems.length}</Text>

      <FlatList
        data={menuItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderMenuItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  button: {
    backgroundColor: '#ce1eff', 
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  totalItemsText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  menuItem: {
    borderBottomWidth: 4,
    borderColor: '#ce1eff', 
    paddingVertical: 15,
    width: '100%',
    paddingHorizontal: 10,
  },
  menuItemText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
  },
  descriptionText: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6347',
    marginTop: 5,
  },
});

