import { boot } from 'quasar/wrappers';
import mqtt from 'mqtt/dist/mqtt';

const host = '81.229.145.235';
const port = '2983';
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

const topic = '/test/something';
// const topic = 'isak.fogelberg@abbgymnasiet.se/speed';
client.on('connect', () => {
  console.log('Connected');
  client.subscribe([topic], () => {
    console.log(`Subscribe to topic '${topic}'`);
  });
});


client.on('message', (topic, payload) => {
  console.log('Received Message:', topic, payload.toString());
});

function publish (pubTopic = topic, payload = 'hello world') {
  client.publish(pubTopic, payload, { qos: 0, retain: false }, (error) => {
    if (error) {
      console.error(error);
    }
  });
}

// setInterval(() => {
//   publish();
// }, 100);

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api
  app.config.globalProperties.$pub = publish;
});

