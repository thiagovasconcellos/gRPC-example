const faker = require('faker');
faker.setLocale('pt_BR');

const fakeDb = []

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

function listUsers(_, callback) {
  callback(null, { users: fakeDb });
}

function createUser(call, callback) {
  try {
    const { login, password, avatar } = call.request;
    const user = {
      login, password, avatar
    }
    const id = fakeDb.length + 1;
    user.id = id;
    fakeDb.push(user);
    callback(null, {
      id,
      login,
      password,
      avatar
    });
  } catch (error) {
    callback(error, { message: error.message ? error.message : 'Something went wrong!'});
  }
}

module.exports = { listUsers, createUser };
