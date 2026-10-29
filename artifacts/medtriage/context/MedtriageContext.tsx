import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Appointment, Hospital } from '@/constants/data';

type Coordinates = { latitude: number; longitude: number };
type MedtriageContextValue = {
  symptoms: string;
  setSymptoms: (value: string) => void;
  bodyParts: string[];
  toggleBodyPart: (value: string) => void;
  photoUri: string | null;
  setPhotoUri: (value: string | null) => void;
  location: Coordinates | null;
  setLocation: (value: Coordinates | null) => void;
  selectedHospital: Hospital | null;
  setSelectedHospital: (value: Hospital | null) => void;
  appointment: Appointment | null;
  appointmentLoading: boolean;
  saveAppointment: (value: Appointment) => Promise<void>;
  updateAppointmentRating: (rating: number) => Promise<void>;
  cancelAppointment: () => Promise<number>;
  logout: () => Promise<void>;
};

const STORAGE_KEY = 'medtriage:demo-appointment';
const CANCEL_KEY = 'medtriage:demo-cancellations';
const PROFILE_KEY = 'medtriage:patient-profile';
const MedtriageContext = createContext<MedtriageContextValue | null>(null);

export function MedtriageProvider({ children }: { children: ReactNode }) {
  const [symptoms, setSymptoms] = useState('');
  const [bodyParts, setBodyParts] = useState<string[]>([]);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(
    null,
  );
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [appointmentLoading, setAppointmentLoading] = useState(true);

  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(STORAGE_KEY)
      .then((value) => {
        if (active && value) {
          setAppointment(JSON.parse(value) as Appointment);
        }
      })
      .catch(() => {
        if (active) setAppointment(null);
      })
      .finally(() => {
        if (active) setAppointmentLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const toggleBodyPart = useCallback((value: string) => {
    setBodyParts((current) =>
      current.includes(value)
        ? current.filter((part) => part !== value)
        : [...current, value],
    );
  }, []);

  const saveAppointment = useCallback(async (value: Appointment) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    setAppointment(value);
  }, []);

  const updateAppointmentRating = useCallback(
    async (rating: number) => {
      if (!appointment) return;
      const updated = { ...appointment, rating };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setAppointment(updated);
    },
    [appointment],
  );

  const cancelAppointment = useCallback(async () => {
    const today = new Date(Date.now() + 7 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const raw = await AsyncStorage.getItem(CANCEL_KEY);
    const previous = raw ? JSON.parse(raw) as { day: string; count: number } : null;
    const count = previous?.day === today ? previous.count : 0;
    if (count >= 2) throw new Error('LIMIT');
    await AsyncStorage.setItem(CANCEL_KEY, JSON.stringify({ day: today, count: count + 1 }));
    await AsyncStorage.removeItem(STORAGE_KEY);
    setAppointment(null);
    return 1 - count;
  }, []);

  const logout = useCallback(async () => {
    await AsyncStorage.multiRemove([PROFILE_KEY, STORAGE_KEY, CANCEL_KEY]);
    setSymptoms('');
    setBodyParts([]);
    setPhotoUri(null);
    setSelectedHospital(null);
    setLocation(null);
    setAppointment(null);
  }, []);

  const contextValue = useMemo(
    () => ({
      symptoms,
      setSymptoms,
      bodyParts,
      toggleBodyPart,
      photoUri,
      setPhotoUri,
      location,
      setLocation,
      selectedHospital,
      setSelectedHospital,
      appointment,
      appointmentLoading,
      saveAppointment,
      updateAppointmentRating,
      cancelAppointment,
      logout,
    }),
    [
      symptoms,
      bodyParts,
      toggleBodyPart,
      photoUri,
      location,
      selectedHospital,
      appointment,
      appointmentLoading,
      saveAppointment,
      updateAppointmentRating,
      cancelAppointment,
      logout,
    ],
  );

  return (
    <MedtriageContext.Provider value={contextValue}>
      {children}
    </MedtriageContext.Provider>
  );
}

export function useMedtriage() {
  const context = useContext(MedtriageContext);
  if (!context) {
    throw new Error('useMedtriage must be used within MedtriageProvider');
  }
  return context;
}
