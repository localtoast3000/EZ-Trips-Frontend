import { View, Text, TouchableOpacity } from 'react-native';
import DateRangePicker from '../../../components/form_elements/date-range-picker/DateRangePicker';
import { useState } from 'react';
import moment from 'moment';
import styles from './style.css';

export default function DateSection() {
  const [calendarVisible, setCalendarVisible] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  return (
    <View style={calendarVisible ? styles.bigCalendar : styles.smallCalendar}>
      <Text style={{ ...styles.headerLabel, ...styles.text }}>Departure dates</Text>
      <View style={styles.calendarValueSwitchesContainer}>
        <CalendarValueSwitch
          id='start'
          label='Start:'
          value={startDate}
          onPress={() => setCalendarVisible(() => !calendarVisible)}
        />
        <CalendarValueSwitch
          id='end'
          label='End:'
          value={endDate}
          onPress={() => setCalendarVisible(() => !calendarVisible)}
        />
      </View>

      {calendarVisible ? (
        <View style={styles.calendarContainer}>
          <DateRangePicker
            onSelectDateRange={(range) => {
              setStartDate(range.firstDate);
              setEndDate(range.secondDate);
              setCalendarVisible(false);
            }}
            backgroundColor='white'
            responseFormat='DD-MM-YYYY'
            maxDate={moment().add(3, 'years')}
            minDate={moment()}
          />
        </View>
      ) : (
        <></>
      )}
    </View>
  );
}

function CalendarValueSwitch({ id, label, value, onPress }) {
  return (
    <View style={{ ...styles.calendarValueSwitchWrapper, ...styles[id] }}>
      <Text style={{ ...styles.label, ...styles[`${id}Label`], ...styles.text }}>
        {label}
      </Text>
      <TouchableOpacity
        style={styles.pressArea}
        onPress={onPress}>
        <Text style={{ ...styles.text }}>{value}</Text>
      </TouchableOpacity>
    </View>
  );
}
