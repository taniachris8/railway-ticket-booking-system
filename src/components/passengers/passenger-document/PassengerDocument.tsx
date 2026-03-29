import { useSelector } from "react-redux";
import { useState } from "react";

import type { RootState } from "../../../state/store";

import { SelectOptionInput } from "../select-option-input/SelectOptionInput";

import { DocumentTypeDropdown } from "../document-type-dropdown/DocumentTypeDropdown";
import { BirthCertificate } from "../birth-certificate/BirthCertificate";
import { PassportRf } from "../passport-rf/PassportRf";
import { InternationalPassport } from "../international-passport/InternationalPassport";

import styles from "./PassengerDocument.module.css";

type PassengerDocumentProps = {
  passengerIndex: number;
  errorMessage: string;
  setErrorMessage: (message: string) => void;
};

export function PassengerDocument({
  passengerIndex,
  setErrorMessage,
}: PassengerDocumentProps) {
  const [dropdownActive, setDropdownActive] = useState(false);

  const { document_type } = useSelector(
    (state: RootState) =>
      state.passengers.departure.seats[passengerIndex].person_info,
  );

  return (
    <div className={styles.container}>
      <div className={styles.input_group}>
        <label className={styles.label}>Тип документа</label>
        <SelectOptionInput
          selected={
            document_type === "passport"
              ? "Паспорт"
              : document_type === "birth_certificate"
                ? "Свидетельство о рождении"
                : "Паспорт РФ"
          }
          dropdownActive={dropdownActive}
          setDropdownActive={setDropdownActive}>
          <DocumentTypeDropdown
            passengerIndex={passengerIndex}
            setErrorMessage={setErrorMessage}
            setDropdownActive={setDropdownActive}
          />
        </SelectOptionInput>
      </div>

      <div className={styles.document_number_inputs}>
        {document_type === "passport_rf" && (
          <PassportRf
            passengerIndex={passengerIndex}
            setErrorMessage={setErrorMessage}
          />
        )}
        {document_type === "birth_certificate" && (
          <BirthCertificate
            passengerIndex={passengerIndex}
            setErrorMessage={setErrorMessage}
          />
        )}

        {document_type === "passport" && (
          <InternationalPassport
            passengerIndex={passengerIndex}
            setErrorMessage={setErrorMessage}
          />
        )}
      </div>
    </div>
  );
}
