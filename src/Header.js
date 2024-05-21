import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';
import articleList from './articleList.json';

const Header = ({handleArticleSelect}) => {
  return (
    <div className='app-header'>
      <h1 className='header-title'>EduChat</h1>
      <div className='article-select-wrapper'>
        {articleList.map((article) => (
          <button
            className='article-select-button'
            key={article.id}
            onClick={() => handleArticleSelect(article.id)}
          >
            {article.displayname}
          </button>
        ))}
      </div>
    </div>
  );
};

Header.propTypes = {
  handleArticleSelect: PropTypes.func,
};

export default Header;
