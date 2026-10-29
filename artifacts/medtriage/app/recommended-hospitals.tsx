import React, { useMemo, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { Alert, Platform, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Eyebrow, IconButton, Pill, PrimaryButton, Screen, SecondaryButton, SurfaceCard } from '@/components/UI';
import { distanceInKm, Hospital, hospitals } from '@/constants/data';
import { useMedtriage } from '@/context/MedtriageContext';
import { useColors } from '@/hooks/useColors';

const BANGKOK_REFERENCE = { latitude: 13.7563, longitude: 100.5018 };

function topicFor(text: string) {
  const value = text.toLowerCase();
  if (['หอบ', 'หายใจ', 'แน่นหน้าอก', 'เจ็บหน้าอก', 'ไอ', 'ปอด'].some((word) => value.includes(word))) return 'central-chest-institute';
  if (['กระดูก', 'ข้อ', 'เข่า', 'หลัง', 'แขน', 'ขา', 'กล้ามเนื้อ'].some((word) => value.includes(word))) return 'lerdsin-orthopedics';
  if (['ชา', 'ชัก', 'ปวดหัว', 'ไมเกรน', 'เวียนหัว', 'ระบบประสาท'].some((word) => value.includes(word))) return 'neurological-institute';
  if (['เด็ก', 'ลูก', 'ทารก'].some((word) => value.includes(word))) return 'queen-sirikit-child';
  return null;
}

export default function RecommendedHospitalsScreen() {
  const colors = useColors();
  const { symptoms, bodyParts, location, setLocation, setSelectedHospital } = useMedtriage();
  const [locating, setLocating] = useState(false);
  const origin = location ?? BANGKOK_REFERENCE;
  const topic = topicFor(`${symptoms} ${bodyParts.join(' ')}`);
  const matches = useMemo(() => [...hospitals]
    .sort((a, b) => Number(b.id === topic) - Number(a.id === topic) || distanceInKm(origin, a) - distanceInKm(origin, b))
    .slice(0, 5), [location, topic]);

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
      if (!permission.granted) { Alert.alert('ยังไม่ได้รับตำแหน่ง', 'อนุญาตให้ใช้ตำแหน่งเพื่อคำนวณระยะทาง'); return; }
      const current = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      setLocation({ latitude: current.coords.latitude, longitude: current.coords.longitude });
    } catch { Alert.alert('ระบุตำแหน่งไม่ได้', 'ขณะนี้แสดงระยะทางตัวอย่างจากกรุงเทพฯ'); }
    finally { setLocating(false); }
  };

  return (
    <Screen contentStyle={styles.page}>
      <View style={styles.header}><IconButton icon="arrow-left" label="ย้อนกลับ" onPress={() => router.back()} /><View style={styles.headerCopy}><Eyebrow>จากข้อมูลอาการที่กรอก</Eyebrow><Text style={[styles.title, { color: colors.foreground }]}>เลือกโรงพยาบาล</Text></View><View style={{ width: 44 }} /></View>
      <View style={[styles.note, { backgroundColor: colors.secondary }]}><Feather name="info" size={16} color={colors.secondaryForeground} /><Text style={[styles.noteText, { color: colors.secondaryForeground }]}>รายการเป็นตัวอย่างจับคู่คำสำคัญ ไม่ใช่การวินิจฉัย · เรียงแห่งที่เกี่ยวข้องไว้ก่อน แล้วเรียงตามระยะทาง</Text></View>
      <View style={styles.locationRow}><View style={styles.locationCopy}><Text style={[styles.locationTitle, { color: colors.foreground }]}>{location ? 'ระยะทางจากตำแหน่งของคุณ' : 'ระยะทางตัวอย่างจากกรุงเทพฯ'}</Text><Text style={[styles.locationSubtitle, { color: colors.mutedForeground }]}>ระยะทางเส้นตรงโดยประมาณ</Text></View><SecondaryButton title={locating ? 'กำลังค้นหา' : 'ใช้ตำแหน่งฉัน'} icon="map-pin" onPress={() => void findLocation()} style={styles.locationButton} /></View>
      {matches.map((hospital) => {
        const km = distanceInKm(origin, hospital);
        return <SurfaceCard key={hospital.id} style={styles.card}>
          {hospital.photoUrl ? <Image source={{ uri: hospital.photoUrl }} contentFit="cover" style={styles.photo} /> : <View style={[styles.photoPlaceholder, { backgroundColor: colors.secondary }]}><Feather name="plus-square" size={30} color={colors.secondaryForeground} /><Text style={[styles.placeholderText, { color: colors.secondaryForeground }]}>ไม่มีภาพถ่ายในชุดตัวอย่าง</Text></View>}
          <View style={styles.nameRow}><View style={styles.nameCopy}><Text style={[styles.name, { color: colors.foreground }]}>{hospital.name}</Text><Text style={[styles.area, { color: colors.mutedForeground }]}>{hospital.area}</Text></View><Pill tone={hospital.kind === 'โรงพยาบาลรัฐ' ? 'blue' : 'teal'}>{hospital.kind === 'โรงพยาบาลรัฐ' ? 'รัฐ' : 'เอกชน'}</Pill></View>
          <View style={[styles.distanceRow, { backgroundColor: colors.secondary }]}><Feather name="map-pin" size={14} color={colors.secondaryForeground} /><Text style={[styles.distance, { color: colors.secondaryForeground }]}>{km < 1 ? `${Math.round(km * 1000)} เมตร` : `${km.toFixed(1)} กม.`} · {hospital.specialty}</Text></View>
          <View style={[styles.costBox, { backgroundColor: colors.background }]}><Text style={[styles.costLabel, { color: colors.mutedForeground }]}>ค่าใช้จ่ายโดยประมาณ (ตัวอย่าง)</Text><Text style={[styles.cost, { color: colors.foreground }]}>{hospital.cost}</Text><Text style={[styles.costNote, { color: colors.mutedForeground }]}>{hospital.costNote} · โปรดสอบถามโรงพยาบาลเพื่อยืนยัน</Text></View>
          <PrimaryButton title="เลือกโรงพยาบาลและจองคิว" icon="calendar" onPress={() => { setSelectedHospital(hospital); router.push({ pathname: '/booking', params: { hospitalId: hospital.id, mode: 'advance' } }); }} />
        </SurfaceCard>;
      })}
    </Screen>
  );
}

