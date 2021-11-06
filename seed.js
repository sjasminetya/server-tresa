var seeder = require('mongoose-seed');
var mongoose = require('mongoose');

// Connect to MongoDB via Mongoose
seeder.connect('mongodb://127.0.0.1:27017/db_tresa', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true,
  useUnifiedTopology: true
}, function () {

  // Load Mongoose models
  seeder.loadModels([
    './models/Member',
    './models/Users'
  ]);

  // Clear specified collections
  seeder.clearModels(['Member', 'Users'], function () {

    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function () {
      seeder.disconnect();
    });

  });
});

var data = [
  // member
  {
    'model': 'Member',
    'documents': [
      {
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc903333'),
        firstName: 'Elfin',
        lastName: 'Sanjaya',
        email: 'elfinsanjaya12@gmail.com',
        phoneNumber: '082377954008'
      },
      {
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc903334'),
        firstName: 'Yein',
        lastName: 'Narayana',
        email: 'elfinsanjaya1207@gmail.com',
        phoneNumber: '082377954008'
      }
    ]
  },
  {
    'model': 'Users',
    'documents': [
      {
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc903345'),
        username: 'admin',
        password: 'rahasia',
      },
      {
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc903346'),
        username: 'superadmin',
        password: 'rahasia',
      },
    ]
  }
];