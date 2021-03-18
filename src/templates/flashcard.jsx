import React, { Component } from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import SEO from '../components/seo';
import Layout from '../components/layout';
import Card from '../components/card';

/**
 * TODO: Create class template for flashcard
 * * The flashcard template can use array of object called cards with the shape as follows
 *   cards = {
 *     card: {
 *       deckId
 *       id
 *       term
 *       definition
 *     }
 *   }
 * TODO: Add state to component to enable flipping between term/def and next/prev card
 * TODO: Convert the definitions from md into html using remark-rehype and insert in jsx
 * */
class Flashcard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flip: false,
      count: 0,
      shuffle: props.shuffle,
      error: '',
    };
  }

  render() {
    return (
      <Layout>
        <section className="hero is-info is-large is-fullwidth">
          <div class="hero-body">
            <Card />
          </div>
        </section>
      </Layout>
    );
  }
}

Flashcard.propTypes = {
  data: PropTypes.objectOf(PropTypes.object),
};

Flashcard.defaultProps = {
  data: [{}],
};

export const query = graphql`
  query($slug: String!) {
    flashcards(fields: { slug: { eq: $slug } }) {
      info {
        title
        section
        date
      }
    }
  }
`;

export default Flashcard;
