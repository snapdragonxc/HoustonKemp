# HoustonKemp
A ReactJS version of Hugo-Kiss

### Description

This App allows you to write, publish and list diary entries online. A word-count accompanies each diary entry (visible on 
console.log). Non-functional requirements e.g. security and performance have been ignored.

It is assumed that the diary entries are stored as flat files in the public folder.

The app design and styling is based on the [Hugo-Kiss](https://themes.gohugo.io/kiss/) static website framework generator. This uses a filename for each diary post based on the title of the post. The code has not yet been validated for all allowed symbols in the filename, which will cause issues e.g quotation marks etc; currently only question marks are allowed in the title.

### Installation

To install locally, clone the code. Ensure that you have first installed NodeJS, then use npm: 

```
npm install
```
### Running Locally
To run the website locally: 
```
npm run start
```
and navigate to 'http://localhost:8080' in your web browser
