import React from 'react';
import {connect} from 'react-redux';

import {List} from 'react-onsenui';

import Location from './Location';

const LocationList = ({locations, pushPage}) => (
  <List
    dataSource={Object.keys(locations).map((key) => locations[key])}
    renderRow={(location) =>
      <Location
        key={location.id}
        pushPage={pushPage}
        {...location}
      />
    }
  />
);

const mapStateToProps = (state) => ({
  locations: state.locations
});

export default connect(mapStateToProps)(LocationList);
