import React from 'react';

const WindowSizeContext = React.createContext({
  greaterThan1920px: window.innerWidth > 1920,
  lessThan992px: window.innerWidth < 992
});
export default WindowSizeContext;
