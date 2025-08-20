import { Gender, Patient } from "./types"

export const validateNewPatient = (object: unknown): Omit<Patient, 'id'> => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'occupation' in object && 'gender' in object) {
    return {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      occupation: parseOccupation(object.occupation),
      gender: parseGender(object.gender)
    }
  } else {
    throw new Error('Incorrect data: some fields are missing');
  }
}

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name')
  }
  return name
}

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing SSN')
  }
  return ssn
}

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation')
  }
  return occupation
}

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(g => g.toString()).includes(param);
};