import React from 'react';
import PropTypes from 'prop-types';

export const CardCount = ({ current, total }) => {
  return (
    <div className="level">
      <div className="level-item has-text-centered">
        <div className="deck-number">
          {current}/{total}
        </div>
      </div>
    </div>
  );
};

CardCount.propTypes = {
  current: PropTypes.number,
  total: PropTypes.number,
};

CardCount.defaultProps = {
  current: 1,
  total: 1,
};

export default CardCount;
