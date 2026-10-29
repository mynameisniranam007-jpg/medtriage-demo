import React from 'react';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BodyText, Eyebrow, IconButton, Pill, PrimaryButton, Screen, SectionTitle, SurfaceCard } from '@/components/UI';
import { useColors } from '@/hooks/useColors';
import { useMedtriage } from '@/context/MedtriageContext';

export default function ResultsScreen() {
  const colors = useColors();
  const { symptoms, bodyParts, photoUri } = useMedtriage();

  return (
    <Screen contentStyle={styles.page}>
      <View style={styles.header}>
        <IconButton icon="arrow-left" label="ย้อนกลับ" onPress={() => router.back()} />
        <View style={styles.headerCopy}>
          <Eyebrow>สรุปผลตัวอย่าง</Eyebrow>
          <Text style={[styles.headerTitle, { color: colors.foreground }]}>
            ผลประเมินอาการ
          </Text>
        </View>
        <View style={{ width: 44 }} />
      </View>

      <View style={[styles.demoBanner, { backgroundColor: colors.secondary }]}>
        <Feather name="info" size={16} color={colors.secondaryForeground} />
        <Text style={[styles.demoText, { color: colors.secondaryForeground }]}>
          ผลจำลองเพื่อทดสอบหน้าจอ ไม่ได้วิเคราะห์ข้อมูลที่กรอก
        </Text>
      </View>

      <SurfaceCard style={styles.severityCard}>
        <View style={styles.severityTop}>
          <View style={[styles.severityIcon, { backgroundColor: '#DCF5E8' }]}>
            <Feather name="check-circle" size={21} color={colors.accentForeground} />
          </View>
          <View style={styles.severityCopy}>
            <Text style={[styles.cardKicker, { color: colors.mutedForeground }]}>
              ระดับความเร่งด่วน (ตัวอย่าง)
            </Text>
            <Text style={[styles.severityTitle, { color: colors.foreground }]}>
              อาการเบื้องต้น · ไม่เร่งด่วน
            </Text>
          </View>
          <View style={styles.lowPill}><Text style={styles.lowPillText}>ต่ำ</Text></View>
        </View>
        <View style={styles.progressTrack}>{['#32A66A','#8BBF48','#E4BB3E','#E98638','#D94B45'].map((color,index)=><View key={index} style={[styles.progressSegment,{backgroundColor:color,opacity:index===0?1:0.4}]} />)}</View>
        <View style={styles.scaleLabels}>
          <Text style={[styles.scaleText, { color: '#238052' }]}>ไม่รุนแรง</Text>
          <Text style={[styles.scaleText, { color: '#D94B45' }]}>ฉุกเฉิน</Text>
        </View>
      </SurfaceCard>

      <SectionTitle title="ตัวอย่างการประเมินความเสี่ยง" />
      <SurfaceCard style={styles.diagnosisCard}>
        <View style={styles.diagnosisRow}>
          <View style={[styles.conditionIcon, { backgroundColor: colors.accent }]}>
            <Feather name="thermometer" size={20} color={colors.accentForeground} />
          </View>
          <View style={styles.conditionCopy}>
            <Text style={[styles.conditionName, { color: colors.foreground }]}>
              ไข้หวัดธรรมดา
            </Text>
            <Text style={[styles.conditionEnglish, { color: colors.mutedForeground }]}>
              Common cold · ตัวอย่าง
            </Text>
          </View>
          <View style={[styles.statusMark, { backgroundColor: colors.accent }]}>
            <Feather name="check" size={15} color={colors.accentForeground} />
          </View>
        </View>
        <View style={[styles.riskRow, { borderTopColor: colors.border }]}>
          <Text style={[styles.riskLabel, { color: colors.mutedForeground }]}>
            ความเสี่ยงในตัวอย่าง
          </Text>
          <Text style={[styles.riskValue, { color: colors.accentForeground }]}>ต่ำ · 18%</Text>
        </View>
        <Text style={[styles.reasoning, { color: colors.mutedForeground }]}>
          ระบบจริงจำเป็นต้องพิจารณาประวัติสุขภาพ การตรวจร่างกาย และข้อมูลอื่นร่วมด้วย
        </Text>
      </SurfaceCard>

      <SurfaceCard style={styles.missingCard}>
        <View style={styles.missingHeading}>
          <Feather name="help-circle" size={18} color="#A46B05" />
          <Text style={[styles.missingTitle, { color: colors.foreground }]}>
            ข้อมูลที่ยังไม่ครบ
          </Text>
        </View>
        <Text style={[styles.missingText, { color: colors.mutedForeground }]}>
          ตัวอย่างนี้ยังไม่มีข้อมูลระยะเวลาของอาการ ความรุนแรง หรือโรคประจำตัว จึงไม่สามารถใช้สรุปภาวะสุขภาพจริงได้
        </Text>
        <View style={styles.summaryTags}>
          {symptoms.trim() ? <Pill tone="blue">บันทึกข้อความแล้ว</Pill> : null}
          {bodyParts.map((part) => <Pill key={part} tone="neutral">{part}</Pill>)}
          {photoUri ? <Pill tone="neutral">แนบภาพตัวอย่าง</Pill> : null}
          {!symptoms.trim() && bodyParts.length === 0 && !photoUri ? (
            <Pill tone="neutral">ยังไม่มีข้อมูลที่บันทึก</Pill>
          ) : null}
        </View>
      </SurfaceCard>

      <View style={[styles.disclaimer, { backgroundColor: '#FFF4DE', borderColor: '#F0D9A5' }]}>
        <Feather name="alert-triangle" size={17} color="#8C5D00" />
        <View style={styles.disclaimerCopy}>
          <Text style={styles.disclaimerTitle}>ข้อควรทราบ</Text>
          <Text style={styles.disclaimerBody}>
            ผลนี้เป็นข้อมูลจำลองสำหรับต้นแบบ ไม่ได้วิเคราะห์อาการจริง หากกังวลหรืออาการแย่ลง โปรดติดต่อบุคลากรทางการแพทย์
          </Text>
        </View>
      </View>

      <PrimaryButton
        title="ค้นหาโรงพยาบาลใกล้บ้าน"
        icon="map-pin"
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          router.push('/(tabs)/hospitals');
        }}
        testID="find-nearby-hospitals"
      />
      <Pressable accessibilityRole="button" onPress={() => router.push('/triage')} style={styles.editLink}>
        <Text style={[styles.editText, { color: colors.secondaryForeground }]}>
          กลับไปแก้ไขข้อมูลตัวอย่าง
        </Text>
      </Pressable>
      <BodyText style={styles.emergencyNote}>
        หากมีอาการรุนแรงหรือฉุกเฉิน ให้ติดต่อบริการฉุกเฉินในพื้นที่ทันที
      </BodyText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  page: { gap: 17 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerCopy: { alignItems: 'center', gap: 3 },
  headerTitle: { fontSize: 19, fontWeight: '800' },
  demoBanner: { minHeight: 43, paddingHorizontal: 12, borderRadius: 13, flexDirection: 'row', alignItems: 'center', gap: 9 },
  demoText: { flex: 1, fontSize: 12, lineHeight: 18, fontWeight: '600' },
  severityCard: { gap: 15 },
  severityTop: { flexDirection: 'row', alignItems: 'center', gap: 11 },
  severityIcon: { width: 42, height: 42, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  severityCopy: { flex: 1, gap: 4 },
  cardKicker: { fontSize: 11 },
  severityTitle: { fontSize: 14, fontWeight: '800' },
  progressTrack: { height: 9, flexDirection: 'row', gap: 3, overflow: 'hidden' },
  progressSegment: { flex: 1, borderRadius: 6 },
  lowPill:{backgroundColor:'#DCF5E8',borderRadius:20,paddingHorizontal:10,paddingVertical:5},
  lowPillText:{fontSize:11,fontWeight:'800',color:'#238052'},
  scaleLabels: { flexDirection: 'row', justifyContent: 'space-between' },
  scaleText: { fontSize: 11, fontWeight: '600' },
  diagnosisCard: { gap: 15 },
  diagnosisRow: { flexDirection: 'row', alignItems: 'center', gap: 11 },
  conditionIcon: { width: 44, height: 44, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  conditionCopy: { flex: 1, gap: 3 },
  conditionName: { fontSize: 16, fontWeight: '800' },
  conditionEnglish: { fontSize: 12 },
  statusMark: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  riskRow: { borderTopWidth: 1, paddingTop: 13, flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  riskLabel: { fontSize: 12 },
  riskValue: { fontSize: 12, fontWeight: '800' },
  reasoning: { fontSize: 12, lineHeight: 19 },
  missingCard: { gap: 10 },
  missingHeading: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  missingTitle: { fontSize: 14, fontWeight: '700' },
  missingText: { fontSize: 12, lineHeight: 19 },
  summaryTags: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  disclaimer: { borderWidth: 1, padding: 14, borderRadius: 17, flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  disclaimerCopy: { flex: 1, gap: 4 },
  disclaimerTitle: { color: '#6E4A08', fontSize: 13, fontWeight: '800' },
  disclaimerBody: { color: '#6E4A08', fontSize: 12, lineHeight: 19 },
  editLink: { alignSelf: 'center', minHeight: 38, justifyContent: 'center' },
  editText: { fontSize: 13, fontWeight: '700' },
  emergencyNote: { textAlign: 'center', fontSize: 11, lineHeight: 17 },
});
