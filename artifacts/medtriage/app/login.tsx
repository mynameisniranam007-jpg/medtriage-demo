import React, { useState } from 'react';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Eyebrow, IconButton, PrimaryButton, Screen, SurfaceCard } from '@/components/UI';
import { useColors } from '@/hooks/useColors';
import { PROFILE_STORAGE_KEY, formatNationalId } from '@/constants/profile';

export default function LoginScreen() {
  const colors = useColors();
  const [nationalId, setNationalId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const submit = async () => {
    if (nationalId.length !== 13 || !password.trim()) { setError('กรอกเลขบัตรประชาชน 13 หลักและรหัสผ่านให้ครบ'); return; }
    try {
      const saved = await AsyncStorage.getItem(PROFILE_STORAGE_KEY);
      if (saved && JSON.parse(saved)?.fullName) router.replace('/(tabs)');
      else router.replace({ pathname: '/profile-setup', params: { nationalId } });
    } catch { setError('อ่านข้อมูลบัญชีไม่ได้ กรุณาลองอีกครั้ง'); }
  };
  return <Screen contentStyle={styles.page}>
    <View style={styles.header}><IconButton icon="arrow-left" label="ย้อนกลับ" onPress={() => router.back()} /><View style={styles.heading}><Eyebrow>บัญชี Medtriage</Eyebrow><Text style={[styles.title, { color: colors.foreground }]}>เข้าสู่ระบบ</Text></View><View style={{ width: 44 }} /></View>
    <SurfaceCard style={styles.card}>
      <View style={styles.icon}><Feather name="lock" size={22} color={colors.primaryForeground} /></View>
      <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>ใช้เลขบัตรประชาชนและรหัสผ่านที่ลงทะเบียนไว้</Text>
      <Text style={[styles.label, { color: colors.foreground }]}>เลขบัตรประชาชน</Text>
      <TextInput value={formatNationalId(nationalId)} onChangeText={(v) => { setNationalId(v.replace(/\D/g, '').slice(0,13)); setError(''); }} keyboardType="number-pad" maxLength={17} placeholder="x-xxxx-xxxxx-xx-x" placeholderTextColor={colors.mutedForeground} style={[styles.input,{color:colors.foreground,borderColor:colors.input,backgroundColor:colors.background}]} />
      <Text style={[styles.label, { color: colors.foreground }]}>รหัสผ่าน</Text>
      <View style={[styles.passwordWrap,{borderColor:colors.input,backgroundColor:colors.background}]}><TextInput value={password} onChangeText={setPassword} secureTextEntry={!showPassword} placeholder="รหัสผ่าน" placeholderTextColor={colors.mutedForeground} style={[styles.password,{color:colors.foreground}]} /><Pressable onPress={() => setShowPassword(v => !v)}><Feather name={showPassword ? 'eye-off' : 'eye'} size={18} color={colors.mutedForeground} /></Pressable></View>
      {error ? <Text style={{ color: colors.destructive }}>{error}</Text> : null}
      <PrimaryButton title="เข้าสู่ระบบ" icon="log-in" onPress={() => void submit()} />
      <Text style={[styles.note,{color:colors.mutedForeground}]}>หน้าต้นแบบสำหรับทดลองเท่านั้น ไม่มีการส่งหรือยืนยันข้อมูลกับระบบจริง</Text>
    </SurfaceCard>
    <Pressable onPress={() => router.push('/profile-setup')}><Text style={[styles.register,{color:colors.secondaryForeground}]}>ยังไม่มีบัญชี? สมัครสมาชิก</Text></Pressable>
  </Screen>;
}

const styles=StyleSheet.create({page:{gap:20,justifyContent:'center'},header:{flexDirection:'row',alignItems:'center',justifyContent:'space-between'},heading:{alignItems:'center',gap:4},title:{fontSize:23,fontWeight:'800'},card:{gap:13,padding:18},icon:{width:48,height:48,borderRadius:16,backgroundColor:'#176B68',alignItems:'center',justifyContent:'center'},subtitle:{fontSize:13,lineHeight:20},label:{fontSize:12,fontWeight:'700',marginBottom:-6},input:{minHeight:48,borderWidth:1,borderRadius:13,paddingHorizontal:12,fontSize:15},passwordWrap:{minHeight:48,borderWidth:1,borderRadius:13,flexDirection:'row',alignItems:'center',paddingHorizontal:12},password:{flex:1,minHeight:46,fontSize:14},note:{fontSize:10,lineHeight:16,textAlign:'center'},register:{textAlign:'center',fontSize:13,fontWeight:'800',padding:10}});
