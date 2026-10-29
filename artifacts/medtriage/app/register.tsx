import React from 'react';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { Eyebrow, IconButton, Screen } from '@/components/UI';
import { useColors } from '@/hooks/useColors';

export default function RegisterMethodScreen() {
  const colors = useColors();
  const methods = [
    { key: 'mor-prom', title: 'หมอพร้อม', detail: 'เชื่อมบัญชีหมอพร้อม', icon: 'heart' as const, available: false },
    { key: 'national-id', title: 'บัตรประชาชน', detail: 'กรอกเลขบัตรและข้อมูลสมัครสมาชิก', icon: 'credit-card' as const, available: true },
    { key: 'thai-id', title: 'Thai ID', detail: 'ยืนยันตัวตนผ่านแอป Thai ID', icon: 'shield' as const, available: false },
  ];
  return <Screen contentStyle={styles.page}>
    <View style={styles.header}><IconButton icon="arrow-left" label="ย้อนกลับ" onPress={() => router.back()} /><View style={styles.heading}><Eyebrow>สร้างบัญชี</Eyebrow><Text style={[styles.title,{color:colors.foreground}]}>เลือกวิธีลงทะเบียน</Text></View><View style={{width:44}}/></View>
    <Text style={[styles.intro,{color:colors.mutedForeground}]}>เลือกวิธีที่สะดวก · ตอนนี้เปิดให้ทดลองเฉพาะบัตรประชาชน</Text>
    {methods.map(method=><Pressable key={method.key} accessibilityRole="button" accessibilityState={{disabled:!method.available}} onPress={()=>method.available?router.push('/profile-setup'):Alert.alert('ยังไม่เปิดใช้งาน',`${method.title} ต้องเชื่อมต่อและยืนยันกับระบบทางการก่อน`)} style={({pressed})=>[styles.method,{backgroundColor:colors.card,borderColor:colors.border,opacity:pressed?0.72:method.available?1:0.65}]}>
      <View style={[styles.methodIcon,{backgroundColor:method.available?colors.primary:colors.secondary}]}><Feather name={method.icon} size={20} color={method.available?colors.primaryForeground:colors.secondaryForeground}/></View>
      <View style={styles.methodCopy}><Text style={[styles.methodTitle,{color:colors.foreground}]}>{method.title}</Text><Text style={[styles.methodDetail,{color:colors.mutedForeground}]}>{method.detail}</Text></View>
      {!method.available?<Text style={[styles.soon,{color:colors.mutedForeground}]}>เร็วๆ นี้</Text>:<Feather name="chevron-right" size={18} color={colors.primary}/>}
    </Pressable>)}
    <View style={[styles.note,{backgroundColor:colors.secondary}]}><Feather name="info" size={15} color={colors.secondaryForeground}/><Text style={[styles.noteText,{color:colors.secondaryForeground}]}>เวอร์ชันเดโมไม่ได้เชื่อมต่อหรือยืนยันตัวตนกับหมอพร้อมและ Thai ID</Text></View>
  </Screen>;
}

const styles=StyleSheet.create({page:{gap:16},header:{flexDirection:'row',alignItems:'center',justifyContent:'space-between'},heading:{alignItems:'center',gap:3},title:{fontSize:21,fontWeight:'800'},intro:{fontSize:12,lineHeight:18},method:{minHeight:78,borderWidth:1,borderRadius:18,padding:13,flexDirection:'row',alignItems:'center',gap:12},methodIcon:{width:45,height:45,borderRadius:15,alignItems:'center',justifyContent:'center'},methodCopy:{flex:1,gap:4},methodTitle:{fontSize:14,fontWeight:'800'},methodDetail:{fontSize:11,lineHeight:16},soon:{fontSize:10,fontWeight:'700'},note:{marginTop:2,padding:12,borderRadius:13,flexDirection:'row',alignItems:'flex-start',gap:8},noteText:{flex:1,fontSize:10,lineHeight:16}});
