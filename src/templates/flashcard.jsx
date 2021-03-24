import React, { Component } from 'react';
// import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
// import SEO from '../components/seo';
import Layout from '../components/layout';
import Card from '../components/card';
import CardCount from '../components/cardCount';

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
 * */
class Flashcard extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    const data = props.data;
    console.log(data);

    this.state = {
      side: 'term',
      count: 1,
      body: '',
      error: '',
    };
  }

  render() {
    const { side, body, count, error } = this.state;
    return (
      <Layout>
        <section className="hero is-info is-medium is-fullwidth">
          <div className="hero-body">
            <div className="title has-text-centered">Name of Deck</div>
            <Card side={this.state.side} body={this.state.body} current={this.state.count} />
            <CardCount current={this.state.count} />
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
  query FlashCardSet($slug: String!) {
    allFlashcards(filter: { fields: { slug: { eq: $slug } } }) {
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
          cards {
            deckId
            definition
            id
            term
          }
        }
      }
    }
  }
`;

export default Flashcard;
