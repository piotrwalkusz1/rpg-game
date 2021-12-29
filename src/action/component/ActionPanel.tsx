import ReactModal from 'react-modal';
import { ActionContext } from '../model/ActionContext';
import { ActionExecutionContext } from '../model/ActionExecutionContext';
import { useTranslation } from 'react-i18next';

export const ActionPanel = ({
  actionContext,
  actionExecutionContext
}: {
  actionContext: ActionContext;
  actionExecutionContext: ActionExecutionContext;
}) => {
  const { t } = useTranslation();

  return (
    <ReactModal
      isOpen={true}
      ariaHideApp={false}
      className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[800px] min-h-[600px] max-h-[80%] bg-white border-[2px] border-black divide-y-[2px] divide-black"
      overlayClassName="fixed inset-0"
    >
      <div className="p-[10px]">
        <span>{actionContext.title.getReactElement({ t })}</span>
        {!actionContext.isActionRequired && (
          <button onClick={actionExecutionContext.doNotTakeAction} className="float-right">
            X
          </button>
        )}
      </div>
      <div className="p-[10px] overflow-auto">
        {actionContext.description.character && actionContext.description.character.avatarUrl && (
          <img
            src={actionContext.description.character.avatarUrl}
            width={64}
            height={64}
            className="float-left border-[2px] border-black mr-[10px]"
          ></img>
        )}
        {actionContext.description.text.getReactElement({ t })}
      </div>
      <div className="p-[10px]">
        {actionContext.actions.map((action) => (
          <div
            key={action.id}
            onClick={() => action.executeAction(actionExecutionContext)}
            className="cursor-pointer text-blue-700 hover:text-blue-400"
          >
            {t(action.getNameTranslationKey())}
          </div>
        ))}
      </div>
    </ReactModal>
  );
};
