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

export default class EditRow extends React.Component<IEditRowProps, IEditRowStates> {
  constructor(props) {
    super(props);
    // Set States (information managed within the component), When state changes, the component responds by re-rendering
    this.state = {
      modal: false,
      year: null,
      netSales: '',
      totalAssets: '',
      other: '',
      FreeCashFlow: '',
      validation: false,
      yearValidate: false

    };
  }

  componentDidMount() {

  }

  toggle = () => {
    // populate states values
    this.setState({
      modal: !this.state.modal,
      year: this.props.year,
      netSales: this.props.netSales,
      totalAssets: this.props.totalAssets,
      other: this.props.other,
      FreeCashFlow: this.props.FreeCashFlow,
      yearValidate:false

    });
  };
  ValidateForm = () => {
    let validated = true;

    // validate  (not empty)
    if ( this.state.year === null  && (this.state.FreeCashFlow === '' || this.state.FreeCashFlow === null) && (this.state.other === '' || this.state.other === null) && (this.state.totalAssets === '' || this.state.totalAssets === null) && (this.state.netSales === '' || this.state.netSales === null)) {
      console.log('in');

      this.setState({
        validation: true
      })
      validated = false;
    }

    //validate year  
    if (this.state.year && (this.state.year <= 1950)) {
      validated = false;

      this.setState({ yearValidate: true })
    }

    return validated;

  };
  SaveItem = () => {
    if (this.ValidateForm()) {
      // Create object and pass it to main component (callback)
      let EditItemObject = {
        SubjectID: this.props.SubjectID, year: this.state.year, netSales: this.state.netSales,
        totalAssets: this.state.totalAssets, other: this.state.other,
        FreeCashFlow: this.state.FreeCashFlow
      }
      this.props.OnEditItem(EditItemObject);
      this.toggle();
    }
  };

  onChange = (e: { target: { name: any; value: any; }; }) => {
    const newState = { [e.target.name]: e.target.value } as Pick<IEditRowStates, keyof IEditRowStates>;
    this.setState(newState);
    if (e.target.name === 'year') {
      this.setState({
        yearValidate: false
      });
    }

  }

  public render(): React.ReactElement<IEditRowProps> {

    return (
      <div className="AddExpenseItemContainer">
        <Tooltip title="ערוך" aria-label="Edit" arrow>
          <IconButton aria-label="Edit" className='PlanBreakdownEditBtn' onClick={this.toggle} size="small">
            <span className='EditeImg'>&nbsp;</span>
          </IconButton>
        </Tooltip>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader
            toggle={this.toggle}
            close={<IconButton aria-label="Add" className='SmallCloseButton' onClick={this.toggle} size="medium">
              <IoCloseSharp /></IconButton>}>
            Edit Row
          </ModalHeader>
          <ModalBody>
            <Form>
              <Row form>
                <ListGroup className="AddItemGroup">
                  <ListGroupItem className="AddItem">
                    <div className='AddItemContainer'>
                      <TextField
                        id="VisitPurpose"
                        name="netSales"
                        label="Net sales"
                        multiline
                        rows={2}
                        value={this.state.netSales}
                        onChange={this.onChange}
                        size="small"
                        fullWidth
                        inputProps={{
                          style: {
                            marginTop: 10
                          }
                        }}
                        placeholder='netSales'
                      />
                    </div>
                    <div className='AddItemContainer'>
                      <TextField
                        id="DaycareWorkGoals"
                        name="year"
                        label="Year"
                        multiline
                        rows={2}
                        value={this.state.year}
                        onChange={this.onChange}
                        size="small"
                        fullWidth
                        error={this.state.yearValidate}
                        helperText={this.state.yearValidate ? 'Enter a 4-digit date in the following format: 19xx' : ''}
                        required
                        inputProps={{
                          style: {
                            marginTop: 10
                          }
                        }}
                        placeholder='(XXXX)'

                      />
                    </div>
                  </ListGroupItem>
                  <ListGroupItem className="AddItem">
                    <div className='AddItemContainer'>
                      <TextField
                        id="RequiredActions"
                        name="FreeCashFlow"
                        label="FreeCashFlow"
                        multiline
                        rows={2}
                        value={this.state.FreeCashFlow}
                        onChange={this.onChange}
                        size="small"
                        fullWidth
                        inputProps={{
                          style: {
                            marginTop: 10
                          }
                        }}
                      />
                    </div>
                    <div className='AddItemContainer'>
                      <TextField
                        id="TasksAndObjectives"
                        name="totalAssets"
                        label="Total assets"
                        multiline
                        rows={2}
                        value={this.state.totalAssets}
                        onChange={this.onChange}
                        size="small"
                        fullWidth
                        inputProps={{
                          style: {
                            marginTop: 10
                          }
                        }}
                        placeholder='totalAssets'
                      />
                    </div>
                  </ListGroupItem>
                  <ListGroupItem className="AddItem">
                    <div className='AddItemContainer'>&nbsp;</div>

                    <div className='AddItemContainer'>
                      <TextField
                        id="Summery"
                        name="other"
                        label="Other"
                        multiline
                        rows={2}
                        value={this.state.other}
                        onChange={this.onChange}
                        size="small"
                        fullWidth
                        type='number'
                        inputProps={{
                          type: 'number',
                          min: 1940, max: 2050,
                          style: {
                            marginTop: 10
                          }
                        }}
                        placeholder='Other'
                      />
                    </div>
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
                    onClick={this.toggle}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className='SaveButton'
                    onClick={this.SaveItem}
                  >
                    Save
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
