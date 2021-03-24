import React from 'react';
import PropTypes from 'prop-types';
import unified from 'unified';
import markdown from 'remark-parse';
import sanitize from 'rehype-sanitize';
import gfm from 'remark-gfm';
import remark2rehype from 'remark-rehype';
import highlight from 'rehype-highlight';
import rehype2react from 'rehype-react';
import stringify from 'rehype-stringify';

const processor = unified()
  .use(markdown)
  .use(gfm)
  .use(remark2rehype)
  .use(highlight)
  .use(stringify)
  .use(sanitize)
  .use(rehype2react, { createElement: React.createElement });

/*
 * * Side is necessary since terms and definitions have separate formatting
 */
const Card = ({ isFlipped, body }) => {
  return (
    <div className="flashcard">
      <div className="columns is-centered mt-6">
        <div className="column is-half ">
          <div className="card">
            <div className="card-content has-text-centered">
              <div className="content">
                {!isFlipped ? (
                  <p className="is-h1 has-text-dark">{processor.processSync(body).result}</p>
                ) : (
                  <div className="definition">{processor.processSync(body).result}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  isFlipped: PropTypes.bool,
  body: PropTypes.string,
};

Card.defaultProps = {
  isFlipped: false,
  body: 'What year was the movie JAWS released?',
};

export default Card;
