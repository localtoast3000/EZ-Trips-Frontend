import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import CrossBtn from '../../../components/close_button/CloseButton';
import styles from './style.css';
import Arrow from '../../../components/icons/swipeleft';
import { getData } from '../../../api/backend_request';

export default function TagsSection({ onTagListChange }) {
  const [tags, setTags] = useState(false);
  const [tagListModalVisible, setTagListModalVisible] = useState(false);
  const [selectedTag, setSelectedTag] = useState('Select a tag');
  const [chosenTags, setChosenTags] = useState([]);
  const [trips, setTrips] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getData('/trips');
      if (res.result) {
        setTrips(res.trips);
      } else console.log(res.error);
    })();
  }, []);

  useEffect(() => {
    onTagListChange(chosenTags);
  }, [chosenTags]);

  useEffect(() => {
    if (!trips) return;
    let availableTags = [];
    trips.forEach((trip) => {
      const tags = trip.tags.map((tag) => tag.replace('-', ' '));
      availableTags.push(...tags);
    });
    setTags([...new Set(availableTags)].sort());
  }, [trips]);

  const addToChosenTags = (label) => {
    if (chosenTags.includes(label) || label === 'Select a tag') return;
    setChosenTags([...chosenTags, label]);
  };

  const removeFromChosenTags = (label) => {
    setChosenTags(chosenTags.filter((tag) => tag !== label));
  };

  if (!tags) return <></>;

  return (
    <>
      <View style={styles.smavailableTagsection}>
        <Text style={styles.header}>Tags</Text>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => setTagListModalVisible(true)}
          style={styles.modalActivator}>
          <Text style={{ paddingLeft: 5, fontFamily: 'txt', top: 2 }}>{selectedTag}</Text>
          <Arrow
            scale={0.6}
            style={{ transform: [{ rotate: '90deg' }] }}
          />
        </TouchableOpacity>
        <View style={styles.popularTagsContainer}>
          <Text style={styles.tagsSetHeader}>Popular tags:</Text>
          <PopularTags
            chosenTags={chosenTags}
            add={addToChosenTags}
            remove={removeFromChosenTags}
            tags={tags}
          />
        </View>
        <View style={styles.yourTagsContainer}>
          <Text style={styles.tagsSetHeader}>Your tags:</Text>
          <ChosenTags
            add={addToChosenTags}
            remove={removeFromChosenTags}
            chosenTags={chosenTags}
          />
        </View>
      </View>
      <Modal
        transparent={true}
        presentationStyle={'overFullScreen'}
        visible={tagListModalVisible}
        animated={true}
        animationType={'fade'}
        statusBarTranslucent={true}>
        <View style={{ ...styles.modalContentContainer }}>
          <View style={{ ...styles.modalContentWrapper }}>
            <View style={styles.modalHeaderWrapper}>
              <Text style={styles.modalHeader}>Available Tags</Text>
              <CrossBtn
                style={styles.modalCloseBtn}
                iconColor={'black'}
                iconScale={0.5}
                onPress={() => setTagListModalVisible(false)}
              />
            </View>
            <ScrollView>
              {tags.map((tag, i) => (
                <TaglistItem
                  key={i}
                  tag={tag}
                  chosenTags={chosenTags}
                  onSelected={(value) => {
                    setSelectedTag(value);
                    addToChosenTags(value);
                  }}
                  onUnSelected={(value) => {
                    setSelectedTag('Select a tag');
                    removeFromChosenTags(value);
                  }}
                />
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}

function TaglistItem({
  tag,
  chosenTags,
  onSelected = () => null,
  onUnSelected = () => null,
}) {
  const [selected, setSelected] = useState(false);
  const [isChosen, setIsChosen] = useState(false);

  useEffect(() => {
    if (selected) return onSelected(tag);
    onUnSelected(tag);
  }, [selected]);

  useEffect(() => {
    if (chosenTags.includes(tag)) setIsChosen(true);
    else setIsChosen(false);
  }, [chosenTags]);

  return (
    <TouchableOpacity
      style={{
        ...styles.tagListItemBtn,
        backgroundColor: isChosen ? '#177861' : 'white',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: isChosen ? '#177861' : 'black',
      }}
      onPress={() => {
        setSelected(() => !selected);
      }}>
      <Text
        style={{
          ...styles.tagListItemTxt,
          color: isChosen ? 'white' : 'black',
        }}>
        {tag}
      </Text>
    </TouchableOpacity>
  );
}

function PopularTags({ chosenTags, add, remove, tags }) {
  return (
    <View style={styles.tagsContainer}>
      {[tags[2], tags[4], tags[6], tags[7], tags[10], tags[14]].map((tag, i) => {
        if (i > 6) return;
        return (
          <Tag
            key={i}
            label={tag}
            chosenTags={chosenTags}
            onSelected={(value) => {
              add(value);
            }}
            onUnSelected={(value) => {
              remove(value);
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
            chosenTags={chosenTags}
            yourTag={true}
            onYourTagPress={() => remove(tag)}
          />
        );
      })}
    </View>
  );
}

function Tag({
  chosenTags,
  label,
  yourTag = false,
  onYourTagPress = () => null,
  onSelected = () => null,
  onUnSelected = () => null,
}) {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (selected) onSelected(label);
    else onUnSelected(label);
  }, [selected]);

  useEffect(() => {
    if (chosenTags.includes(label)) {
      setSelected(true);
    } else setSelected(false);
  }, [chosenTags]);

  return (
    <TouchableOpacity
      style={{
        ...styles.tags,
        backgroundColor: selected ? '#177861' : 'white',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: selected ? '#177861' : 'black',
      }}
      onPress={() => {
        if (yourTag) {
          onYourTagPress(label);
          setSelected(false);
        } else setSelected(() => !selected);
      }}>
      <Text
        style={{
          ...styles.tagListItemTxt,
          color: selected ? 'white' : 'black',
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
