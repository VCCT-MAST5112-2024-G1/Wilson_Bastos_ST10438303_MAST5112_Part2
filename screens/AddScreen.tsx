import React, { useReducer } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

const courses = ['Starters', 'Mains', 'Desserts'];

type AddMenuScreenProps = NativeStackScreenProps<RootStackParamList, 'AddMenu'>;

type State = {
  dishName: string;
  description: string;
  course: string;
  price: string;
};

type Action =
  | { type: 'SET_DISH_NAME'; payload: string }
  | { type: 'SET_DESCRIPTION'; payload: string }
  | { type: 'SET_COURSE'; payload: string }
  | { type: 'SET_PRICE'; payload: string };

const initialState: State = {
  dishName: '',
  description: '',
  course: courses[0],
  price: '',
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_DISH_NAME':
      return { ...state, dishName: action.payload };
    case 'SET_DESCRIPTION':
      return { ...state, description: action.payload };
    case 'SET_COURSE':
      return { ...state, course: action.payload };
    case 'SET_PRICE':
      return { ...state, price: action.payload };
    default:
      return state;
  }
}

export default function AddMenuScreen({ navigation }: AddMenuScreenProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = () => {
    const { dishName, description, course, price } = state;
    if (!dishName || !description || !price) {
      alert("Please fill in all fields.");
      return;
    }
    const newItem = { dishName, description, course, price: parseFloat(price) };
    navigation.navigate('Home', { newItem });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Dish Name:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => dispatch({ type: 'SET_DISH_NAME', payload: text })}
        value={state.dishName}
        placeholder="Enter dish name"
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => dispatch({ type: 'SET_DESCRIPTION', payload: text })}
        value={state.description}
        placeholder="Enter description"
        placeholderTextColor="#999"
        multiline
      />

      <Text style={styles.label}>Course:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={state.course}
          onValueChange={(itemValue) => dispatch({ type: 'SET_COURSE', payload: itemValue })}
          style={styles.picker}
        >
          {courses.map((course) => (
            <Picker.Item key={course} label={course} value={course} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Price:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => dispatch({ type: 'SET_PRICE', payload: text })}
        value={state.price}
        placeholder="Enter price"
        placeholderTextColor="#999"
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Add Dish</Text>
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
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    fontSize: 16,
    borderRadius: 5,
    marginBottom: 15,
    color: '#333',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
  },
  picker: {
    height: 50,
    color: '#333',
  },
  button: {
    backgroundColor: '#ce1eff',
    paddingVertical: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
});