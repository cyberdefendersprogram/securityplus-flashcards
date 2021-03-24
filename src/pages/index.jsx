import React from 'react';
import DeckList from '../components/deckList';
import useDeckInfo from '../hooks/useDeckInfo';
import Layout from '../components/layout';
import SEO from '../components/seo';
import '../sass/global.scss';

const IndexPage = () => {
  const { allFlashcards: allDeckInfo } = useDeckInfo();

  return (
    <Layout>
      <SEO title="Home" />
      <section className="section">
        <div className="container">
          <h1 className="title is-secondary">Security+ Decks</h1>
          <h2 className="subtitle">Select a deck to start learning.</h2>
          <DeckList decks={allDeckInfo.edges} />
        </div>
      </section>
    </Layout>
  );
};

export default IndexPage;
