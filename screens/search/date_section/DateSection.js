import { View, Text } from 'react-native';
import DateRangePicker from '../../../components/form_elements/date-range-picker/DateRangePicker';
import { useState, useEffect } from 'react';
import moment from 'moment';
import styles from './style.css';

export default function DateSection({ onDatesChange = () => null }) {
  const [dateRange, setDateRange] = useState([moment(), moment().add(10, 'days')]);

  useEffect(() => {
    onDatesChange(dateRange);
  }, [dateRange]);

  return (
    <View style={styles.calendarContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Dates</Text>
        <ValuesDisplay dateRange={dateRange} />
      </View>
      <DateRangePicker
        onSelectDateRange={(range) =>
          setDateRange([
            moment(new Date(range.firstDate)),
            moment(new Date(range.secondDate)),
          ])
        }
        backgroundColor='white'
        responseFormat='YYYY-MM-DD'
        minDate={moment()}
        maxDate={moment().add(1, 'years')}
      />
    </View>
  );
}

function ValuesDisplay({ dateRange }) {
  const difference = dateRange[1].diff(dateRange[0], 'days');

  return (
    <View>
      <View style={styles.valuesContainer}>
        <Text style={{ ...styles.dateValue, ...styles.firstDate }}>
          from <Text style={styles.boldValue}>{dateRange[0].format('DD/MM/YYYY')}</Text>
        </Text>
        <Text style={styles.dateValue}>
          to <Text style={styles.boldValue}>{dateRange[1].format('DD/MM/YYYY')}</Text>
        </Text>
      </View>
      <Text style={styles.durationValue}>
        Duration{' '}
        <Text style={styles.boldValue}>
          {difference} {difference === 1 ? 'day' : 'days'}
        </Text>
      </Text>
    </View>
  );
}
