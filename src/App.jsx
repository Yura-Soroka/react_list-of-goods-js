import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];
export const App = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [sortOrder, setSortOrder] = useState(null);

  const handleSortedByLength = () => {
    const sortedGoods = [...goods].sort(
      (firstGood, secondGood) => firstGood.length - secondGood.length,
    );

    setGoods(sortedGoods);
    setSortOrder('length');
  };

  const handleSortedByAlph = () => {
    const sortedGoods = [...goods].sort((a, b) => a.localeCompare(b));

    setGoods(sortedGoods);
    setSortOrder('alphabetical');
  };

  const handleReversed = () => {
    const reversedGoods = [...goods].reverse();

    setGoods(reversedGoods);
    if (sortOrder) {
      setSortOrder(
        sortOrder.includes('-reversed')
          ? sortOrder.replace('-reversed', '')
          : `${sortOrder}-reversed`,
      );
    } else {
      setSortOrder('reversed');
    }
  };

  const handleReset = () => {
    setGoods(goodsFromServer);
    setSortOrder(null);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortOrder === 'alphabetical' ? '' : 'is-light'}`}
          onClick={handleSortedByAlph}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortOrder === 'length' ? '' : 'is-light'}`}
          onClick={handleSortedByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${sortOrder?.includes('reversed') ? '' : 'is-light'}`}
          onClick={handleReversed}
        >
          Reverse
        </button>

        <button
          type="button"
          className={`button is-danger ${sortOrder === null ? 'is-hidden' : 'is-light'}`}
          onClick={handleReset}
        >
          Reset
        </button>
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
        {goods.length < goodsFromServer.length && <li data-cy="Good">...</li>}
      </ul>
    </div>
  );
};
