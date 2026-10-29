export type HealthNewsArticle = {
  id: string;
  title: string;
  date: string;
  source: string;
  sourceUrl: string;
  imageUrl: string;
  category: string;
  summary: string;
  paragraphs: string[];
};

export const healthNews: HealthNewsArticle[] = [
  {
    id: 'water-safety',
    title: 'WHO สนับสนุนไทยยกระดับความปลอดภัยของน้ำดื่ม',
    date: '1 ตุลาคม 2569',
    source: 'WHO Thailand',
    sourceUrl: 'https://www.who.int/thailand/news/feature-stories/detail/who-supports-thailand-in-strengthening-water-safety',
    imageUrl: 'https://cdn.who.int/media/images/default-source/south-east-asia-(searo)/countries/thailand/the-water-safety-plan-audit-opening-by-mwa-who-thailand-and-expert.png?sfvrsn=3509eae9_2',
    category: 'สิ่งแวดล้อมและสุขภาพ',
    summary: 'WHO ร่วมกับการประปานครหลวงและกรมอนามัยทบทวนแผนความปลอดภัยด้านน้ำ เพื่อสนับสนุนการจัดการความเสี่ยงและคุณภาพน้ำดื่ม',
    paragraphs: [
      'WHO สนับสนุนการประปานครหลวงและกรมอนามัยในการทบทวนแผนความปลอดภัยด้านน้ำ (Water Safety Plans) โดยตรวจเอกสารและประเมินบางส่วนของกระบวนการผลิตและระบบจ่ายน้ำ',
      'การประเมินพบว่ามีความก้าวหน้าในการดำเนินงานต่อเนื่อง และเสนอแนวทางพัฒนาการประเมินความเสี่ยง การติดตามกระบวนการ และการตรวจระบบจัดเก็บน้ำเพิ่มเติม',
      'เนื้อหานี้สรุปจากข่าวของ WHO Thailand เพื่อให้ข้อมูลทั่วไป โปรดอ่านรายละเอียดฉบับเต็มจากแหล่งต้นทาง',
    ],
  },
  {
    id: 'oral-health',
    title: 'กรมอนามัยขับเคลื่อน “Smile Thailand 2570”',
    date: '19 ตุลาคม 2569',
    source: 'กรมอนามัย กระทรวงสาธารณสุข',
    sourceUrl: 'https://hp.anamai.moph.go.th/th/news-anamai/230025',
    imageUrl: 'https://hp.anamai.moph.go.th/web-upload/4xceb3b571ddb70741ad132d75876bc41d/202610/m_news/28117/thumbnail_2c1b12d4aaa6ffa5ea0ed001fbd403f7.png',
    category: 'สุขภาพช่องปาก',
    summary: 'นโยบายมุ่งส่งเสริมสุขภาพช่องปากทุกช่วงวัย พัฒนาบริการทันตกรรมปฐมภูมิและเพิ่มการเข้าถึงบริการ',
    paragraphs: [
      'กรมอนามัยรายงานการขับเคลื่อน “Smile Thailand 2570” เพื่อส่งเสริมสุขภาพช่องปากของคนไทยทุกช่วงวัย',
      'แนวทางที่กล่าวถึง ได้แก่ การพัฒนาบริการทันตกรรมปฐมภูมิ การดูแลสุขภาพช่องปากตั้งแต่วัยเด็กจนถึงผู้สูงอายุ และการเพิ่มโอกาสเข้าถึงบริการของกลุ่มที่มีข้อจำกัด',
      'เนื้อหานี้เป็นการสรุปข่าวจากกรมอนามัย ไม่ใช่คำแนะนำหรือการวินิจฉัยทางทันตกรรม',
    ],
  },
  {
    id: 'blood-donation',
    title: 'บุคลากรกรมอนามัยร่วมบริจาคโลหิตเพื่อผู้ป่วย',
    date: '20 ตุลาคม 2569',
    source: 'กรมอนามัย กระทรวงสาธารณสุข',
    sourceUrl: 'https://hp.anamai.moph.go.th/th/news-anamai/230050',
    imageUrl: 'https://hp.anamai.moph.go.th/web-upload/4xceb3b571ddb70741ad132d75876bc41d/202610/m_news/28117/230050/file_photo/759ba3b9ff740618d8b3b720303c8686.jpg',
    category: 'กิจกรรมสาธารณสุข',
    summary: 'สำนักส่งเสริมสุขภาพจัดกิจกรรมจิตอาสาบริจาคโลหิต โดยโลหิตที่ได้รับใช้สนับสนุนการรักษาผู้ป่วยและผู้ประสบอุบัติเหตุ',
    paragraphs: [
      'สำนักส่งเสริมสุขภาพ กรมอนามัย รายงานกิจกรรมจิตอาสาบริจาคโลหิต ณ สถาบันโรคทรวงอก เมื่อวันที่ 20 ตุลาคม 2569',
      'ข่าวระบุว่าบุคลากรจากหลายหน่วยงานเข้าร่วมกิจกรรม และกล่าวถึงบทบาทของโลหิตบริจาคในการช่วยเหลือผู้ป่วย ผู้ประสบอุบัติเหตุ และผู้ที่ต้องได้รับโลหิตระหว่างการรักษา',
      'ผู้สนใจบริจาคโลหิตควรตรวจสอบคุณสมบัติและสถานที่รับบริจาคกับหน่วยงานที่เกี่ยวข้องโดยตรง',
    ],
  },
];
