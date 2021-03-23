import React from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({ variant, children }) => {
  // pass in variant and children props
  return <Alert variant={variant}>{children}</Alert>;
};

Message.defaultProps = {
  variant: 'info',
};

export default Message;
