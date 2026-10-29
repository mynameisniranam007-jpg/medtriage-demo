import React, { useState } from 'react';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Eyebrow, IconButton, PrimaryButton, Screen, SecondaryButton, SurfaceCard } from '@/components/UI';
import { useColors } from '@/hooks/useColors';
import { PROFILE_STORAGE_KEY, formatNationalId } from '@/constants/profile';

export default function LoginScreen() {
  const colors = useColors();
  const [nationalId, setNationalId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [methodSelected, setMethodSelected] = useState(true);
  const submit = async () => {
    if (nationalId.length !== 13 || !password.trim()) { setError('กรอกเลขบัตรประชาชน 13 หลักและรหัสผ่านให้ครบ'); return; }
    try {
      const saved = await AsyncStorage.getItem(PROFILE_STORAGE_KEY);
      if (saved && JSON.parse(saved)?.fullName) router.replace('/(tabs)');
      else router.replace({ pathname: '/profile-setup', params: { nationalId } });
    } catch { setError('อ่านข้อมูลบัญชีไม่ได้ กรุณาลองอีกครั้ง'); }
  };
  const methods = [
    { title: 'หมอพร้อม', detail: 'เชื่อมบัญชีหมอพร้อม', icon: 'heart' as const, active: false },
    { title: 'บัตรประชาชน', detail: 'เข้าสู่ระบบบัญชีตัวอย่าง', icon: 'credit-card' as const, active: true },
    { title: 'Thai ID', detail: 'ยืนยันตัวตนผ่านแอป Thai ID', icon: 'shield' as const, active: false },
  ];
  return <Screen contentStyle={styles.page}>
    <View style={styles.header}><IconButton icon="arrow-left" label="ย้อนกลับ" onPress={() => methodSelected ? setMethodSelected(false) : router.back()} /><View style={styles.heading}><Eyebrow>บัญชี Medtriage</Eyebrow><Text style={[styles.title, { color: colors.foreground }]}>{methodSelected ? 'เข้าสู่ระบบ' : 'เลือกวิธีเข้าสู่ระบบ'}</Text></View><View style={{ width: 44 }} /></View>
    {!methodSelected ? <>
      <Text style={[styles.intro,{color:colors.mutedForeground}]}>เลือกวิธีเดียวกับการสมัครสมาชิก · เปิดทดลองเฉพาะบัตรประชาชน</Text>
      {methods.map(method=><Pressable key={method.title} accessibilityRole="button" accessibilityState={{disabled:!method.active}} onPress={()=>method.active?setMethodSelected(true):Alert.alert('ยังไม่เปิดใช้งาน',`${method.title} ยังไม่ได้เชื่อมต่อระบบจริง`)} style={({pressed})=>[styles.method,{backgroundColor:colors.card,borderColor:colors.border,opacity:pressed?0.8:method.active?1:0.62}]}>
        <View style={[styles.methodIcon,{backgroundColor:method.active?colors.primary:colors.secondary}]}><Feather name={method.icon} size={20} color={method.active?colors.primaryForeground:colors.secondaryForeground}/></View>
        <View style={styles.methodCopy}><Text style={[styles.methodTitle,{color:colors.foreground}]}>{method.title}</Text><Text style={[styles.methodDetail,{color:colors.mutedForeground}]}>{method.detail}</Text></View>
        {!method.active?<Text style={[styles.soon,{color:colors.mutedForeground}]}>เร็วๆ นี้</Text>:<Feather name="chevron-right" size={18} color={colors.primary}/>}
      </Pressable>)}
      <Text style={[styles.note,{color:colors.mutedForeground}]}>เดโมนี้ไม่ได้เชื่อมต่อหรือยืนยันตัวตนกับหมอพร้อมและ Thai ID</Text>
      <Pressable onPress={() => router.push('/register')}><Text style={[styles.register,{color:colors.secondaryForeground}]}>ยังไม่มีบัญชี? สมัครสมาชิก</Text></Pressable>
    </> : <>
    <SurfaceCard style={styles.card}>
      <View style={styles.icon}><Feather name="lock" size={22} color={colors.primaryForeground} /></View>
      <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>ใช้เลขบัตรประชาชนและรหัสผ่านที่ลงทะเบียนไว้</Text>
      <Text style={[styles.label, { color: colors.foreground }]}>เลขบัตรประชาชน</Text>
      <TextInput value={formatNationalId(nationalId)} onChangeText={(v) => { setNationalId(v.replace(/\D/g, '').slice(0,13)); setError(''); }} keyboardType="number-pad" maxLength={17} placeholder="x-xxxx-xxxxx-xx-x" placeholderTextColor={colors.mutedForeground} style={[styles.input,{color:colors.foreground,borderColor:colors.secondaryForeground,backgroundColor:colors.background}]} />
      <Text style={[styles.label, { color: colors.foreground }]}>รหัสผ่าน</Text>
      <View style={[styles.passwordWrap,{borderColor:colors.secondaryForeground,backgroundColor:colors.background}]}><TextInput value={password} onChangeText={setPassword} secureTextEntry={!showPassword} placeholder="รหัสผ่าน" placeholderTextColor={colors.mutedForeground} style={[styles.password,{color:colors.foreground}]} /><Pressable onPress={() => setShowPassword(v => !v)}><Feather name={showPassword ? 'eye-off' : 'eye'} size={18} color={colors.mutedForeground} /></Pressable></View>
      {error ? <Text style={{ color: colors.destructive }}>{error}</Text> : null}
      <PrimaryButton title="เข้าสู่ระบบ" icon="log-in" onPress={() => void submit()} />
      <Text style={[styles.note,{color:colors.mutedForeground}]}>หน้าต้นแบบสำหรับทดลองเท่านั้น ไม่มีการส่งหรือยืนยันข้อมูลกับระบบจริง</Text>
    </SurfaceCard>
    <Text style={[styles.altHeading,{color:colors.mutedForeground}]}>หรือเข้าสู่ระบบด้วย</Text>
    <View style={styles.altMethods}>
      <SecondaryButton title="หมอพร้อม" icon="heart" onPress={() => Alert.alert('ยังไม่เปิดใช้งาน','การเชื่อมต่อหมอพร้อมยังไม่อยู่ในเดโมนี้')} style={styles.altButton} />
      <SecondaryButton title="Thai ID" icon="shield" onPress={() => Alert.alert('ยังไม่เปิดใช้งาน','การเชื่อมต่อ Thai ID ยังไม่อยู่ในเดโมนี้')} style={styles.altButton} />
    </View>
    <Pressable onPress={() => router.push('/register')}><Text style={[styles.register,{color:colors.secondaryForeground}]}>ยังไม่มีบัญชี? สมัครสมาชิก</Text></Pressable>
    </>}
  </Screen>;
}

const styles=StyleSheet.create({page:{gap:16,justifyContent:'center'},header:{flexDirection:'row',alignItems:'center',justifyContent:'space-between'},heading:{alignItems:'center',gap:4},title:{fontSize:21,fontWeight:'800'},intro:{fontSize:12,lineHeight:18},method:{minHeight:78,borderWidth:1,borderRadius:18,padding:13,flexDirection:'row',alignItems:'center',gap:12},methodIcon:{width:45,height:45,borderRadius:15,alignItems:'center',justifyContent:'center'},methodCopy:{flex:1,gap:4},methodTitle:{fontSize:14,fontWeight:'800'},methodDetail:{fontSize:11,lineHeight:16},soon:{fontSize:10,fontWeight:'700'},card:{gap:13,padding:18},icon:{width:48,height:48,borderRadius:16,backgroundColor:'#176B68',alignItems:'center',justifyContent:'center'},subtitle:{fontSize:13,lineHeight:20},label:{fontSize:12,fontWeight:'700',marginBottom:-6},input:{minHeight:50,borderWidth:1.5,borderRadius:13,paddingHorizontal:12,fontSize:15},passwordWrap:{minHeight:50,borderWidth:1.5,borderRadius:13,flexDirection:'row',alignItems:'center',paddingHorizontal:12},password:{flex:1,minHeight:46,fontSize:14},note:{fontSize:10,lineHeight:16,textAlign:'center'},altHeading:{textAlign:'center',fontSize:12,fontWeight:'700',marginBottom:-9},altMethods:{flexDirection:'row',gap:10},altButton:{flex:1},register:{textAlign:'center',fontSize:13,fontWeight:'800',padding:10}});
