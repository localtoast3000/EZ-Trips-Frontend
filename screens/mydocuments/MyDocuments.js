import { ScrollView, View, Text, Linking, Image, TouchableOpacity } from 'react-native';
import { loadFonts } from '../../assets/fonts/fonts';
import BottomToolbar from '../../components/bottom-toolbar/bottom-toolbar';
import Contact from '../../components/icons/contact';
import SwipeLeftIcon from '../../components/icons/swipeleft';
import styles from './style.css';

export default function MyDocuments() {
  // A REMPLACER PAR UN FETCH
  const data = [
    {
      document: 'https://res.cloudinary.com/dxq6tt9ur/image/upload/v1667403204/JCVD_passeport_mz0zt0.pdf',
      titre: 'Passeport JCVD',
    },
    {
      document:
        'https://res.cloudinary.com/dxq6tt9ur/image/upload/v1666685046/grande-traversee-de-laltiplano-bolivien-2022_zfix4l.pdf',
      titre: 'Visa',
    },
    {
      document:
        'https://res.cloudinary.com/dxq6tt9ur/image/upload/v1666685046/grande-traversee-de-laltiplano-bolivien-2022_zfix4l.pdf',
      titre: 'Baggage checklist',
    },
    {
      document:
        'https://res.cloudinary.com/dxq6tt9ur/image/upload/v1666685046/grande-traversee-de-laltiplano-bolivien-2022_zfix4l.pdf',
      titre: 'Raya passeport',
    },
  ];
  const dataTravelAgencies = [
    {
      document: 'https://res.cloudinary.com/dxq6tt9ur/image/upload/v1667403204/JCVD_passeport_mz0zt0.pdf',
      titre: 'Itinerary',
    },
    {
      document:
        'https://res.cloudinary.com/dxq6tt9ur/image/upload/v1666685046/grande-traversee-de-laltiplano-bolivien-2022_zfix4l.pdf',
      titre: 'Invoice',
    },
  ];
  // FIN
  // --------------------- Pour appeler un numéro au clic sur contact EZ-TRIP ---------------------
  const dialCall = (number) => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);
  };

  //---------------- map documents  ----------------
  const mydocuments = data.map((data, i) => {
    return (
      <View style={styles.pdfContainer} key={i}>
        <TouchableOpacity onPress={() => Linking.openURL(data.document)}>
          <Image
            style={styles.pdfImage}
            source={{
              uri: 'https://blog.idrsolutions.com/wp-content/uploads/2020/10/pdf-1.png',
              width: 150,
              height: 150,
            }}
            alt={data.titre}
          />
        </TouchableOpacity>
        <Text style={styles.pdfDescription}>{data.titre.split(' ')[0]}</Text>
      </View>
    );
  });

  // ---------------- map TravelAgencyDocuments ----------------
  const travelAgencyDocuments = dataTravelAgencies.map((data, i) => {
    return (
      <View style={styles.pdfContainer} key={i}>
        <TouchableOpacity onPress={() => Linking.openURL(data.document)}>
          <Image
            style={styles.pdfImage}
            source={{
              uri: 'https://blog.idrsolutions.com/wp-content/uploads/2020/10/pdf-1.png',
              width: 150,
              height: 150,
            }}
            alt={data.titre}
          />
        </TouchableOpacity>
        <Text style={styles.pdfDescription}>{data.titre.split(' ')[0]}</Text>
      </View>
    );
  });

  //*FONT CODE
  const loadedFonts = loadFonts();
  if (!loadedFonts) return <></>;

  return (
    <>
      <View style={styles.container}>
        {/* ---------------- HEADER ---------------- */}
        <View style={styles.header}>
          <Text style={styles.title}>My documents</Text>
        </View>
        {/* ---------------- MY DOCUMENTS ---------------- */}
        <View style={styles.docContainer}>
          <Text style={styles.smallTitle}>Personal documents</Text>
          <View style={styles.borderie}></View>

          <ScrollView horizontal={true} style={styles.galleryContainer}>
            {mydocuments}
          </ScrollView>
          <View style={{ marginTop: -16, zIndex: 1, top: -120, left: 380 }}>
            <SwipeLeftIcon />
          </View>

          <View style={styles.addContainer}>
            <Text style={styles.addText}>Add a document</Text>

            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </View>

          {/* ---------------- DOCUMENTS FROM TRAVEL AGENCIES ---------------- */}
          <View style={styles.docContainer}>
            <Text style={styles.smallTitle}>Travel Agency documents</Text>
            <View style={styles.borderie}></View>
            <ScrollView horizontal={true} style={styles.galleryContainer}>
              {travelAgencyDocuments}
            </ScrollView>
            <View style={{ marginTop: -16, zIndex: 1, top: -120, left: 380 }}>
              <SwipeLeftIcon />
            </View>
          </View>
          <TouchableOpacity style={styles.contactLink} onPress={() => dialCall('0650388510')}>
            <Contact style={styles.contactLinkIcon} />
            <Text style={styles.contactLinkTxt}> Contact Travel Agency</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 180 }}></View>
      </View>
      <BottomToolbar />
    </>
  );
}
