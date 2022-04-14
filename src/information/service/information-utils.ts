import { ArrayUtils } from '../../common/array-utils';
import type { Information } from '../model/information';
import type { InformationOwner } from '../model/information-owner';

export namespace InformationUtils {
  export const hasInformation = (informationOwner: InformationOwner, information: Information): boolean => {
    return findInformation(informationOwner, information) !== undefined;
  };

  export const findInformation = (informationOwner: InformationOwner, information: Information): Information | undefined => {
    return informationOwner.informations.find((otherInformation) => otherInformation.equals(information));
  };

  export const filterInformationsByType = <T extends Information>(
    informationOwner: InformationOwner,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type: abstract new (...args: any[]) => T
  ): T[] => {
    return ArrayUtils.filterInstanceOf(informationOwner.informations, type);
  };

  export const addInformation = (informationOwner: InformationOwner, information: Information): void => {
    if (hasInformation(informationOwner, information)) {
      return;
    }

    informationOwner.informations.push(information);
  };
}
