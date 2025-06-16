import React, { createContext, useState, ReactNode} from 'react';

export interface PatientInfo {
  name: string;
  age: string;
  gender: string;
  image: File;
}

interface PatientContextType {
  patients: PatientInfo[];
  addPatient: (patient: PatientInfo) => void;
}

export const PatientContext = createContext<PatientContextType | undefined>(undefined);

export const PatientProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [patients, setPatients] = useState<PatientInfo[]>([]);

  const addPatient = (patient: PatientInfo) => {
    setPatients(() => [ patient]);
  };

  return (
    <PatientContext.Provider value={{ patients, addPatient }}>
      {children}
    </PatientContext.Provider>
  );
};

// usePatient hook moved to a separate file (usePatient.ts)
