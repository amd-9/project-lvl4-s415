import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import gon from 'gon';
import app from './components/App';

// import faker from 'faker';
// import cookies from 'js-cookie';
// import io from 'socket.io-client';

console.log(gon);

app(gon);

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}
