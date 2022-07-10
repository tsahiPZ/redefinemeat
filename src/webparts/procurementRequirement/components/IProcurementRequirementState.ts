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
     employeeArr:Array<string>;
     employeeDetails:any;

     // approval vars
     approversArr:Array<any>;
     teamLead:string;
     vp:string;
     director:string;
     // approval validtions 
     teamLeadFlag:boolean;
     vpFlag:boolean;
     directorFlag:boolean;
     // ==================
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
     TermsOfPayment:string;
     managerEmail:string;
     managerId:string;
     ApprovelsOptions:Array<string>,
     Status:string;
     teamLeadStatus:'',
     directorStatus:'',
     vpStatus:''
     // approvals vals
     teamLeadSign:string;
     vpSign:string;
     directorSign:string;
     teamLeadData:any;
     vpData:any;
     directorData:any;
     temaLeadComment:string;
     directorComment:string;
     vpComment:string;
     isLocked:boolean;
     vpScale: number;
     directorScale: number;
     teamLeaderScale: number;
     isTeamLead:boolean;
     isDirector:boolean;
     isVp:boolean;
     sendMailToTeamLead:boolean;
     sendMailToDirector:boolean;
     sendMailToVp:boolean;
     supplierValidation:boolean;
     moneyTypeValidation:boolean;
     departmentValidation:boolean;
     forWhatValidation:boolean;
     WhatWasPurchasedValidation:boolean;
     tableValidation:boolean;
     userData:any;
}