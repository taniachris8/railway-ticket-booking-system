export const validateName = (name: string) => {
  const trimmed = name.trim();

  if (trimmed.length < 2 || trimmed.length > 20) {
    return false;
  }

  const nameRegex = /^[а-яёa-z]+$/i;
  return nameRegex.test(trimmed);
};

export const calculateAge = (birthday: string): number | null => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(birthday)) return null;

  const [year, month, day] = birthday.split("-").map(Number);

  if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)) {
    return null;
  }

  const birthDate = new Date(year, month - 1, day);

  if (
    birthDate.getFullYear() !== year ||
    birthDate.getMonth() !== month - 1 ||
    birthDate.getDate() !== day
  ) {
    return null;
  }

  const today = new Date();

  if (birthDate > today) return null;

  let age = today.getFullYear() - year;
  const monthDiff = today.getMonth() - (month - 1);
  const dayDiff = today.getDate() - day;

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age;
};

export const validateBirthday = (birthday: string, is_adult: boolean) => {
  const age = calculateAge(birthday);

  if (age === null) return false;

  if (is_adult && age < 18) return false;
  if (!is_adult && age >= 18) return false;

  return true;
};

export const isValidCertificateNumber = (value: string) => {
  const regex = /^[A-ZА-ЯIVX]{1,4}-[A-ZА-Я]{2}-\d{6}$/i;
  return regex.test(value);
};

export const isValidInternationalPassportNumber = (value: string) => {
  if (value === "000000000" || value === "123456789") return false;
  return /^\d{2}\d{7}$/.test(value);
};

export const isValidPassportRfNumber = (value: string) => {
  if (value === "0000 000000" || value === "1234 567890") return false;
  const regex = /^\d{4}\s\d{6}$/;
  return regex.test(value);
}


export const isValidDocumentNumber = (
  document_type: string,
  document_data: string,
) => {
  if (document_type === "passport") {
    return isValidInternationalPassportNumber(document_data);
  } else if (document_type === "passport_rf") {
    return isValidPassportRfNumber(document_data);
  }else if(document_type === "birth_certificate"){
    return isValidCertificateNumber(document_data);
  }
};



