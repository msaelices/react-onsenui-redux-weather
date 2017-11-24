import React from 'react';
import {connect} from 'react-redux';

import {
  Icon,
  List,
  ListItem,
  Page,
  PullHook,
  Splitter,
  SplitterContent,
  SplitterSide,
  Toolbar,
  ToolbarButton
} from 'react-onsenui';

import LocationList from '../containers/LocationList';
import AddLocation from '../containers/AddLocation';
import {updateForecasts} from '../actions';

const styles = {
  menu: {
    boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
  },
  menuIcon: {
    marginRight: '10px'
  }
};

class MainPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pullingState: 'initial',
      isOpen: false
    };
    this.dispatch = props.dispatch;

    this.menuItems = [
      {title: 'Add location', icon: 'ion-plus', page: null},
      {title: 'Settings', icon: 'ion-gear-b', page: null}
    ];

    // bind
    this.handleChange = this.handleChange.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
    this.getContent = this.getContent.bind(this);
    this.onOpenMenu = this.onOpenMenu.bind(this);
    this.onCloseMenu = this.onCloseMenu.bind(this);
    this.onClickMenuPage = this.onClickMenuPage.bind(this);
    this.renderToolbar = this.renderToolbar.bind(this);
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

  onCloseMenu() {
    this.setState({isOpen: false});
  }

  onOpenMenu() {
    this.setState({isOpen: true});
  }

  onClickMenuPage(page) {
    this.onCloseMenu();
    // TODO: Go to the page
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
    const { navigator } = this.props;

    return (
      <Splitter>
        <SplitterSide
          style={styles.menu}
          side='left'
          width={200}
          collapse={true}
          swipeable={true}
          isOpen={this.state.isOpen}
          onClose={this.onCloseMenu}
          onOpen={this.onOpenMenu}
        >
          <Page>
            <List
              dataSource={this.menuItems}
              renderRow={({title, page, icon}) => (
                <ListItem
                  key={title}
                  onClick={() => this.onClickMenuPage(page)}
                  tappable>
                  <Icon icon={icon} style={styles.menuIcon} />
                  {title}
                </ListItem>
              )}
            />
          </Page>
        </SplitterSide>
        <SplitterContent>
          <Page renderToolbar={this.renderToolbar}>
            <PullHook
              onChange={this.handleChange}
              onLoad={this.handleLoad}
            >
              {this.getContent()}
            </PullHook>
            <LocationList navigator={navigator} />
            <AddLocation />
          </Page>
        </SplitterContent>
      </Splitter>
    );
  }
}

export default connect()(MainPage);
