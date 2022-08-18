import * as React from 'react';
import styles from './ProcurementRequirement.module.scss';
import { IProcurementRequirementProps } from './IProcurementRequirementProps';
import { IProcurementRequirementState } from './IProcurementRequirementState';
import 'bootstrap/dist/css/bootstrap.min.css';

import './NutritionReport.css';
import "@pnp/sp/attachments";
import { IAttachmentFileInfo } from "@pnp/sp/attachments";

import 'date-fns';
import 'animate.css';
import DateFnsUtils from '@date-io/date-fns';
import {
  Col, Row, Form, FormGroup, Fade, Label,
  Popover, PopoverHeader, PopoverBody, Toast, ToastHeader, ToastBody
} from 'reactstrap';
import {
  TextField, Button, IconButton
} from '@material-ui/core';
import {
  Autocomplete, Alert
} from '@material-ui/lab';
import { ThemeProvider, StylesProvider } from '@material-ui/core/styles';
import { DatePickerTheme } from '../Models/DatePickerTheme';
import { theme } from '../Models/theme';
import { ButtonsTheme } from '../Models/ButtonsTheme';
// import { SwitchTheme } from '../Models/SwitchTheme'
import { jss } from '../Models/jss';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker
} from '@material-ui/pickers';

import { AiOutlineSend } from "react-icons/ai";
import { IoCloseCircleOutline } from "react-icons/io5";
import { Web } from "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import FormLabel from '@material-ui/core/FormLabel';

// import Switch from '@material-ui/core/Switch';
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';

import "@pnp/sp/webs";
import "@pnp/sp/lists/web";
import "@pnp/sp/fields";

// import Accordion from '@material-ui/core/Accordion';
// import AccordionSummary from '@material-ui/core/AccordionSummary';
// import AccordionDetails from '@material-ui/core/AccordionDetails';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

// import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/fields";
import heLocale from "date-fns/locale/he";
import { stubString } from 'lodash';

import { escape } from '@microsoft/sp-lodash-subset';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableNewRows from './tableComponents/TableNewRow/TableNewRow';
import AddRow from './tableComponents/TableNewRow/AddRow/AddRow';
import {
  Input
} from 'reactstrap';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';

export default class ProcurementRequirement extends React.Component<IProcurementRequirementProps, IProcurementRequirementState> {
  constructor(props) {
    super(props);
    // Set States (information managed within the component), When state changes, the component responds by re-rendering
    this.state = {
      ApprovelsOptions: ['בחר', 'מאושר', 'לא מאשר'],
      // NewState 
      CheckerId: null,
      CheckerEmail: '',
      DirectorId: null,
      DirectorEmail: '',
      NumberOfMeals: null,
      GeneralImpression: '',
      LabResultsFindings: '',
      LabResultsRisk: '',
      LabResultsSuggestions: '',
      HelperName: '',
      cooker: '',
      Baby: null,
      child: null,
      adult: null,

      // Final score
      score: 0,

      FieldsData: {},
      ScoreOptions: ['0', '1', '2', '3'],

      CheckerNameValidationError: false,
      DayCareNameValidationError: false,


      IsLoading: false,
      FormIsActiveStatus: false,
      PopoverOpen: false,
      IsSaving: false,
      FormSubmitError: false,
      FormSubmitErrorMessage: "",
      ValidationError: false,
      FormId: null,
      LoadingInterval: null,
      LoadingTime: 0,

      // תאריך
      VisitDate: null,
      VisitMonth: null,
      VisitMonthInHebrew: '',
      HebrewMonthes: ["ינואר", "פבואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"],
      VisitDateValidationError: false,

      // מעון
      DayCareName: "",
      DayCareOptions: [],
      ListOfDayCares: [],
      DayCareCity: "",
      DayCareValidationError: false,

      IsModalOpen: false,



      // relevant params
      isLocked: false,
      applicantName: '',
      applicantId: '',
      department: '',
      deparmentsArr: [],
      subDepartment: '',
      subDepartmentArr: [],
      managerApproves: '',
      supplier: 'בחר',
      supplierArr: [],
      WhatWasPurchased: '',
      forWhat: '',
      forDepartment: '',
      tableRows: [],
      cost: 0,
      MoreDataFiles1: [],
      MoreDataFilesProps1: [],
      FileNameError: false,
      moneyTypeArr: [],
      moneyTypeChosen: 'בחר',
      TermsOfPayment: 'שוטף 30',
      // approval vars
      approversArr: [],
      teamLead: '',
      vp: '',
      director: '',
      // approval validtions 
      teamLeadFlag: false,
      vpFlag: false,
      directorFlag: false,
      // ==================
      employeeArr: [],
      employeeDetails: null,
      managerEmail: '',
      managerId: '',
      Status: 'עדיין לא הופץ',
      teamLeadSign: '',
      vpSign: '',
      directorSign: '',
      directorData: null,
      teamLeadData: null,
      userData: null,
      vpData: null,
      teamLeadStatus: '',
      directorStatus: '',
      vpStatus: '',
      temaLeadComment: '',
      directorComment: '',
      vpComment: '',
      vpScale: 0,
      directorScale: 0,
      teamLeaderScale: 0,
      isTeamLead: false,
      isDirector: false,
      isVp: false,
      noTeamLead: false,
      noDirector: false,
      noVp: false,
      sendMailToTeamLead: false,
      sendMailToDirector: false,
      sendMailToVp: false,
      // validations
      supplierValidation: false,
      moneyTypeValidation: false,
      departmentValidation: false,
      forWhatValidation: false,
      WhatWasPurchasedValidation: false,
      tableValidation: false,
      elseSupplierValidation: false,
      elseSupplierName: '',
      elseSupplierNumber: '',
      unitOptions: [],
      buyersOptions: [],
      buyerName: 'בחר'

    };
  }
  // table functions
  delItem = (item: any) => {
    console.log(item);

    let tempArr = this.state.tableRows.filter(row => row.rowID !== item.rowID);
    console.log(tempArr);

    this.setState({
      tableRows: tempArr
    }, () => {
      this.calcCosts();
      console.log(this.state.tableRows);
    })



  }

  updateItem = (newData: any) => {
    // checks
    // console.log(newData);
    // console.log(this.state.tableRows);
    // 
    let tempArr = this.state.tableRows;
    if (tempArr.length === 1) {
      let tempArr = [];
      tempArr.push(newData)
      this.setState({
        tableRows: tempArr
      }, () => {
        this.calcCosts();
      })
    } else {
      for (let i = 0; i < this.state.tableRows.length; i++) {
        if (this.state.tableRows[i].rowID === newData.rowID) {
          tempArr.splice(i, 1, newData);
        }
      }
      this.setState({
        tableRows: tempArr
      }, () => {
        this.calcCosts();

      })
    }
  }

  addRow = (item: any) => {
    // console.log(item);
    // console.log(this.state.tableRows);

    let tempArr = [...this.state.tableRows, item];
    this.setState({
      tableRows: tempArr
    }, () => {
      this.calcCosts();
    })
  }

  calcCosts = () => {
    let sum = 0;
    console.log(this.state.tableRows);
    this.state.tableRows.forEach(element => {
      // console.log(element);

      sum += element.cost;
    });
    if (sum >= this.state.vpScale) {

    }
    this.setState({
      cost: sum
    }, () => {
      // console.log(this.state.cost);

    })
  }

  // ============== End tableFunctions ============== 

  approvalsWhoTakePart = (title: string, price: number) => {
    if (title === 'vp' && price > this.state.directorScale) {
      return true;
    }
    if (title === 'director' && price > this.state.teamLeaderScale) {
      return true;
    }
  }


  // file upload functions

  handleUploadFile = e => {

    console.log('other file');
    const Allfiles = e.target.files;
    let FilesProperties = []
    let Files = [];
    let IDCounter = this.state.MoreDataFilesProps1.length;
    console.log(Allfiles.length);

    // If there are any files
    // if (Allfiles && Allfiles.length > 0) {
    //   // Create Files Properties Array
    //   for (let i = 0; Allfiles.length > i; i++) {
    //     FilesProperties.push({ ID: IDCounter.toString(), FileName: Allfiles[i].name, FileType: Allfiles[i].type });
    //     Files.push(Allfiles[i]);
    //     IDCounter++;
    //   }
    FilesProperties.push({ ID: '0', FileName: Allfiles[0].name, FileType: Allfiles[0].type });
    Files.push(Allfiles[0]);
    this.setState({
      MoreDataFiles1: Files,
      MoreDataFilesProps1: FilesProperties,
      FileNameError: false,
    });

    e.target.value = null;
  }



  // Triger system default File picker
  TriggerUploadFiles = e => {
    e.preventDefault();
    document.getElementById("MoreDataFiles1").click()
  }


