import { View, Text, Dimensions } from 'react-native';
import { useState } from 'react';
import HorizontalDoubleRangeSlider from '../../../components/form_elements/HorizontalDoubleRangeSlider';
import styles from './style.css';

const minRange = 300;
const maxRange = 8000;

export default function BudgetSection({ onBudgetChange = () => null }) {
  const [budgetRange, setBudgetRange] = useState([minRange, maxRange]);

  return (
    <View>
      <Text style={styles.header}>Budget</Text>
      <RangeDisplay budgetRange={budgetRange} />
      <SliderLabels />
      <HorizontalDoubleRangeSlider
        min={minRange}
        max={maxRange}
        step={100}
        length={Dimensions.get('window').width - 100}
        minDistance={20}
        onValuesChange={(values) => {
          setBudgetRange(values);
          onBudgetChange(values);
        }}
        overides={{
          containerStyle: {
            paddingHorizontal: 20,
            height: 40,
            width: '100%',
          },
          trackStyle: { backgroundColor: '#177861' },
          unselectedStyle: { backgroundColor: '#cacaca' },
          markerStyle: { backgroundColor: '#177861', transform: [{ scale: 1.2 }] },
          pressedMarkerStyle: { backgroundColor: '#177861' },
        }}
      />
    </View>
  );
}

function RangeDisplay({ budgetRange }) {
  return (
    <View style={styles.rangeDisplayWrapper}>
      <Text style={{ ...styles.rangeDisplayTxt, ...styles.firstRangeDisplay }}>
        between <Text style={styles.boldValue}>{budgetRange[0]} €</Text>
      </Text>
      <Text style={styles.rangeDisplayTxt}>
        and <Text style={styles.boldValue}>{budgetRange[1]} €</Text>
      </Text>
    </View>
  );
}

function SliderLabels() {
  return (
    <View style={styles.labelsContainer}>
      <Text style={styles.label}>{minRange} €</Text>
      <Text style={styles.label}>{maxRange} €</Text>
    </View>
  );
}
