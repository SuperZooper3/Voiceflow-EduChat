import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';
import articleList from './articleList.json';

const Header = ({handleArticleSelect}) => {
  return (
    <div className='app-header'>
      <h1 className='header-title'>EduChat</h1>
      <div className='article-select-wrapper'>
        <select
          className='article-select-button'
          onChange={(event) => handleArticleSelect(event.target.value)}
        >
          <option value="">- Choose an article -</option>
          {articleList.map((article) => (
            <option key={article.id} value={article.id}>
              {article.displayname}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

Header.propTypes = {
  handleArticleSelect: PropTypes.func,
};

export default Header;
