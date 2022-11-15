import { View, Text, TextInput } from 'react-native';
import { useState } from 'react';
import HorizontalRangeSlider from '../../../components/form_elements/HorizontalRangeSlider';
import styles from './style.css';

export default function BudgetSection() {
  const [minBudget, setMinBudget] = useState(0);
  const [maxBudget, setMaxBudget] = useState(8000);

  const budgetChange = (value) => {
    setMinBudget(value[0]);
    setMaxBudget(value[1]);
  };

  return (
    <View>
      <Text style={styles.filterText}>Budget</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 5,
        }}>
        <View>
          <Text>Min</Text>
          <TextInput placeholder='0'>{minBudget}</TextInput>
        </View>
        <View>
          <Text>Max</Text>
          <TextInput placeholder='8000'>{maxBudget}</TextInput>
        </View>
      </View>

      <HorizontalRangeSlider
        min={300}
        max={8000}
        step={100}
        minimumRange={50}
        onValueChange={budgetChange}
        overides={{
          outboundColor: 'grey',
          inboundColor: '#C46B4D',
          thumbTintColor: '#C46B4D',
          thumbStyle: { margin: 20 },
          trackHeight: 3,
          thumbSize: 16,
          style: { margin: 10 },
        }}
      />
    </View>
  );
}
