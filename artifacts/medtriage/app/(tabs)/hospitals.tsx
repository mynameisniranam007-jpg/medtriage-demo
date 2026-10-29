import React, { useMemo, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import * as Location from 'expo-location';
import {
  Alert,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Image } from 'expo-image';
import { BodyText, Eyebrow, Pill, Screen, SectionTitle, SecondaryButton, SurfaceCard } from '@/components/UI';
import { distanceInKm, Hospital, hospitals } from '@/constants/data';
import { useColors } from '@/hooks/useColors';
import { useMedtriage } from '@/context/MedtriageContext';

const BANGKOK_REFERENCE = { latitude: 13.7563, longitude: 100.5018 };
const HOSPITAL_PHOTOS: Record<string, string> = {
  chula: 'photo-1587351021759-3e566b6af7cc',
  samitivej: 'photo-1519494026892-80bbd2d6fd0d',
  medpark: 'photo-1516841273335-e39b37888115',
  'lerdsin-orthopedics': 'photo-1579684385127-1ef15d508118',
  'neurological-institute': 'photo-1586773860418-d37222d8fce3',
  'central-chest-institute': 'photo-1516549655169-df83a0774514',
  'queen-sirikit-child': 'photo-1631815588090-d4bfec5b1ccb',
};

export default function HospitalsScreen() {
  const colors = useColors();
  const { location, setLocation } = useMedtriage();
  const [locating, setLocating] = useState(false);

  const orderByDistance = (list: Hospital[]) =>
    [...list].sort(
      (a, b) =>
        distanceInKm(location ?? BANGKOK_REFERENCE, a) -
        distanceInKm(location ?? BANGKOK_REFERENCE, b),
    );
  const orderedGeneralHospitals = useMemo(
    () => orderByDistance(hospitals.filter((hospital) => hospital.category === 'general')).slice(0, 3),
    [location],
  );
  const orderedSpecialtyHospitals = useMemo(
    () => orderByDistance(hospitals.filter((hospital) => hospital.category === 'specialty')),
    [location],
  );

  const findLocation = async () => {
    setLocating(true);
    try {
      if (Platform.OS === 'web') {
        if (!navigator.geolocation) {
          Alert.alert('ไม่พบตำแหน่ง', 'อุปกรณ์นี้ไม่รองรับการระบุตำแหน่ง');
          return;
        }
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            setLocating(false);
          },
          () => {
            Alert.alert(
              'ยังไม่ได้รับตำแหน่ง',
              'อนุญาตการเข้าถึงตำแหน่ง หรือลองอีกครั้งภายหลังได้',
            );
            setLocating(false);
          },
          { enableHighAccuracy: true, timeout: 12000 },
        );
        return;
      }
      const permission = await Location.requestForegroundPermissionsAsync();
      if (!permission.granted) {
        Alert.alert(
          'ยังไม่ได้รับตำแหน่ง',
          permission.canAskAgain
            ? 'อนุญาตให้ใช้ตำแหน่งเพื่อเรียงโรงพยาบาลที่ใกล้ที่สุด'
            : 'เปลี่ยนสิทธิ์ตำแหน่งได้จากการตั้งค่าอุปกรณ์',
        );
        return;
      }
      const current = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setLocation({
        latitude: current.coords.latitude,
        longitude: current.coords.longitude,
      });
    } catch {
      Alert.alert('ระบุตำแหน่งไม่ได้', 'ลองอีกครั้งหรือเลือกโรงพยาบาลจากรายการ');
    } finally {
      setLocating(false);
    }
  };

  const openDirections = async (hospital: Hospital) => {
    const destination = `${hospital.latitude},${hospital.longitude}`;
    const origin = location
      ? `&origin=${location.latitude},${location.longitude}`
      : '';
    const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}${origin}&travelmode=driving`;
    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert('เปิดแผนที่ไม่ได้', 'ลองเปิด Google Maps จากอุปกรณ์ของคุณ');
    }
  };

  return (
    <Screen contentStyle={styles.page}>
      <View style={styles.heading}>
        <Eyebrow>บริการสุขภาพใกล้คุณ</Eyebrow>
        <Text style={[styles.title, { color: colors.foreground }]}>
          แนะนำโรงพยาบาลใกล้คุณ
        </Text>
        <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
          ดูความเชี่ยวชาญ สิ่งอำนวยความสะดวก และความหนาแน่นโดยประมาณ
        </Text>
      </View>

      <View style={[styles.costPanel, { backgroundColor: colors.primary }]}>
        <View style={styles.costIcon}>
          <Feather name="credit-card" size={20} color="#FFFFFF" />
        </View>
        <View style={styles.costCopy}>
          <Text style={styles.costTitle}>ประมาณการค่ารักษา</Text>
          <Text style={styles.costSubtitle}>โรงพยาบาลรัฐ · เอกชน</Text>
        </View>
        <Feather name="arrow-up-right" size={18} color="rgba(255,255,255,0.82)" />
        <View style={styles.costRangeRow}>
          <View style={styles.costType}>
            <Text style={styles.costLabel}>รัฐ</Text>
            <Text style={styles.costRange}>100–600 ฿</Text>
          </View>
          <View style={styles.costDivider} />
          <View style={styles.costType}>
            <Text style={styles.costLabel}>เอกชน</Text>
            <Text style={styles.costRange}>800–1,200 ฿</Text>
          </View>
        </View>
        <Text style={styles.costFinePrint}>
          ตัวอย่างเท่านั้น · ราคาจริงขึ้นอยู่กับแพทย์ ยา และบริการ
        </Text>
      </View>

      <View style={styles.locationRow}>
        <View style={styles.locationCopy}>
          <Text style={[styles.locationTitle, { color: colors.foreground }]}>
            {location ? 'เรียงตามตำแหน่งของคุณ' : 'แสดงตัวอย่างในกรุงเทพฯ'}
          </Text>
          <Text style={[styles.locationSub, { color: colors.mutedForeground }]}>
            {location
              ? 'ระยะทางเส้นตรงโดยประมาณจากตำแหน่งของคุณ'
              : 'ระยะทางตัวอย่างจากใจกลางกรุงเทพฯ · เปิดตำแหน่งเพื่อคำนวณจากคุณ'}
          </Text>
        </View>
        <SecondaryButton
          title={locating ? 'กำลังค้นหา' : 'ตำแหน่งของฉัน'}
          icon="map-pin"
          onPress={() => void findLocation()}
          testID="find-my-location"
          style={styles.locationButton}
        />
      </View>

      <View style={[styles.mapsNotice, { backgroundColor: colors.secondary }]}>
        <Feather name="navigation" size={15} color={colors.secondaryForeground} />
        <Text style={[styles.mapsNoticeText, { color: colors.secondaryForeground }]}>
          เส้นทางและสภาพจราจรล่าสุดจะเปิดใน Google Maps
        </Text>
      </View>

      <SectionTitle
        title="โรงพยาบาลทั่วไป"
        detail="3 แห่งแรกเรียงตามระยะทางใกล้ที่สุด"
      />
      {orderedGeneralHospitals.map((hospital) => (
        <HospitalCard
          key={hospital.id}
          hospital={hospital}
          distance={distanceInKm(location ?? BANGKOK_REFERENCE, hospital)}
          onDirections={() => void openDirections(hospital)}
        />
      ))}

      <SectionTitle
        title="โรงพยาบาลเฉพาะทาง"
        detail="ความเชี่ยวชาญและช่องทางติดต่อ"
      />
      {orderedSpecialtyHospitals.map((hospital) => (
        <HospitalCard
          key={hospital.id}
          hospital={hospital}
          distance={distanceInKm(location ?? BANGKOK_REFERENCE, hospital)}
          onDirections={() => void openDirections(hospital)}
        />
      ))}

      <View style={[styles.disclaimer, { borderColor: colors.border }]}>
        <Feather name="info" size={15} color={colors.mutedForeground} />
        <BodyText style={styles.disclaimerText}>
          ค่าใช้จ่ายเป็นเพียงการประมาณการ ไม่ใช่ราคาเสนอหรือสิทธิ์รักษาที่ยืนยันแล้ว กรุณาตรวจสอบกับโรงพยาบาลก่อนเข้ารับบริการ
        </BodyText>
      </View>
    </Screen>
  );
}

function HospitalCard({
  hospital,
  distance,
  onDirections,
}: {
  hospital: Hospital;
  distance: number | null;
  onDirections: () => void;
}) {
  const colors = useColors();
  const isPublic = hospital.kind === 'โรงพยาบาลรัฐ';
  return (
    <SurfaceCard style={styles.hospitalCard}>
      <View style={styles.hospitalPhotoWrap}>
        <Image source={{uri:`https://images.unsplash.com/${HOSPITAL_PHOTOS[hospital.id] ?? HOSPITAL_PHOTOS.chula}?w=1000&auto=format&fit=crop&q=80`}} contentFit="cover" style={styles.hospitalPhoto}/>
        <View style={styles.photoLabel}><Text style={styles.photoLabelText}>ภาพประกอบ</Text></View>
      </View>
      <View style={styles.hospitalHeader}>
        <View style={[styles.hospitalIcon, { backgroundColor: isPublic ? colors.secondary : colors.accent }]}>
          <Feather name={isPublic ? 'home' : 'plus-square'} size={20} color={isPublic ? colors.secondaryForeground : colors.accentForeground} />
        </View>
        <View style={styles.hospitalTitleCopy}>
          <Text style={[styles.hospitalName, { color: colors.foreground }]}>
            {hospital.name}
          </Text>
          <Text style={[styles.hospitalArea, { color: colors.mutedForeground }]}>
            {hospital.area}
          </Text>
        </View>
        <Pill tone={isPublic ? 'blue' : 'teal'}>{isPublic ? 'รัฐ' : 'เอกชน'}</Pill>
      </View>

      <View style={styles.specialtyRow}>
        <Feather name="user-check" size={15} color={colors.secondaryForeground} />
        <Text style={[styles.specialtyText, { color: colors.secondaryForeground }]}>
          {hospital.specialty} · {hospital.department}
        </Text>
      </View>

      <View style={styles.phoneRow}>
        <Feather name="phone" size={14} color={colors.secondaryForeground} />
        <Text style={[styles.phoneText, { color: colors.secondaryForeground }]}>
          {hospital.phone}
        </Text>
      </View>

      <View style={[styles.hospitalCostBox,{backgroundColor:colors.background}]}>
        <Text style={[styles.hospitalCostLabel,{color:colors.mutedForeground}]}>จุดเด่นและสิ่งอำนวยความสะดวก</Text>
        <Text style={[styles.facilityText,{color:colors.foreground}]}>{hospital.category==='specialty'?hospital.specialty:`${hospital.specialty} · ร้านสะดวกซื้อ · ร้านอาหาร · ร้านกาแฟ · จุดรับส่งผู้ป่วย`}</Text>
      </View>
      <View style={[styles.crowdBox,{backgroundColor:colors.secondary}]}>
        <Feather name="users" size={15} color={colors.secondaryForeground}/>
        <Text style={[styles.crowdText,{color:colors.secondaryForeground}]}>จำนวนผู้ใช้บริการตอนนี้: {hospital.id==='chula'?'หนาแน่น':hospital.id==='samitivej'?'ปานกลาง':'ไม่หนาแน่น'} (ข้อมูลจำลอง)</Text>
      </View>

      <View style={[styles.hospitalCostBox, { backgroundColor: colors.background }]}>
        <View style={styles.hospitalCostHeading}>
          <Text style={[styles.hospitalCostLabel, { color: colors.mutedForeground }]}>
            ค่าใช้จ่ายโดยประมาณ
          </Text>
          {distance !== null ? (
            <Text style={[styles.distanceText, { color: colors.secondaryForeground }]}>
              {distance < 1 ? `${Math.round(distance * 1000)} ม.` : `${distance.toFixed(1)} กม.`}
            </Text>
          ) : null}
        </View>
        <Text style={[styles.hospitalCost, { color: colors.foreground }]}>
          {hospital.cost}
        </Text>
        <Text style={[styles.hospitalCostNote, { color: colors.mutedForeground }]}>
          {hospital.costNote}
        </Text>
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={onDirections}
        testID={`directions-${hospital.id}`}
        style={({ pressed }) => [styles.directionsLink, { opacity: pressed ? 0.7 : 1 }]}
      >
        <Feather name="navigation" size={16} color={colors.secondaryForeground} />
        <Text style={[styles.directionsText, { color: colors.secondaryForeground }]}>
          ดูเส้นทางและการจราจรใน Google Maps
        </Text>
        <Feather name="external-link" size={14} color={colors.secondaryForeground} />
      </Pressable>

    </SurfaceCard>
  );
}

