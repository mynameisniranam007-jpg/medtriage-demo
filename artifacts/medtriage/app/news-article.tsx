import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { BodyText, Eyebrow, IconButton, PrimaryButton, Screen, SurfaceCard } from '@/components/UI';
import { healthNews } from '@/constants/news';
import { useColors } from '@/hooks/useColors';
import { openExternalLink } from '@/utils/openExternalLink';

export default function NewsArticleScreen() {
  const colors = useColors();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const article = healthNews.find((item) => item.id === id);

  if (!article) {
    return (
      <Screen contentStyle={styles.page}>
        <View style={styles.header}>
          <IconButton icon="arrow-left" label="ย้อนกลับ" onPress={() => router.back()} />
          <Text style={[styles.headerTitle, { color: colors.foreground }]}>ข่าวสุขภาพ</Text>
          <View style={{ width: 44 }} />
        </View>
        <SurfaceCard style={styles.notFound}>
          <Feather name="file-text" size={24} color={colors.mutedForeground} />
          <Text style={[styles.title, { color: colors.foreground }]}>ไม่พบข่าวนี้</Text>
          <BodyText>กลับไปเลือกข่าวจากหน้าข่าวสาร</BodyText>
        </SurfaceCard>
      </Screen>
    );
  }

  const openOriginal = async () => {
    try {
      await openExternalLink(article.sourceUrl);
    } catch {
      Alert.alert('เปิดข่าวต้นฉบับไม่ได้', 'เบราว์เซอร์อาจบล็อกแท็บใหม่ ลองเปิดลิงก์อีกครั้ง');
    }
  };

  return (
    <Screen contentStyle={styles.page}>
      <View style={styles.header}>
        <IconButton icon="arrow-left" label="ย้อนกลับ" onPress={() => router.back()} />
        <Text style={[styles.headerTitle, { color: colors.foreground }]}>บทความสุขภาพ</Text>
        <View style={{ width: 44 }} />
      </View>
      <Image source={{ uri: article.imageUrl }} contentFit="cover" style={styles.heroImage} />
      <Eyebrow>{article.category}</Eyebrow>
      <Text style={[styles.title, { color: colors.foreground }]}>{article.title}</Text>
      <Text style={[styles.meta, { color: colors.mutedForeground }]}>
        ที่มา: {article.source} · เผยแพร่ {article.date}
      </Text>
      <SurfaceCard style={styles.articleCard}>
        <Text style={[styles.summaryTitle, { color: colors.secondaryForeground }]}>สรุปข่าว</Text>
        <BodyText style={styles.summary}>{article.summary}</BodyText>
        {article.paragraphs.map((paragraph, index) => (
          <BodyText key={`${article.id}-${index}`} style={styles.paragraph}>{paragraph}</BodyText>
        ))}
      </SurfaceCard>
      <Pressable
        accessibilityRole="link"
        accessibilityLabel={`เปิดข่าวฉบับเต็มจาก ${article.source}`}
        onPress={() => void openOriginal()}
        style={({ pressed }) => [
          styles.originalLink,
          { backgroundColor: colors.secondary, opacity: pressed ? 0.75 : 1 },
        ]}
      >
        <Feather name="external-link" size={16} color={colors.secondaryForeground} />
        <View style={styles.originalCopy}>
          <Text style={[styles.originalTitle, { color: colors.secondaryForeground }]}>อ่านข่าวฉบับเต็ม</Text>
          <Text style={[styles.originalSource, { color: colors.mutedForeground }]}>{article.source}</Text>
        </View>
        <Feather name="arrow-up-right" size={16} color={colors.secondaryForeground} />
      </Pressable>
      <PrimaryButton title="กลับไปหน้าข่าวสาร" icon="arrow-left" onPress={() => router.replace('/(tabs)/news')} />
      <BodyText style={styles.footerNote}>สรุปเพื่อให้อ่านสะดวก โปรดตรวจสอบรายละเอียดจากแหล่งข่าวต้นฉบับ</BodyText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  page: { gap: 13 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3 },
  headerTitle: { fontSize: 16, fontWeight: '800' },
  heroImage: { width: '100%', height: 190, borderRadius: 20, backgroundColor: '#DCE9EC' },
  title: { fontSize: 21, lineHeight: 30, fontWeight: '800' },
  meta: { fontSize: 11, lineHeight: 17 },
  articleCard: { gap: 12 },
  summaryTitle: { fontSize: 13, fontWeight: '800' },
  summary: { fontSize: 13, lineHeight: 21, fontWeight: '700' },
  paragraph: { fontSize: 12, lineHeight: 21 },
  originalLink: { minHeight: 60, borderRadius: 16, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', gap: 10 },
  originalCopy: { flex: 1, gap: 3 },
  originalTitle: { fontSize: 12, fontWeight: '800' },
  originalSource: { fontSize: 10 },
  footerNote: { fontSize: 10, lineHeight: 16, textAlign: 'center' },
  notFound: { alignItems: 'center', gap: 10, paddingVertical: 30 },
});
