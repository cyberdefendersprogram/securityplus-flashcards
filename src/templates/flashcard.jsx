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

    const [deck] = props.data.allFlashcards.edges;
    const { cards, fields, info } = deck.node;

    this.state = {
      index: 0,
      total: cards.length,
      isFlipped: false,
      error: '',
    };
  }

  onPrevCard = () => {
    this.setState((prevState) => {
      console.log({ index: prevState.index - 1 });
      if (prevState.isFlipped) {
        return {
          isFlipped: !prevState.isFlipped,
        };
      } else {
        if (prevState.index - 1 >= 0) {
          return {
            isFlipped: !prevState.isFlipped,
            index: prevState.index - 1,
          };
        } else {
          return {
            index: prevState.index,
          };
        }
      }
    });
  };

  onNextCard = () => {
    this.setState((prevState) => {
      console.log({ index: prevState.index + 1 });
      if (prevState.isFlipped) {
        if (prevState.index + 1 <= prevState.total) {
          return {
            isFlipped: !prevState.isFlipped,
            index: prevState.index + 1,
          };
        } else {
          return {
            index: prevState.index,
          };
        }
      } else {
        return {
          isFlipped: !prevState.isFlipped,
        };
      }
    });
  };

  onFlipCard = () => {
    this.setState((prevState) => {
      console.log(!prevState.isFlipped);
      return {
        isFlipped: !prevState.isFlipped,
      };
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (!this.state.description || !this.state.amount) {
      this.setState(() => ({
        error: 'Please provide description and amount',
      }));
    } else {
      this.setState(() => ({
        error: '',
      }));
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10) * 100,
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note,
      });
    }
  };

  render() {
    const { isFlipped, body, index, total } = this.state;
    const [deck] = this.props.data.allFlashcards.edges;
    const { cards } = deck.node;

    return (
      <Layout>
        <section className="hero is-info is-medium is-fullwidth">
          <div className="hero-body">
            <div className="title has-text-centered">Name of Deck</div>
            <div onClick={this.onFlipCard}>
              {!isFlipped ? (
                <Card isFlipped={isFlipped} body={`# ${cards[index].term}`} />
              ) : (
                <Card isFlipped={isFlipped} body={cards[index].definition} />
              )}
            </div>
            <CardCount current={index} total={total} />
            <div className="container">
              <div className="columns is-centered">
                <div className="column is-one-fifth has-text-centered">
                  <button className="button is-medium" onClick={this.onPrevCard}>
                    Prev
                  </button>
                </div>
                <div className="column is-one-fifth has-text-centered">
                  <button className="button is-medium" onClick={this.onNextCard}>
                    Next
                  </button>
                </div>
              </div>
            </div>
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
