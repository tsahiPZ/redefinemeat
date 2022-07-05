// IUploadFileContentState States (information managed within the component), When state changes, the component responds by re-rendering
export interface IEditRowStates {
    modal: boolean;
    year:number;
    netSales:string;
    totalAssets:string;
    other:string;
    FreeCashFlow:string;
    validation:boolean;
    yearValidate:boolean;
}