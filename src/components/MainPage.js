import React from 'react';
import {connect} from 'react-redux';

import {
  Icon,
  List,
  ListItem,
  Page,
  PullHook,
  RouterNavigator,
  RouterUtil,
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


class MainPage extends React.Component {
  constructor(props) {
    super(props);

    const routeConfig = RouterUtil.init([{
        component: ListPage,
        props: {
          key: 'main',
          pushPage: (...args) => this.pushPage(...args)
        }
    }]);

    this.state = {
      pullingState: 'initial',
      isOpen: false,
      routeConfig: routeConfig,
    };
    this.dispatch = props.dispatch;

    this.menuItems = [
      {title: 'Add location', icon: 'ion-plus', page: null},
      {title: 'Settings', icon: 'ion-gear-b', page: null}
    ];

    // bindings to be able to access `this`
    this.onOpenMenu = this.onOpenMenu.bind(this);
    this.onCloseMenu = this.onCloseMenu.bind(this);
    this.onClickMenuPage = this.onClickMenuPage.bind(this);
  }

  pushPage(page, key) {
    const route = {
      component: page,
      props: {
        key: key,
        popPage: () => this.popPage(),
        pushPage: (...args) => this.pushPage(...args)
      }
    };

    let routeConfig = this.state.routeConfig;

    routeConfig = RouterUtil.push({
      routeConfig,
      route
    });

    this.setState({routeConfig});
  }

  popPage(options = {}) {
    let routeConfig = this.state.routeConfig;

    routeConfig = RouterUtil.pop({
      routeConfig,
      options: {
        ...options,
        animationOptions: {duration: 0.4}
      }
    });

    this.setState({routeConfig});
  }

  onPostPush() {
    const routeConfig = RouterUtil.postPush(this.state.routeConfig);
    this.setState({routeConfig});
  }

  onPostPop() {
    const routeConfig = RouterUtil.postPop(this.state.routeConfig);
    this.setState({routeConfig});
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

  renderPage(route) {
    const props = route.props || {};
    return <route.component {...props} />;
  }

  render() {
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
          <Page>
            <RouterNavigator
              swipeable={true}
              swipePop={options => this.popPage(options)}
              routeConfig={this.state.routeConfig}
              renderPage={this.renderPage}
              onPostPush={() => this.onPostPush()}
              onPostPop={() => this.onPostPop()}
            />
          </Page>
        </SplitterContent>
      </Splitter>
    );
  }
}

export default connect()(MainPage);
