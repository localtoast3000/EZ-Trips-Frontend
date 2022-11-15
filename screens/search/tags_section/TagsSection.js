import { View, Text, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import styles from './style.css';
import { inspect } from '../../../lib/inspector';

export default function TagsSection({ trips }) {
  const [tags, setTags] = useState([]);
  const [chosenTags, setChosenTags] = useState([]);

  useEffect(() => {
    let availableTags = [];
    trips.forEach((trip) => availableTags.push(...trip.tags));
    setTags(availableTags);
  }, [trips]);

  useEffect(() => {
    inspect(chosenTags);
  }, [chosenTags]);

  const addToChosenTags = (label) => {
    if (chosenTags.includes(label)) return;
    setChosenTags([...chosenTags, label]);
  };

  const removeFromChosenTags = (label) => {
    setChosenTags(chosenTags.filter((tag) => tag !== label));
  };

  return (
    <View style={styles.smavailableTagsection}>
      <Text style={styles.filterText}>What are you looking for?</Text>
      <Text style={{ fontFamily: 'txt', fontSize: 12, marginTop: 10 }}>
        Popular tags:
      </Text>
      <PopularTags
        add={addToChosenTags}
        remove={removeFromChosenTags}
        tags={tags}
      />
      <Text style={{ fontFamily: 'txt', fontSize: 12, marginTop: 10 }}>Your tags:</Text>
      <ChosenTags
        add={addToChosenTags}
        remove={removeFromChosenTags}
        chosenTags={chosenTags}
      />
    </View>
  );
}

function PopularTags({ add, remove, tags }) {
  return (
    <View style={styles.tagsContainer}>
      {tags.map((tag, i) => {
        if (i > 6) return;
        return (
          <Tag
            key={i}
            label={tag}
            disabled={true}
            onSelectChange={(label, selected) => {
              selected ? add(label) : remove(label);
            }}
          />
        );
      })}
    </View>
  );
}

function ChosenTags({ add, remove, chosenTags }) {
  return (
    <View style={styles.tagsContainer}>
      {chosenTags.map((tag, i) => {
        return (
          <Tag
            key={i}
            label={tag}
            onSelectChange={(label, selected) => {
              selected ? add(label) : remove(label);
            }}
          />
        );
      })}
    </View>
  );
}

function Tag({ label, disabled, onSelectChange = () => null }) {
  const [selected, setSelected] = useState(false);
  const [rendering, setRendering] = useState(true);

  useEffect(() => {
    if (rendering) return setRendering(false);
    onSelectChange(label, selected);
  }, [selected]);

  return (
    <TouchableOpacity
      onPress={() => {
        selected ? setSelected(false) : setSelected(true);
      }}
      style={
        disabled
          ? { ...styles.tags, backgroundColor: 'white' }
          : selected
          ? { ...styles.tags, backgroundColor: '#C46B4D' }
          : { ...styles.tags, backgroundColor: 'white' }
      }>
      <Text
        style={
          disabled
            ? { color: 'black' }
            : selected
            ? { color: 'white' }
            : { color: 'black' }
        }>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
