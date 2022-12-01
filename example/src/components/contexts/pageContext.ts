import React from 'react';

type IPageContext = { userInfo?: any, roleOverride?: boolean };

const pageContext = React.createContext<IPageContext>({ 
  userInfo: undefined,
});

export default pageContext;
