import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'ProcurementRequirementWebPartStrings';
import ProcurementRequirement from './components/ProcurementRequirement';
import { IProcurementRequirementProps } from './components/IProcurementRequirementProps';
import { PropertyFieldNumber } from '@pnp/spfx-property-controls/lib/PropertyFieldNumber';

export interface IProcurementRequirementWebPartProps {
  description: string;
  emloyeeListsData: string; // Stores the list ID(s)
  FormName: string;
  // DayCareList: string;
  ReturnLink: string;
  WebUri: string;
  FormAutoSaveTiming: number;
  LinkToEditForm: string;
  sections: string;
  approversListsData:string;
  supplier:string;
  suppliersListId:string,
  sumGapsListId:string,
  moneyTypesListId:string
}

export default class ProcurementRequirementWebPart extends BaseClientSideWebPart<IProcurementRequirementWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IProcurementRequirementProps> = React.createElement(
      ProcurementRequirement,
      {
        description: this.properties.description,
        WebUri: this.context.pageContext.web.absoluteUrl,
        // DayCareList: this.properties.DayCareList,
        emloyeeListsData: this.properties.emloyeeListsData,
        FormName: this.properties.FormName,
        ReturnLink: this.properties.ReturnLink,
        LinkToEditForm: this.properties.LinkToEditForm,
        context: this.context,
        approversListsData:this.properties.approversListsData,
        supplier:this.properties.supplier ,
        moneyTypesListId:this.properties.moneyTypesListId
           }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('emloyeeListsData', {
                  label: 'ListsData'
                }),
                PropertyPaneTextField('approversListsData', {
                  label: "Suppliers List Id"
                }),
                PropertyPaneTextField('suppliersListId', {
                  label: "Suppliers List Id"
                }),
                PropertyPaneTextField('moneyTypesListId', {
                  label: "Money Types List Id"
                }),
                PropertyPaneTextField('sumGapsListId', {
                  label: "Return Link"
                }),
                PropertyPaneTextField('FormName', {
                  label: "Form Name"
                }),
                PropertyPaneTextField('LinkToEditForm', {
                  label: "Link To Edit Form"
                }),
                PropertyPaneTextField('ReturnLink', {
                  label: "Return Link"
                }),

              ]
            }
          ]
        }
      ]
    };
  }
}
