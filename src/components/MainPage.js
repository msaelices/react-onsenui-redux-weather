import React from 'react';
import {connect} from 'react-redux';

import {
  Icon,
  Page,
  PullHook
} from 'react-onsenui';

import NavBar from './NavBar';
import LocationList from '../containers/LocationList';
import AddLocation from '../containers/AddLocation';
import {updateForecasts} from '../actions';

class MainPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pullingState: 'initial'
    };
    this.dispatch = props.dispatch;

    // bind
    this.handleChange = this.handleChange.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
    this.getContent = this.getContent.bind(this);
  }

  handleChange(e) {
    this.setState({pullingState: e.state});
  }

  handleLoad(done) {
    // refresh all the forecasts
    this.dispatch(updateForecasts());
    // simulate a 1 second timeout to hide the pull hook
    // this should be wait for all the forecasts
    setTimeout(() => done(), 1000);
  }

  getContent() {
    switch (this.state.pullingState) {
      case 'initial':
        return (
          <span>
            <Icon size={20} spin={false} icon='long-arrow-down' class='left' />
            Pull to refresh
          </span>
        );
      case 'preaction':
        return (
          <span>
            <Icon size={20} spin={false} icon='long-arrow-up' class='left' />
            Release
          </span>
        );
      case 'action':
        return (
          <span>
            <Icon size={20} spin={true} icon='refresh' class='left' />
            Loading...
          </span>
        );
    };
  }

  render() {
    const { navigator } = this;
    return (
      <Page renderToolbar={() => <NavBar title='Onsen Weather' navigator={navigator} />}>
        <PullHook
          onChange={this.handleChange}
          onLoad={this.handleLoad}
        >
          {this.getContent()}
        </PullHook>
        <LocationList navigator={navigator} />
        <AddLocation />
      </Page>
    );
  }
}

export default connect()(MainPage);
