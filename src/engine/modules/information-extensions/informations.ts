import type { Field } from 'engine/core/field';
import { Information } from '../information/information';
import type { InformationOwner } from '../information/information-owner';

export namespace Informations {
  export class HasInformation extends Information {
    constructor(readonly informationOwner: InformationOwner, readonly information: Information) {
      super();
    }

    override equals(information: Information): boolean {
      return (
        information instanceof HasInformation &&
        information.informationOwner === this.informationOwner &&
        information.information.equals(this.information)
      );
    }
  }

  export class FieldLocation extends Information {
    constructor(readonly field: Field) {
      super();
    }

    override equals(information: Information): boolean {
      return information instanceof FieldLocation && information.field === this.field;
    }
  }
}
