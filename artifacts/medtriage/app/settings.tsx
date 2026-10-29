import React, { useState } from 'react';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { BodyText, Eyebrow, IconButton, Screen, SurfaceCard } from '@/components/UI';
import { ThemeMode, useThemePreference } from '@/context/ThemeContext';
import { useColors } from '@/hooks/useColors';

const options: { mode: ThemeMode; title: string; detail: string; icon: 'sun' | 'moon' | 'smartphone' }[] = [
  { mode: 'light', title: 'โหมดสว่าง', detail: 'ใช้สีสว่างตลอดเวลา', icon: 'sun' },
  { mode: 'dark', title: 'โหมดมืด', detail: 'ใช้สีมืดตลอดเวลา', icon: 'moon' },
  { mode: 'system', title: 'ตามระบบ', detail: 'เปลี่ยนตามการตั้งค่าของอุปกรณ์', icon: 'smartphone' },
];

export default function SettingsScreen() {
  const colors = useColors();
  const { mode, setMode, loading } = useThemePreference();
  const [saving, setSaving] = useState(false);

  const chooseMode = async (nextMode: ThemeMode) => {
    if (nextMode === mode) return;
    setSaving(true);
    try {
      await setMode(nextMode);
    } catch {
      Alert.alert('บันทึกการตั้งค่าไม่ได้', 'ลองอีกครั้ง');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Screen contentStyle={styles.page}>
      <View style={styles.header}>
        <IconButton icon="arrow-left" label="ย้อนกลับ" onPress={() => router.back()} />
        <View style={styles.heading}>
          <Eyebrow>ปรับแต่งแอป</Eyebrow>
          <Text style={[styles.title, { color: colors.foreground }]}>การตั้งค่า</Text>
        </View>
        <View style={{ width: 44 }} />
      </View>

      <View style={[styles.notice, { backgroundColor: colors.secondary }]}>
        <Feather name="info" size={15} color={colors.secondaryForeground} />
        <Text style={[styles.noticeText, { color: colors.secondaryForeground }]}>
          ระบบจะจำธีมที่เลือกไว้ในอุปกรณ์นี้
        </Text>
      </View>

      <Text style={[styles.sectionTitle, { color: colors.foreground }]}>ธีมของแอป</Text>
      {options.map((option) => {
        const selected = mode === option.mode;
        return (
          <Pressable
            key={option.mode}
            accessibilityRole="radio"
            accessibilityState={{ selected }}
            testID={`theme-${option.mode}`}
            onPress={() => void chooseMode(option.mode)}
            style={({ pressed }) => [
              styles.option,
              {
                backgroundColor: colors.card,
                borderColor: selected ? colors.primary : colors.border,
                opacity: pressed || saving || loading ? 0.7 : 1,
              },
            ]}
          >
            <View style={[styles.optionIcon, { backgroundColor: colors.secondary }]}>
              <Feather name={option.icon} size={17} color={colors.secondaryForeground} />
            </View>
            <View style={styles.optionCopy}>
              <Text style={[styles.optionTitle, { color: colors.foreground }]}>{option.title}</Text>
              <Text style={[styles.optionDetail, { color: colors.mutedForeground }]}>{option.detail}</Text>
            </View>
            <View style={[styles.radioOuter, { borderColor: selected ? colors.primary : colors.border }]}>
              {selected ? <View style={[styles.radioInner, { backgroundColor: colors.primary }]} /> : null}
            </View>
          </Pressable>
        );
      })}

      <SurfaceCard style={styles.previewCard}>
        <View style={[styles.previewIcon, { backgroundColor: colors.accent }]}>
          <Feather name="check-circle" size={18} color={colors.accentForeground} />
        </View>
        <View style={styles.previewCopy}>
          <Text style={[styles.previewTitle, { color: colors.foreground }]}>บันทึกอัตโนมัติ</Text>
          <BodyText style={styles.previewDetail}>ธีมจะมีผลกับทุกหน้าของแอป รวมถึงหน้าข่าวและโปรไฟล์</BodyText>
        </View>
      </SurfaceCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  page: { gap: 16 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  heading: { alignItems: 'center', gap: 3 },
  title: { fontSize: 21, fontWeight: '800' },
  notice: { minHeight: 42, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 13, flexDirection: 'row', alignItems: 'center', gap: 8 },
  noticeText: { flex: 1, fontSize: 11, lineHeight: 16, fontWeight: '600' },
  sectionTitle: { fontSize: 14, fontWeight: '800', marginTop: 2 },
  option: { minHeight: 68, borderRadius: 17, borderWidth: 1, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', gap: 10 },
  optionIcon: { width: 37, height: 37, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  optionCopy: { flex: 1, gap: 3 },
  optionTitle: { fontSize: 13, fontWeight: '800' },
  optionDetail: { fontSize: 10, lineHeight: 15 },
  radioOuter: { width: 20, height: 20, borderWidth: 2, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  radioInner: { width: 10, height: 10, borderRadius: 5 },
  previewCard: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  previewIcon: { width: 37, height: 37, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  previewCopy: { flex: 1, gap: 4 },
  previewTitle: { fontSize: 12, fontWeight: '800' },
  previewDetail: { fontSize: 10, lineHeight: 16 },
});
