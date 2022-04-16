import { ArrayUtils } from '../../../../utils/array-utils';
import type { Actor } from '../../actor/model/actor';
import type { Activity } from '../model/activity';

export namespace ActivityService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const getActivityByType = <T extends Activity>(character: Actor, type: abstract new (...args: any[]) => T): T | undefined =>
    ArrayUtils.findFirstInstanceOf(character.activities.getArray(), type);
}
