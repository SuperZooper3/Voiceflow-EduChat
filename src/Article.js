import React from 'react';
import PropTypes from 'prop-types';
import './Article.css';
import articleList from './articleList.json';

const articlePathRoot = './articles/';

const useArticleState = (userSendAction, userUpdateVariables) => {
  const [article, setSelectedArticle] = React.useState(null);

  const handleArticleSelect = async (articleId) => {
    if (!articleId) {
      return;
    }
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
      {article.body.map((paragraph, index) => {
        switch (paragraph.type) {
          case 'text':
            return <p
              className="article-text"
              key={index}>
              {paragraph.content
              }</p>;
          case 'image':
            return <img
              className="article-image"
              src={paragraph.link}
              alt={paragraph.caption}
              key={index} />;
          case 'heading':
            const HeadingTag = `h${paragraph.level}`;
            return <HeadingTag key={index}>{paragraph.content}</HeadingTag>;
          case 'list':
            return (
              <ul className="article-list" key={index}>
                {paragraph.items.map((item, itemIndex) => {
                  switch (item.type) {
                    case 'text':
                      return <li key={itemIndex}>
                        <p className='article-text'>{item.content}</p>
                      </li>;
                    case 'image':
                      return <img
                        className="article-image"
                        src={item.link}
                        alt={item.caption}
                        key={itemIndex} />;
                    case 'link':
                      return <a href={item.url} key={index}>
                        <p className='article-text'>{item.content}</p>
                      </a>;
                    default:
                      return <p>{JSON.stringify(item)}</p>;
                  }
                })}
              </ul>
            );
          case 'code':
            return <pre
              className="article-code"
              key={index}>
              {paragraph.content}
            </pre>;
          case 'link':
            return <a href={paragraph.url} key={index}>
              <p className='article-text'>{paragraph.content}</p>
            </a>;
          default:
            return <p>{JSON.stringify(paragraph)}</p>;
        }
      })}
    </div>
  );
};

Article.propTypes = {
  article: PropTypes.object,
};

export {Article, useArticleState};
