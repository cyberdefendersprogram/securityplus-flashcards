import { useStaticQuery, graphql } from 'gatsby';

/**
 * useDeckListInfo returns the metadata for the flashcard sets
 */
const useDeckInfo = () => {
  const data = useStaticQuery(graphql`
    query Decks {
      allFlashcards {
        edges {
          node {
            fields {
              slug
            }
            info {
              date
              id
              section
              title
            }
          }
        }
      }
    }
  `);
  return data;
};

export default useDeckInfo;
