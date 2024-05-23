# Voiceflow EduChat

A chatbot app that follows along with student's reading of articles, asks questions and engages in conversation for improved learning coutcomes.

![Screenshot of EduChat](EduChat.jpeg)

## Features

- Load articles in a JSON format into the reader
- Ask EduChat clarifying questions about the article as well as broader questions, with knowledge sourced from the article and a custom knowledge base
- Automatically suggest conversation starters to the user based on the article content, to encourage further and engaging with the content.

![EduChat Screenshot 2](EduChat2.png)

## Setup

- Clone the repository
- Run `npm install` to install dependencies
- Import the `EduChat.vf` file into a new project on Voiceflow
- Create a `.env` file with the API key for the Voiceflow project from the integrations tab
```
REACT_APP_VF_API_KEY=<API_KEY>
```
- Run `npm start` to start the development server
