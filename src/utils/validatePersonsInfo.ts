export const validateName = (name: string) => {
  const trimmed = name.trim();

  if (trimmed.length < 2 || trimmed.length > 20) {
    return false;
  }

  const nameRegex = /^[а-яёa-z]+$/i;
  return nameRegex.test(trimmed);
};

export const validateBirthday = (birthday: string, is_adult: boolean) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(birthday)) return false;

  const birthDate = new Date(birthday);
  const today = new Date();

  if (birthDate > today) return false;

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  if (is_adult && age < 18) return false;
  if (!is_adult && age >= 18) return false;

  return true;
};

export const validateDocumentData = (
  document_type: string,
  document_data: string,
) => {
    //cant provide 000000000 in a row or only 0 or 12345678 in a row 
  if (document_type === "passport") {
    const passportRegex = /^\d{4} \d{6}$/;
    return passportRegex.test(document_data);
  } else if (document_type === "certificate_of_birth") {
    const certificateRegex = /^[A-ZА-Я]{1,3}-[A-ZА-Я]{1,3}-\d{6}$/i;
    return certificateRegex.test(document_data);
  }
};



