import React from 'react';
import PropTypes from 'prop-types';
import './Article.css';
import articleList from './articleList.json';

const articlePathRoot = './articles/';

const useArticleState = () => {
  const [article, setSelectedArticle] = React.useState(null);

  const handleArticleSelect = async (articleId) => {
    const articleInfo = articleList.find((a) => a.id === articleId);
    const articlePath = articlePathRoot + articleInfo.filename;
    const response = await fetch(articlePath);
    const articleData = await response.json();
    setSelectedArticle(articleData);
  };

  const selectFirstArticle = async () => {
    await handleArticleSelect(articleList[0].id);
  };

  // automatically select the first article
  React.useEffect(() => {
    selectFirstArticle();
  }, []);

  return {article, handleArticleSelect, selectFirstArticle};
};

const Article = ({article}) => {
  if (!article || !article.body || !article.title) {
    return (
      <div className='article-wrapper'>
        <h1>Select an article to view</h1>
      </div>
    );
  }
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

Article.propTypes = {
  article: PropTypes.object,
};

export {Article, useArticleState};
