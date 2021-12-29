import { MapField } from '../../map/model/MapField';
import { Race } from './Race';
export class Character {
  name?: string;
  field?: MapField;
  race: Race;
  avatarUrl?: string;

  constructor(race: Race) {
    this.race = race;
  }
}
