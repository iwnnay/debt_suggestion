import * as React from 'react';

interface Props {
  text: string;
}

const Info = (props: Props) => (props.text ? <div style={{ float: 'right' }}>i</div> : null);

export default Info;
