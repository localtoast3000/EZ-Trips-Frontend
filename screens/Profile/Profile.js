import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import styles from './style.css';
import { loadFonts } from '../../assets/fonts/fonts';
import BottomToolbar from '../../components/bottom-toolbar/bottom-toolbar';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dismountUser, selectUser } from '../../reducers/user';
import Pencil from '../../components/icons/pencil';
import KeyboardAwareView from '../../components/keyboard_aware_view/KeyboardAwareView';

export default function Profile({ navigation }) {
  const { user } = useSelector(selectUser);
  const loadedFonts = loadFonts();
  const [emailVal, setEmailVal] = useState(user.email);
  const [birthDateVal, setBirthDateVal] = useState('26/02/1991');
  const [countryVal, setCountryVal] = useState('Belgium');
  const [emailEdit, setEmailEdit] = useState(false);
  const [birthDateEdit, setBirthDateEdit] = useState(false);
  const [countryEdit, setCountryEdit] = useState(false);
  const [imageEdit, setImageEdit] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  console.disableYellowBox = true;
  if (!loadedFonts) return <></>;

  return (
    <>
      <KeyboardAwareView
        style={styles.mainContainer}
        bottomPositionOnKeyboardOpen={200}
        active={keyboardOpen}
        onKeyboardOpen={() => setKeyboardOpen(true)}
        onKeyboardClose={() => setKeyboardOpen(false)}>
        <View style={styles.header}>
          <Text style={styles.username}>{user ? `${user.firstName} ${user.lastName}` : ''}</Text>
          <LogoutBtn navigation={navigation} />
        </View>

        <View style={{ ...styles.photoContainer, bottom: keyboardOpen ? 200 : 0 }}>
          <Image
            style={styles.photo}
            source={{
              uri: 'https://eijwvqaycbm.exactdn.com/wp-content/uploads/2012/09/Van-Damme-chien-1200x1799.jpg',
            }}
          />
          <TouchableOpacity
            onPress={() => (countryEdit ? setImageEdit(false) : setImageEdit(true))}
            style={{ ...styles.editBtn, ...styles.imageEdit, transform: [{ translateX: 80 }, { translateY: 80 }] }}>
            <Pencil style={styles.pencil} />
          </TouchableOpacity>
        </View>
        <View style={styles.userInfo}>
          <View style={styles.emailWrapper}>
            {!emailEdit ? (
              <Text style={styles.email}>{emailVal}</Text>
            ) : (
              <TextInput
                autoFocus
                style={{ ...styles.email, ...styles.textInput }}
                value={emailVal}
                onChangeText={setEmailVal}
              />
            )}
            <View style={styles.btnWrapper}>
              <TouchableOpacity
                style={styles.editBtn}
                onPress={() => (emailEdit ? setEmailEdit(false) : setEmailEdit(true))}>
                <Pencil style={styles.pencil} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.birthDateWrapper}>
            {!birthDateEdit ? (
              <Text style={styles.birthDate}>{birthDateVal}</Text>
            ) : (
              <TextInput
                autoFocus
                style={{ ...styles.birthDate, ...styles.textInput }}
                value={birthDateVal}
                onChangeText={setBirthDateVal}
              />
            )}
            <View style={styles.btnWrapper}>
              <TouchableOpacity
                style={styles.editBtn}
                onPress={() => (birthDateEdit ? setBirthDateEdit(false) : setBirthDateEdit(true))}>
                <Pencil style={styles.pencil} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.countryWrapper}>
            {!countryEdit ? (
              <Text style={styles.country}>{countryVal}</Text>
            ) : (
              <TextInput
                autoFocus
                style={{ ...styles.country, ...styles.textInput }}
                value={countryVal}
                onChangeText={setCountryVal}
              />
            )}
            <View style={styles.btnWrapper}>
              <TouchableOpacity
                style={styles.editBtn}
                onPress={() => (countryEdit ? setCountryEdit(false) : setCountryEdit(true))}>
                <Pencil style={styles.pencil} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ViewDocumentsBtn navigation={navigation} />
      </KeyboardAwareView>
      <View style={{ height: 70 }}></View>
      <BottomToolbar />
    </>
  );
}

function ViewDocumentsBtn({ navigation }) {
  return (
    <TouchableOpacity style={styles.documentBtn} onPress={() => navigation.navigate('MyDocuments')}>
      <Text style={styles.documentBtnTxt}>View documents</Text>
    </TouchableOpacity>
  );
}

function LogoutBtn({ navigation }) {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      style={styles.logoutBtn}
      onPress={() => {
        dispatch(dismountUser());
      }}>
      <Text style={styles.logoutBtnTxt}>Log out</Text>
    </TouchableOpacity>
  );
}
