import * as React from 'react';
import styles from './ProcurementRequirement.module.scss';
import { IProcurementRequirementProps } from './IProcurementRequirementProps';
import { IProcurementRequirementState } from './IProcurementRequirementState';
import 'bootstrap/dist/css/bootstrap.min.css';

import './NutritionReport.css';

import 'date-fns';
import 'animate.css';
import DateFnsUtils from '@date-io/date-fns';
import {
  Col, Row, Form, FormGroup, Fade,
  Popover, PopoverHeader, PopoverBody, Toast, ToastHeader, ToastBody
} from 'reactstrap';
import {
  TextField, Button,
} from '@material-ui/core';
import {
  Autocomplete, Alert
} from '@material-ui/lab';
import { ThemeProvider, StylesProvider } from '@material-ui/core/styles';
import { DatePickerTheme } from '../Models/DatePickerTheme';
import { theme } from '../Models/theme';
import { ButtonsTheme } from '../Models/ButtonsTheme';
import { SwitchTheme } from '../Models/SwitchTheme'
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

import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import "@pnp/sp/webs";
import "@pnp/sp/lists/web";
import "@pnp/sp/fields";

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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


export default class ProcurementRequirement extends React.Component<IProcurementRequirementProps, IProcurementRequirementState> {
  constructor(props) {
    super(props);
    // Set States (information managed within the component), When state changes, the component responds by re-rendering
    this.state = {

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
      applicantName: '',
      applicantId: '',
      department: '',
      deparmentsArr: [],
      subDepartment: '',
      subDepartmentArr: [],
      managerApproves: '',
      supplier: '',
      supplierArr: [],
      WhatWasPurchased: '',
      forWhat: '',
      forDepartment: '',
      tableRows: [],
      cost:0
    };
  }
  // table functions
  delItem = (item: any) => {
    let tempArr = this.state.tableRows.filter(row => row !== item)
    this.setState({
      tableRows: tempArr
    })
  }

  updateItem = ( newData: any) => {
    // checks
    console.log(newData);

    console.log(this.state.tableRows);
    
    // 
    let tempArr = this.state.tableRows;

    if(tempArr.length===1)
    {
      let tempArr = [];
      tempArr.push(newData)
      this.setState({
        tableRows:tempArr
      },()=>{
        this.calcCosts();
  
      })
      
    }else{
      
      for(let i = 0 ; i < this.state.tableRows.length ; i++)
      {
        if(this.state.tableRows[i].rowID === newData.rowID)
        {
         tempArr.splice(i, 1, newData);
        }
      }
      this.setState({
        tableRows:tempArr
      },()=>{
        this.calcCosts();
  
      })
    }
    
    console.log('here');
    console.log(tempArr);
    
   
  }

  addRow = (item:any) => {
    console.log(item);
    console.log(this.state.tableRows);

    let tempArr = [...this.state.tableRows,item];
    this.setState({
      tableRows:tempArr
    },()=>{
      this.calcCosts();

    })

  }

  calcCosts = () => {
    let sum = 0;
    console.log(this.state.tableRows);
    this.state.tableRows.forEach(element => {
      console.log(element);
      
      sum += element.cost;
    });
    this.setState({
      cost:sum
    },()=>{
      console.log(this.state.cost);
      
    })
  }

