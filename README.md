# React Redux Weather

![React Redux Weather](https://raw.githubusercontent.com/argelius/react-onsenui-redux-weather/master/react_redux_weather.png)

Weather app using Onsen UI, Redux, React and Webpack.

This app was built using [Onsen UI](https://onsen.io/), a hybrid app framework that provides both Material Design and iOS flat design. We recently released [React Components](https://onsen.io/v2/react.html).

Check out the demo [here](http://argelius.github.io/react-onsenui-redux-weather/demo.html).

## Some features

* Add/remove user's locations, storing them on localStorage.
* Retrieve locations forecasts, using openweathermap.org API, with pull-to-refresh control.
* Side menu.


## How to run it

To run it simply do:

```bash
yarn install
yarn start
```

The app will run at [http://localhost:9000](http://localhost:9000).

## How to build it

You can build it using Cordova.

- [Install Cordova](https://cordova.apache.org/docs/en/latest/guide/cli/index.html#installing-the-cordova-cli):

```
yarn install -g cordova
```

You need to build the project:

```
yarn build
```

Add a platform to run it on a device or emulator. For Android:

```
cordova platform add android
cordova run android
```

This assumes that you have the Android SDK installed.


## Roadmap

* Settings page, to allow users change metrics, preferred city and other stuff.
* SVG animations for weather icons.
* Autocompletion using Google geocoding API.
* App icon showing current weather in the first location.
* Drag-and-drop cities to change ordering.
* Show city photos in the forecast detail page, using Google Place API.


## Contributing

1. Fork it ( https://github.com/argelius/react-onsenui-redux-weather/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request


## Contributing to Onsen UI

See https://github.com/OnsenUI/OnsenUI/blob/master/.github/CONTRIBUTING.md


## Notes

Forked from https://github.com/argelius/react-onsenui-redux-weather, but with more features. There is a Vue version for the same app on github.com/msaelices/vue-onsenui-weather