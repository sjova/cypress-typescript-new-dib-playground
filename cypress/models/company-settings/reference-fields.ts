export interface ReferenceFields {
  costCenter: Omit<ReferenceField, 'label' | 'confirmationMessage2'>;
  project: ReferenceField;
  purposeOfTrip: ReferenceField;
  yourReference: Pick<ReferenceField, 'label' | 'confirmationMessage' | 'confirmationMessage2'>;
  changeLabelCtaButton: string;
  resetToDefaultCtaButton: string;
}

interface ReferenceField {
  addActionCtaButton: string;
  name: string;
  modifiedName: string;
  description: string;
  label: string;
  confirmationMessage: string;
  confirmationMessage2: string; // TODO: Revisit naming after we stabilize UI/UX
}