  // ============== End tableFunctions ============== 
  componentDidMount = () => {
    this.setState({
      FormIsActiveStatus: true,//  delete at finishes
      IsLoading: false,//was true
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
    let userEmail: string = '';
    let companyList: Array<string> = [];
    let competitor: Array<string> = [];
    let dataSourcesArr: Array<string> = [];
    let productsArr: Array<string> = [];
    let UserGroups: Array<string> = [];
    const web = Web(this.props.WebUri);
    // Get current user groups.
    // if from "Authorized access to forms" display button 
    // web.currentUser.groups().then(UserGroupsResult => {
    //   UserGroups = UserGroupsResult.map(Group => Group.Title)
    //   // console.log('UserGroups after load:', this.UserGroups)


    //   if (UserGroups.indexOf("AuthorizedAccessToForms") !== -1) {
    //     this.setState({ competitorsLinkBtnFlag: true })
    //     console.log("here");

    //   }
    // }).catch(Error => {
    //   // console.log('Error:', Error)
    // });


    web.currentUser.get().then(result => {
      // console.log(result);//test

      this.GetCheckerPeoplePickerItems(result);

      web.lists.getById(this.props.emloyeeListsData).items.get().then(result => {
        companyList = result.map(item => item.Title);
        // web.lists.getById(this.props.competitorsListId).items.get().then(result => {
        //   competitor = result.map(item => item.product);
        web.lists.getById(this.props.approversListsData).items.get().then(result => {
          dataSourcesArr = result.map(item => item.Title);
          console.log(dataSourcesArr);
          console.log(companyList);
          web.lists.getById(this.props.supplier).items.get().then(result => {
            competitor = result.map(item => item.Title);
            // web.lists.getById(this.props.productsListId).items.get().then(result => {
            //   productsArr = result.map(item => item.Title);
            //   this.setState({
            //     dataSourcesArr: dataSourcesArr,
            //     companyNamesArr: companyList,
            //     competitorNameArr: competitor,
            //     productArr: productsArr
            //   })
            // })

          })



        })
      })

      // }).catch(Err => {
      //   console.log(Err);
      //   // here Error modal

      // })
    }).catch(Err => {
      console.log(Err);
      // here Error modal

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



  GetItemToSave = () => {

    const FieldsValues = Object.keys(this.state.FieldsData).reduce((Acc, CurrSection) => {
      const CurrSectionFieldsValues = Object.keys(this.state.FieldsData[CurrSection]).reduce((Acc, CurrField) => {
        Acc[CurrField] = this.state.FieldsData[CurrSection][CurrField]['Score'] === '' ? 0 : Number(this.state.FieldsData[CurrSection][CurrField]['Score']);
        return Acc
      }, {})
      Acc = { ...Acc, ...CurrSectionFieldsValues }
      return Acc
    }, {})

    console.log('FieldsValue:', FieldsValues)
    console.log('FieldsValue length:', Object.keys(FieldsValues).length)

    const FieldsDataJson = JSON.stringify(this.state.FieldsData)
    console.log(this.state.FieldsData);

    return {
      ...FieldsValues,
      FieldsDataJson,
      Title: this.state.DayCareName,
      VisitDate: this.state.VisitDate,
      CheckerId: this.state.CheckerId,
      CheckerEmail: this.state.CheckerEmail,
      DirectorId: this.state.DirectorId,
      DirectorEmail: this.state.DirectorEmail,
      NumberOfMeals: this.state.NumberOfMeals,
      GeneralImpression: this.state.GeneralImpression === '' ? 0 : Number(this.state.GeneralImpression),
      // LabResultsFindings: this.state.LabResultsFindings,
      // LabResultsRisk: this.state.LabResultsRisk,
      // LabResultsSuggestions: this.state.LabResultsSuggestions,
      HelperName: this.state.HelperName,
      cooker: this.state.cooker,
      Baby: this.state.Baby,
      child: this.state.child,
      adult: this.state.adult,
      finalScore: this.state.score
    }
  }

  ValidateForm = () => {
    console.log('VisitDate: ' + this.state.VisitDate + " DayCareName: " + this.state.DayCareName + " CheckerEmail: " + this.state.CheckerEmail);

    var Validated = true;
    if ((this.state.VisitDate === null && this.state.VisitDate === undefined && !isNaN(this.state.VisitDate.getTime())) &&
      (this.state.DayCareName === null && this.state.DayCareName === '' && this.state.CheckerEmail === ''
        && this.state.CheckerEmail === null && this.state.Baby === null && this.state.child === null && this.state.adult === null)) {
      Validated = false
      this.setState({
        ValidationError: true,
        DayCareValidationError: true
      })
    }
    return Validated
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
    let TitleName = this.state.DayCareName + " " + this.ConvertToDisplayDate();
    this.GetItemToSave();
    if (OnClick) {
      // Start Saving loader
      this.setState({
        IsSaving: true
      });
    }

    if (this.ValidateForm()) {
      let web = Web(this.props.WebUri);

      if (this.state.FormId !== null && this.state.FormId !== undefined && this.state.FormId !== 0 && !isNaN(this.state.FormId)) {

        let FormUrl = this.props.LinkToEditForm + "?FormID=" + this.state.FormId.toString();
        const itemToUpdate = this.GetItemToSave()

        // Update item
        web.lists.getByTitle(this.props.listsData).items.getById(this.state.FormId).update({
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
        web.lists.getByTitle(this.props.listsData).items.add(itemToSave).then(AddResult => {
          console.log('AddResult:', AddResult)
          web.lists.getByTitle(this.props.listsData).items.getById(AddResult.data.ID).update({
            FormLink: {
              "__metadata": { "type": "SP.FieldUrlValue" },
              "Description": TitleName,
              "Url": this.props.LinkToEditForm + "?FormID=" + AddResult.data.ID
            }
          }).then(UpdateResult => {
            console.log('UpdateResult:', UpdateResult)
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

  SetDayCareValue = (DayCareName: string) => {
    if (DayCareName !== null && DayCareName !== '') {
      let SelectedDayCare = this.state.ListOfDayCares.filter(DayCare => DayCare.Title === DayCareName);
      console.log('SelectedDayCare:', SelectedDayCare)
      if (SelectedDayCare.length == 1) {
        this.setState({
          DayCareCity: SelectedDayCare[0].DayCareCity,
          DayCareName: DayCareName,

          DirectorId: SelectedDayCare[0].DirectorId,
          DirectorEmail: SelectedDayCare[0].DirectorEmail,

          VisitDateValidationError: false,
          DayCareValidationError: false,
          ValidationError: false
        });
      }
    } else {
      this.setState({
        DayCareCity: '',
        DayCareName: '',
        VisitDateValidationError: false,
        DayCareValidationError: false,
        ValidationError: false
      });
    }
  }

  SetScoreValue = (FieldName: string, ScoreValue: string) => {
    // console.log('ScoreValue:', ScoreValue);
    // console.log('FieldName:', FieldName);

    if (ScoreValue === null) {
      this.setState(PrevState => ({
        ...PrevState,
        [FieldName]: null,
        ValidationError: false
      }));

    } else {
      this.setState(PrevState => ({
        ...PrevState,
        [FieldName]: ScoreValue,
        ValidationError: false
      }));

    }
  }

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
                            <Col lg={5} md={6} sm={8} className='field-col'>
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
                            <Col lg={5} md={6} sm={8} className='field-col'>

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



                      <Row form className="">
                        <Col md={12} sm={12} >
                          <FormGroup row className="EOFormGroupRow">
                            <Col sm={1}></Col>
                            <Col lg={5} md={6} sm={8} className='field-col'>

                              <Autocomplete
                                value={this.state.DayCareName}
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
                      </Row>

                      <Row form className="" style={{ marginTop: '30px' }}>
                        <Col md={12} sm={12} >
                          <FormGroup row className="EOFormGroupRow">
                            <Col sm={1}></Col>
                            <Col lg={5} md={6} sm={8} className='field-col'>

                              <PeoplePicker
                                context={this.props.context}
                                titleText="מנהל מאשר"
                                personSelectionLimit={1}
                                showtooltip={true}
                                required={false}
                                disabled={true}
                                onChange={this.GetCheckerPeoplePickerItems}
                                showHiddenInUI={true}
                                principalTypes={[PrincipalType.User]}
                                ensureUser={true}
                                resolveDelay={1000}
                                defaultSelectedUsers={[this.state.DirectorEmail]}
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
                            <Col lg={5} md={6} sm={8} className='field-col'>

                              <Autocomplete
                                value={this.state.supplier}
                                onChange={(event, newValue) => {
                                  this.SetDayCareValue(newValue);
                                }}
                                id="supplier"
                                options={this.state.supplierArr}
                                renderInput={(params) =>
                                  <TextField
                                    {...params}
                                    label="ספק"
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
                      {/*  */}
                      <Col sm={1}></Col>
                      <h4 style={{ marginTop: '30px', marginRight: '20px' }}>הבקשה / הדרישה:</h4>
                      <Row form className="" style={{ marginTop: '5px' }}>
                        <Col md={12} sm={12} >
                          <FormGroup row className="EOFormGroupRow">
                            <Col sm={1}></Col>
                            <Col lg={5} md={6} sm={6} className='field-col'>

                              <TextField
                                id="outlined-multiline-static"
                                label="מה נרכש? (תיאור כללי – ברגים / חלקי חילוף / ייעוץ וכד'. רצוי להוסיף קובץ מפורט)"
                                type="string"
                                name="WhatWasPurchased"
                                inputProps={{ maxLength: 150 }}
                                value={this.state.WhatWasPurchased}
                                onChange={this.onChange}
                                margin="normal"
                                size="small"
                                className="TextFieldFadeInTrans"
                                multiline
                                // error={this.state.descriptionValidationError}
                                // helperText={this.state.descriptionValidationError ? 'Please enter any value' : ''}
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
                            <Col lg={5} md={6} sm={6} className='field-col'>

                              <TextField
                                id="outlined-multiline-static"
                                label="לטובת מה?"
                                type="string"
                                name="forWhat"
                                inputProps={{ maxLength: 150 }}
                                value={this.state.forWhat}
                                onChange={this.onChange}
                                margin="normal"
                                size="small"
                                className="TextFieldFadeInTrans"
                                multiline
                                // error={this.state.descriptionValidationError}
                                // helperText={this.state.descriptionValidationError ? 'Please enter any value' : ''}
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
                      <Row form style={{ marginTop: '5px' }}>
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
                      </Row>
                      <Row form style={{ marginTop: '5px', marginRight: '2%', marginLeft: '2%' }}>
                        <Col md={12} sm={12} >
                          <FormGroup row className="EOFormGroupRow">
                            <Col sm={1}></Col>

                            <TableContainer component={Paper}>
                              <Table aria-label="simple table">
                                <TableHead>
                                  <TableRow>
                                    <TableCell align="left">מק"ט</TableCell>
                                    <TableCell align="left">כמות</TableCell>
                                    <TableCell align="left">מחיר ליחידה</TableCell>
                                    <TableCell align="left">עלות</TableCell>
                                    <TableCell align="left">תיאור</TableCell>
                                    <TableCell align="left">תאריך הגעה צפוי</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                

                                  {this.state.tableRows ? this.state.tableRows.map((row) => (

                                    <TableNewRows OnEditItem={this.updateItem}  deleteItem={this.delItem} row={row} />

                                  )) : <div></div>}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </FormGroup>
                        </Col>
                      </Row>
                      <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',marginTop:'3%'}}>
                        
                        {this.state.tableRows.length === 0 ?<p> <h5>אין נתונים בטבלה</h5></p> : <div></div>}
                        
                        <AddRow  IsDisabled={false} OnAddItem={this.addRow} />
                        {/* if table emty set message */}
                        <Row form style={{ marginTop: '5px' }}>
                        <Col md={12} sm={12} >
                          <FormGroup row className="EOFormGroupRow">
                            <Col sm={1}></Col>
                            <Col lg={5} md={6} sm={6} className='field-col'>

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

                      <Row form>

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
                              onClick={() => this.SaveForm(true)}
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
