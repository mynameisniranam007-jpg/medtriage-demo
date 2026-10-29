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
  photoUrl?: string;
  photoCredit?: string;
  photoPage?: string;
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
    photoUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/KCMH2026-%40night-Bhumi.png?width=1200',
    photoCredit: 'BunBn · CC0',
    photoPage: 'https://commons.wikimedia.org/wiki/File:KCMH2026-%40night-Bhumi.png',
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
    photoUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Samitivej_hospital%2C_Sukhumvit.jpg?width=1200',
    photoCredit: 'Sry85 · CC BY-SA 4.0',
    photoPage: 'https://commons.wikimedia.org/wiki/File:Samitivej_hospital,_Sukhumvit.jpg',
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
    photoUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B8%9E%E0%B8%A2%E0%B8%B2%E0%B8%9A%E0%B8%B2%E0%B8%A5_%E0%B9%80%E0%B8%A1%E0%B8%94%E0%B8%9E%E0%B8%B2%E0%B8%A3%E0%B9%8C%E0%B8%84_Medpark_Hospital_Bangkok_2011.jpg?width=1200',
    photoCredit: 'Chainwit · CC BY-SA 4.0',
    photoPage: 'https://commons.wikimedia.org/wiki/File:%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B8%9E%E0%B8%A2%E0%B8%B2%E0%B8%9A%E0%B8%B2%E0%B8%A5_%E0%B9%80%E0%B8%A1%E0%B8%94%E0%B8%9E%E0%B8%B2%E0%B8%A3%E0%B9%8C%E0%B8%84_Medpark_Hospital_Bangkok_2011.jpg',
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
    photoUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B8%9E%E0%B8%A2%E0%B8%B2%E0%B8%9A%E0%B8%B2%E0%B8%A5%E0%B9%80%E0%B8%A5%E0%B8%B4%E0%B8%94%E0%B8%AA%E0%B8%B4%E0%B8%99_Lerdsin_Hospital_Bangkok.jpg?width=1200',
    photoCredit: 'Chainwit · CC BY-SA 4.0',
    photoPage: 'https://commons.wikimedia.org/wiki/File:%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B8%9E%E0%B8%A2%E0%B8%B2%E0%B8%9A%E0%B8%B2%E0%B8%A5%E0%B9%80%E0%B8%A5%E0%B8%B4%E0%B8%94%E0%B8%AA%E0%B8%B4%E0%B8%99_Lerdsin_Hospital_Bangkok.jpg',
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
    photoUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/%E0%B8%AA%E0%B8%96%E0%B8%B2%E0%B8%9A%E0%B8%B1%E0%B8%99%E0%B9%82%E0%B8%A3%E0%B8%84%E0%B8%97%E0%B8%A3%E0%B8%A7%E0%B8%87%E0%B8%AD%E0%B8%81_Central_Chest_Institute_of_Thailand_(2022)_-_img_01.jpg?width=1200',
    photoCredit: 'Chainwit · CC BY 4.0',
    photoPage: 'https://commons.wikimedia.org/wiki/File:%E0%B8%AA%E0%B8%96%E0%B8%B2%E0%B8%9A%E0%B8%B1%E0%B8%99%E0%B9%82%E0%B8%A3%E0%B8%84%E0%B8%97%E0%B8%A3%E0%B8%A7%E0%B8%87%E0%B8%AD%E0%B8%81_Central_Chest_Institute_of_Thailand_(2022)_-_img_01.jpg',
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
