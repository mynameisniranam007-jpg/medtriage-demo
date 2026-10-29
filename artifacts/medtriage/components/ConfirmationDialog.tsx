import React from 'react';
import { Feather } from '@expo/vector-icons';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useColors } from '@/hooks/useColors';

type Props = {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
  icon?: React.ComponentProps<typeof Feather>['name'];
};

export default function ConfirmationDialog({ visible, title, message, confirmLabel, onConfirm, onCancel, icon = 'alert-triangle' }: Props) {
  const colors = useColors();
  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent onRequestClose={onCancel}>
      <View style={styles.backdrop}>
        <View accessibilityViewIsModal style={[styles.dialog, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={[styles.iconWrap, { backgroundColor: '#FCE8E7' }]}><Feather name={icon} size={23} color="#B42318" /></View>
          <Text style={[styles.title, { color: colors.foreground }]}>{title}</Text>
          <Text style={[styles.message, { color: colors.mutedForeground }]}>{message}</Text>
          <View style={styles.actions}>
            <Pressable accessibilityRole="button" onPress={onCancel} style={({ pressed }) => [styles.cancel, { borderColor: colors.border, backgroundColor: colors.background, opacity: pressed ? 0.75 : 1 }]}>
              <Text style={[styles.cancelText, { color: colors.foreground }]}>กลับไป</Text>
            </Pressable>
            <Pressable accessibilityRole="button" onPress={onConfirm} style={({ pressed }) => [styles.confirm, { backgroundColor: '#B42318', opacity: pressed ? 0.82 : 1 }]}>
              <Feather name={icon === 'log-out' ? 'log-out' : 'check'} size={16} color="#FFFFFF" />
              <Text style={styles.confirmText}>{confirmLabel}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(7, 22, 38, 0.58)', alignItems: 'center', justifyContent: 'center', padding: 22 },
  dialog: { width: '100%', maxWidth: 390, borderWidth: 1, borderRadius: 26, padding: 22, alignItems: 'center', gap: 12, shadowColor: '#071626', shadowOpacity: 0.24, shadowRadius: 28, shadowOffset: { width: 0, height: 12 }, elevation: 12 },
  iconWrap: { width: 56, height: 56, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginBottom: 2 },
  title: { fontSize: 19, lineHeight: 26, fontWeight: '800', textAlign: 'center' },
  message: { fontSize: 13, lineHeight: 20, textAlign: 'center' },
  actions: { width: '100%', flexDirection: 'row', gap: 10, marginTop: 8 },
  cancel: { flex: 1, minHeight: 50, borderWidth: 1.5, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  cancelText: { fontSize: 14, fontWeight: '800' },
  confirm: { flex: 1.2, minHeight: 50, borderRadius: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, paddingHorizontal: 8 },
  confirmText: { color: '#FFFFFF', fontSize: 13, fontWeight: '800', textAlign: 'center' },
});
