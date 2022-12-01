import React from 'react'
import ReactMarkdown from 'react-markdown'

const md = `
[![NPM](https://img.shields.io/npm/v/@reactiff/app-data-client.svg)](https://www.npmjs.com/package/@reactiff/app-data-client) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
`;

export default () => <>
    <p>
        Virtual API client for your app anywhere!
    </p>
    <ReactMarkdown>{md}</ReactMarkdown>
</>