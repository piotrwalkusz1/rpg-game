import { Component } from 'engine/core/ecs';
import type { Information } from 'engine/modules/information';

export class InformationOwner extends Component {
  private readonly informations: Information[] = [];

  hasInformation(information: Information): boolean {
    return this.informations.find((otherInformation) => otherInformation.equals(information)) !== undefined;
  }

  addInformation(information: Information): void {
    if (this.hasInformation(information)) {
      return;
    }
    this.informations.push(information);
  }
}
