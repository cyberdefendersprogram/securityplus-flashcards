import React from 'react';
import unified from 'unified';
import markdown from 'remark-parse';
import slug from 'remark-slug';
import sanitize from 'rehype-sanitize';
import gfm from 'remark-gfm';
import remark2rehype from 'remark-rehype';
import highlight from 'rehype-highlight';
import rehype2react from 'rehype-react';
import stringify from 'rehype-stringify';

var processor = unified()
  .use(markdown)
  .use(gfm)
  .use(remark2rehype)
  .use(highlight)
  .use(stringify)
  .use(sanitize)
  .use(rehype2react, { createElement: React.createElement });

const Card = ({ side, body }) => {
  return (
    <div className="flashcard">
      <div className="columns is-centered">
        <div className="column is-half">
          <div className="card">
            <div className="card-content">
              <div className={side}>{processor.processSync(body).result}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