  RemoveFile = (ID: string) => {
    let FilesProperties = [...this.state.MoreDataFilesProps1]
    let Files = [...this.state.MoreDataFiles1];

    FilesProperties.splice(parseInt(ID), 1);
    Files.splice(parseInt(ID), 1);

    // Sort IDs
    for (let i = 0; FilesProperties.length > i; i++) {
      FilesProperties[i].ID = i;
    }

    this.setState({
      MoreDataFiles1: [...Files],
      MoreDataFilesProps1: [...FilesProperties],
      FileNameError: false,
    });

  }
  // ============= files upload functions END =====================
  componentDidMount = () => {
    this.setState({
      // FormIsActiveStatus: true,//  delete at finishes
      IsLoading: true,//was true
      LoadingInterval: setInterval(() => {
        this.setState(PrevState => ({ LoadingTime: PrevState.LoadingTime + 1 }))
      }, 1)
    })
    // }, this.ResetForm);
    this.StartNewForm();
    this.SetVisitDateValue(new Date())

  }
  StartNewForm = () => {
    // get current user
    const web = Web(this.props.WebUri);
    let tempSupplierArr: Array<any> = [];
    let tempUnitArr: Array<any> = [];
    let tempApproversArr: Array<any> = [];
    let tempEmployeeDataArr: Array<any> = [];
    let tempMoneyTypeArr: Array<any> = [];
    let tempDepartmentsArr: Array<any> = [];
    let userId: number, userData: any;
    let tempMangerId: number;
    let tempDepartment: string;
    let tempSubDepartment: string;
    let tempMangerEmail: string;
    let tempDirectorData: any, tempVpData: any, tempTeamLeadData: any;
    let tempApproversData: any;
    let vpScale: number, directorScale: number, teamLeadScale: number, scalesArr: Array<any>;
    let tempBuyers: Array<string>;
    web.getUserById
    web.currentUser.get().then(result => {
      // console.log(result);
      userData = result;
      userId = result.Id
      // console.log(result);//test


      this.GetCheckerPeoplePickerItems(result);
      web.lists.getById(this.props.emloyeeListsData).items.getAll().then(result => {
        console.log("here");

        tempEmployeeDataArr = result;
        tempEmployeeDataArr.forEach(employee => {
          // console.log("here loop");
          if (employee.fullNameId === userId) {
            tempDepartment = employee.department;
            if (employee.subDepartment) {
              tempSubDepartment = employee.subDepartment
            }
          }
        })
        // get managers scales
        web.lists.getById(this.props.sumGapsListId).items.get().then(result => {
          // set Scales
          scalesArr = result;
          teamLeadScale = scalesArr[0].TeamLead;
          directorScale = scalesArr[0].Director;
          vpScale = scalesArr[0].VP;
        }).catch(Err => {
          console.log(Err);
          // here Error modal
          this.setState({
            FormSubmitError: true
          });

        })
        web.lists.getById(this.props.approversListsData).items.get().then(result => {
          let errorFlag: boolean = true;
          console.log(result);
          tempApproversArr = result;
          tempApproversArr.forEach(approvers => {
            // console.log(approvers.department);
            // console.log(approvers.subDepartment);
            // console.log(tempDepartment);
            // console.log(tempSubDepartment);


            if (approvers.department === tempDepartment && approvers.subDepartment === tempSubDepartment) {
              // console.log(approvers);
              tempApproversData = approvers;
              errorFlag = false;
              web.getUserById(tempApproversData.vpId).get().then(result => {
                tempVpData = result;
                // check if Vp
                if (userId === tempVpData.Id) {
                  // mark as true
                  this.setState({
                    isVp: true,
                    sendMailToDirector: false,
                    sendMailToVp: false,
                    sendMailToTeamLead: false
                  }, () => {
                    console.log("im vp");

                  })
                }
              }).catch(Err => {
                console.log(Err);
                // here Error modal
                this.setState({
                  FormSubmitError: true
                });
              })
              // if (tempApproversData.DirectorId) {
                web.getUserById(tempApproversData.DirectorId).get().then(result => {
                  tempDirectorData = result;
                  // console.log(tempDirectorData);

                  // check if director
                  if (userId === tempDirectorData.Id) {
                    // mark as true
                    this.setState({
                      isDirector: true,
                      sendMailToDirector: false,
                      sendMailToTeamLead: false
                    }, () => {
                      console.log("im director");

                    })
                  }
                }).catch(Err => {
                  console.log(Err);
                  // here Error modal
                  // test this sfter finish changes
                  this.setState({
                    noDirector: true
                  });
                })
              // }

              // if (tempApproversData.teamLeadId) {
                web.getUserById(tempApproversData.teamLeadId).get().then(result => {
                  tempTeamLeadData = result;
                  
                  // console.log(tempTeamLeadData);

                  // check if director
                  if (userId === tempTeamLeadData.Id) {
                    // mark as true
                    this.setState({
                      isTeamLead: true,
                      sendMailToTeamLead: false,
                      
                    }, () => {
                      console.log("im TeamLead");

                    })
                  }
                }).catch(Err => {
                  console.log(Err);
                  // here Error modal
                  // test this sfter finish changes
                  this.setState({
                    noTeamLead: true,
                    sendMailToTeamLead: false
                  });
                })
              // }

            }

          })
          this.setState({
            FormSubmitError: errorFlag
          })
          web.lists.getById(this.props.moneyTypesListId).items.get().then(result => {
            tempMoneyTypeArr = result;
            web.lists.getById(this.props.departmentsAndSubDeplistid).items.get().then(result => {
              tempDepartmentsArr = result;
              web.lists.getById(this.props.approversListsData).items.get().then(result => {
                tempApproversArr = result;
                web.lists.getById(this.props.suppliersListId).items.get().then(result => {
                  tempSupplierArr = result;

                  // get unit options
                  web.lists.getById(this.props.unitListId).items.get().then(result => {
                    tempUnitArr = [...result.map(item => item.Title), "בחר"];
                    // console.log(tempUnitArr);
                    web.lists.getById(this.props.buyersListId).items.get().then(result => {
                      tempBuyers = [...result.map(buyer => buyer.buyerName), 'בחר']

                      this.setState({
                        supplierArr: [...tempSupplierArr.map(item => item.Title), "בחר", "אחר"],
                        approversArr: tempApproversArr,
                        deparmentsArr: tempDepartmentsArr.map(dep => dep.department),
                        moneyTypeArr: [...tempMoneyTypeArr.map(item => item.Title), "בחר"],
                        employeeArr: tempEmployeeDataArr,
                        department: tempDepartment,
                        forDepartment: tempDepartment,
                        subDepartment: tempSubDepartment,
                        managerEmail: tempMangerEmail,
                        teamLeadData: tempTeamLeadData,
                        directorData: tempDirectorData,
                        vpData: tempVpData,
                        IsLoading: false,
                        FormIsActiveStatus: true,
                        teamLeaderScale: teamLeadScale,
                        directorScale: directorScale,
                        vpScale: vpScale,
                        userData: userData,
                        unitOptions: [...tempUnitArr],
                        buyersOptions: tempBuyers
                      }, () => {
                        // tests
                        // console.log(this.state.supplierArr);
                        // console.log(this.state.approversArr);
                        // console.log(this.state.deparmentsArr);
                        // console.log(this.state.moneyTypeArr);
                        // console.log(this.state.employeeArr);
                        // console.log(tempTeamLeadData);
                        // console.log(tempDirectorData);
                        // console.log(tempVpData);
                        // console.log(this.state.teamLeaderScale);
                        // console.log(this.state.directorScale);
                        // console.log(this.state.vpScale);
                        console.log(this.state.unitOptions);

                        // this.setState({
                        //   FormSubmitError:true
                        // })
                      })
                    }).catch(Err => {
                      console.log(Err);
                      // here Error modal
                      this.setState({
                        FormSubmitError: true
                      })
                    })
                  }).catch(Err => {
                    console.log(Err);
                    // here Error modal
                    this.setState({
                      FormSubmitError: true
                    })
                  })
                }).catch(Err => {
                  console.log(Err);
                  // here Error modal
                  this.setState({
                    FormSubmitError: true
                  })
                })
              }).catch(Err => {
                console.log(Err);
                // here Error modal
                this.setState({
                  FormSubmitError: true
                })
              })
            }).catch(Err => {
              console.log(Err);
              // here Error modal
              this.setState({
                FormSubmitError: true
              })
            })

          }).catch(Err => {
            console.log(Err);
            // here Error modal
            this.setState({
              FormSubmitError: true
            })
          })

        }).catch(Err => {
          console.log(Err);
          // here Error modal
          this.setState({
            FormSubmitError: true
          })
        })
      }).catch(Err => {
        console.log(Err);
        // here Error modal
        this.setState({
          FormSubmitError: true
        })
      })
    }).catch(Err => {
      console.log(Err);
      // here Error modal
      this.setState({
        FormSubmitError: true
      })
    })

  }

  AutoSave = () => {
    if (this.props.FormAutoSaveTiming !== null && !isNaN(this.props.FormAutoSaveTiming)) {
      setInterval(() => {
        // console.log('AutoSave triggered.');
        // console.log("VisitDate:  " + this.state.VisitDate);
        // console.log("DayCareName:  " + this.state.DayCareName);
        // console.log("CheckerEmail:  " + this.state.CheckerEmail);
        // console.log("Baby:  " + this.state.Baby);
        // console.log("child:  " + this.state.child);
        // console.log("adult:  " + this.state.adult);

        if ((this.state.VisitDate !== null && this.state.VisitDate !== undefined && !isNaN(this.state.VisitDate.getTime())) &&
          (this.state.DayCareName !== null && this.state.DayCareName !== '' && this.state.CheckerEmail !== ''
            && this.state.CheckerEmail !== null && this.state.Baby !== null && this.state.child !== null && this.state.adult !== null)) {
          this.SaveForm(false);
        }
      }, this.props.FormAutoSaveTiming * 1000);
    }
  }

  Delay() {
    return new Promise(resolve => setTimeout(resolve, 3000));
  }

  AddFields = async (Fields) => {
    try {
      const web = Web(this.props.WebUri)

      for (let Idx = 0; Idx < Fields.length; Idx++) {
        const CurrentField = Fields[Idx];
        console.log('CurrentField:', CurrentField.Title)

        const AddedField = await web.lists.getById("ff2fba9e-4338-4d17-a42d-5d2f3e9a8390").fields.addNumber(CurrentField['Title']);
        console.log('AddedField:', AddedField)

        await this.Delay()
      }

      console.log('Finished creating all fields.');


    } catch (error) {
      console.log('error:', error)

    }
  }