const styles = StyleSheet.create({
  page: { gap: 17 },
  heading: { gap: 5 },
  title: { fontSize: 25, fontWeight: '800' },
  subtitle: { fontSize: 13, lineHeight: 20 },
  costPanel: { borderRadius: 23, padding: 17, flexDirection: 'row', alignItems: 'center', gap: 10, flexWrap: 'wrap' },
  costIcon: { width: 38, height: 38, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.16)' },
  costCopy: { flex: 1 },
  costTitle: { color: '#FFFFFF', fontSize: 15, fontWeight: '800' },
  costSubtitle: { color: 'rgba(255,255,255,0.72)', fontSize: 11, marginTop: 3 },
  costRangeRow: { flexDirection: 'row', width: '100%', marginTop: 6, gap: 17 },
  costType: { flex: 1, gap: 4 },
  costDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.3)' },
  costLabel: { color: 'rgba(255,255,255,0.72)', fontSize: 11 },
  costRange: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
  costFinePrint: { width: '100%', color: 'rgba(255,255,255,0.7)', fontSize: 10, marginTop: 0 },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  locationCopy: { flex: 1, gap: 3 },
  locationTitle: { fontSize: 13, fontWeight: '700' },
  locationSub: { fontSize: 11, lineHeight: 16 },
  locationButton: { minHeight: 40, paddingHorizontal: 10 },
  mapsNotice: { minHeight: 39, paddingHorizontal: 11, borderRadius: 12, flexDirection: 'row', alignItems: 'center', gap: 8 },
  mapsNoticeText: { flex: 1, fontSize: 11, lineHeight: 16, fontWeight: '600' },
  hospitalCard: { gap: 13, padding: 15 },
  hospitalPhotoWrap:{height:150,borderRadius:17,overflow:'hidden',position:'relative'},
  hospitalPhoto:{width:'100%',height:'100%',backgroundColor:'#DCE9ED'},
  photoLabel:{position:'absolute',bottom:8,right:8,backgroundColor:'rgba(0,0,0,0.56)',paddingHorizontal:8,paddingVertical:4,borderRadius:10},
  photoLabelText:{color:'#FFFFFF',fontSize:9,fontWeight:'700'},
  facilityText:{fontSize:11,lineHeight:17},
  crowdBox:{minHeight:38,paddingHorizontal:10,borderRadius:12,flexDirection:'row',alignItems:'center',gap:7},
  crowdText:{flex:1,fontSize:10,lineHeight:15,fontWeight:'700'},
  hospitalHeader: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  hospitalIcon: { width: 40, height: 40, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  hospitalTitleCopy: { flex: 1, gap: 3 },
  hospitalName: { fontSize: 13, lineHeight: 19, fontWeight: '800' },
  hospitalArea: { fontSize: 11 },
  specialtyRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 7 },
  specialtyText: { flex: 1, fontSize: 11, lineHeight: 17, fontWeight: '600' },
  phoneRow: { minHeight: 32, flexDirection: 'row', alignItems: 'center', gap: 7 },
  phoneText: { fontSize: 12, fontWeight: '700' },
  hospitalCostBox: { padding: 11, borderRadius: 13, gap: 4 },
  hospitalCostHeading: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
  hospitalCostLabel: { fontSize: 10 },
  distanceText: { fontSize: 10, fontWeight: '700' },
  hospitalCost: { fontSize: 16, fontWeight: '800' },
  hospitalCostNote: { fontSize: 10, lineHeight: 15 },
  directionsLink: { flexDirection: 'row', alignItems: 'center', gap: 8, minHeight: 34 },
  directionsText: { flex: 1, fontSize: 11, fontWeight: '700' },
  disclaimer: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, borderTopWidth: 1, paddingTop: 13 },
  disclaimerText: { flex: 1, fontSize: 11, lineHeight: 17 },
});
