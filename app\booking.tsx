import React, { useMemo, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { BodyText, Eyebrow, IconButton, Pill, PrimaryButton, Screen, SectionTitle, SurfaceCard } from '@/components/UI';
import { hospitalById } from '@/constants/data';
import { useColors } from '@/hooks/useColors';
import { useMedtriage } from '@/context/MedtriageContext';

const timeSlots = ['09:00–09:30', '09:30–10:00', '10:00–10:30', '13:00–13:30', '14:00–14:30'];
const sampleDoctors = [
  { name: 'นพ. ธนกฤต วัฒนาพงศ์', specialty: 'เวชศาสตร์ครอบครัว', gender: 'ชาย' },
  { name: 'นพ. ปกรณ์ ศิริกุล', specialty: 'อายุรศาสตร์', gender: 'ชาย' },
  { name: 'นพ. กิตติพงษ์ ธารา', specialty: 'เวชปฏิบัติทั่วไป', gender: 'ชาย' },
  { name: 'พญ. พิมพ์ชนก รุ่งเรือง', specialty: 'อายุรศาสตร์', gender: 'หญิง' },
  { name: 'พญ. ณัฐชา วงศ์สวัสดิ์', specialty: 'เวชศาสตร์ครอบครัว', gender: 'หญิง' },
];

export default function BookingScreen() {
  const colors = useColors();
  const params = useLocalSearchParams<{ hospitalId?: string; mode?: string }>();
  const hospital = hospitalById(params.hospitalId);
  const kind = params.mode === 'checkin' ? 'checkin' : 'advance';
  const { setSelectedHospital, saveAppointment } = useMedtriage();
  const days = useMemo(() => Array.from({ length: 5 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index);
    return date;
  }), []);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedTime, setSelectedTime] = useState<string | null>(timeSlots[0]);
  const [selectedDoctor, setSelectedDoctor] = useState(sampleDoctors[0]);
  const [saving, setSaving] = useState(false);

  const formatDate = (date: Date) =>
    new Intl.DateTimeFormat('th-TH', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    }).format(date);

  const confirmBooking = async () => {
    if (!selectedTime) {
      Alert.alert('เลือกช่วงเวลาก่อน', 'แตะเลือกเวลาที่มีคิวว่าง');
      return;
    }
    setSaving(true);
    const appointment = {
      reference: `DEMO-${Date.now().toString().slice(-6)}`,
      hospitalId: hospital.id,
      hospitalName: hospital.name,
      department: hospital.department,
      doctor: `${selectedDoctor.name} · ${selectedDoctor.specialty}`,
      dateISO: days[selectedDay].toISOString(),
      dateLabel: formatDate(days[selectedDay]),
      timeSlot: selectedTime,
      kind,
    } as const;
    try {
      setSelectedHospital(hospital);
      await saveAppointment(appointment);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      router.replace('/pass');
    } catch {
      Alert.alert('บันทึกนัดหมายไม่ได้', 'ลองอีกครั้งก่อนยืนยันคิว');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Screen contentStyle={styles.page}>
      <View style={styles.header}>
        <IconButton icon="arrow-left" label="ย้อนกลับ" onPress={() => router.back()} />
        <View style={styles.headerCopy}>
          <Eyebrow>{kind === 'checkin' ? 'คิวเช็คอิน' : 'นัดหมายล่วงหน้า'}</Eyebrow>
          <Text style={[styles.headerTitle, { color: colors.foreground }]}>
            เลือกวันและเวลา
          </Text>
        </View>
        <View style={{ width: 44 }} />
      </View>

      <View style={[styles.demoBanner, { backgroundColor: colors.secondary }]}>
        <Feather name="info" size={16} color={colors.secondaryForeground} />
        <Text style={[styles.demoText, { color: colors.secondaryForeground }]}>
          ข้อมูลแพทย์และคิวเป็นตัวอย่าง ไม่ได้จองกับโรงพยาบาลจริง
        </Text>
      </View>

      <SectionTitle title="เลือกแพทย์" detail="รายชื่อแพทย์ตัวอย่าง ชาย 3 คน หญิง 2 คน" />
      <View style={styles.doctorList}>{sampleDoctors.map((doctor,index)=>{
        const selected=selectedDoctor.name===doctor.name;
        return <Pressable key={doctor.name} accessibilityRole="button" accessibilityState={{selected}} onPress={()=>setSelectedDoctor(doctor)} style={[styles.doctorCard,{backgroundColor:selected?colors.secondary:colors.card,borderColor:selected?colors.primary:colors.border}]}>
          <View style={[styles.doctorAvatar,{backgroundColor:index<3?'#E6F0FA':'#FBE9F0'}]}><Feather name="user" size={18} color={index<3?'#28628A':'#A14365'} /></View>
          <View style={{flex:1,gap:3}}><Text style={[styles.doctorName,{color:colors.foreground}]}>{doctor.name}</Text><Text style={[styles.doctorSub,{color:colors.mutedForeground}]}>{doctor.specialty} · {doctor.gender} · ข้อมูลตัวอย่าง</Text></View>
          {selected?<Feather name="check-circle" size={19} color={colors.primary}/>:null}
        </Pressable>;
      })}</View>

      <SurfaceCard style={styles.hospitalCard}>
        <View style={styles.hospitalTop}>
          <View style={[styles.hospitalIcon, { backgroundColor: colors.accent }]}>
            <Feather name="plus-square" size={20} color={colors.accentForeground} />
          </View>
          <Pill tone={hospital.kind === 'โรงพยาบาลรัฐ' ? 'blue' : 'teal'}>
            {hospital.kind}
          </Pill>
        </View>
        <Text style={[styles.hospitalName, { color: colors.foreground }]}>
          {hospital.name}
        </Text>
        <View style={[styles.detailRow, { borderTopColor: colors.border }]}>
          <Feather name="activity" size={15} color={colors.secondaryForeground} />
          <Text style={[styles.detailText, { color: colors.foreground }]}>
            {hospital.department}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Feather name="user" size={15} color={colors.secondaryForeground} />
          <Text style={[styles.detailText, { color: colors.mutedForeground }]}>
            {hospital.doctor}
          </Text>
        </View>
      </SurfaceCard>

      <View style={styles.section}>
        <SectionTitle
          title="เลือกวันที่"
          detail={kind === 'checkin' ? 'เลือกช่วงเวลาเช็คอินตัวอย่าง' : 'วันที่ว่างใน 5 วันข้างหน้า'}
        />
        <View style={styles.dayGrid}>
          {days.map((day, index) => {
            const selected = selectedDay === index;
            return (
              <Pressable
                key={day.toISOString()}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                testID={`booking-day-${index}`}
                onPress={() => setSelectedDay(index)}
                style={({ pressed }) => [
                  styles.dayButton,
                  {
                    backgroundColor: selected ? colors.primary : colors.card,
                    borderColor: selected ? colors.primary : colors.border,
                    opacity: pressed ? 0.78 : 1,
                  },
                ]}
              >
                <Text style={[styles.dayName, { color: selected ? '#D5E6ED' : colors.mutedForeground }]}>
                  {index === 0 ? 'วันนี้' : new Intl.DateTimeFormat('th-TH', { weekday: 'short' }).format(day)}
                </Text>
                <Text style={[styles.dayNumber, { color: selected ? '#FFFFFF' : colors.foreground }]}>
                  {new Intl.DateTimeFormat('th-TH', { day: 'numeric' }).format(day)}
                </Text>
                <Text style={[styles.dayMonth, { color: selected ? '#D5E6ED' : colors.mutedForeground }]}>
                  {new Intl.DateTimeFormat('th-TH', { month: 'short' }).format(day)}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={styles.section}>
        <SectionTitle
          title="เลือกช่วงเวลา"
          detail="ทุกช่วงเวลาเป็นคิวตัวอย่าง"
        />
        <View style={styles.slotGrid}>
          {timeSlots.map((slot, index) => {
            const selected = selectedTime === slot;
            const available = index !== 2;
            return (
              <Pressable
                key={slot}
                disabled={!available}
                accessibilityRole="button"
                accessibilityState={{ selected, disabled: !available }}
                testID={`booking-slot-${index}`}
                onPress={() => {
                  Haptics.selectionAsync();
                  setSelectedTime(slot);
                }}
                style={({ pressed }) => [
                  styles.slotButton,
                  {
                    backgroundColor: selected ? colors.accent : colors.card,
                    borderColor: selected ? colors.accentForeground : colors.border,
                    opacity: !available ? 0.45 : pressed ? 0.72 : 1,
                  },
                ]}
              >
                <Text style={[styles.slotTime, { color: colors.foreground }]}>{slot}</Text>
                <View style={styles.slotStatus}>
                  <View style={[styles.availableDot, { backgroundColor: available ? '#36A27D' : colors.mutedForeground }]} />
                  <Text style={[styles.slotStatusText, { color: colors.mutedForeground }]}>
                    {available ? 'มีคิวว่าง' : 'เต็ม'}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </View>

      <SurfaceCard style={styles.estimateCard}>
        <View style={styles.estimateRow}>
          <Feather name="credit-card" size={17} color={colors.secondaryForeground} />
          <Text style={[styles.estimateLabel, { color: colors.mutedForeground }]}>
            ค่าใช้จ่ายโดยประมาณ
          </Text>
          <Text style={[styles.estimateValue, { color: colors.foreground }]}>
            {hospital.cost}
          </Text>
        </View>
        <BodyText style={styles.estimateNote}>
          ราคาและคิวจริงต้องตรวจสอบกับโรงพยาบาลโดยตรง
        </BodyText>
      </SurfaceCard>

      <PrimaryButton
        title="ยืนยันการนัดหมาย"
        icon="check"
        onPress={() => void confirmBooking()}
        disabled={!selectedTime}
        loading={saving}
        testID="confirm-appointment"
      />
      <Text style={[styles.footnote, { color: colors.mutedForeground }]}>
        กดยืนยันเพื่อสร้างบัตรคิวตัวอย่างไว้ในอุปกรณ์นี้
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  page: { gap: 18 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerCopy: { alignItems: 'center', gap: 3 },
  headerTitle: { fontSize: 19, fontWeight: '800' },
  demoBanner: { minHeight: 43, paddingHorizontal: 12, borderRadius: 13, flexDirection: 'row', alignItems: 'center', gap: 9 },
  demoText: { flex: 1, fontSize: 11, lineHeight: 17, fontWeight: '600' },
  hospitalCard: { gap: 11 },
  hospitalTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  hospitalIcon: { width: 40, height: 40, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  hospitalName: { fontSize: 15, lineHeight: 22, fontWeight: '800' },
  detailRow: { borderTopWidth: 1, borderTopColor: 'transparent', flexDirection: 'row', alignItems: 'center', gap: 8, paddingTop: 9 },
  detailText: { flex: 1, fontSize: 12, lineHeight: 18 },
  section: { gap: 12 },
  doctorList:{gap:8},
  doctorCard:{minHeight:69,borderWidth:1,borderRadius:15,padding:10,flexDirection:'row',alignItems:'center',gap:10},
  doctorAvatar:{width:40,height:40,borderRadius:15,alignItems:'center',justifyContent:'center'},
  doctorName:{fontSize:12,fontWeight:'800'},
  doctorSub:{fontSize:10,lineHeight:15},
  dayGrid: { flexDirection: 'row', gap: 7 },
  dayButton: { flex: 1, minHeight: 84, borderRadius: 15, borderWidth: 1, alignItems: 'center', justifyContent: 'center', gap: 3 },
  dayName: { fontSize: 10, fontWeight: '600' },
  dayNumber: { fontSize: 19, fontWeight: '800' },
  dayMonth: { fontSize: 10 },
  slotGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 9 },
  slotButton: { width: '48%', minHeight: 70, borderWidth: 1, borderRadius: 15, padding: 11, justifyContent: 'center', gap: 7 },
  slotTime: { fontSize: 13, fontWeight: '800' },
  slotStatus: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  availableDot: { width: 6, height: 6, borderRadius: 3 },
  slotStatusText: { fontSize: 10 },
  estimateCard: { gap: 8, padding: 14 },
  estimateRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  estimateLabel: { flex: 1, fontSize: 11 },
  estimateValue: { fontSize: 12, fontWeight: '800' },
  estimateNote: { fontSize: 10, lineHeight: 16 },
  footnote: { fontSize: 10, lineHeight: 16, textAlign: 'center', marginTop: -7 },
});
