import React, { useEffect } from 'react';
import { Header } from '../header';
// import { Content} from '../content';

const Layout = (props) => {
  const { children } = props;

  useEffect(() => {}, []);

  return (
    <div>
      <Header>{children}</Header>
      {/* <Content/> */}
    </div>
  );
};

Layout.propTypes = {};

export default Layout;
