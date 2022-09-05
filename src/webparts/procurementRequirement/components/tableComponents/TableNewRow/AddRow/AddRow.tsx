import * as React from 'react';
import './AddRow.css';
import { IAddRowProps } from './IAddRowProps';
import { IAddRowStates } from './IAddRowStates';
import {
  Row,
  Col,
  Form,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import {
  TextField, IconButton, Button, Fab, Tooltip
} from '@material-ui/core';
import { IoCloseSharp } from "react-icons/io5";
import { ThemeProvider } from '@material-ui/core/styles';
import { ButtonsTheme } from '../../../../Models/ButtonsTheme';
import { AddButtonTheme } from '../../../../Models/AddButtonTheme';
import { IoMdAdd } from "react-icons/io";
import uuid from 'react-uuid';
import { isInteger, isNull, isSet, isUndefined } from 'lodash';
import { DatePickerTheme } from '../../../../Models/DatePickerTheme';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import heLocale from "date-fns/locale/he";
import Moment from 'react-moment';
import * as moment from 'moment';
// import moment from 'moment';
import {
  Autocomplete, Alert
} from '@material-ui/lab';


export default class AddRow extends React.Component<IAddRowProps, IAddRowStates> {
  constructor(props) {
    super(props);
    // Set States (information managed within the component), When state changes, the component responds by re-rendering
    this.state = {
      modal: false,
      identyfier: '',
      amount: 1,
      pricePerUnit: 0,
      cost: 0,
      description: '',
      date: new Date(),
      validation: false,
      companyIdentyfier: '',
      unit: 'בחר',
      unitOptions: [],
      dateValidate: false,
      amontValidate: false,
      pricePerUnitValidate: false,
      descriptionValidate: false,
      companyIdentyfierValidate:false,
      identyfierValidate:false,
      unitValidation:false

    };
  }

  componentDidMount() {
    console.log(this.props.unitOptions);

  }

  toggle = () => {
    // Reset states values
    this.setState({
      companyIdentyfier:'',
      unit:'',
      modal: !this.state.modal,
      identyfier: '',
      amount: 1,
      pricePerUnit: 0,
      cost: 0,
      description: '',
      date: new Date(),
      // validates
      validation: false,
      dateValidate: false,
      amontValidate: false,
      pricePerUnitValidate: false,
      descriptionValidate: false,
      identyfierValidate:false,
      unitValidation:false

    });
  };


  ValidateForm = () => {
    let validated = true;
    // console.log('out');
    let tempIdentyfier: boolean,tempCompanyIdentyfire:boolean, tempAmount: boolean, tempPricePerUnit: boolean, tempdescription: boolean, tempDate: boolean , tempUnit:boolean;
    // if (this.state.identyfier === '' || this.state.identyfier === null) {
    //   tempIdentyfier = true;
    //   validated = false;
    // }
    // if (this.state.companyIdentyfier === '' || this.state.companyIdentyfier=== null) {
    //   tempCompanyIdentyfire = true;
    //   validated = false;
    // }

    if (isNaN(this.state.amount) || this.state.amount === null || this.state.amount === 0) {
      tempAmount = true;
      validated = false;
    }

    if (isNaN(this.state.pricePerUnit) || this.state.pricePerUnit === null ||  this.state.pricePerUnit === 0) {
      tempPricePerUnit = true;
      validated = false;
    }
    if ( this.state.unit === null || this.state.unit === 'בחר' ||  this.state.unit === '') {
      tempUnit = true;
      validated = false;
    }
    if (this.state.description === '' || this.state.description === null) {
      tempdescription = true;
      validated = false;
    }

    if (this.state.date === null) {
      tempDate = true;
      validated = false;
    }
    this.setState({
      validation: validated,
      dateValidate: tempDate,
      amontValidate: tempAmount,
      pricePerUnitValidate: tempPricePerUnit,
      descriptionValidate: tempdescription,
      companyIdentyfierValidate: tempCompanyIdentyfire,
      // identyfierValidate:tempIdentyfier,
      unitValidation:tempUnit
    })
    // // validate  (not empty)
    // if ( this.state.date === null  && (this.state.identyfier === 0 || this.state.identyfier === null) && (this.state.other === '' || this.state.other === null) && (this.state.totalAssets === '' || this.state.totalAssets === null) && (this.state.netSales === '' || this.state.netSales === null)) {
    //   console.log('in');

    //   this.setState({
    //     validation: true
    //   })
    //   validated = false;
    // }


    // console.log(this.state.year+'' !== '');
    // console.log((this.state.year+'').length);

    // if (this.state.year && (this.state.year <= 1950)) {
    //   validated = false;
    //   console.log('in');

    //   this.setState({ yearValidate: true })
    // }

    return validated;

  };
  ConvertToDisplayDate = (date: any) => {

    let dd = String(date.getDate());
    let mm = String(date.getMonth() + 1); //January is 0!
    let yyyy = String(date.getFullYear());
    if (parseInt(dd) < 10) {
      dd = '0' + dd;
    }
    if (parseInt(mm) < 10) {
      mm = '0' + mm;
    }

    let FormattedReleventDate = dd + '/' + mm + '/' + yyyy;

    return FormattedReleventDate;
  }
  SaveItem = () => {
    if (this.ValidateForm()) {

      // moment(new Date(this.state.date+'')).format("DD/MM/YYYY")
      // Create object and pass it to main component (callback)
      console.log(this.ConvertToDisplayDate(this.state.date));

      let AddItemObject = {
        rowID: uuid(), date: this.state.date, identyfier: this.state.identyfier,
        amount: this.state.amount, pricePerUnit: this.state.pricePerUnit, cost: (this.state.amount * this.state.pricePerUnit), description: this.state.description ,unit:this.state.unit , companyIdentyfier:this.state.companyIdentyfier 
      }
      this.props.OnAddItem(AddItemObject);
      this.toggle();
    }
  };

  onChange = (e: { target: { name: any; value: any; }; }) => {
    switch (e.target.name) {
      case 'amount':
        if (isNaN(e.target.value)) {
          {
            // validate true 
            return;
          }
        }
      case 'pricePerUnit':
        if (isNaN(e.target.value)) {
          {
            // validate true 
            return;
          }
        }
    }
    // if(e.target.name === 'amount' )
    // {
    //   if(isNaN(e.target.value)){
    //     {
    //       // validate true 
    //       return;
    //     }
    //   } 

    // }
    const newState = { [e.target.name]: e.target.value } as Pick<IAddRowStates, keyof IAddRowStates>;
    this.setState(newState);
    // this.setState({
    //   DaycareWorkGoalsValidation: false
    // });
  }
  SetVisitDateValue = (VisitDate: Date | null) => {
    if (VisitDate) {
      let VisitDateMonth = VisitDate.getMonth();
      // let VisitDateMonthHeb = this.state.HebrewMonthes[VisitDateMonth];
      this.setState({
        // VisitMonthInHebrew: VisitDateMonthHeb,
        // VisitMonth: VisitDateMonth + 1,
        date: VisitDate,
        // VisitDateValidationError: false,
        // DayCareValidationError: false
      });
    } else {
      this.setState({
        // VisitMonthInHebrew: '',
        // VisitMonth: null,
        date: VisitDate,
        // VisitDateValidationError: false,
        // DayCareValidationError: false
      });
    }
  }
  SetUnitValue = (unit: string) => {
    if (unit !== null && unit !== '') {
      if (unit !== '' && unit !== 'בחר') {
        this.setState({
          unit: unit
        });
      }

    }
  }

  public render(): React.ReactElement<IAddRowProps> {

    return (
      <div className="AddExpenseItemContainer">
        <ThemeProvider theme={AddButtonTheme}>
          <Tooltip title="הוסף" aria-label="add" arrow>
            <Fab aria-label="Add" color="primary" className='PlanBreakdownAddBtn' onClick={this.toggle} disabled={this.props.IsDisabled} size="medium">
              <IoMdAdd size={28} color="white" />
            </Fab>
          </Tooltip>
        </ThemeProvider>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader
            toggle={this.toggle}
            close={<IconButton aria-label="Add" className='SmallCloseButton' onClick={this.toggle} size="medium">
              <IoCloseSharp /></IconButton>}>
            הוסף פריט
          </ModalHeader>
          <ModalBody dir='ltr'>
            <Form>
              <Row form>

                <ListGroup className="AddItemGroup">
                  <ListGroupItem className="AddItem">
                    <div className='AddItemContainer'>
                      <TextField
                        id="VisitPurpose"
                        name="companyIdentyfier"
                        label='Redefinemeat - מק"ט'
                        multiline
                        rows={2}
                        value={this.state.companyIdentyfier}
                        onChange={this.onChange}
                        size="small"
                        fullWidth
                        error={this.state.companyIdentyfierValidate}
                        helperText={this.state.companyIdentyfierValidate ? 'יש למלא תיבה זו' : ''}
                        inputProps={{
                          maxLength: 15,
                          style: {
                            marginTop: 10
                          }
                        }}
                        placeholder='מק"ט'
                      />
                    </div>
                    <div className='AddItemContainer'>
                      <TextField
                        id="VisitPurpose"
                        name="identyfier"
                        label='מק"ט'
                        multiline
                        rows={2}
                        error={this.state.identyfierValidate}
                        helperText={this.state.identyfierValidate ? 'יש למלא תיבה זו' : ''}
                        value={this.state.identyfier}
                        onChange={this.onChange}
                        size="small"
                        fullWidth
                        inputProps={{
                          style: {
                            marginTop: 10
                          }
                        }}
                        placeholder='מק"ט'
                      />
                    </div>
                    <div className='AddItemContainer'>
                      <TextField
                        id="DaycareWorkGoals"
                        name="description"
                        label="תאור"
                        multiline
                        rows={2}
                        value={this.state.description}
                        onChange={this.onChange}
                        fullWidth
                        size="small"
                        error={this.state.descriptionValidate}
                        helperText={this.state.descriptionValidate ? 'יש להזין תאור' : ''}
                        required
                        inputProps={{
                          style: {
                            marginTop: 10
                          }
                        }}
                        placeholder='תאור'
                      />
                    </div>

                  </ListGroupItem>
                  <ListGroupItem className="AddItem">
                    <div className='AddItemContainer'>
                      <TextField
                        id="DaycareWorkGoals"
                        name="amount"
                        label="כמות"
                        multiline
                        rows={2}
                        value={this.state.amount}
                        onChange={this.onChange}
                        type='number'
                        defaultValue={1}
                        size="small"
                        fullWidth
                        error={this.state.amontValidate}
                        helperText={this.state.amontValidate ? 'יש להזין כמות ' : ''}
                        required
                        inputProps={{

                          style: {
                            marginTop: 10
                          }
                        }}
                        placeholder='כמות'
                      />
                    </div>
                    <div className='AddItemContainer'>
                      <Autocomplete
                        value={this.state.unit}
                        onChange={(event, newValue) => {
                          this.SetUnitValue(newValue);
                        }}
                        id="DayCareName"
                        options={this.props.unitOptions}
                        renderInput={(params) =>
                          <TextField
                            {...params}
                            label="יחידת מידה"
                            error={this.state.unitValidation}
                            helperText={this.state.unitValidation ? 'נא לבחור יחידת מידה' : ''}
                            required
                          />}
                        size="medium"
                        className="TextFieldFadeInTrans AutoCompleteStyle"
                        fullWidth
                      />
                      {/* <TextField
                        id="DaycareWorkGoals"
                        name="unit"
                        label="יחידת מידה"
                        multiline
                        rows={2}
                        value={this.state.unit}
                        onChange={this.onChange}
                        type='number'
                        size="small"
                        fullWidth
                        // error={this.state.yearValidate}
                        // helperText={this.state.yearValidate ? 'Enter a 4-digit date in the following format: 19xx' : ''}
                        required
                        inputProps={{

                          style: {
                            marginTop: 10
                          }
                        }}
                        placeholder='כמות'
                      /> */}
                    </div>
                    <div className='AddItemContainer'>
                      <TextField
                        id="RequiredActions"
                        name="pricePerUnit"
                        label="מחיר ליחידה"
                        multiline
                        rows={2}
                        placeholder="מחיר ליחידה"
                        value={this.state.pricePerUnit}
                        error={this.state.pricePerUnitValidate}
                        helperText={this.state.pricePerUnitValidate ? 'נא למלא מחיר ליחידה' : ''}
                        onChange={this.onChange}
                        size="small"
                        fullWidth
                        type='number'
                        inputProps={{
                          style: {
                            marginTop: 10
                          }
                        }}
                      />
                    </div>
                    <div className='AddItemContainer'>
                      <ThemeProvider theme={DatePickerTheme}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={heLocale} >
                          <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            label="תאריך קבלה צפוי"
                            format="dd/MM/yyyy"
                            value={this.state.date}
                            inputProps={{
                              style: {
                                marginTop: 10
                              }
                            }}
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
                            // error={this.state.VisitDateValidationError}
                            // helperText={this.state.VisitDateValidationError ? 'נא למלא תאריך' : ''}
                            required
                            fullWidth
                          />
                        </MuiPickersUtilsProvider>
                      </ThemeProvider>
                    </div>
                  </ListGroupItem>
                  {/* <ListGroupItem className="AddItem">
                    <div className='AddItemContainer'>
                      <TextField
                        id="DaycareWorkGoals"
                        name="description"
                        label="תאור"
                        multiline
                        rows={2}
                        value={this.state.description}
                        onChange={this.onChange}

                        size="small"
                        fullWidth
                        // error={this.state.yearValidate}
                        // helperText={this.state.yearValidate ? 'Enter a 4-digit date in the following format: 19xx' : ''}
                        required
                        inputProps={{
                          style: {
                            marginTop: 10
                          }
                        }}
                        placeholder='תאור'
                      />
                    </div>
                    <div className='AddItemContainer'>&nbsp;</div>



                  </ListGroupItem> */}

                </ListGroup>
              </Row>
            </Form>
            {this.state.validation ?
              <div>
                <h5 style={{ color: 'red', margin: '20px' }}>It is necessary to fill in at least one field</h5>
              </div>
              :
              <div></div>
            }
          </ModalBody>
          <ModalFooter>
            <div className='FooterContainer'>
              <ThemeProvider theme={ButtonsTheme}>
                <div className='AddItemButtons'>
                  <Button
                    variant="contained"
                    color="secondary"
                    className='CancelButton'
                    onClick={this.toggle}
                  >
                    ביטול
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className='SaveButton'
                    onClick={this.SaveItem}
                  >
                    הוסף
                  </Button>
                </div>
              </ThemeProvider>
            </div>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
