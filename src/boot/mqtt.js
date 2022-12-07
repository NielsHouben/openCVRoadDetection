import { boot } from 'quasar/wrappers';
import mqtt from 'mqtt/dist/mqtt';
// import store from '../store';
let mystore = null;

// const host = '81.229.145.235';
// const port = '2983';
const host = '10.22.5.8';
const port = '8883';
const clientId = `webbClient#mqtt_${Math.random().toString(8).slice(3)}`;

const connectUrl = `mqtt://${host}:${port}`;
console.log(connectUrl);

const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  // username: 'emqx',
  // password: 'public',
  reconnectPeriod: 1000,
});

function publish (pubTopic = topic, payload = 'hello world') {
  console.log("published to ", pubTopic, payload);
  client.publish(pubTopic, payload, { qos: 0, retain: false }, (error) => {
    if (error) {
      console.error(error);
    }
  });
}

const topic = '/pos';
// const topic = 'isak.fogelberg@abbgymnasiet.se/speed';
client.on('connect', () => {
  console.log('Connected');
  client.subscribe([topic, '/NH/aSpeed'], () => {
    console.log(`Subscribe to topic '${topic}'`);
  });

});

setTimeout(() => {
  publish("/pos", "100");

}, 2000);




// setInterval(() => {
//   publish();
// }, 100);

let lastSpeed = 0;
export default boot(({ app, store, root }) => {
  client.on('message', (topic, payload) => {
    console.log('Received Message:', topic, payload.toString());
    switch (topic) {
      case '/NH/aSpeed':
        if (parseInt(payload) === lastSpeed) {
          store.dispatch('dupASpeed', parseInt(payload));
        }
        else { store.dispatch('aSpeedUpdate', parseInt(payload)); };
        lastSpeed = parseInt(payload);
        break;
      default:
        break;
    }
  });




  app.config.globalProperties.$pub = publish;
});

