import { MapField } from '../model/MapField';
export const FieldView = ({ field }: { field: MapField }) => {
  if (field.object) {
    return (
      <div className="relative -z-[100]">
        <img className="absolute" src={field.fieldType.imageUrl} width={64} height={64}></img>
        <img className="absolute" src={field.object.imageUrl} width={64} height={64}></img>
      </div>
    );
  } else if (field.fieldType.imageUrl) {
    return <img src={field.fieldType.imageUrl} width={64} height={64}></img>;
  } else {
    return <div className="w-[64px] h-[64px] bg-white"></div>;
  }
};
