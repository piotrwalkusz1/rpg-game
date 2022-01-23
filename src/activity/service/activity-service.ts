import type { Character } from '../../character/model/character';
import { ArrayUtils } from '../../common/array-utils';
import type { Activity } from '../model/activity';

export namespace ActivityService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const getActivityByType = <T extends Activity>(character: Character, type: abstract new (...args: any[]) => T): T | undefined =>
    ArrayUtils.findFirstInstanceOf(character.activities.getArray(), type);
}
