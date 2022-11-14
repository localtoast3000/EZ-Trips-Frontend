import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import ShowMore from 'react-native-show-more-button';
import styles from './style.css';

export default function ProgramSection({ trip }) {
  const [detailedProgram, setDetailedProgram] = useState(null);

  const programSetter = (data) => {
    detailedProgram ? setDetailedProgram(null) : setDetailedProgram(data.nbday);
  };
  const goodProgram = trip.program.find((e) => e.nbday === detailedProgram);
  let programDisplay = () => {
    return <View></View>;
  };
  if (goodProgram) {
    programDisplay = goodProgram.detailedProgram.map((day, i) => {
      return (
        <View key={i} style={styles.program}>
          <Text style={styles.programKey}>
            Day : <Text style={styles.programValue}>{day.day}</Text>
          </Text>
          <Text style={styles.programKey}>
            Activities : <Text style={styles.programValue}>{day.activities}</Text>
          </Text>
        </View>
      );
    });
  }

  const nbDaysButtons = trip.program.map((data, i) => {
    return (
      <TouchableOpacity
        onPress={() => programSetter(data)}
        style={styles.nbDaysModal}
        key={i}
      >
        <Text>{data.nbday} days</Text>
      </TouchableOpacity>
    );
  });

  return (
    <>
      <Text style={styles.programTitle}>Programs :</Text>
      <View style={styles.nbDaysContainer}>{nbDaysButtons}</View>
      <View>
        {detailedProgram ? (
          <ShowMore
            height={150}
            buttonColor={'#c46b4d'}
            showMoreText='Show more'
            showLessText='Show less'
          >
            {programDisplay}
          </ShowMore>
        ) : (
          <View></View>
        )}
      </View>
    </>
  );
}
