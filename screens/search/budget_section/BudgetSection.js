import { View, Text, TextInput, ScrollView } from 'react-native';
import { useState } from 'react';
import HorizontalDoubleRangeSlider from '../../../components/form_elements/HorizontalDoubleRangeSlider';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import styles from './style.css';

export default function BudgetSection() {
  const [minBudget, setMinBudget] = useState(300);
  const [maxBudget, setMaxBudget] = useState(8000);
  const [rangeSliding, setRangeSliding] = useState(false);

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
        <Text>{minBudget} €</Text>
        <Text>{maxBudget} €</Text>
      </View>
      <View style={{ width: '100%', alignItems: 'center' }}>
        <HorizontalDoubleRangeSlider
          min={300}
          max={8000}
          step={100}
          length={230}
          minDistance={50}
          onValuesChange={(values) => console.log(values)}
          overides={{
            containerStyle: { paddingHorizontal: 20, height: 40 },
            trackStyle: { backgroundColor: '#177861' },
            unselectedStyle: { backgroundColor: '#cacaca' },
            markerStyle: { backgroundColor: '#177861', transform: [{ scale: 1.2 }] },
            pressedMarkerStyle: { backgroundColor: '#177861' },
          }}
        />
      </View>
    </View>
  );
}