  ResetForm = async () => {
    try {
      // Get Current Web

      let web = Web(this.props.WebUri);

      const Fields = await web.lists.getByTitle(this.props.sections).items.select('Title, Label, Section, IsCritical').getAll()
      console.log('Fields:', Fields)

      const TooLongNameFields = Fields.filter(Field => Field.Title.length >= 32)
      console.log('TooLongNameFields:', TooLongNameFields)

      const FieldsData = await Fields.reduce((Acc, CurrName) => {

        if (!Acc[CurrName.Section]) {
          Acc[CurrName.Section] = {}
        }

        if (Acc[CurrName.Section]) {
          Acc[CurrName.Section][CurrName.Title] = {
            Title: CurrName.Title,
            Section: CurrName.Section,
            Label: CurrName.Label,
            details: '',
            Suggestions: '',
            Score: '',
            IsCritical: CurrName.IsCritical
          }
        }

        return Acc
      }, {})


      console.log('FieldsData:', FieldsData)

      console.log('Object.keys(this.state.FieldsData):', Object.keys(FieldsData['1']))

      // Set Today Date
      let today = new Date();
      let mm = String(today.getMonth() + 1); //January is 0!
      let VisitDateMonthHeb = this.state.HebrewMonthes[parseInt(mm) - 1];

      var DaysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

      console.log('DaysInMonth:', DaysInMonth)

      const DayCares = await this.GetDayCaresList()
      const DayCaresItems = DayCares.map(DayCare => DayCare.Title).sort();

      const MonthStartDate = new Date(today.getFullYear(), today.getMonth(), 1)
      console.log('MonthStartDate:', MonthStartDate)

      const MonthLastDate = new Date(today.getFullYear(), today.getMonth(), DaysInMonth)
      console.log('MonthLastDate:', MonthLastDate)

      this.setState({
        VisitDate: today,
        VisitMonthInHebrew: VisitDateMonthHeb,
        DayCareOptions: DayCaresItems,
        ListOfDayCares: DayCares,
        FieldsData
      }, () => {
        clearInterval(this.state.LoadingInterval)
        console.log('this.state.LoadingTime:', this.state.LoadingTime)
        const TimeOutDuration = this.state.LoadingTime >= 3400 ? 0 : 3400 - this.state.LoadingTime
        console.log('TimeOutDuration:', TimeOutDuration)
        setTimeout(() => {
          this.setState({
            IsLoading: false,
            FormIsActiveStatus: true,
          })
        }, TimeOutDuration);

        this.AutoSave()
        "auto save is ON"
        // Create all fields in sharepoint list.
        // this.AddFields(Fields);
      })

    } catch (error) {
      console.log('error:', error)

    }

  }

  WasMonthlyReviewPerformed = async (MonthStartDate, MonthLastDate) => {
    console.log('MonthStartDate:', MonthStartDate)
    console.log('MonthLastDate:', MonthLastDate)
    try {
      let web = Web(this.props.WebUri);
      const FormsFilledThisMonth = await web.lists.getByTitle(this.props.listsData).items.filter(`VisitDate ge datetime'${MonthStartDate.toISOString()}' and VisitDate le datetime'${MonthLastDate.toISOString()}'`).get()
      console.log('FormsFilledThisMonth:', FormsFilledThisMonth)

      // If a review was performed this month already return True.
      if (FormsFilledThisMonth.length > 0) {
        return true
      } else {
        return false
      }

    } catch (error) {
      console.log('error:', error)
      this.setState({
        FormSubmitError: true,
        FormSubmitErrorMessage: 'לא מצליח לחפש טפסים שמולאו החודש.'
      })
    }
  }

  GetDayCaresList = async () => {
    try {

      let web = Web(this.props.WebUri);
      const DayCares = await web.lists.getByTitle('רשימת מעונות').items.select('Title, DayCareCity, DirectorEmail, DirectorId').get()
      console.log('DayCares:', DayCares)
      return DayCares

    } catch (error) {

      console.log('error:', error)
      this.setState({
        FormSubmitError: true,
        FormSubmitErrorMessage: 'שגיאה בעת משיכת רשימת "מעונות".'
      })
    }
  }

  onChange = (e: { target: { name: any; value: any; }; }) => {
    const newState = { [e.target.name]: e.target.value } as Pick<IProcurementRequirementState, keyof IProcurementRequirementState>;
    this.setState(newState);
  }

  SetReviewTime = (NewTime) => {
    this.setState({
      VisitDate: NewTime
    })
  }

  // Close The form
  CloseTheForm = () => {
    this.setState({
      IsSaving: true
    });
    // Redirect to the url that defined in the webpart properties
    window.location.href = this.props.ReturnLink;
  }

  createApprovalRoad = () => {
    // check who will get mail
    let globalCost = this.state.cost;
    console.log(globalCost);


    // set the conditions 
    if (globalCost <= this.state.teamLeaderScale && this.state.noTeamLead !== true) {

      console.log("here team leader");

      this.setState({
        teamLeadSign: this.state.isTeamLead ? this.ConvertToDisplayDate() + " " + this.state.teamLeadData.Title : '',
        directorSign: this.state.isDirector ? this.ConvertToDisplayDate() + " " + this.state.directorData.Title : '',
        vpSign: this.state.isVp ? this.ConvertToDisplayDate() + " " + this.state.vpData.Title : '',

        sendMailToTeamLead: !this.state.isTeamLead,
        sendMailToDirector: false,
        sendMailToVp: false,
        // Status: this.state.isTeamLead  ? 'הסתיים' : 'בתהליך'
      }, () => {
        console.log(this.state.sendMailToTeamLead);
        console.log(this.state.sendMailToDirector);
        console.log(this.state.sendMailToVp);
        this.SaveForm(true)

       
      })
      return;
    }
    if (globalCost <= this.state.directorScale && globalCost > this.state.teamLeaderScale && this.state.noDirector !== true || (this.state.noDirector !== true && this.state.noTeamLead && globalCost <= this.state.directorScale)) {
      console.log("here director");
      console.log(this.state.isDirector);

      this.setState({
        teamLeadSign: this.state.isTeamLead ? this.ConvertToDisplayDate() + " " + this.state.teamLeadData.Title : '',
        directorSign: this.state.isDirector ? this.ConvertToDisplayDate() + " " + this.state.directorData.Title : '',
        vpSign: this.state.isVp ? this.ConvertToDisplayDate() + " " + this.state.vpData.Title : '',
        sendMailToDirector: !this.state.isDirector,
        sendMailToTeamLead: this.state.isTeamLead === false && this.state.noTeamLead !== true,
        sendMailToVp: false,
        // Status: this.state.isDirector ? 'הסתיים' : 'בתהליך'

      }, () => {
        console.log(this.state.sendMailToTeamLead);
        console.log(this.state.sendMailToDirector);
        console.log(this.state.sendMailToVp);
        this.SaveForm(true)
        //  return;
      })
      return;
    }
    if (globalCost > this.state.directorScale 
      || (globalCost <= this.state.directorScale && globalCost > this.state.teamLeaderScale && this.state.noDirector === true) 
      || (globalCost <= this.state.teamLeaderScale && this.state.noTeamLead === true)) {
      console.log("here vp");

      this.setState({
        teamLeadSign: this.state.isTeamLead ? this.ConvertToDisplayDate() + " " + this.state.teamLeadData.Title : '',
        directorSign: this.state.isDirector ? this.ConvertToDisplayDate() + " " + this.state.directorData.Title : '',
        vpSign: this.state.isVp ? this.ConvertToDisplayDate() + " " + this.state.vpData.Title : '',
        sendMailToDirector: !this.state.isDirector && this.state.noDirector !== true,
        sendMailToTeamLead: (this.state.isDirector  || this.state.isTeamLead) || this.state.noTeamLead === true ? false : true,
        sendMailToVp: true,
        // Status: this.state.isVp ? 'הסתיים' : 'בתהליך'
      }, () => {
        console.log(this.state.sendMailToTeamLead);
        console.log(this.state.sendMailToDirector);
        console.log(this.state.sendMailToVp);
        this.SaveForm(true)
        //  return;
      })
      return;
    }

  }

  GetItemToSave = () => {


    const tableRows = JSON.stringify(this.state.tableRows)
    console.log(this.state.FieldsData);
    console.log(this.state.sendMailToTeamLead);
    console.log(this.state.sendMailToDirector);
    console.log(this.state.sendMailToVp);

    return {
      tableData: tableRows,
      Title: this.state.DayCareName,
      date: this.state.VisitDate,
      department: this.state.department,
      subDepartment: this.state.subDepartment,
      supplier: this.state.supplier === 'אחר' ? this.state.elseSupplierName : this.state.supplier,
      supplierNumber: this.state.supplier === 'אחר' ? this.state.elseSupplierNumber : '',
      whatPurchased: this.state.WhatWasPurchased,
      forWhat: this.state.forWhat,
      forDepartment: this.state.forDepartment,
      teamLeaderStatus: this.state.sendMailToTeamLead ? "לשלוח" : "מאושר",
      directorStatus: this.state.sendMailToDirector ? "לשלוח" : "מאושר",
      vpStatus: this.state.sendMailToVp ? "לשלוח" : "מאושר",
      formStatus: "בתהליך",
      vpScale: this.state.vpScale,
      directorScale: this.state.directorScale,
      teamLeadScale: this.state.teamLeaderScale,
      teamLeadMail: this.state.noTeamLead !== true ? this.state.teamLeadData.Email : 'noTeamLead',
      directorMail: this.state.noDirector !== true ? this.state.directorData.Email : 'noDirector',
      vpMail: this.state.vpData.Email,
      moneyType: this.state.moneyTypeChosen,
      teamLeadFullName:  this.state.noTeamLead !== true ? this.state.teamLeadData.Title:'',
      directorFullName: this.state.noDirector !== true ?this.state.directorData.Title:'',
      vpFullName: this.state.vpData.Title,
      creatorEmail: this.state.userData.Email,
      creatorFullName: this.state.userData.Title,
      teamLeadSign: this.state.teamLeadSign,
      directorSign: this.state.directorSign,
      vpSign: this.state.directorSign,
      totalSum: this.state.cost,
      buyerName: this.state.buyerName,

    }
  }

