import { State } from '../../domain/Plant';

interface Props {
  state: State;
}

const badgeColor = {
  new: 'bg-green-100',
  comming_soon: 'bg-yellow-100',
  out_of_stock: 'bg-red-100',
};

const Badge: React.FC<Props> = ({ state }) => {
  if (state === 'default') {
    return <></>;
  }
  return (
    <div className={`border rounded-md p-2 ${badgeColor[state]} inline-block`}>
      <p>{state}</p>
    </div>
  );
};

export default Badge;
