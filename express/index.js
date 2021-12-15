const express = require('express');
const faker = require('faker');

faker.setLocale('pt_BR');

const fakeDb = [];

for (let index = 1; index < 5000; index++) {
  fakeDb.push({
    id: index,
    login: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    avatar: faker.internet.avatar(),
    address: {
      country: faker.address.country(),
      city: faker.address.cityName(),
      state: faker.address.state(),
      geolocation: {
        latitude: faker.address.latitude(),
        longitude: faker.address.longitude()
      }
    }
  })
  
}


const server = express();

server.use(express.json());

server.get('/users', (_, res) => {
  return res.status(200).json({ users: fakeDb}).send();
});

server.listen(3333, () => console.log('Listening on 3333'));