  saveData = () => {
    console.log();

  }


  ValidateForm = () => {
    // console.log('VisitDate: ' + this.state.VisitDate + " DayCareName: " + this.state.DayCareName + " CheckerEmail: " + this.state.CheckerEmail);
    let supplierValidation: boolean = false, elseSupplierValidation: boolean = false;
    let validated: boolean = true;
    if (this.state.supplier === "בחר" || this.state.supplier === "") {
      supplierValidation = true;
      validated = false;
    } else {
      if ((this.state.elseSupplierName === '' || this.state.elseSupplierNumber === '') && this.state.supplier === 'אחר') {
        validated = false;
        elseSupplierValidation = true;
      }
    }
    let moneyTypeValidation: boolean = false;
    if (this.state.moneyTypeChosen === "בחר" || this.state.moneyTypeChosen === "") {
      moneyTypeValidation = true;
      validated = false;
    }
    let forDepartmentValidation: boolean = false;
    if (this.state.forDepartment === "בחר" || this.state.forDepartment === "") {
      forDepartmentValidation = true;
      validated = false;

    }

    let forWhatValidation: boolean = false;
    if (this.state.forWhat === "") {
      forWhatValidation = true;
      validated = false;

    }
    let WhatWasPurchasedValidation: boolean = false;
    if (this.state.WhatWasPurchased === "") {
      WhatWasPurchasedValidation = true;
      validated = false;

    }
    let tableValidation: boolean = false;
    if (this.state.tableRows.length < 1) {
      tableValidation = true;
      validated = false;

    }

    this.setState({
      supplierValidation: supplierValidation,
      moneyTypeValidation: moneyTypeValidation,
      departmentValidation: forDepartmentValidation,
      WhatWasPurchasedValidation: WhatWasPurchasedValidation,
      forWhatValidation: forWhatValidation,
      tableValidation: tableValidation,
      elseSupplierValidation: elseSupplierValidation

    })

    return validated
  }

  ConvertToDisplayDate = () => {
    let ReleventDate = this.state.VisitDate;
    let dd = String(ReleventDate.getDate());
    let mm = String(ReleventDate.getMonth() + 1); //January is 0!
    let yyyy = String(ReleventDate.getFullYear());
    if (parseInt(dd) < 10) {
      dd = '0' + dd;
    }
    if (parseInt(mm) < 10) {
      mm = '0' + mm;
    }

    let FormattedReleventDate = dd + '/' + mm + '/' + yyyy;

    return FormattedReleventDate;
  }

  // Save The form
  SaveForm = (OnClick: boolean) => {
    // If butten save was clicked
    let TitleName = this.state.userData.Title + " " + this.ConvertToDisplayDate();
    // this.createApprovalRoad();
    if (OnClick) {
      // Start Saving loader
      this.setState({
        IsSaving: true
      });
    }
    let fileInfos: IAttachmentFileInfo[] = [];
    for (let i = 0; this.state.MoreDataFiles1.length > i; i++) {
      let File = this.state.MoreDataFiles1[i];
      console.log(File); //test
      // Use File Reader to read file as ArrayBuffer
      let reader = new FileReader();
      reader.onload = (function (file) {
        return function (e) {
          //Push the converted file into array
          // Deal with duplicates
          let checkDuplicate = fileInfos.filter(item => item.name === file.name);
          // console.log(checkDuplicate); //for test
          if (checkDuplicate.length === 0) {
            fileInfos.push({
              "name": file.name,
              "content": file //e.target.result
            });
          }
        }
      })(File);
      reader.readAsArrayBuffer(File);
    }
    if (this.ValidateForm()) {
      let web = Web(this.props.WebUri);

      if (this.state.FormId !== null && this.state.FormId !== undefined && this.state.FormId !== 0 && !isNaN(this.state.FormId)) {

        let FormUrl = "https://newmeat.sharepoint.com/sites/HQ/SitePages/EditProcurementRequirementForm.aspx" + "?FormID=" + this.state.FormId.toString();
        const itemToUpdate = this.GetItemToSave()

        // Update item
        web.lists.getByTitle(this.props.saveToTableId).items.getById(this.state.FormId).update({
          ...itemToUpdate,
          FormLink: {
            "__metadata": { "type": "SP.FieldUrlValue" },
            "Description": TitleName,
            "Url": FormUrl
          }
        }).then(UpdateResult => {
          console.log('UpdateResult:', UpdateResult)
          // If butten save was clicked
          if (OnClick) {
            this.CloseTheForm();
          }
        }).catch(Err => {
          console.error(Err);
          this.setState({
            IsSaving: false,
            FormSubmitError: true,
            FormSubmitErrorMessage: 'התנתק החיבור לאינטרנט או שאחד הנתונים שהזנת אינו תקין, לפיכך הגשת הטופס נכשלה.'
          });
        });

      } else {

        const itemToSave = this.GetItemToSave()
        console.log('itemToSave:', itemToSave)
        web.lists.getById(this.props.saveToTableId).items.add(itemToSave).then(AddResult => {
          console.log('AddResult:', AddResult)
          web.lists.getById(this.props.saveToTableId).items.getById(AddResult.data.ID).update({
            formLink: {
              "__metadata": { "type": "SP.FieldUrlValue" },
              "Description": TitleName,
              "Url": "https://newmeat.sharepoint.com/sites/HQ/SitePages/EditProcurementRequirementForm.aspx" + "?FormID=" + AddResult.data.ID
            }
          }).then(UpdateResult => {
            console.log('UpdateResult:', UpdateResult)
            web.lists.getById(this.props.saveToTableId).items.getById(AddResult.data.ID).attachmentFiles.addMultiple(fileInfos).then(Item => {
              this.CloseTheForm();
            }).catch(Err => {
              // TODO Deal with errors
              console.error(Err);
              this.setState({
                IsSaving: false,
                FormSubmitError: true,
                FormSubmitErrorMessage: 'The form was probably submitted successfully but one or more of the documents you attached was submitted in an incorrect format and therefore was not saved.'

                // FormSubmitErrorMessage: '.הטופס כנראה נשלח בהצלחה אך אחד או יותר מהמסמכים שצירפת הוגש בפורמט לא תקין ולכן לא נשמר'
              });
            });
            if (OnClick) {
              // If butten save was clicked
              this.CloseTheForm();
            } else {
              this.setState({
                FormId: AddResult.data.ID
              });
            }
          }).catch(Err => {
            console.error(Err);
            this.setState({
              IsSaving: false,
              FormSubmitError: true,
              FormSubmitErrorMessage: 'התנתק החיבור לאינטרנט או שאחד הנתונים שהזנת אינו תקין, לפיכך הגשת הטופס נכשלה.'
            });
          });
        }).catch(Err => {
          console.error(Err);
          this.setState({
            IsSaving: false,
            FormSubmitError: true,
            FormSubmitErrorMessage: 'התנתק החיבור לאינטרנט או שאחד הנתונים שהזנת אינו תקין, לפיכך הגשת הטופס נכשלה.'
          });
        });
      }
    } else {
      this.setState({
        IsSaving: false,
        ValidationError: true
      });
      this.CloseValidationErrorMessage();
    }
  }

  // Close Validation Error message after 3 seconds
  CloseValidationErrorMessage = () => {
    setTimeout(() => {
      this.setState({
        ValidationError: false
      });
    }, 3000);
  }

  PopOverToggle = () => {
    this.setState({
      PopoverOpen: !this.state.PopoverOpen
    });
  }

  handleChange = (event) => {
    this.setState({ ...this.state, [event.target.name]: event.target.checked });
  }

  SetCheckedValue = (Field) => {
    return Field ? true : false
  }

  Sum = (...para) => para.reduce((d, b) => d + b);

  SetVisitDateValue = (VisitDate: Date | null) => {
    if (VisitDate) {
      let VisitDateMonth = VisitDate.getMonth();
      let VisitDateMonthHeb = this.state.HebrewMonthes[VisitDateMonth];
      this.setState({
        VisitMonthInHebrew: VisitDateMonthHeb,
        VisitMonth: VisitDateMonth + 1,
        VisitDate: VisitDate,
        VisitDateValidationError: false,
        DayCareValidationError: false
      });
    } else {
      this.setState({
        VisitMonthInHebrew: '',
        VisitMonth: null,
        VisitDate: VisitDate,
        VisitDateValidationError: false,
        DayCareValidationError: false
      });
    }
  }

