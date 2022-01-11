import React from 'react';
import { render } from 'react-dom';
import CenteredTree from './CenteredTree';

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
};

const App = () => (
  <CenteredTree />
);

render(<App />, document.getElementById('root'));
