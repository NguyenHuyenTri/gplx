import React from 'react';
import { Header, ListSH, Info, BoxSearch } from './components';

const Xe = (props) => {
  const [isShow, setIsShow] = React.useState(false);
  const [info, setInfo] = React.useState({});

  const showInfo = () => {
    setIsShow(!isShow);
  };

  if (isShow) {
    return <Info info={info} showInfo={showInfo} />;
  }

  return (
    <>
      <Header />
      <ListSH setInfo={setInfo} isShow={isShow} showInfo={showInfo} />
    </>
  );
};

Xe.propTypes = {};

export default Xe;
