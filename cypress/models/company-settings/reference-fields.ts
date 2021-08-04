export interface ReferenceFields {
  costCenter: Omit<ReferenceField, 'label'>;
  project: ReferenceField;
  purposeOfTrip: ReferenceField;
  yourReference: Pick<ReferenceField, 'label' | 'confirmationMessage'>;
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
}
