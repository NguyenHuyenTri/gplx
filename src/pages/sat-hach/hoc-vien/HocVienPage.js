import React from 'react';
import { BoxSearch, ListHV, Info } from './components';

const HocVienPage = (props) => {
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
      <BoxSearch />
     
      <ListHV setInfo={setInfo} isShow={isShow} showInfo={showInfo} />
    </>
  );
};

HocVienPage.propTypes = {};

export default HocVienPage;
