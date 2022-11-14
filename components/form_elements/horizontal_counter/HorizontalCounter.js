import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './style.css';

export default function HorizontalCounter({
  label,
  initalValue = 0,
  notSmallerThanInital = false,
  noNegativeNumbers = false,
  onValueChange = () => null,
  containerStyles,
}) {
  const [value, setValue] = useState(initalValue);

  useEffect(() => {
    onValueChange(value);
  }, [value]);

  return (
    <View style={{ ...styles.mainContainer, ...containerStyles }}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.btnsWrapper}>
        <TouchableOpacity
          style={{
            ...styles.countButton,
            marginRight: 20,
          }}
          onPress={() =>
            setValue(() => {
              if (noNegativeNumbers) return value > 0 ? value - 1 : value;
              if (notSmallerThanInital) return value > initalValue ? value - 1 : value;
              value - 1;
            })
          }
        >
          <Text style={styles.btnTxt}>-</Text>
        </TouchableOpacity>
        <Text style={styles.value}>{value}</Text>
        <TouchableOpacity
          style={{
            ...styles.countButton,
            marginLeft: 20,
          }}
          onPress={() => setValue(() => value + 1)}
        >
          <Text style={styles.btnTxt}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
