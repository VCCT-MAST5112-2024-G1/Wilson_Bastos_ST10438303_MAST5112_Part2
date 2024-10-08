import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'FilterMenu'>;

const FilterMenuScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <Text style={styles.header}>Filter Options</Text>
      <Text style={styles.subHeader}>Select your preferences</Text>
    </SafeAreaView>
  );
};

export default FilterMenuScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 26,
    fontWeight: '700',
    color: '#444',
    marginBottom: 12,
  },
  subHeader: {
    fontSize: 16,
    color: '#777',
    marginBottom: 25,
  },
});