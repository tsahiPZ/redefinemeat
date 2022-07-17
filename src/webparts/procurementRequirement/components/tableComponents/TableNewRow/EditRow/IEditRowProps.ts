export interface IEditRowProps {
  OnEditItem: any;
  SubjectID: string;
  identyfier: string;
  amount: number;
  pricePerUnit: number;
  cost: number;
  description: string;
  date: Date;
  editVisability: boolean;
  closeModal: any;

  // validates
  companyIdentyfier: string;
  unit: string;
  unitOptions: Array<string>;

}
