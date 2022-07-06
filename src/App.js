//router
import LayoutsRoute from './router/layouts-route';

//scss files
import './assets/css/bootstrap.min.css'
import './assets/css/typography.css'
import './assets/css/style.css';
import './assets/css/responsive.css'
import { Auth0Provider } from '@auth0/auth0-react';
import config from "./config";
// import  './assets/css/custom.css';

function App() {
  return (
    <div className="App">
      <Auth0Provider
        domain={config.AUTH0_DOMAIN}
        clientId={config.AUTH0_CLIENT_ID}
        responseType='token id_token'
        audience={config.AUTH0_AUDIENCE}
        redirectUri={window.location.origin}
      >
        <LayoutsRoute />
      </Auth0Provider>
    </div>
  );
}

export default App;