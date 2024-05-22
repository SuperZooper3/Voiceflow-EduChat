import React from 'react';
import PropTypes from 'prop-types';
import './Article.css';
import articleList from './articleList.json';

const articlePathRoot = './articles/';

const useArticleState = (userSendAction, userUpdateVariables) => {
  const [article, setSelectedArticle] = React.useState(null);

  const handleArticleSelect = async (articleId) => {
    const articleInfo = articleList.find((a) => a.id === articleId);
    const articlePath = articlePathRoot + articleInfo.filename;
    const response = await fetch(articlePath);
    const articleData = await response.json();
    setSelectedArticle(articleData);
    const articleText = articleData.body.map((item) => {
      if (item.type === 'text') {
        return item.content;
      } else if (item.type === 'image') {
        return `**IMAGE. CAPTION: ${item.caption}**`;
      } else {
        return '';
      }
    }).join('\n');
    await userUpdateVariables({
      article_body: articleText,
    });
    userSendAction(
        null,
        {type: 'intent', payload: {intent: {name: 'suggest_buttons'}}},
    );
  };

  const selectFirstArticle = async () => {
    await handleArticleSelect(articleList[0].id);
  };

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
