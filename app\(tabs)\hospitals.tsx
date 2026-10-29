import React, { useMemo, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { Alert, Linking, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Eyebrow, Screen, SecondaryButton, SurfaceCard } from '@/components/UI';
import { distanceInKm, Hospital, hospitals } from '@/constants/data';
import { useColors } from '@/hooks/useColors';
import { useMedtriage } from '@/context/MedtriageContext';

const BANGKOK_REFERENCE = { latitude: 13.7563, longitude: 100.5018 };

export default function HospitalsScreen() {
  const colors = useColors();
  const { location, setLocation, setSelectedHospital } = useMedtriage();
  const [locating, setLocating] = useState(false);
  const origin = location ?? BANGKOK_REFERENCE;
  const orderedHospitals = useMemo(() => [...hospitals]
    .filter((hospital) => hospital.photoUrl)
    .sort((a, b) => distanceInKm(origin, a) - distanceInKm(origin, b)), [location]);

  const findLocation = async () => {
    setLocating(true);
    try {
      if (Platform.OS === 'web') {
        if (!navigator.geolocation) throw new Error('NO_GEO');
        navigator.geolocation.getCurrentPosition(
          ({ coords }) => { setLocation({ latitude: coords.latitude, longitude: coords.longitude }); setLocating(false); },
          () => { Alert.alert('ยังไม่ได้รับตำแหน่ง', 'อนุญาตการเข้าถึงตำแหน่ง หรือลองอีกครั้งภายหลัง'); setLocating(false); },
          { enableHighAccuracy: true, timeout: 12000 },
        );
        return;
      }
      const permission = await Location.requestForegroundPermissionsAsync();
      if (!permission.granted) { Alert.alert('ยังไม่ได้รับตำแหน่ง', 'อนุญาตให้ใช้ตำแหน่งเพื่อเรียงโรงพยาบาลที่ใกล้ที่สุด'); return; }
      const current = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      setLocation({ latitude: current.coords.latitude, longitude: current.coords.longitude });
    } catch {
      Alert.alert('ระบุตำแหน่งไม่ได้', 'ลองอีกครั้งหรือเลือกดูรายชื่อจากตัวอย่างกรุงเทพฯ');
    } finally { setLocating(false); }
  };

  const openDirections = async (hospital: Hospital) => {
    const originParam = location ? `&origin=${location.latitude},${location.longitude}` : '';
    await Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${hospital.latitude},${hospital.longitude}${originParam}&travelmode=driving`);
  };
  const callHospital = async (phone: string) => Linking.openURL(`tel:${phone.replaceAll('-', '')}`);
  const bookHospital = (hospital: Hospital) => { setSelectedHospital(hospital); router.push({ pathname: '/booking', params: { hospitalId: hospital.id, mode: 'advance' } }); };

  return (
    <Screen contentStyle={styles.page}>
      <View style={styles.heading}>
        <Eyebrow>บริการสุขภาพใกล้คุณ</Eyebrow>
        <Text style={[styles.title, { color: colors.foreground }]}>โรงพยาบาลใกล้ฉัน</Text>
        <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>ดูจุดเด่น ระยะทาง และเบอร์ติดต่อของแต่ละแห่ง</Text>
      </View>
      <View style={styles.locationRow}>
        <View style={styles.locationCopy}>
          <Text style={[styles.locationTitle, { color: colors.foreground }]}>{location ? 'เรียงจากตำแหน่งของคุณ' : 'ระยะทางตัวอย่างในกรุงเทพฯ'}</Text>
          <Text style={[styles.locationSub, { color: colors.mutedForeground }]}>{location ? 'ระยะทางเส้นตรงโดยประมาณ' : 'เปิดตำแหน่งเพื่อคำนวณจากคุณ'}</Text>
        </View>
        <SecondaryButton title={locating ? 'กำลังค้นหา' : 'ตำแหน่งของฉัน'} icon="map-pin" onPress={() => void findLocation()} style={styles.locationButton} />
      </View>
      {orderedHospitals.map((hospital) => (
        <HospitalCard key={hospital.id} hospital={hospital} distance={distanceInKm(origin, hospital)} onDirections={() => void openDirections(hospital)} onCall={() => void callHospital(hospital.phone)} onBook={() => bookHospital(hospital)} />
      ))}
      <Text style={[styles.creditNote, { color: colors.mutedForeground }]}>ภาพถ่ายจาก Wikimedia Commons แสดงเครดิตและสัญญาอนุญาตใต้ภาพ</Text>
    </Screen>
  );
}

function HospitalCard({ hospital, distance, onDirections, onCall, onBook }: { hospital: Hospital; distance: number; onDirections: () => void; onCall: () => void; onBook: () => void }) {
  const colors = useColors();
  return (
    <SurfaceCard style={styles.card}>
      <Image source={{ uri: hospital.photoUrl }} contentFit="cover" style={styles.photo} />
      <Text style={[styles.credit, { color: colors.mutedForeground }]}>{hospital.photoCredit}</Text>
      <View style={styles.nameRow}>
        <View style={styles.nameCopy}>
          <Text style={[styles.name, { color: colors.foreground }]}>{hospital.name}</Text>
          <Text style={[styles.area, { color: colors.mutedForeground }]}>{hospital.area}</Text>
        </View>
        <View style={[styles.distancePill, { backgroundColor: colors.secondary }]}><Feather name="map-pin" size={12} color={colors.secondaryForeground} /><Text style={[styles.distance, { color: colors.secondaryForeground }]}>{distance < 1 ? `${Math.round(distance * 1000)} ม.` : `${distance.toFixed(1)} กม.`}</Text></View>
      </View>
      <View style={[styles.highlight, { backgroundColor: colors.accent }]}><Feather name="star" size={14} color={colors.accentForeground} /><Text style={[styles.highlightText, { color: colors.accentForeground }]}>{hospital.specialty}</Text></View>
      <Pressable onPress={onCall} style={styles.actionRow}><Feather name="phone" size={15} color={colors.secondaryForeground} /><Text style={[styles.actionText, { color: colors.secondaryForeground }]}>โทร {hospital.phone}</Text></Pressable>
      <Pressable onPress={onDirections} style={styles.actionRow}><Feather name="navigation" size={15} color={colors.secondaryForeground} /><Text style={[styles.actionText, { color: colors.secondaryForeground }]}>ดูเส้นทางใน Google Maps</Text><Feather name="external-link" size={13} color={colors.secondaryForeground} /></Pressable>
      <SecondaryButton title="จองคิวล่วงหน้า" icon="calendar" onPress={onBook} style={styles.bookButton} />
    </SurfaceCard>
  );
}

const styles = StyleSheet.create({
  page: { gap: 15 }, heading: { gap: 5 }, title: { fontSize: 25, fontWeight: '800' }, subtitle: { fontSize: 13, lineHeight: 20 },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 10 }, locationCopy: { flex: 1, gap: 3 }, locationTitle: { fontSize: 13, fontWeight: '700' }, locationSub: { fontSize: 11 }, locationButton: { minHeight: 40, paddingHorizontal: 10 },
  card: { gap: 11, padding: 14 }, photo: { width: '100%', height: 165, borderRadius: 15, backgroundColor: '#DCE9ED' }, credit: { fontSize: 9, marginTop: -7 }, nameRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 }, nameCopy: { flex: 1, gap: 3 }, name: { fontSize: 14, lineHeight: 20, fontWeight: '800' }, area: { fontSize: 11 }, distancePill: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 6, borderRadius: 12 }, distance: { fontSize: 10, fontWeight: '800' },
  highlight: { minHeight: 36, paddingHorizontal: 10, borderRadius: 11, flexDirection: 'row', alignItems: 'center', gap: 7 }, highlightText: { flex: 1, fontSize: 11, fontWeight: '700' }, actionRow: { minHeight: 30, flexDirection: 'row', alignItems: 'center', gap: 8 }, actionText: { flex: 1, fontSize: 12, fontWeight: '700' }, bookButton: { minHeight: 42, justifyContent: 'center' }, creditNote: { fontSize: 10, lineHeight: 15, textAlign: 'center' },
});
