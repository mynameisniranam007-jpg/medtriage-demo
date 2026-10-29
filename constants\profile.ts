export const PROFILE_STORAGE_KEY = 'medtriage:patient-profile';

export type PatientProfile = {
  fullName: string;
  title: string;
  firstName: string;
  lastName: string;
  nationalId: string;
  birthDate: string;
  gender: string;
  phone: string;
  address: string;
  bloodGroup: string;
  rhFactor: string;
  weightKg: string;
  heightCm: string;
  conditions: string;
  drugAllergies: string;
  foodAllergies: string;
  medications: string;
  emergencyName: string;
  emergencyRelation: string;
  emergencyPhone: string;
  coverage: string;
};

export const emptyPatientProfile: PatientProfile = {
  fullName: '',
  title: '',
  firstName: '',
  lastName: '',
  nationalId: '',
  birthDate: '',
  gender: '',
  phone: '',
  address: '',
  bloodGroup: '',
  rhFactor: '',
  weightKg: '',
  heightCm: '',
  conditions: '',
  drugAllergies: '',
  foodAllergies: '',
  medications: '',
  emergencyName: '',
  emergencyRelation: '',
  emergencyPhone: '',
  coverage: '',
};

export function formatNationalId(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 13);
  const groups = [
    digits.slice(0, 1),
    digits.slice(1, 5),
    digits.slice(5, 10),
    digits.slice(10, 12),
    digits.slice(12, 13),
  ];
  return groups.filter(Boolean).join('-');
}

export function maskNationalId(value: string) {
  const digits = value.replace(/\D/g, '');
  if (digits.length !== 13) return 'ยังไม่ระบุ';
  return `${digits[0]}-${digits[1]}xxx-xxxxx-xx-${digits[12]}`;
}

function parseBirthDate(value: string) {
  const input = value.trim();
  const dateParts = input.includes('/')
    ? input.split('/').map((part) => Number(part.trim()))
    : input.split('-').reverse().map((part) => Number(part.trim()));
  if (dateParts.length !== 3 || dateParts.some((part) => !Number.isFinite(part))) return null;

  const [day, month, enteredYear] = dateParts;
  const year = enteredYear > 2400 ? enteredYear - 543 : enteredYear;
  const date = new Date(year, month - 1, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) return null;
  return date;
}

export function calculateAge(value: string) {
  const birthDate = parseBirthDate(value);
  if (!birthDate) return null;
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const beforeBirthday =
    today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate());
  if (beforeBirthday) age -= 1;
  return age >= 0 && age < 130 ? age : null;
}

export function calculateBmi(weight: string, height: string) {
  const weightValue = Number(weight);
  const heightValue = Number(height) / 100;
  if (!Number.isFinite(weightValue) || !Number.isFinite(heightValue) || weightValue <= 0 || heightValue <= 0) return null;
  return weightValue / (heightValue * heightValue);
}
