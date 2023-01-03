export interface IProcurementRequirementProps {
  description: string;
  listsData: string; // Stores the list ID(s)
  DayCareList: string;
  sections:string;
  FormName: string;
  ReturnLink: string;
  WebUri: string;
  context: any;
  FormAutoSaveTiming: number;
  LinkToEditForm: string;
  emloyeeListsData:string;
  approversListsData:string;
  suppliersListId:string;
  moneyTypesListId:string;
  departmentsAndSubDeplistid:string;
  sumGapsListId:string;
  saveToTableId:string;
  unitListId:string;
  buyersListId:string;
  financeDirectorAndCeoDataList:string;
}