  sumScores = () => {

    const FieldsValues = Object.keys(this.state.FieldsData).reduce((Acc, CurrSection) => {
      const CurrSectionFieldsValues = Object.keys(this.state.FieldsData[CurrSection]).reduce((Acc, CurrField) => {
        const CurrValue = this.state.FieldsData[CurrSection][CurrField]['Score'] === '' ? 0 : Number(this.state.FieldsData[CurrSection][CurrField]['Score']);
        return Acc + CurrValue
      }, 0)

      return Acc + CurrSectionFieldsValues
    }, 0)
    let tempScore = FieldsValues + (this.state.GeneralImpression === '' || this.state.GeneralImpression === null ? 0 : parseInt(this.state.GeneralImpression))
    this.setState({
      score: tempScore > 100 ? 100 : tempScore

    })
  }
  HandleField = (NewValue, Section, FieldName, DataFieldName) => {
    // console.log('NewValue:', NewValue)
    // console.log('Section:', Section)
    // console.log('FieldName:', FieldName)
    // console.log('DataFieldName:', DataFieldName)


    let updatedScore: number = this.state.score + parseInt(NewValue);
    this.setState(PrevState => ({
      ...PrevState,
      FieldsData: {
        ...PrevState['FieldsData'],
        [Section]: {
          ...PrevState['FieldsData'][Section],
          [FieldName]: {
            ...PrevState['FieldsData'][Section][FieldName],
            [DataFieldName]: NewValue === null ? '' : NewValue
          }
        }
      },
      score: updatedScore
    }), () => {
      console.log(this.state.score);
      this.sumScores();

    })
  }

  // SetDayCareValue = (DayCareName: string) => {
  //   if (DayCareName !== null && DayCareName !== '') {
  //     let SelectedDayCare = this.state.ListOfDayCares.filter(DayCare => DayCare.Title === DayCareName);
  //     console.log('SelectedDayCare:', SelectedDayCare)
  //     if (SelectedDayCare.length == 1) {
  //       this.setState({
  //         DayCareCity: SelectedDayCare[0].DayCareCity,
  //         DayCareName: DayCareName,

  //         DirectorId: SelectedDayCare[0].DirectorId,
  //         DirectorEmail: SelectedDayCare[0].DirectorEmail,

  //         VisitDateValidationError: false,
  //         DayCareValidationError: false,
  //         ValidationError: false
  //       });
  //     }
  //   } else {
  //     this.setState({
  //       DayCareCity: '',
  //       DayCareName: '',
  //       VisitDateValidationError: false,
  //       DayCareValidationError: false,
  //       ValidationError: false
  //     });
  //   }
  // }
  SetSupplierValue = (supplier: string) => {
    if (supplier !== null && supplier !== '') {
      if (supplier !== '' && supplier !== 'בחר') {
        this.setState({
          supplier: supplier
        });
      }

    }
  }
  SetBuyersValue = (buyerName: string) => {
    if (buyerName !== null && buyerName !== '') {
      if (buyerName !== '' && buyerName !== 'בחר') {
        this.setState({
          buyerName: buyerName
        });
      }

    }
  }
  SetForDepartmentValue = (department: string) => {
    if (department !== null && department !== '') {
      if (department !== '' && department !== 'בחר') {
        this.setState({
          forDepartment: department
        });
      }
    }
  }
  SetMoneyTypeValue = (type: string) => {
    if (type !== null && type !== '') {
      if (type !== '' && type !== 'בחר') {
        this.setState({
          moneyTypeChosen: type
        });
      }
    }
  }

  // SetScoreValue = (FieldName: string, ScoreValue: string) => {
  //   // console.log('ScoreValue:', ScoreValue);
  //   // console.log('FieldName:', FieldName);

  //   if (ScoreValue === null) {
  //     this.setState(PrevState => ({
  //       ...PrevState,
  //       [FieldName]: null,
  //       ValidationError: false
  //     }));

  //   } else {
  //     this.setState(PrevState => ({
  //       ...PrevState,
  //       [FieldName]: ScoreValue,
  //       ValidationError: false
  //     }));

  //   }
  // }

  ToggleModal = () => {
    this.setState({ IsModalOpen: !this.state.IsModalOpen })
  }

