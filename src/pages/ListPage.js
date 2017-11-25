import React from 'react';

import {
  Icon,
  Page,
  PullHook,
  Toolbar,
  ToolbarButton
} from 'react-onsenui';

import LocationList from '../containers/LocationList';
import AddLocation from '../containers/AddLocation';
import {updateForecasts} from '../actions';

class ListPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pullingState: 'initial',
      isOpen: false,
    };
    this.dispatch = props.dispatch;

    // bindings to be able to access `this`
    this.handleChange = this.handleChange.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
    this.getContent = this.getContent.bind(this);
    this.renderToolbar = this.renderToolbar.bind(this);
  }

  handleLoad(done) {
    // refresh all the forecasts
    this.dispatch(updateForecasts());
    // simulate a 1 second timeout to hide the pull hook
    // this should be wait for all the forecasts
    setTimeout(() => done(), 1000);
  }

  handleChange(e) {
    this.setState({pullingState: e.state});
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

  renderToolbar() {
    return (
      <Toolbar>
        <ToolbarButton onClick={this.onOpenMenu}>
          <Icon icon='ion-navicon' />
        </ToolbarButton>
        Onsen Weather
      </Toolbar>
    );
  }

  render() {
    const { pushPage } = this.props;
    return (
      <Page renderToolbar={this.renderToolbar}>
        <PullHook
          onChange={this.handleChange}
          onLoad={this.handleLoad}
        >
          {this.getContent()}
        </PullHook>
        <LocationList pushPage={pushPage} />
        <AddLocation />
      </Page>
    );
  }
}

export default ListPage;
