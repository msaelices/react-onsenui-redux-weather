import React from 'react';
import {connect} from 'react-redux';

import {
  Icon,
  List,
  ListItem,
  Page,
  RouterNavigator,
  RouterUtil,
  Splitter,
  SplitterContent,
  SplitterSide
} from 'react-onsenui';

import ListPage from './ListPage';

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

    this.dispatch = props.dispatch;

    const routeConfig = RouterUtil.init([{
      component: ListPage,
      props: {
        key: 'main',
        pushPage: (...args) => this.pushPage(...args),
        openMenu: () => this.openMenu(),
        dispatch: this.dispatch,
      }
    }]);

    this.state = {
      pullingState: 'initial',
      isOpen: false,
      routeConfig: routeConfig,
    };

    this.menuItems = [
      {title: 'Add location', icon: 'ion-plus', page: null},
      {title: 'Settings', icon: 'ion-gear-b', page: null}
    ];

    // bindings to be able to access `this`
    this.openMenu = this.openMenu.bind(this);
    this.onCloseMenu = this.onCloseMenu.bind(this);
    this.onClickMenuPage = this.onClickMenuPage.bind(this);
  }

  pushPage(page, key) {
    const route = {
      component: page,
      props: {
        key: key,
        popPage: () => this.popPage(),
        pushPage: (...args) => this.pushPage(...args),
        openMenu: () => this.openMenu(),
        dispatch: this.dispatch,
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

  openMenu() {
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
          onOpen={this.openMenu}
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
