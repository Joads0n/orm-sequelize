'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Pessoas', [
      {
        nome: 'Ana Souza',
        email: 'ana.souza@email.com',
        role: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Marcos Cintra',
        email: 'marcos.cintra@email.com',
        role: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Luiza Marques',
        email: 'luiza.marques@email.com',
        role: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Matheus Alves',
        email: 'matheus.alves@email.com',
        role: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Pessoas', null, {});
 
  }
};
