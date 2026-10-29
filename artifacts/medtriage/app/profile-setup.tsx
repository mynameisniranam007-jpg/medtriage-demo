import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { Eyebrow, Screen } from '@/components/UI';
import PatientProfileSection from '@/components/PatientProfileSection';
import { useColors } from '@/hooks/useColors';

export default function ProfileSetupScreen() {
  const colors = useColors();
  const { nationalId } = useLocalSearchParams<{ nationalId?: string }>();
  return (
    <Screen contentStyle={styles.page}>
      <View style={styles.brandRow}>
        <View style={[styles.brandIcon, { backgroundColor: colors.primary }]}>
          <Feather name="plus" size={20} color={colors.primaryForeground} />
        </View>
        <Text style={[styles.brandName, { color: colors.foreground }]}>medtriage</Text>
      </View>
      <Eyebrow>ตั้งค่าครั้งแรก</Eyebrow>
      <Text style={[styles.title, { color: colors.foreground }]}>กรอกข้อมูลพื้นฐานก่อนเริ่มใช้งาน</Text>
      <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
        กรอกข้อมูลหรือถ่ายภาพบัตรในต้นแบบ ข้อมูลยังไม่ถูกส่งไปตรวจสอบตัวตน
      </Text>
      <Pressable accessibilityRole="button" onPress={() => Alert.alert('หมอพร้อมยังไม่เชื่อมต่อ', 'การยืนยันผ่านหมอพร้อมต้องใช้การเชื่อมต่อและรับรองจากระบบทางการ เวอร์ชันนี้แสดงเฉพาะหน้าต้นแบบ คุณสามารถทดลองกรอกข้อมูลสมมติด้านล่างได้')} style={({pressed})=>[styles.morPromButton,{backgroundColor:colors.secondary,opacity:pressed?0.75:1}]}>
        <Feather name="heart" size={18} color={colors.secondaryForeground}/>
        <View style={{flex:1}}><Text style={[styles.morPromTitle,{color:colors.secondaryForeground}]}>สมัครผ่านหมอพร้อม</Text><Text style={[styles.morPromSub,{color:colors.secondaryForeground}]}>เชื่อมต่อไม่ได้ในต้นแบบนี้</Text></View>
        <Feather name="chevron-right" size={17} color={colors.secondaryForeground}/>
      </Pressable>
      <PatientProfileSection
        mode="setup"
        initialNationalId={nationalId}
        onComplete={() => router.replace('/(tabs)')}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  page: { gap: 12 },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 9, marginBottom: 3 },
  brandIcon: { width: 34, height: 34, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  brandName: { fontSize: 18, fontWeight: '800' },
  title: { fontSize: 21, lineHeight: 29, fontWeight: '800' },
  subtitle: { fontSize: 12, lineHeight: 18, marginBottom: 2 },
  morPromButton:{minHeight:58,borderRadius:15,paddingHorizontal:13,flexDirection:'row',alignItems:'center',gap:10},
  morPromTitle:{fontSize:13,fontWeight:'800'},
  morPromSub:{fontSize:10,marginTop:3},
});
