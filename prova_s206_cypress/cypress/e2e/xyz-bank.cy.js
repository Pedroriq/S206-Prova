/// <reference types="cypress"/>

/// const {functions} = require("cypress/types/lodash")


describe('Criando cenário de teste para o globalsqa XYZ Bank', ()=>{

it('Caso de teste: Realizando depósito', ()=>{
  let clienteInfo = criarCliente()
  let clienteConta = criarConta(clienteInfo)
  cy.get('.home').click()
  cy.get('.borderM > :nth-child(1) > .btn').click()
  cy.get('#userSelect').select(clienteInfo[0] + ' ' + clienteInfo[1])
  cy.get('form.ng-valid > .btn').click()
  cy.get('[ng-class="btnClass2"]').click()
  cy.get('.form-control').type('1500')
  cy.get('form.ng-dirty > .btn').click()
  cy.get('.error').should('have.text', 'Deposit Successful')
})

it('Caso de teste: Testnado sacar dinheiro sem ter dinheiro', ()=>{
  let clienteInfo = criarCliente()
  let clienteConta = criarConta(clienteInfo)
  cy.get('.home').click()
  cy.get('.borderM > :nth-child(1) > .btn').click()
  cy.get('#userSelect').select(clienteInfo[0] + ' ' + clienteInfo[1])
  cy.get('form.ng-valid > .btn').click()
  cy.get('[ng-class="btnClass3"]').click()
  cy.get('.form-control').type('5000')
  cy.get('form.ng-dirty > .btn').click()
  cy.get('.error').should('have.text', 'Transaction Failed. You can not withdraw amount more than the balance.')
})

it('Caso de teste: Realizando logout como cliente', ()=>{
  let clienteInfo = criarCliente()
  let clienteConta = criarConta(clienteInfo)
  cy.get('.home').click()
  cy.get('.borderM > :nth-child(1) > .btn').click()
  cy.get('#userSelect').select(clienteInfo[0] + ' ' + clienteInfo[1])
  cy.get('form.ng-valid > .btn').click()
  cy.get('.logout').click()
  cy.get('#userSelect').should('contain.text', '---Your Name---')
})


})

function criarCliente(){

  cy.visit('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login')
  let horas = new Date().getHours().toString()
  let minutos = new Date().getMinutes().toString()
  let segundos = new Date().getSeconds().toString()
  let clienteNome = horas + minutos
  let clienteSobrenome = segundos + 'sobre'
  let cep = Math.floor(Math.random() * 100000).toString() + '-000'
  let clienteInfo = [clienteNome, clienteSobrenome, cep]
  cy.get(':nth-child(3) > .btn').click()
  cy.get('[ng-class="btnClass1"]').click()
  cy.get(':nth-child(1) > .form-control').type(clienteNome)
  cy.get(':nth-child(2) > .form-control').type(clienteSobrenome)
  cy.get(':nth-child(3) > .form-control').type(cep)
  cy.get('form.ng-dirty > .btn').click()
  cy.get('[ng-class="btnClass3"]').click()
  cy.get('tbody > :nth-child(2) > :nth-child(3)')
  cy.get('.marTop').scrollTo('bottom')
  cy.get(':nth-child(6) > :nth-child(1)').should('have.text', clienteInfo[0])
  cy.get(':nth-child(6) > :nth-child(2)').should('have.text', clienteInfo[1])
  cy.get(':nth-child(6) > :nth-child(3)').should('have.text', clienteInfo[2])

  return clienteInfo

}

function criarConta(clienteInfo){
  
  cy.get('[ng-class="btnClass2"]').click()
  cy.get('#userSelect').select(clienteInfo[0] + ' ' + clienteInfo[1])
  cy.get('#currency').select('Dollar')
  cy.get('form.ng-dirty > button').click()
  cy.get('[ng-class="btnClass3"]').click()
  cy.get('.marTop').scrollTo('bottom')
  cy.get(':nth-child(6) > :nth-child(4) > .ng-binding').should('contain.text', '1016')
  
}