import React, { useState } from 'react';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { BodyText, Eyebrow, Pill, Screen, SectionTitle, SurfaceCard } from '@/components/UI';
import { healthNews, HealthNewsArticle } from '@/constants/news';
import { useColors } from '@/hooks/useColors';
import { openExternalLink } from '@/utils/openExternalLink';

export default function NewsScreen() {
  const colors = useColors();
  return (
    <Screen contentStyle={styles.page}>
      <View style={styles.heading}>
        <Eyebrow>อัปเดตจากแหล่งที่เชื่อถือได้</Eyebrow>
        <Text style={[styles.title, { color: colors.foreground }]}>ข่าวสารสุขภาพ</Text>
        <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
          ข่าวจาก WHO Thailand และกรมอนามัย พร้อมวันที่และลิงก์ต้นฉบับ
        </Text>
      </View>

      <View style={[styles.notice, { backgroundColor: colors.secondary }]}>
        <Feather name="shield" size={16} color={colors.secondaryForeground} />
        <Text style={[styles.noticeText, { color: colors.secondaryForeground }]}>
          เนื้อหาในแอปเป็นบทสรุป อ่านข่าวฉบับเต็มได้จากเว็บไซต์ของแหล่งข่าว
        </Text>
      </View>

      <SectionTitle title="ข่าวล่าสุด" detail={`${healthNews.length} ข่าว · อัปเดต 20 ตุลาคม 2569`} />
      {healthNews.map((article) => (
        <NewsCard key={article.id} article={article} />
      ))}

      <BodyText style={styles.footerNote}>
        ข้อมูลเป็นข่าวทั่วไป ไม่ใช้แทนคำแนะนำจากบุคลากรทางการแพทย์
      </BodyText>
    </Screen>
  );
}

function NewsCard({ article }: { article: HealthNewsArticle }) {
  const colors = useColors();
  const [imageFailed, setImageFailed] = useState(false);

  const openOriginal = async () => {
    try {
      await openExternalLink(article.sourceUrl);
    } catch {
      Alert.alert('เปิดข่าวต้นฉบับไม่ได้', 'เบราว์เซอร์อาจบล็อกแท็บใหม่ ลองเปิดลิงก์อีกครั้ง');
    }
  };

  return (
    <SurfaceCard style={styles.storyCard}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`อ่านสรุปข่าว ${article.title}`}
        testID={`open-news-${article.id}`}
        onPress={() => router.push({ pathname: '/news-article', params: { id: article.id } })}
        style={({ pressed }) => [styles.articleBody, { opacity: pressed ? 0.84 : 1 }]}
      >
        {!imageFailed ? (
          <Image
            source={{ uri: article.imageUrl }}
            contentFit="cover"
            style={styles.storyImage}
            onError={() => setImageFailed(true)}
            accessibilityLabel={`ภาพประกอบข่าว ${article.title}`}
          />
        ) : (
          <View style={[styles.storyImage, styles.imageFallback, { backgroundColor: colors.secondary }]}>
            <Feather name="heart" size={25} color={colors.secondaryForeground} />
          </View>
        )}
        <View style={styles.storyTop}>
          <Pill tone="teal">{article.category}</Pill>
          <Text style={[styles.date, { color: colors.mutedForeground }]}>{article.date}</Text>
        </View>
        <Text style={[styles.storyTitle, { color: colors.foreground }]}>{article.title}</Text>
        <BodyText style={styles.storySummary}>{article.summary}</BodyText>
        <View style={styles.sourceLine}>
          <Feather name="book-open" size={13} color={colors.mutedForeground} />
          <Text style={[styles.sourceText, { color: colors.mutedForeground }]}>
            ที่มา: {article.source} · {article.date}
          </Text>
        </View>
        <View style={[styles.inAppRead, { borderTopColor: colors.border }]}>
          <Text style={[styles.inAppReadText, { color: colors.secondaryForeground }]}>อ่านสรุปในแอป</Text>
          <Feather name="arrow-right" size={15} color={colors.secondaryForeground} />
        </View>
      </Pressable>
      <Pressable
        accessibilityRole="link"
        accessibilityLabel={`อ่านข่าวต้นฉบับจาก ${article.source}`}
        testID={`read-original-${article.id}`}
        onPress={() => void openOriginal()}
        style={({ pressed }) => [
          styles.sourceButton,
          { backgroundColor: colors.secondary, opacity: pressed ? 0.72 : 1 },
        ]}
      >
        <Feather name="external-link" size={15} color={colors.secondaryForeground} />
        <Text style={[styles.sourceButtonText, { color: colors.secondaryForeground }]}>อ่านเพิ่มเติม (ข่าวต้นฉบับ)</Text>
      </Pressable>
    </SurfaceCard>
  );
}

const styles = StyleSheet.create({
  page: { gap: 17 },
  heading: { gap: 5 },
  title: { fontSize: 25, fontWeight: '800' },
  subtitle: { fontSize: 13, lineHeight: 20 },
  notice: { minHeight: 43, paddingHorizontal: 12, paddingVertical: 9, borderRadius: 14, flexDirection: 'row', alignItems: 'center', gap: 9 },
  noticeText: { flex: 1, fontSize: 11, lineHeight: 17, fontWeight: '600' },
  storyCard: { gap: 11, padding: 12 },
  articleBody: { gap: 10 },
  storyImage: { width: '100%', height: 165, borderRadius: 15, backgroundColor: '#DCE9EC' },
  imageFallback: { alignItems: 'center', justifyContent: 'center' },
  storyTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  date: { fontSize: 10 },
  storyTitle: { fontSize: 16, lineHeight: 23, fontWeight: '800' },
  storySummary: { fontSize: 12, lineHeight: 19 },
  sourceLine: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  sourceText: { flex: 1, fontSize: 10, lineHeight: 15 },
  inAppRead: { minHeight: 36, borderTopWidth: 1, paddingTop: 9, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  inAppReadText: { fontSize: 11, fontWeight: '800' },
  sourceButton: { minHeight: 42, borderRadius: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  sourceButtonText: { fontSize: 11, fontWeight: '800' },
  footerNote: { fontSize: 11, lineHeight: 17, textAlign: 'center' },
});
