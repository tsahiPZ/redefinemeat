import * as React from 'react';
import './EditRow.css';
import { IEditRowProps } from './IEditRowProps';
import { IEditRowStates } from './IEditRowStates';
import {
  Row,
  Form,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import {
  TextField, IconButton, Button, Tooltip
} from '@material-ui/core';
import { IoCloseSharp } from "react-icons/io5";
import { ThemeProvider } from '@material-ui/core/styles';
import { ButtonsTheme } from '../../../../Models/ButtonsTheme';
import { validate } from '@material-ui/pickers';
import { DatePickerTheme } from '../../../../Models/DatePickerTheme';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import heLocale from "date-fns/locale/he";
export default class EditRow extends React.Component<IEditRowProps, IEditRowStates> {
  constructor(props) {
    super(props);
    // Set States (information managed within the component), When state changes, the component responds by re-rendering
    this.state = {
      modal: this.props.editVisability,
      identyfier: this.props.identyfier,
      amount: this.props.amount,
      pricePerUnit: this.props.pricePerUnit,
      cost: this.props.cost,
      description: this.props.description,
      date: new Date(this.props.date),
      validation: false,
    

    };
  }

  componentDidMount() {

  }

  toggle = () => {
    // Reset states values
    this.setState({
      modal: !this.state.modal,
      // identyfier: '',
      // amount: 0,
      // pricePerUnit: 0,
      // cost: 0,
      // description: '',
      // date: null,
      // validation: false
    });
    this.props.closeModal();
  };
  ValidateForm = () => {
    let validated = true;

    // validate  (not empty)
    // if ( this.state.year === null  && (this.state.FreeCashFlow === '' || this.state.FreeCashFlow === null) && (this.state.other === '' || this.state.other === null) && (this.state.totalAssets === '' || this.state.totalAssets === null) && (this.state.netSales === '' || this.state.netSales === null)) {
    //   console.log('in');

    //   this.setState({
    //     validation: true
    //   })
    //   validated = false;
    // }

    // //validate year  
    // if (this.state.year && (this.state.year <= 1950)) {
    //   validated = false;

    //   this.setState({ yearValidate: true })
    // }

    return validated;

  };
  ConvertToDisplayDate = (date:any) => {
  
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
  SetVisitDateValue = (VisitDate: Date | null) => {
    if (VisitDate) {
      let VisitDateMonth = VisitDate.getMonth();
      this.setState({
        date: VisitDate,
      });
    } else {
      this.setState({
        date: VisitDate,
      });
    }
  }
  SaveItem = () => {
    if (this.ValidateForm()) {
      
      // moment(new Date(this.state.date+'')).format("DD/MM/YYYY")
      // Create object and pass it to main component (callback)
      console.log(this.ConvertToDisplayDate(this.state.date));
      
      let AddItemObject = {
        rowID: this.props.SubjectID, date: this.ConvertToDisplayDate(this.state.date), identyfier: this.state.identyfier,
        amount: this.state.amount, pricePerUnit: this.state.pricePerUnit, cost: (this.state.amount * this.state.pricePerUnit), description: this.state.description
      }
      this.props.OnEditItem(AddItemObject);
      this.toggle();
    }
  };

  onChange = (e: { target: { name: any; value: any; }; }) => {
    switch(e.target.name)
    {
      case 'amount':
        if(isNaN(e.target.value)){
          {
            // validate true 
            return;
          }
        } 
      case 'pricePerUnit':
        if(isNaN(e.target.value)){
          {
            // validate true 
            return;
          }
        } 
    }
    const newState = { [e.target.name]: e.target.value } as Pick<IEditRowStates, keyof IEditRowStates>;
    this.setState(newState);
    // validates
    // if (e.target.name === 'year') {
    //   this.setState({
    //     yearValidate: false
    //   });
    // }

  }

  public render(): React.ReactElement<IEditRowProps> {

    return (
      <div className="AddExpenseItemContainer">
        <Modal isOpen={this.props.editVisability} toggle={this.toggle}>
          <ModalHeader
            toggle={this.toggle}
            close={<IconButton aria-label="Add" className='SmallCloseButton' onClick={this.toggle} size="medium">
              <IoCloseSharp /></IconButton>}>
            ערוך פריט
          </ModalHeader>
          <ModalBody dir='ltr'>
            <Form>
              <Row form>
                <ListGroup className="AddItemGroup">
                  <ListGroupItem className="AddItem">

                    <div className='AddItemContainer'>
                      <TextField
                        id="VisitPurpose"
                        name="identyfier"
                        label='מק"ט'
                        multiline
                        rows={2}
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
                        name="amount"
                        label="כמות"
                        multiline
                        rows={2}
                        value={this.state.amount}
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
                      />
                    </div>
                  </ListGroupItem>
                  <ListGroupItem className="AddItem">

                    <div className='AddItemContainer'>
                      <TextField
                        id="RequiredActions"
                        name="pricePerUnit"
                        label="מחיר ליחידה"
                        multiline
                        rows={2}
                        placeholder="מחיר ליחידה"
                        value={this.state.pricePerUnit}
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
                            label="תאריך ביקור"
                            format="dd/MM/yyyy"
                            value={this.state.date}
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
                  <ListGroupItem className="AddItem">
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



                  </ListGroupItem>

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
                    onClick={ ()=>  this.props.closeModal()}
                  >
                    ביטול
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className='SaveButton'
                    onClick={this.SaveItem}
                  >
                    שמור
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
