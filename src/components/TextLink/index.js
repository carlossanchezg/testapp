import React from 'react';

import { Link } from 'react-router-dom';

const TextLink = ({ goPage, content }) => {
  return (
    <Link to={goPage} replace={true} style={{ textDecoration: 'none' }}>
      {content}
    </Link>
  );
};

export default TextLink;
