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
    this.props.navigator.popPage();
  }

  render() {
    const {title, navigator, backButton} = this.props;

    console.log(navigator.pages.length);

    return (
      <Toolbar>
        <div className='left'>
          {backButton ? <BackButton onClick={this.onGoBack}>Back</BackButton> : null}
        </div>
        <div className='center'>{title}</div>
      </Toolbar>
    );
  }
}

export default NavApp;
