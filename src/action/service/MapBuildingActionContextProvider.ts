import { Building } from '../../building/model/Building';
import { TranslatableRichText } from '../../common/model/TranslatableRichText';
import { MapBuilding } from '../../map/model/MapBuilding';
import { Action } from '../model/Action';
import { ActionContextDescription } from '../model/ActionConctextDescription';
import { ActionContext } from '../model/ActionContext';
import { ActionContextProvider } from '../model/ActionContextProvider';
import { ActionTrigger } from '../model/ActionTrigger';
import { MapFieldActionTrigger } from '../model/MapFieldActionTrigger';

export class MapBuildingActionContextProvider extends ActionContextProvider {
  override isActionTriggerSupported(actionTrigger: ActionTrigger): boolean {
    return !!this.tryGetBuildingFromActionTrigger(actionTrigger);
  }

  override getTitle(actionTrigger: ActionTrigger): { title: TranslatableRichText; order: number } {
    const building = this.getBuildingFromActionTriggerOrThrowException(actionTrigger);
    return { title: building.type.getName(), order: 100 };
  }

  override getDescription(actionTrigger: ActionTrigger): { description: TranslatableRichText; order: number } {
    const building = this.getBuildingFromActionTriggerOrThrowException(actionTrigger);
    return { description: building.type.description, order: 100 };
  }

  override getActions(actionTrigger: ActionTrigger): Array<Action> {
    const building = this.getBuildingFromActionTriggerOrThrowException(actionTrigger);
    return [
      new Action('INVESTIGATE_BUILDING', 200, (actionExecutionContext) => {
        const newActionContext = this.getInvestigateBuildingActionContext(building);
        actionExecutionContext.changeActionContext(newActionContext);
      })
    ];
  }

  private getInvestigateBuildingActionContext(building: Building): ActionContext {
    return new ActionContext(
      TranslatableRichText.fromTranslationKey('ACTION.ACTION_TYPE.INVESTIGATE_BUILDING.TITLE'),
      new ActionContextDescription(building.type.description),
      false,
      []
    );
  }

  private getBuildingFromActionTriggerOrThrowException(actionTrigger: ActionTrigger): Building {
    const building = this.tryGetBuildingFromActionTrigger(actionTrigger);
    if (!building) {
      throw new Error('ActionTrigger is not supported');
    }
    return building;
  }

  private tryGetBuildingFromActionTrigger(actionTrigger: ActionTrigger): Building | undefined {
    const building =
      actionTrigger instanceof MapFieldActionTrigger &&
      actionTrigger.field.object instanceof MapBuilding &&
      actionTrigger.field.object.building;
    return building ? building : undefined;
  }
}
