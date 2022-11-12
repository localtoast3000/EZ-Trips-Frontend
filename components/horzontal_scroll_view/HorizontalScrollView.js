import { ScrollView } from 'react-native';

export default function HorizontalScrollView({ style, children }) {
  return (
    <ScrollView horizontal={true} style={style}>
      {children}
    </ScrollView>
  );
}
