export type Hospital = {
  id: string;
  name: string;
  kind: 'โรงพยาบาลรัฐ' | 'โรงพยาบาลเอกชน';
  category: 'general' | 'specialty';
  specialty: string;
  phone: string;
  department: string;
  doctor: string;
  cost: string;
  costNote: string;
  latitude: number;
  longitude: number;
  area: string;
};

export const hospitals: Hospital[] = [
  {
    id: 'chula',
    name: 'โรงพยาบาลจุฬาลงกรณ์ สภากาชาดไทย',
    kind: 'โรงพยาบาลรัฐ',
    category: 'general',
    specialty: 'ดูแลโรคทั่วไป',
    phone: '02-256-4000',
    department: 'อายุรกรรมทั่วไป',
    doctor: 'แพทย์เวชปฏิบัติทั่วไป (ข้อมูลตัวอย่าง)',
    cost: 'ประมาณ 100–600 บาท',
    costNote: 'ค่าแพทย์ ค่ายา และค่าบริการเบื้องต้น',
    latitude: 13.7308,
    longitude: 100.5364,
    area: 'ปทุมวัน · กรุงเทพฯ',
  },
  {
    id: 'samitivej',
    name: 'โรงพยาบาลสมิติเวช สุขุมวิท',
    kind: 'โรงพยาบาลเอกชน',
    category: 'general',
    specialty: 'ดูแลโรคทั่วไป',
    phone: '02-022-2222',
    department: 'อายุรกรรมทั่วไป',
    doctor: 'แพทย์เวชปฏิบัติทั่วไป (ข้อมูลตัวอย่าง)',
    cost: 'ประมาณ 800–1,200 บาท',
    costNote: 'ค่าแพทย์ ค่ายา และค่าบริการเบื้องต้น',
    latitude: 13.7229,
    longitude: 100.5785,
    area: 'สุขุมวิท · กรุงเทพฯ',
  },
  {
    id: 'medpark',
    name: 'โรงพยาบาลเมดพาร์ค',
    kind: 'โรงพยาบาลเอกชน',
    category: 'general',
    specialty: 'ดูแลโรคทั่วไป',
    phone: '02-023-3333',
    department: 'อายุรกรรมทั่วไป',
    doctor: 'แพทย์เวชปฏิบัติทั่วไป (ข้อมูลตัวอย่าง)',
    cost: 'ประมาณ 800–1,200 บาท',
    costNote: 'ค่าแพทย์ ค่ายา และค่าบริการเบื้องต้น',
    latitude: 13.7187,
    longitude: 100.5569,
    area: 'พระราม 4 · กรุงเทพฯ',
  },
  {
    id: 'lerdsin-orthopedics',
    name: 'สถาบันออร์โธปิดิกส์ โรงพยาบาลเลิดสิน',
    kind: 'โรงพยาบาลรัฐ',
    category: 'specialty',
    specialty: 'เชี่ยวชาญด้านกระดูกและข้อ',
    phone: '02-353-9844',
    department: 'กระดูกและข้อ',
    doctor: 'ข้อมูลแพทย์และคิวโปรดตรวจสอบกับโรงพยาบาล',
    cost: 'ตรวจสอบกับโรงพยาบาล',
    costNote: 'ค่าบริการขึ้นอยู่กับสิทธิและการรักษา',
    latitude: 13.7243,
    longitude: 100.5222,
    area: 'บางรัก · กรุงเทพฯ',
  },
  {
    id: 'neurological-institute',
    name: 'สถาบันประสาทวิทยา',
    kind: 'โรงพยาบาลรัฐ',
    category: 'specialty',
    specialty: 'เชี่ยวชาญด้านสมองและระบบประสาท',
    phone: '02-306-9818',
    department: 'ประสาทวิทยา',
    doctor: 'ข้อมูลแพทย์และคิวโปรดตรวจสอบกับโรงพยาบาล',
    cost: 'ตรวจสอบกับโรงพยาบาล',
    costNote: 'ค่าบริการขึ้นอยู่กับสิทธิและการรักษา',
    latitude: 13.7671,
    longitude: 100.535,
    area: 'ราชเทวี · กรุงเทพฯ',
  },
  {
    id: 'central-chest-institute',
    name: 'สถาบันโรคทรวงอก',
    kind: 'โรงพยาบาลรัฐ',
    category: 'specialty',
    specialty: 'เชี่ยวชาญด้านหัวใจและระบบทางเดินหายใจ',
    phone: '02-547-0999',
    department: 'หัวใจและทรวงอก',
    doctor: 'ข้อมูลแพทย์และคิวโปรดตรวจสอบกับโรงพยาบาล',
    cost: 'ตรวจสอบกับโรงพยาบาล',
    costNote: 'ค่าบริการขึ้นอยู่กับสิทธิและการรักษา',
    latitude: 13.8717,
    longitude: 100.4877,
    area: 'เมืองนนทบุรี · นนทบุรี',
  },
  {
    id: 'queen-sirikit-child',
    name: 'สถาบันสุขภาพเด็กแห่งชาติมหาราชินี',
    kind: 'โรงพยาบาลรัฐ',
    category: 'specialty',
    specialty: 'เชี่ยวชาญด้านเด็ก',
    phone: '1415',
    department: 'กุมารเวชกรรม',
    doctor: 'ข้อมูลแพทย์และคิวโปรดตรวจสอบกับโรงพยาบาล',
    cost: 'ตรวจสอบกับโรงพยาบาล',
    costNote: 'ค่าบริการขึ้นอยู่กับสิทธิและการรักษา',
    latitude: 13.7656,
    longitude: 100.5391,
    area: 'ราชเทวี · กรุงเทพฯ',
  },
];

export type Appointment = {
  reference: string;
  hospitalId: string;
  hospitalName: string;
  department: string;
  doctor: string;
  dateISO: string;
  dateLabel: string;
  timeSlot: string;
  kind: 'advance' | 'checkin';
  rating?: number;
};

export function hospitalById(id?: string | null): Hospital {
  return hospitals.find((hospital) => hospital.id === id) ?? hospitals[0];
}

export function distanceInKm(
  origin: { latitude: number; longitude: number },
  destination: { latitude: number; longitude: number },
) {
  const toRadians = (degrees: number) => (degrees * Math.PI) / 180;
  const latDelta = toRadians(destination.latitude - origin.latitude);
  const lonDelta = toRadians(destination.longitude - origin.longitude);
  const originLat = toRadians(origin.latitude);
  const destinationLat = toRadians(destination.latitude);
  const a =
    Math.sin(latDelta / 2) ** 2 +
    Math.cos(originLat) *
      Math.cos(destinationLat) *
      Math.sin(lonDelta / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
