export interface IProcurementRequirementState {
     // New State
     CheckerId: number;
     CheckerEmail: string;
     // NumberOfMeals: number;
     DirectorId: number;
     DirectorEmail: string;
     // GeneralImpression: string;
     HelperName: string;
     cooker: string;
     Baby: number;
     child: number;
     adult: number;

     // Final score
     score: number,

     // LabResultsFindings: string;
     // LabResultsRisk: string;
     // LabResultsSuggestions: string;


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
     costInDollar:number;
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
     // aprovers status
     ceoStatus:string;
     financeDirectorStatus:string;
     teamLeadStatus:string;
     directorStatus:string;
     vpStatus:string;
     // approvals sign
     teamLeadSign:string;
     vpSign:string;
     directorSign:string;
     financeDirectorSign:string;
     ceoSign:string;
     // approvers data
     teamLeadData:any;
     vpData:any;
     directorData:any;
     financeDirectorData:any;
     ceoData:any;
     isLocked:boolean;
     // comments
     temaLeadComment:string;
     directorComment:string;
     vpComment:string;
     financeDirectorComment: string;
     ceoComment:string;
     //  money scales
     vpScale: number;
     directorScale: number;
     teamLeaderScale: number;
     financeDirectorScale: number;
     ceoScale:number;
     // manager flag
     isCeo:boolean;
     isFinanceDirector:boolean;
     isTeamLead:boolean;
     isDirector:boolean;
     isVp:boolean;
     // ======================
     noTeamLead: boolean,
     noDirector: boolean,
     noVp:boolean,
     noCeo:boolean,
     noFinanceDirector:boolean,
     // send mail flag
     sendMailToCeo:boolean,
     sendMailToFinanceDirector:boolean,
     sendMailToTeamLead:boolean;
     sendMailToDirector:boolean;
     sendMailToVp:boolean;
     // =============
     supplierValidation:boolean;
     moneyTypeValidation:boolean;
     departmentValidation:boolean;
     forWhatValidation:boolean;
     WhatWasPurchasedValidation:boolean;
     tableValidation:boolean;
     userData:any;
     elseSupplierValidation:boolean;
     elseSupplierName:string;
     elseSupplierNumber:string;
     unitOptions:Array<any>;
     buyersOptions:Array<any>;
     buyerName:string;
     moneyTypeAndValue:any;

}