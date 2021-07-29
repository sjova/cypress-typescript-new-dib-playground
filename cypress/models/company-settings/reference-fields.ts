// TODO: Group data the same as on UI/UX
// ex. cost center, project, purpose trip, etc.
// and don't forget to update fixture
export interface ReferenceFields {
  costCenter: {
    addCostCenterButton: string;
    costCenterName: string;
    costCenterDescription: string;
    newCostCenterName: string;
    costCenterConfirmationMessage: string;
  };
  project: {
    projectName: string;
    projectDescription: string;
    newProjectName: string;
    projectLabel: string;
    projectConfirmationMessage: string;
    addProjectButton: string;
  };
  purposeOfTrip: {
    purposeOfTripText: string;
    purposeOfTripDescription: string;
    newPurposeOfTrip: string;
    purposeOfTripLabel: string;
    purposeOfTripConfirmationMessage: string;
    addPurposeOfTripButton: string;
  };

  yourReference: {
    yourReferenceLabel: string;
    yourReferenceConfirmationMessage: string;
  };

  changeLabel: {
    changeLabelButton: string;
  };
}