const styles = StyleSheet.create({ page: { gap: 14 }, header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, headerCopy: { alignItems: 'center', gap: 3 }, title: { fontSize: 18, fontWeight: '800' }, note: { borderRadius: 13, padding: 12, flexDirection: 'row', gap: 9, alignItems: 'flex-start' }, noteText: { flex: 1, fontSize: 11, lineHeight: 17, fontWeight: '600' }, locationRow: { flexDirection: 'row', alignItems: 'center', gap: 9 }, locationCopy: { flex: 1, gap: 3 }, locationTitle: { fontSize: 12, fontWeight: '700' }, locationSubtitle: { fontSize: 10 }, locationButton: { minHeight: 38, paddingHorizontal: 8 }, card: { gap: 11, padding: 14 }, photo: { height: 155, width: '100%', borderRadius: 15, backgroundColor: '#DCE9ED' }, photoPlaceholder: { height: 155, borderRadius: 15, alignItems: 'center', justifyContent: 'center', gap: 8 }, placeholderText: { fontSize: 11 }, nameRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 }, nameCopy: { flex: 1, gap: 3 }, name: { fontSize: 14, lineHeight: 20, fontWeight: '800' }, area: { fontSize: 10 }, distanceRow: { minHeight: 34, borderRadius: 11, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', gap: 7 }, distance: { flex: 1, fontSize: 11, fontWeight: '700' }, costBox: { padding: 11, borderRadius: 13, gap: 4 }, costLabel: { fontSize: 10 }, cost: { fontSize: 14, fontWeight: '800' }, costNote: { fontSize: 10, lineHeight: 15 } });
