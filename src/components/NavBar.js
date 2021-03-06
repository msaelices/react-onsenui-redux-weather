import React from 'react';

import {
  Toolbar,
  BackButton
} from 'react-onsenui';

class NavApp extends React.Component {

  constructor(props) {
    super(props);

    this.onGoBack = this.onGoBack.bind(this);
  }

  onGoBack() {
    this.props.popPage();
  }

  render() {
    const {title, backButton} = this.props;

    return (
      <Toolbar>
        <div className='left'>
          {backButton ? <BackButton navigator={navigator} onClick={this.onGoBack}>Back</BackButton> : null}
        </div>
        <div className='center'>{title}</div>
      </Toolbar>
    );
  }
}

export default NavApp;
