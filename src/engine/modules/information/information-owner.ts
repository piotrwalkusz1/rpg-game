import { Component } from 'engine/core/ecs';
import type { Information } from 'engine/modules/information';

export class InformationOwner extends Component {
  private readonly _informations: Information[] = [];

  get informations(): readonly Information[] {
    return this._informations;
  }

  hasInformation(information: Information): boolean {
    return this._informations.find((otherInformation) => otherInformation.equals(information)) !== undefined;
  }

  addInformation(information: Information): void {
    if (this.hasInformation(information)) {
      return;
    }
    this._informations.push(information);
  }
}
