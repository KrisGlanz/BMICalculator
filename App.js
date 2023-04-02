import React, { Component } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const keyweight = '@MyApp:weight';
const keyheight = '@MyApp:height';
const keyresults = '@MyApp:results'

export default class App extends Component {
  state = {
    weight: '',
    height: '',
    results: '',
  };

  constructor(props){
    super(props);
    this.onLoad();
  }


  onWeightChange = (weight) => this.setState({ weight });
  onHeightChange = (height) => this.setState({ height });
  onLoad = async () => {
    try {
    const weight = await AsyncStorage.getItem(keyweight, weight);
    const height = await AsyncStorage.getItem(keyheight, height);
    const results = await AsyncStorage.getItem(keyresults, results);
    this.setState({ weight });
    this.setState({ height });
    this.setState({ results });
  } catch (error) {
    Alert.alert('Error', 'There was an error while loading the data');
  }
}

  onSave = async () => {
    const { weight, height } = this.state;
    const results = "Body Mass Index is " + ((weight/(height * height)) * 703).toFixed(1)
    this.setState({results});
    try {
      await AsyncStorage.setItem(keyweight, weight);
      await AsyncStorage.setItem(keyheight, height);
      await AsyncStorage.setItem(keyresults, results);
      Alert.alert('Saved', 'Successfully saved on device');
    } catch (error) {
      Alert.alert('Error', 'There was an error while saving the data');
    }
  }

  render() {
    const { results, weight, height } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.toolbar}>BMI Calculator</Text>
        <ScrollView style={styles.content}>
          <TextInput
            style={styles.input}
            onChangeText={this.onWeightChange}
            value={weight}
            placeholder="Weight in Pounds"
          />
          <TextInput
            style={styles.input}
            onChangeText={this.onHeightChange}
            value={height}
            placeholder="Height in Inches"
          />
          <TouchableOpacity 
           onPress={() => {this.onSave();}} style={styles.button}>
            <Text style={styles.textButton}>Compute BMI</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.preview}
            value={results}
            editable={false}
            multiline
          />
          <Text style={styles.text}>Assessing Your BMI {"\n"}
          {"\t"}Underweight: less than 18.5 {"\n"}
          {"\t"}Healthy: 18.5 to 24.9 {"\n"}
          {"\t"}Overweight: 25.0 to 29.9 {"\n"}
          {"\t"}Obese: 30.0 or higher
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  toolbar: {
    backgroundColor: '#f4511e',
    color: '#fff',
    textAlign: 'center',
    padding: 25,
    fontSize: 28,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 10,
  },
  preview: {
    backgroundColor: '#fff',
    flex: 1,
    height: 100,
    fontSize: 28,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#ecf0f1',
    borderRadius: 3,
    height: 40,
    padding: 5,
    marginBottom: 10,
    flex: 3,
    fontSize: 24,
  },
  button: {
    backgroundColor: '#34495e',
    padding: 10,
    borderRadius: 3,
    marginBottom: 30,
    alignItems: 'center',
  },
  textButton: {
    fontSize: 24,
    color: '#fff',
  },
  text: {
    fontSize: 20,
  }
});