  GetCheckerPeoplePickerItems = (item: any) => {
    try {
      if (item !== null) {
        this.setState({
          CheckerId: item.Id,
          CheckerEmail: item.Email.toLowerCase(),
          CheckerNameValidationError: false,
          ValidationError: false,
        }, () => {
          console.log(this.state.CheckerEmail);
        });
      } else {
        this.setState({
          CheckerId: null,
          CheckerEmail: "",
          ValidationError: false,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  ItemFormComponent = (FieldName, Section) => {
    const Label = this.state.FieldsData[Section][FieldName]['Label']
    const Score = this.state.FieldsData[Section][FieldName]['Score']
    const details = this.state.FieldsData[Section][FieldName]['details']
    const Suggestions = this.state.FieldsData[Section][FieldName]['Suggestions']
    const IsCritical = this.state.FieldsData[Section][FieldName]['IsCritical']

    return (
      <Row form >
        <Col md={12} sm={12}>
          <FormGroup row className="EOFormGroupRow">
            <Col md={4} sm={12} xs={12} className="flex align-end justify-start title-cell" >
              <FormLabel style={IsCritical ? { color: 'red', fontWeight: 'bold' } : {}} >{Label}</FormLabel>
            </Col>
            <Col style={{ marginBottom: '10px' }} md={2} sm={12} xs={12} className="flex align-end justify-center" >
              <Autocomplete
                value={Score}
                onChange={(event, newValue) => {
                  this.HandleField(newValue, Section, FieldName, 'Score')
                }}
                id="CoolingRoomOrFreezer"
                options={this.state.ScoreOptions}
                renderInput={(params) =>
                  <TextField
                    {...params}
                    label="ציון"
                    variant='outlined'
                    size="medium"
                  />}
                size="medium"
                className="AutoCompleteStyle"
                fullWidth
              />

            </Col>


            <Col style={{ marginBottom: '10px' }} md={6} sm={12} xs={12} className="flex align-end justify-center" >
              <TextField
                id="outlined-textarea"
                label="פירוט"
                variant="outlined"
                multiline
                fullWidth
                onChange={(ev) => { this.HandleField(ev.target.value, Section, FieldName, 'details') }}
                value={details}
                name='ResidenceGateIsLockedNotes'
                size='medium'
              />
            </Col>
            <Col style={{ marginBottom: '10px' }} md={6} sm={0} xs={0} className="flex align-end justify-center" />

            <Col style={{ marginBottom: '10px' }} md={6} sm={12} xs={12} className="flex align-start justify-center" >
              <TextField
                id="outlined-textarea"
                label="הצעות"
                variant="outlined"
                multiline
                fullWidth
                onChange={(ev) => { this.HandleField(ev.target.value, Section, FieldName, 'Suggestions') }}
                value={Suggestions}
                name='ResidenceGateIsLockedNotes'
                size='medium'
              />
            </Col>

          </FormGroup>
        </Col>
      </Row>
    )
  }


  public render(): React.ReactElement<IProcurementRequirementProps> {

    return (
      <div className={styles.procurementRequirement} >
        {/* <h1>Gulp Serve</h1> */}
        {(!this.state.FormSubmitError) ?
          <StylesProvider jss={jss}>
            <ThemeProvider theme={theme}>
              <div className="EONewFormContainer" dir="rtl">
                <div className="EOHeader">
                  <div className="EOHeaderContainer"><span className="EOHeaderText">{this.props.FormName}</span></div>
                  <div className="EOLogoContainer"></div>
                </div>
                {this.state.IsLoading ?
                  <div className='SpinnerComp'>
                    <div className="loading-screen">
                      <div className="loader-wrap">
                        <span className="loader-animation"></span>
                        <div className="loading-text">
                          <span className='letter'>ב</span>
                          <span className='letter'>ט</span>
                          <span className='letter'>ע</span>
                          <span className='letter'>י</span>
                          <span className='letter'>נ</span>
                          <span className='letter'>ה</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  :
                  null}
                {this.state.FormIsActiveStatus ?
                  <Fade in={true} mountOnEnter >
                    <Form className='MainForm'>

                      <Modal dir='rtl' centered isOpen={this.state.IsModalOpen} toggle={this.ToggleModal} className=''>
                        <ModalHeader toggle={this.ToggleModal}>אזהרה</ModalHeader>
                        <ModalBody>
                          טופס זה כבר מולא פעם אחת עבור החודש הנוכחי, האם להמשיך בכל זאת?
                        </ModalBody>
                        <ModalFooter>
                          <Button color="secondary" onClick={this.CloseTheForm}>יציאה מהטופס</Button>
                          <Button color="primary" onClick={this.ToggleModal}>המשך</Button>
                        </ModalFooter>
                      </Modal>
                      <Row form className="">
                        <Col md={12} sm={12}>
                          <FormGroup row className="EOFormGroupRow">
                            <Col sm={1}></Col>
                            <Col lg={4} md={6} sm={8} className='field-col'>
                              <ThemeProvider theme={DatePickerTheme}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={heLocale} >
                                  <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="תאריך ביקור"
                                    format="dd/MM/yyyy"
                                    value={this.state.VisitDate}
                                    onChange={(newValue: any) => {
                                      this.SetVisitDateValue(newValue);
                                    }}
                                    KeyboardButtonProps={{
                                      'aria-label': 'שנה תאריך',
                                    }}
                                    size="small"
                                    emptyLabel=''
                                    orientation="landscape"
                                    className="TextFieldFadeInTrans"
                                    error={this.state.VisitDateValidationError}
                                    helperText={this.state.VisitDateValidationError ? 'נא למלא תאריך' : ''}
                                    required
                                    fullWidth
                                  />
                                </MuiPickersUtilsProvider>
                              </ThemeProvider>
                            </Col>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row form className="">
                        <Col md={12} sm={12} >
                          <FormGroup row className="EOFormGroupRow">
                            <Col sm={1}></Col>
                            <Col lg={4} md={6} sm={8} className='field-col'>

                              <PeoplePicker
                                context={this.props.context}
                                titleText="שם המבקש"
                                personSelectionLimit={1}
                                showtooltip={true}
                                required={true}
                                disabled={true}
                                onChange={this.GetCheckerPeoplePickerItems}
                                showHiddenInUI={true}
                                principalTypes={[PrincipalType.User]}
                                ensureUser={true}
                                resolveDelay={1000}
                                defaultSelectedUsers={[this.state.CheckerEmail]}
                              />
                              {this.state.CheckerNameValidationError ?
                                <Fade in={this.state.CheckerNameValidationError} tag="h5" className="mt-3 ValidationError">
                                  <Alert variant="outlined" severity="error">
                                    אנא מלא את שם הבודק
                                  </Alert>
                                </Fade> : null}

                            </Col>
                          </FormGroup>
                        </Col>
                      </Row>


                      {/* 
                      <Row form className="">
                        <Col md={12} sm={12} >
                          <FormGroup row className="EOFormGroupRow">
                            <Col sm={1}></Col>
                            <Col lg={5} md={6} sm={8} className='field-col'>

                              <Autocomplete
                                value={this.state.forDepartment}
                                onChange={(event, newValue) => {
                                  this.SetDayCareValue(newValue);
                                }}
                                id="DayCareName"
                                options={this.state.DayCareOptions}
                                renderInput={(params) =>
                                  <TextField
                                    {...params}
                                    label="מחלקה"
                                    error={this.state.DayCareValidationError}
                                    helperText={this.state.DayCareValidationError ? 'נא למלא שם מעון' : ''}
                                    required
                                  />}
                                size="medium"
                                className="TextFieldFadeInTrans AutoCompleteStyle"
                                fullWidth
                              />

                            </Col>
                          </FormGroup>
                        </Col>
                      </Row> */}
                      <Row form style={{ marginTop: '5px' }}>
                        <Col md={12} sm={12} >
                          <FormGroup row className="EOFormGroupRow">
                            <Col sm={1}></Col>
                            <Col lg={4} md={6} sm={6} className='field-col'>

                              <TextField
                                id="d"
                                label="מחלקה"
                                type="string"
                                name="department"
                                value={this.state.department}
                                margin="normal"
                                size="small"
                                disabled
                                // error={this.state.productValidationError}
                                // helperText={this.state.productValidationError ? 'Please enter any value' : ''}
                                className="TextFieldFadeInTrans"
                                fullWidth
                              />
                            </Col>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row form style={{ marginTop: '5px' }}>
                        <Col md={12} sm={12} >
                          <FormGroup row className="EOFormGroupRow">
                            <Col sm={1}></Col>
                            <Col lg={4} md={6} sm={6} className='field-col'>

                              <TextField
                                id="d"
                                label="תת מחלקה:"
                                type="string"
                                name="productElseStr"
                                value={this.state.subDepartment}
                                margin="normal"
                                size="small"
                                disabled
                                // error={this.state.productValidationError}
                                // helperText={this.state.productValidationError ? 'Please enter any value' : ''}
                                className="TextFieldFadeInTrans"
                                fullWidth
                              />
                            </Col>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row form className="" style={{ marginTop: '30px' }}>
                        <Col md={12} sm={12} >
                          <FormGroup row className="EOFormGroupRow">
                            <Col sm={1}></Col>
                            <Col lg={4} md={6} sm={8} className='field-col'>

                              <PeoplePicker
                                context={this.props.context}
                                titleText="מנהל מאשר"
                                personSelectionLimit={1}
                                showtooltip={true}
                                required={false}
                                disabled={true}
                                // onChange={this.GetCheckerPeoplePickerItems}
                                showHiddenInUI={true}
                                principalTypes={[PrincipalType.User]}
                                ensureUser={true}
                                resolveDelay={1000}
                                defaultSelectedUsers={[this.state.teamLeadData.Email ? this.state.teamLeadData.Email : null]}
                              />
                              {this.state.CheckerNameValidationError ?
                                <Fade in={this.state.CheckerNameValidationError} tag="h5" className="mt-3 ValidationError">
                                  <Alert variant="outlined" severity="error">
                                    אנא מלא את שם הבודק
                                  </Alert>
                                </Fade> : null}
                            </Col>
                          </FormGroup>
                        </Col>
                      </Row>
                      {/*  */}
                      <Row form className="">
                        <Col md={12} sm={12} >
                          <FormGroup row className="EOFormGroupRow">
                            <Col sm={1}></Col>
                            <Col lg={4} md={6} sm={8} className='field-col'>

                              <Autocomplete
                                value={this.state.supplier}
                                onChange={(event, newValue) => {
                                  this.SetSupplierValue(newValue);
                                }}
                                id="supplier"
                                options={this.state.supplierArr}
                                renderInput={(params) =>
                                  <TextField
                                    {...params}
                                    label="ספק"
                                    error={this.state.supplierValidation}
                                    helperText={this.state.supplierValidation ? 'נא לבחור ספק' : ''}
                                    required
                                  />}
                                size="medium"
                                className="TextFieldFadeInTrans AutoCompleteStyle"
                                fullWidth
                              />

                            </Col>
                          </FormGroup>
                        </Col>
                      </Row>
                      {this.state.supplier === "אחר" ?
                        <div>
                          <Row form style={{ marginTop: '5px' }}>
                            <Col md={12} sm={12} >
                              <FormGroup row className="EOFormGroupRow">
                                <Col sm={1}></Col>
                                <Col lg={4} md={6} sm={6} className='field-col'>

                                  <TextField
                                    id="d"
                                    label="שם הספק:"
                                    type="string"
                                    name="elseSupplierName"
                                    value={this.state.elseSupplierName}
                                    margin="normal"
                                    size="small"
                                    onChange={this.onChange}
                                    required
                                    // error={this.state.elseSupplierValidation}
                                    // helperText={this.state.elseSupplierValidation ? 'יש למלא שם ספק וח.פ' : ''}
                                    className="TextFieldFadeInTrans"
                                    fullWidth
                                  />
                                </Col>
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row form style={{ marginTop: '5px' }}>
                            <Col md={12} sm={12} >
                              <FormGroup row className="EOFormGroupRow">
                                <Col sm={1}></Col>
                                <Col lg={4} md={6} sm={6} className='field-col'>

                                  <TextField
                                    id="d"
                                    label="ח.פ:"
                                    type="string"
                                    name="elseSupplierNumber"
                                    value={this.state.elseSupplierNumber}
                                    margin="normal"
                                    size="small"
                                    onChange={this.onChange}
                                    required
                                    error={this.state.elseSupplierValidation}
                                    helperText={this.state.elseSupplierValidation ? 'יש למלא שם ספק וח.פ' : ''}
                                    className="TextFieldFadeInTrans"
                                    fullWidth
                                  />
                                </Col>
                              </FormGroup>
                            </Col>
                          </Row>
                        </div>

                        :
                        <div></div>
                      }
                      <Row form className="">
                        <Col md={12} sm={12} >
                          <FormGroup row className="EOFormGroupRow">
                            <Col sm={1}></Col>
                            <Col lg={4} md={6} sm={8} className='field-col'>

                              <Autocomplete
                                value={this.state.buyerName}
                                onChange={(event, newValue) => {
                                  this.SetBuyersValue(newValue);
                                }}
                                id="supplier"
                                options={this.state.buyersOptions}
                                renderInput={(params) =>
                                  <TextField
                                    {...params}
                                    label="קניין"
                                    error={this.state.supplierValidation}
                                    helperText={this.state.supplierValidation ? 'נא לבחור קניין' : ''}
                                    required
                                  />}
                                size="medium"
                                className="TextFieldFadeInTrans AutoCompleteStyle"
                                fullWidth
                              />

                            </Col>
                          </FormGroup>
                        </Col>
                      </Row>
                      {/*  */}
                      <Col sm={1}></Col>
                      <div className='sectionTitle' style={{ backgroundColor: '#d7182a', borderRadius: '15px' }}>
                        <h4 style={{ marginTop: '30px', marginRight: '20px', color: 'white', padding: '1%' }}>הבקשה / הדרישה:</h4>
                      </div>
                      <Row form className="" style={{ marginTop: '5px' }}>
                        <Col md={12} sm={12} >
                          <FormGroup row className="EOFormGroupRow">
                            <Col sm={1}></Col>
                            <Col lg={10} md={10} sm={10} className='field-col'>

                              <TextField
                                id="outlined-multiline-static"
                                label="מה נרכש? (תיאור כללי – ברגים / חלקי חילוף / ייעוץ וכד'. רצוי להוסיף קובץ מפורט)"
                                type="string"
                                name="WhatWasPurchased"
                                inputProps={{ maxLength: 250 }}
                                value={this.state.WhatWasPurchased}
                                onChange={this.onChange}
                                margin="normal"
                                size="medium"
                                className="TextFieldFadeInTrans"
                                multiline
                                error={this.state.WhatWasPurchasedValidation}
                                helperText={this.state.WhatWasPurchasedValidation ? 'יש למלא פרטים' : ''}
                                rows={4}
                                variant="outlined"
                                fullWidth={true}

                              // fullWidth
                              />

                            </Col>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row form className="" style={{ marginTop: '5px' }}>
                        <Col md={12} sm={12} >
                          <FormGroup row className="EOFormGroupRow">
                            <Col sm={1}></Col>
                            <Col lg={10} md={10} sm={10} className='field-col'>

                              <TextField
                                id="outlined-multiline-static"
                                label="לטובת מה?"
                                type="string"
                                name="forWhat"
                                inputProps={{ maxLength: 250 }}
                                value={this.state.forWhat}
                                onChange={this.onChange}
                                margin="normal"
                                size="medium"
                                className="TextFieldFadeInTrans"
                                multiline
                                error={this.state.forWhatValidation}
                                helperText={this.state.forWhatValidation ? 'יש למלא פרטים' : ''}
                                rows={4}
                                variant="outlined"
                                fullWidth={true}

                              // fullWidth
                              />

                            </Col>
                          </FormGroup>
                        </Col>
                      </Row>

                      {/*  */}
                      <Row form className="" style={{ marginTop: '5px' }}>
                        <Col md={12} sm={12} >
                          <FormGroup row className="EOFormGroupRow">
                            <Col sm={1}></Col>
                            <Col lg={4} md={6} sm={8} className='field-col'>

                              <Autocomplete
                                value={this.state.forDepartment}
                                onChange={(event, newValue) => {
                                  this.SetForDepartmentValue(newValue);
                                }}
                                id=""
                                options={this.state.deparmentsArr}
                                renderInput={(params) =>
                                  <TextField
                                    {...params}
                                    label="עבור מחלקה:"
                                    error={this.state.DayCareValidationError}
                                    helperText={this.state.DayCareValidationError ? 'נא למלא שם מעון' : ''}
                                    required
                                  />}
                                size="medium"
                                className="TextFieldFadeInTrans AutoCompleteStyle"
                                fullWidth
                              />

                            </Col>
                          </FormGroup>
                        </Col>
                      </Row>
                      {/* <Row form style={{ marginTop: '5px' }}>
                        <Col md={12} sm={12} >
                          <FormGroup row className="EOFormGroupRow">
                            <Col sm={1}></Col>
                            <Col lg={5} md={6} sm={6} className='field-col'>

                              <TextField
                                id="d"
                                label="עבור מחלקה:"
                                type="string"
                                name="productElseStr"
                                value={this.state.forDepartment}
                                onChange={this.onChange}
                                margin="normal"
                                size="small"
                                // error={this.state.productValidationError}
                                // helperText={this.state.productValidationError ? 'Please enter any value' : ''}
                                className="TextFieldFadeInTrans"
                                fullWidth
                              />
                            </Col>
                          </FormGroup>
                        </Col>
                      </Row> */}
                      <Row form style={{ marginTop: '5%', marginRight: '2%', marginLeft: '2%' }}>
                        <Col md={12} sm={12} >
                          <FormGroup row className="EOFormGroupRow">
                            <Col sm={1}></Col>

                            <TableContainer component={Paper}>
                              <Table aria-label="simple table">
                                <TableHead>
                                  <TableRow>
                                    <TableCell style={{ fontWeight: 'bold', color: '#d7182a' }} align="left">מק"ט רידיפיינדמיט</TableCell>
                                    <TableCell style={{ fontWeight: 'bold', color: '#d7182a' }} align="left">מק"ט</TableCell>
                                    <TableCell style={{ fontWeight: 'bold', color: '#d7182a' }} align="left">כמות</TableCell>
                                    <TableCell style={{ fontWeight: 'bold', color: '#d7182a' }} align="left">יחידת מידה</TableCell>
                                    <TableCell style={{ fontWeight: 'bold', color: '#d7182a' }} align="left">מחיר ליחידה</TableCell>
                                    <TableCell style={{ fontWeight: 'bold', color: '#d7182a' }} align="left">עלות</TableCell>
                                    <TableCell style={{ fontWeight: 'bold', color: '#d7182a' }} align="left">תיאור</TableCell>
                                    <TableCell style={{ fontWeight: 'bold', color: '#d7182a' }} align="left">תאריך קבלה צפוי</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>


                                  {this.state.tableRows ? this.state.tableRows.map((row) => (

                                    <TableNewRows OnEditItem={this.updateItem} unitOptions={this.state.unitOptions} deleteItem={this.delItem} row={row} />

                                  )) : <div></div>}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </FormGroup>
                        </Col>
                      </Row>
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '3%' }}>
                        {this.state.tableValidation ? <p> <h5>יש צורך למלא לפחות שורה אחת בטבלה</h5></p> : <div></div>}
                        {this.state.tableRows.length === 0 ? <p> <h5>אין נתונים בטבלה</h5></p> : <div></div>}

                        <AddRow IsDisabled={false} unitOptions={this.state.unitOptions} OnAddItem={this.addRow} />
                        {/* if table emty set message */}
                        <Row form style={{ marginTop: '5px' }}>
                          <Col md={12} sm={12} >
                            <FormGroup row className="EOFormGroupRow">
                              <Col sm={1}></Col>
                              <Col lg={12} md={12} sm={12} className='field-col'>

                                <TextField
                                  id="d"
                                  label="עלות:"
                                  type="string"
                                  name="productElseStr"
                                  value={this.state.cost}
                                  margin="normal"
                                  size="small"
                                  // error={this.state.productValidationError}
                                  // helperText={this.state.productValidationError ? 'Please enter any value' : ''}
                                  className="TextFieldFadeInTrans"
                                  fullWidth
                                />
                              </Col>
                            </FormGroup>
                          </Col>
                        </Row>



                      </div>
                      <Row form style={{ marginTop: '20px' }}>
                        <Col md={12} sm={12}>
                          <FormGroup row className="EOFormGroupRow">
                            <div className='centerContainer'>
                              {/* <div className='AddItemContainer'> ,application/msword,ods,.pps,.ppt,.pptx,.msg,.oft,.ost,.pst,.vcf */}
                              <Input type="file" accept="image/*,.pdf,.doc,.docx,.png,.jpg,.jpeg,.xlsm,.xls,.xlsx"
                                name="MoreDataFiles1" id="MoreDataFiles1" onChange={this.handleUploadFile} bsSize="sm" style={{ 'opacity': '0' }} />
                              <Button style={{ backgroundColor: '#d7182a', color: 'white', textTransform: "none" }} onClick={this.TriggerUploadFiles} name="TriggerUpload1" className="SaveFilesButton">
                                <InsertDriveFileIcon id='fileIcon' />
                                צירוף קובץ הצעת מחיר</Button>
                              {/* </div> */}
                            </div>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row form>
                        <Col md={12} sm={12}>
                          <FormGroup row className="EOFormGroupRow">
                            <Col sm={3}></Col>
                            <Col sm={8} md={6} lg={6}>
                              <List >
                                {/* <ul className="ListOfFiles"> */}

                                {this.state.MoreDataFilesProps1.length > 0 ? this.state.MoreDataFilesProps1.map(({ ID, FileName }) => (
                                  <div >
                                    <ListItem>
                                      <ListItemAvatar>
                                        <Avatar>
                                          {/* <FolderIcon /> */}
                                          <InsertDriveFileIcon id='fileIcon' />
                                        </Avatar>
                                      </ListItemAvatar>
                                      {/* <ListItemText
                                        primary={FileName}

                                      /> */}
                                      <a className="ListOfFilesItemName" href={URL.createObjectURL(this.state.MoreDataFiles1[parseInt(ID)])} download={FileName}>{FileName}</a>
                                      <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="delete" onClick={() => this.RemoveFile(ID)}>
                                          <DeleteIcon />
                                        </IconButton>
                                      </ListItemSecondaryAction>
                                    </ListItem>
                                  </div>
                                ))
                                  : <div></div>}
                                {/* </ul> */}
                              </List>

                              {this.state.FileNameError ? <Alert variant="outlined" severity="error">Each file must be given a unique name</Alert> : null}

                            </Col>
                          </FormGroup>

                        </Col>
                      </Row>
                      <Row form className="">
                        <Col md={12} sm={12} >
                          <FormGroup row className="EOFormGroupRow">
                            <Col sm={1}></Col>
                            <Col lg={4} md={6} sm={8} className='field-col'>

                              <Autocomplete
                                value={this.state.moneyTypeChosen}
                                onChange={(event, newValue) => {
                                  this.SetMoneyTypeValue(newValue);
                                }}
                                id="supplier"
                                options={this.state.moneyTypeArr}
                                renderInput={(params) =>
                                  <TextField
                                    {...params}
                                    label="מטבע תשלום"
                                    error={this.state.moneyTypeValidation}
                                    helperText={this.state.moneyTypeValidation ? 'נא לבחור מטבע תשלום' : ''}
                                    required
                                  />}
                                size="medium"
                                className="TextFieldFadeInTrans AutoCompleteStyle"
                                fullWidth
                              />

                            </Col>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row form>
                        <Row form style={{ marginTop: '5px' }}>
                          <Col md={12} sm={12} >
                            <FormGroup row className="EOFormGroupRow">
                              <Col sm={1}></Col>
                              <Col lg={4} md={6} sm={8} className='field-col'>
                                <TextField
                                  id="d"
                                  onChange={this.onChange}
                                  label="תנאי תשלום:"
                                  type="string"
                                  name="TermsOfPayment"
                                  value={this.state.TermsOfPayment}
                                  margin="normal"
                                  size="small"
                                  // error={this.state.productValidationError}
                                  // helperText={this.state.productValidationError ? 'Please enter any value' : ''}
                                  className="TextFieldFadeInTrans"
                                  fullWidth
                                />
                              </Col>
                            </FormGroup>
                          </Col>
                        </Row>
                        <div className='sectionTitle' style={{ backgroundColor: '#d7182a', borderRadius: '15px' }}>
                          <h4 style={{ marginTop: '30px', marginRight: '20px', color: 'white', padding: '1%' }}>סבב אישורים:</h4>
                        </div>
                        {/*  */}
                        <Row form>
                          <div className="EOFormSectionTitle">אישורים</div>
                        </Row>
                        <Row form >

                          <Col md={12} sm={12}>
                            <FormGroup row className="EOFormGroupRow">
                              <Col sm={4}></Col>
                              <Label for="Status" sm={1}>סטטוס</Label>
                              <Col sm={3}>
                                <Input type="text" name="Status" id="Status" onChange={this.onChange} value={this.state.Status} bsSize="sm" disabled />
                              </Col>
                              <Col sm={4}></Col>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row form>
                          <Col md={12} sm={12}>
                            <FormGroup row className="EOFormGroupRow">
                              <Col className="ApproverRole"><div className="ApproverHeader">תפקיד</div></Col>
                              <Col className="ApproverApprovel"><div className="ApproverHeader">אישור</div></Col>
                              <Col className="ApproverSign"><div className="ApproverHeader">חתימה</div></Col>
                              <Col className="ApproverComment"><div className="ApproverHeader">הערות</div></Col>
                            </FormGroup>
                          </Col>
                        </Row>
                        {this.state.noTeamLead === false ?
                          <Row form style={{ marginTop: '10px' }}>
                            <Col md={12} sm={12}>
                              <FormGroup row className="EOFormGroupRow">
                                <Label className="ApproverTitle" for="DepartmentManagerName">ראש צוות מאשר</Label>
                                <Col className="ApproverName">
                                  <Input type="text" name="DepartmentManagerName" id="DepartmentManagerName" onChange={this.onChange} value={this.state.teamLeadData.Title} bsSize="sm" disabled />
                                </Col>
                                <Col className="ApproverApprovel">
                                  <Input className="form-select form-select-sm" type="select" name="teamLeadStatus" id="DepartmentManagerApprove" onChange={this.onChange} value={this.state.teamLeadStatus} bsSize="sm" disabled>
                                    {this.state.ApprovelsOptions.map((Title, Index) => (
                                      <option key={"DepartmentManagerApprove" + Index}>{Title}</option>
                                    ))}
                                  </Input>
                                </Col>
                                <Col className="ApproverSign">
                                  <Input type="text" name="teamLeadSign" id="DepartmentManagerSign" onChange={this.onChange} value={this.state.teamLeadSign} bsSize="sm" disabled />
                                </Col>
                                <Col className="ApproverComment">
                                  <Input type="textarea" rows="1" name="temaLeadComment" id="DepartmentManagerComment" onChange={this.onChange} value={this.state.temaLeadComment} bsSize="sm" disabled />
                                </Col>
                              </FormGroup>
                            </Col>
                          </Row>
                          : <div></div>}
                        {this.state.noDirector === false ? <div>
                          {this.approvalsWhoTakePart('director', this.state.cost) || this.state.noTeamLead ?
                            < Row form style={{ marginTop: '10px' }}>
                              <Col md={12} sm={12}>
                                <FormGroup row className="EOFormGroupRow">
                                  <Label className="ApproverTitle" for="PayrollDepartmentName">דירקטור</Label>
                                  <Col className="ApproverName">
                                    <Input type="text" name="PayrollDepartmentName" id="PayrollDepartmentName" onChange={this.onChange} value={this.state.directorData.Title} bsSize="sm" disabled />
                                  </Col>
                                  <Col className="ApproverApprovel">
                                    <Input className="form-select form-select-sm" type="select" name="directorStatus" id="PayrollDepartmentApprove" onChange={this.onChange} value={this.state.directorStatus} bsSize="sm" disabled>
                                      {this.state.ApprovelsOptions.map((Title, Index) => (
                                        <option key={"PayrollDepartmentApprove" + Index}>{Title}</option>
                                      ))}
                                    </Input>
                                  </Col>
                                  <Col className="ApproverSign">
                                    <Input type="text" name="directorSign" id="PayrollDepartmentSign" onChange={this.onChange} value={this.state.directorSign} bsSize="sm" disabled />
                                  </Col>
                                  <Col className="ApproverComment">
                                    <Input type="textarea" rows="1" name="directorComment" id="PayrollDepartmentComment" onChange={this.onChange} value={this.state.directorComment} bsSize="sm" disabled />
                                  </Col>
                                </FormGroup>
                              </Col>
                            </Row>

                            : <div></div>}
                        </div>
                          : <div></div>}

                        {this.approvalsWhoTakePart('vp', this.state.cost) 
                        ||(this.approvalsWhoTakePart('director', this.state.cost) && this.state.noDirector ) 
                        || (this.state.noDirector && this.state.noTeamLead)?


                          <Row form style={{ marginTop: '10px' }}>
                            <Col md={12} sm={12}>
                              <FormGroup row className="EOFormGroupRow">
                                <Label className="ApproverTitle" for="SystemName">VP</Label>
                                <Col className="ApproverName">
                                  <Input type="text" name="SystemName" id="SystemName" onChange={this.onChange} value={this.state.vpData.Title} bsSize="sm" disabled />
                                </Col>
                                <Col className="ApproverApprovel">
                                  <Input className="form-select form-select-sm" type="select" name="vpStatus" id="SystemApprove" onChange={this.onChange} value={this.state.vpStatus} bsSize="sm" disabled>
                                    {this.state.ApprovelsOptions.map((Title, Index) => (
                                      <option key={"SystemApprove" + Index}>{Title}</option>
                                    ))}
                                  </Input>
                                </Col>
                                <Col className="ApproverSign">
                                  <Input type="text" name="vpSign" id="SystemSign" onChange={this.onChange} value={this.state.vpSign} bsSize="sm" disabled />
                                </Col>
                                <Col className="ApproverComment">
                                  <Input type="textarea" rows="1" name="vpComment" id="SystemComment" onChange={this.onChange} value={this.state.vpComment} bsSize="sm" disabled />
                                </Col>
                              </FormGroup>
                            </Col>
                          </Row>
                          : <div></div>}

                        {/*  */}
                        <ThemeProvider theme={ButtonsTheme}>
                          <div className='FormButtons'>
                            <Button
                              variant="contained"
                              id="PopoverLegacy"
                              color="secondary"
                              className='CancelButton TextFieldFadeInTrans'
                              endIcon={<IoCloseCircleOutline />}
                              disabled={this.state.IsSaving}
                            >
                              ביטול
                            </Button>
                            <Button
                              variant="contained"
                              color="primary"
                              className='SaveButton TextFieldFadeInTrans'
                              endIcon={<AiOutlineSend className='RotatedIcon' />}
                              disabled={this.state.IsSaving}
                              onClick={() => this.createApprovalRoad()}
                            >
                              שמירה
                            </Button>
                            <Popover trigger="legacy" placement="top" target="PopoverLegacy" isOpen={this.state.PopoverOpen} toggle={this.PopOverToggle}>
                              <PopoverHeader className="CancelFormText">האם אתה בטוח?</PopoverHeader>
                              <PopoverBody>
                                <div className="sa">
                                  <div className="sa-error">
                                    <div className="sa-error-x">
                                      <div className="sa-error-left"></div>
                                      <div className="sa-error-right"></div>
                                    </div>
                                    <div className="sa-error-placeholder"></div>
                                    <div className="sa-error-fix"></div>
                                  </div>
                                </div>
                                <div className="CancelFormAlertButtons">
                                  <Button
                                    variant="outlined"
                                    color="secondary"
                                    className='AlertCancelButton TextFieldFadeInTrans'
                                    onClick={this.PopOverToggle}
                                  >
                                    לא
                                  </Button>
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    className='AlertSaveButton TextFieldFadeInTrans'
                                    onClick={this.CloseTheForm}
                                  >
                                    כן
                                  </Button>
                                </div>
                              </PopoverBody>
                            </Popover >
                          </div>
                        </ThemeProvider>
                      </Row>
                      {this.state.ValidationError ?
                        <Row form>
                          <Fade in={this.state.ValidationError} tag="h5" className="mt-3 ValidationError">
                            <Alert variant="outlined" severity="error">
                              ישנם שגיאות ולידציה בטופס, אנא תקן אותם לפני הגשה חוזרת של הטופס!
                            </Alert>
                          </Fade>
                        </Row>
                        : null}
                      {this.state.IsSaving ?
                        <Row form>
                          <div className='SavingLoader'>
                            <div className="loaderContainer">
                              <div className="loader">
                                <div className="ball"></div>
                                <div className="ball"></div>
                                <div className="ball"></div>
                              </div>
                            </div>
                            <div className="SavingLoadertext">הטופס נטען למערכת...</div>
                          </div>
                        </Row>
                        : null}
                    </Form>
                  </Fade>
                  :
                  null}
              </div>
            </ThemeProvider>
          </StylesProvider>
          :
          <StylesProvider jss={jss}>
            <ThemeProvider theme={theme}>

              <div className="EONewFormContainer" dir="rtl">
                <div className="EOHeader">
                  <div className="EOHeaderContainer"><span className="EOHeaderText">{this.props.FormName}</span></div>
                </div>
                <div className="IDOrPermError">
                  <div className="p-3 bg-danger my-2 rounded">
                    <Toast>
                      <ToastHeader>
                        התגלתה בעיה בעת יצירת הטופס
                      </ToastHeader>
                      <ToastBody>
                        <p>
                          {this.state.FormSubmitErrorMessage}
                        </p>
                        <p>
                          אם הבעיה נמשכת, אנא צור קשר עם מנהל המערכת.
                        </p>
                        <p>
                          <ThemeProvider theme={ButtonsTheme}>
                            <Button
                              variant="contained"
                              color="primary"
                              className='FormErrorButton TextFieldFadeInTrans'
                              disabled={this.state.IsSaving}
                              onClick={this.CloseTheForm}
                            >
                              חזרה לכל הטפסים
                            </Button>
                          </ThemeProvider>
                        </p>
                      </ToastBody>
                    </Toast>
                  </div>
                </div >
              </div>
            </ThemeProvider>
          </StylesProvider>
        }
      </div >
    );
  }
}
