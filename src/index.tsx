import React from 'react';
import ReactDOM from 'react-dom';
import Catalog from './Catalog';

ReactDOM.render(
  <React.StrictMode>
    <Catalog indexFileDir="." />
  </React.StrictMode>,
  document.getElementById('root')
);
