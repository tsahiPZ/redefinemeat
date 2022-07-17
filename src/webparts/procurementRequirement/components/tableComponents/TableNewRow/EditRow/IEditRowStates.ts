// IUploadFileContentState States (information managed within the component), When state changes, the component responds by re-rendering
export interface IEditRowStates {
    modal: boolean;
    identyfier:string;
    amount:number;
    pricePerUnit:number;
    cost:number;
    description:string;
    date:Date;
    validation:boolean;
    rowID:string;
    companyIdentyfier: string,
    unit: string,
    unitOptions: Array<string>,
    dateValidate: boolean,
    amontValidate: boolean,
    pricePerUnitValidate: boolean,
    descriptionValidate: boolean,
    companyIdentyfierValidate:boolean,
    identyfierValidate:boolean,
    unitValidation:boolean
}