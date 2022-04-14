import type { InformationOwner } from '../../../../information/model/information-owner';
import { ObservatorTrait } from '../observator-trait';

export class TerrainObjectKnownLocationObservatorTrait extends ObservatorTrait {
  readonly informationOwner: InformationOwner;

  constructor(informationOwner: InformationOwner) {
    super();
    this.informationOwner = informationOwner;
  }
}
