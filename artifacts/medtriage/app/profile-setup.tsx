import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
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
        กรอกข้อมูลสำหรับบัญชีตัวอย่างนี้ ระบบยังไม่ยืนยันตัวตนจริง
      </Text>
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
});
