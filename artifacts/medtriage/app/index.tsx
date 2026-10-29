import React from 'react';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Screen, PrimaryButton, SecondaryButton } from '@/components/UI';
import { useColors } from '@/hooks/useColors';

export default function WelcomeScreen() {
  const colors = useColors();
  return (
    <Screen contentStyle={styles.page}>
      <View style={styles.brandRow}>
        <View style={[styles.brandMark, { backgroundColor: colors.primary }]}><Feather name="plus" size={25} color={colors.primaryForeground} /></View>
        <Text style={[styles.brandName, { color: colors.foreground }]}>medtriage</Text>
        <Text style={[styles.demoTag, { color: colors.secondaryForeground }]}>ทดลอง</Text>
      </View>
      <LinearGradient colors={[colors.primary, '#155373', '#187C7A']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.hero}>
        <View style={styles.heroIcon}><Feather name="heart" size={23} color="#FFFFFF" /></View>
        <Text style={styles.heroEyebrow}>สุขภาพดี เริ่มต้นที่เข้าใจ</Text>
        <Text style={styles.heroTitle}>ดูแลสุขภาพ{ '\n' }ได้ง่ายขึ้นทุกวัน</Text>
        <Text style={styles.heroDescription}>เริ่มจากประเมินอาการเบื้องต้น แล้วค้นหาบริการสุขภาพที่เหมาะกับคุณ</Text>
      </LinearGradient>
      <View style={styles.copy}>
        <Text style={[styles.title, { color: colors.foreground }]}>ยินดีต้อนรับสู่ Medtriage</Text>
        <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>เลือกเข้าสู่ระบบหรือสร้างบัญชีใหม่</Text>
      </View>
      <PrimaryButton title="เข้าสู่ระบบ" icon="log-in" onPress={() => router.push('/login')} testID="open-login" />
      <SecondaryButton title="สมัครสมาชิก" icon="user-plus" onPress={() => router.push('/profile-setup')} testID="open-register" />
      <View style={[styles.notice, { backgroundColor: colors.secondary }]}>
        <Feather name="shield" size={16} color={colors.secondaryForeground} />
        <Text style={[styles.noticeText, { color: colors.secondaryForeground }]}>ต้นแบบนี้ยังไม่เชื่อมระบบหมอพร้อมหรือยืนยันตัวตนจริง โปรดใช้ข้อมูลสมมติ</Text>
      </View>
      <Pressable onPress={() => router.push('/login')} accessibilityRole="button"><Text style={[styles.help, { color: colors.secondaryForeground }]}>ดูแลข้อมูลสุขภาพของคุณอย่างปลอดภัย</Text></Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  page: { gap: 20, justifyContent: 'center' },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  brandMark: { width: 38, height: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  brandName: { fontSize: 20, fontWeight: '800', flex: 1 },
  demoTag: { backgroundColor: 'rgba(23,107,104,0.12)', paddingHorizontal: 9, paddingVertical: 5, borderRadius: 20, fontSize: 10, fontWeight: '800' },
  hero: { minHeight: 275, padding: 24, borderRadius: 28, justifyContent: 'flex-end', gap: 11, overflow: 'hidden' },
  heroIcon: { width: 50, height: 50, borderRadius: 17, backgroundColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  heroEyebrow: { color: 'rgba(255,255,255,0.85)', fontSize: 13, fontWeight: '700' },
  heroTitle: { color: '#FFFFFF', fontSize: 31, lineHeight: 40, fontWeight: '800' },
  heroDescription: { color: 'rgba(255,255,255,0.82)', fontSize: 14, lineHeight: 22, maxWidth: 320 },
  copy: { gap: 5 },
  title: { fontSize: 22, fontWeight: '800' },
  subtitle: { fontSize: 14, lineHeight: 21 },
  notice: { borderRadius: 14, padding: 12, flexDirection: 'row', alignItems: 'flex-start', gap: 9 },
  noticeText: { flex: 1, fontSize: 11, lineHeight: 17 },
  help: { textAlign: 'center', fontSize: 12, fontWeight: '700', padding: 8 },
});
