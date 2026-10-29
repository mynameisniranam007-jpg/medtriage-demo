import React, { useMemo } from 'react';
import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Eyebrow, IconButton, PrimaryButton, Screen, SurfaceCard } from '@/components/UI';
import { Hospital, hospitals } from '@/constants/data';
import { useMedtriage } from '@/context/MedtriageContext';
import { useColors } from '@/hooks/useColors';

function recommend(text: string): Hospital[] {
  const value = text.toLowerCase();
  const match = (words: string[]) => words.some((word) => value.includes(word));
  if (match(['หอบ', 'หายใจ', 'แน่นหน้าอก', 'เจ็บหน้าอก', 'ไอ', 'ปอด'])) return [hospitals.find((h) => h.id === 'central-chest-institute')!];
  if (match(['กระดูก', 'ข้อ', 'เข่า', 'หลัง', 'แขน', 'ขา', 'กล้ามเนื้อ'])) return [hospitals.find((h) => h.id === 'lerdsin-orthopedics')!];
  if (match(['ชา', 'ชัก', 'ปวดหัว', 'ไมเกรน', 'เวียนหัว', 'ระบบประสาท'])) return [hospitals.find((h) => h.id === 'neurological-institute')!];
  if (match(['เด็ก', 'ลูก', 'ทารก'])) return [hospitals.find((h) => h.id === 'queen-sirikit-child')!];
  return [hospitals.find((h) => h.id === 'chula')!, hospitals.find((h) => h.id === 'samitivej')!];
}

export default function RecommendedHospitalsScreen() {
  const colors = useColors();
  const { symptoms, bodyParts, setSelectedHospital } = useMedtriage();
  const matches = useMemo(() => recommend(`${symptoms} ${bodyParts.join(' ')}`), [symptoms, bodyParts]);
  return (
    <Screen contentStyle={styles.page}>
      <View style={styles.header}><IconButton icon="arrow-left" label="ย้อนกลับ" onPress={() => router.back()} /><View style={styles.headerCopy}><Eyebrow>จากข้อมูลอาการที่กรอก</Eyebrow><Text style={[styles.title, { color: colors.foreground }]}>โรงพยาบาลที่เกี่ยวข้อง</Text></View><View style={{ width: 44 }} /></View>
      <View style={[styles.note, { backgroundColor: colors.secondary }]}><Feather name="info" size={16} color={colors.secondaryForeground} /><Text style={[styles.noteText, { color: colors.secondaryForeground }]}>รายการนี้เป็นตัวอย่างจับคู่คำสำคัญ ไม่ใช่การวินิจฉัยหรือคำแนะนำทางการแพทย์</Text></View>
      {matches.map((hospital) => <SurfaceCard key={hospital.id} style={styles.card}>
        {hospital.photoUrl ? <Image source={{ uri: hospital.photoUrl }} contentFit="cover" style={styles.photo} /> : <View style={[styles.photoPlaceholder, { backgroundColor: colors.secondary }]}><Feather name="plus-square" size={30} color={colors.secondaryForeground} /><Text style={[styles.placeholderText, { color: colors.secondaryForeground }]}>ไม่มีภาพถ่ายในชุดตัวอย่าง</Text></View>}
        <Text style={[styles.name, { color: colors.foreground }]}>{hospital.name}</Text>
        <Text style={[styles.specialty, { color: colors.secondaryForeground }]}>{hospital.specialty} · {hospital.department}</Text>
        <View style={[styles.costBox, { backgroundColor: colors.background }]}><Text style={[styles.costLabel, { color: colors.mutedForeground }]}>ค่าใช้จ่ายโดยประมาณ (ตัวอย่าง)</Text><Text style={[styles.cost, { color: colors.foreground }]}>{hospital.cost}</Text><Text style={[styles.costNote, { color: colors.mutedForeground }]}>{hospital.costNote} · โปรดสอบถามโรงพยาบาลเพื่อยืนยัน</Text></View>
        <PrimaryButton title="เลือกโรงพยาบาลและจองคิว" icon="calendar" onPress={() => { setSelectedHospital(hospital); router.push({ pathname: '/booking', params: { hospitalId: hospital.id, mode: 'advance' } }); }} />
        <Pressable onPress={() => router.push('/(tabs)/hospitals')} style={styles.nearbyLink}><Text style={[styles.linkText, { color: colors.secondaryForeground }]}>ดูโรงพยาบาลใกล้ฉันทั้งหมด</Text></Pressable>
      </SurfaceCard>)}
    </Screen>
  );
}

const styles = StyleSheet.create({ page: { gap: 16 }, header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, headerCopy: { alignItems: 'center', gap: 3 }, title: { fontSize: 18, fontWeight: '800' }, note: { borderRadius: 13, padding: 12, flexDirection: 'row', gap: 9, alignItems: 'flex-start' }, noteText: { flex: 1, fontSize: 11, lineHeight: 17, fontWeight: '600' }, card: { gap: 13, padding: 15 }, photo: { height: 175, width: '100%', borderRadius: 15, backgroundColor: '#DCE9ED' }, photoPlaceholder: { height: 175, borderRadius: 15, alignItems: 'center', justifyContent: 'center', gap: 8 }, placeholderText: { fontSize: 11 }, name: { fontSize: 16, lineHeight: 23, fontWeight: '800' }, specialty: { fontSize: 12, lineHeight: 18, fontWeight: '600' }, costBox: { padding: 12, borderRadius: 13, gap: 4 }, costLabel: { fontSize: 10 }, cost: { fontSize: 15, fontWeight: '800' }, costNote: { fontSize: 10, lineHeight: 15 }, nearbyLink: { minHeight: 35, alignItems: 'center', justifyContent: 'center' }, linkText: { fontSize: 12, fontWeight: '700' } });
