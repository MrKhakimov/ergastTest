import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context/src/SafeAreaContext';
import {store, rootStore} from './src/redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {MainNavigation} from './src/navigation';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={rootStore}>
        <SafeAreaProvider>
          <StatusBar barStyle={'dark-content'} translucent={true} />
          <MainNavigation />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};
export default App;
