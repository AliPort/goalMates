'use strict'

// Have Empty Tables Before Running

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const goalSaved = await queryInterface.bulkInsert('goals', [{
      goalName: 'Make a React App',
      location: 'Online',
    }])

    const mateSaved = await queryInterface.bulkInsert('mates', [{
      name: "Lolla",
      join_date: "2022-01-17T04:33:12.000Z",
    }])

    const usersSaved = await queryInterface.bulkInsert('users', [{
        username: "Kevin",
        location: "United States",
        online_location: true,
        join_date: "2022-01-17T06:33:12.000Z",
        profile_pic: "https://images.unsplash.com/photo-1556690171-9f6645f4455e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
        password: "Kevin",
        bio:"My name is Kevin."
    }])

    },
      
  down: async (queryInterface, Sequelize) => {
    // note that this deletes ALL data from the bands table
    await queryInterface.bulkDelete('user', null, {})
  }
}

// //to get the seed data, in the terminal run:
// // sequelize seed:generate --name bands
// //or
// // sequelize db:seed:all