import React from 'react';
import './Article.css';
import article from './article.json';

const Article = ({}) => {
  return (
    <div className='article-wrapper'>
      <h1>{article.title}</h1>
      {article.body.map((paragraph, index) => (
        paragraph.type === 'text' ?
            <p className="article-text" key={index}>{paragraph.content}</p> :
        paragraph.type === 'image' ?
            <img
              className="article-image"
              src={paragraph.link}
              alt={paragraph.caption}
              key={index}
            /> :
        null
      ))}
    </div>
  );
};

export default Article;
