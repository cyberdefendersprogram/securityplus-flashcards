import React from 'react';
import PropTypes from 'prop-types';
import DeckListItem from './deckListItem';

const DeckList = ({ decks }) => {
  return (
    <div className="container">
      {decks.map(({ node }) => (
        <div className="columns is-centered is-full" key={node.info.id}>
          <DeckListItem
            title={node.info.title}
            date={node.info.date}
            section={node.info.section}
            pageLink={node.fields.slug}
          />
        </div>
      ))}
    </div>
  );
};

DeckList.propTypes = {
  decks: PropTypes.arrayOf(PropTypes.object),
};

DeckList.defaultProps = {
  decks: [{}],
};

export default DeckList;
