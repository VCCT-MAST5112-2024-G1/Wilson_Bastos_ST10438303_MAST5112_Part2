import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation, route }: HomeScreenProps) {
  const [menuItems, setMenuItems] = useState<
    { dishName: string; description: string; course: string; price: number }[]
  >([]);
  const [filteredItems, setFilteredItems] = useState<{ dishName: string; description: string; course: string; price: number }[]>([]);

  useEffect(() => {
    if (route.params?.menuItems) {
      setMenuItems(route.params.menuItems)
    }
  }, [route.params?.menuItems]);

  // Function to calculate average price by course
  const calculateAveragePrices = () => {
    const averages: { [course: string]: number } = {};
    const counts: { [course: string]: number } = {};

    menuItems.forEach((item) => {
      if (!averages[item.course]) {
        averages[item.course] = 0;
        counts[item.course] = 0;
      }
      averages[item.course] += item.price;
      counts[item.course]++;
    });

    for (const course in averages) {
      averages[course] = averages[course] / counts[course];
    }

    return averages;
  };

  const averagePrices = calculateAveragePrices();


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chef's Menu</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AddMenu', { menuItems,})}
      >
        <Text style={styles.buttonText}>Add Menu</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('FilterMenu', { menuItems })}
      >
        <Text style={styles.buttonText}>Filter Menu</Text>
      </TouchableOpacity>

      <Text style={styles.totalItemsText}>Total Items: {menuItems.length}</Text>

      <View style={styles.averagesContainer}>
        <Text style={styles.averagesTitle}>Average Prices by Course:</Text>
        {Object.keys(averagePrices).map((course) => (
          <Text key={course} style={styles.averageText}>
            {course}: ${averagePrices[course].toFixed(2)}
          </Text>
        ))}
      </View>

      <FlatList
        data={menuItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.menuItemText}>
              {item.dishName} - {item.course}
            </Text>
            <Text style={styles.descriptionText}>{item.description}</Text>
            <Text style={styles.priceText}>${item.price.toFixed(2)}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f7',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  button: {
    backgroundColor: '#f207fa',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  totalItemsText: {
    fontSize: 18,
    fontWeight: '500',
    marginVertical: 10,
    color: '#555',
  },
  averagesContainer: {
    width: '100%',
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  averagesTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  averageText: {
    fontSize: 16,
    color: '#555',
    marginVertical: 5,
  },
  menuItem: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    marginVertical: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  menuItemText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#333',
  },
  descriptionText: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginTop: 5,
  },
});

