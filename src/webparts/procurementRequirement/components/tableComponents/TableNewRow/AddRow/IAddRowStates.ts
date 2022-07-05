// IUploadFileContentState States (information managed within the component), When state changes, the component responds by re-rendering
export interface IAddRowStates {
    modal: boolean;
    identyfier:string;
    amount:number;
    pricePerUnit:number;
    cost:number;
    description:string;
    date:Date;
    validation:boolean;
}