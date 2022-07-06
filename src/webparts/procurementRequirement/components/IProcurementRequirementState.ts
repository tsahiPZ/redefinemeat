export interface IProcurementRequirementState {
     // New State
     CheckerId: number;
     CheckerEmail: string;
     NumberOfMeals: number;
     DirectorId: number;
     DirectorEmail: string;
     GeneralImpression: string;
     HelperName: string;
     cooker: string;
     Baby: number;
     child: number;
     adult: number;

     // Final score
     score: number,

     LabResultsFindings: string;
     LabResultsRisk: string;
     LabResultsSuggestions: string;


     CheckerNameValidationError: boolean;
     DayCareNameValidationError: boolean;

     ScoreOptions: Array<any>;
     FieldsData: Object;

     // Form state
     IsLoading: boolean;
     FormIsActiveStatus: boolean;
     PopoverOpen: boolean;
     IsSaving: boolean;
     FormSubmitError: boolean;
     FormSubmitErrorMessage: string;
     ValidationError: boolean;
     LoadingInterval: any;
     LoadingTime: number;

     // תאריך
     VisitDate: Date;
     VisitMonth: number,
     VisitMonthInHebrew: string;
     HebrewMonthes: Array<string>;
     VisitDateValidationError: boolean;

     // מעון
     DayCareName: string;
     DayCareOptions: Array<any>;
     ListOfDayCares: Array<any>;
     DayCareCity: string;
     DayCareValidationError: boolean;

     // Modal State
     IsModalOpen: boolean;
     FormId: number;
     //  relevant params
     applicantName: string;
     applicantId: string;
     department:string;
     deparmentsArr:Array<string>;
     subDepartment:string;
     subDepartmentArr:Array<string>;
     managerApproves:string;
     supplier:string;
     supplierArr:Array<string>;
     WhatWasPurchased:string;
     forWhat:string;
     forDepartment:string;
     tableRows:Array<any>;
     cost:number;
     MoreDataFiles1: Array<File>;
     MoreDataFilesProps1: Array<any>;
     FileNameError: boolean;
     moneyTypeArr:Array<string>,
     moneyTypeChosen:string

}