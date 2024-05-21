import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import articleList from './articleList.json';

const Header = ({handleArticleSelect}) => {
  return (
    <div className='app-header'>
      <h1>EduChat</h1>
      {articleList.map((article) => (
        <button
          key={article.id}
          onClick={() => handleArticleSelect(article.id)}
        >
          {article.displayname}
        </button>
      ))}
    </div>
  );
};

Header.propTypes = {
  handleArticleSelect: PropTypes.func,
};

export default Header;
