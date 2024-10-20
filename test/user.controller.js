const { expect } = require('chai')
const userController = require('../src/controllers/user')
const db = require('../src/dbClient')

describe('User', () => {

  beforeEach(() => {
    // Clean DB before each test
    db.flushdb()
  })

  describe('Create', () => {

    it('create a new user', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      userController.create(user, (err, result) => {
        expect(err).to.be.equal(null)
        expect(result).to.be.equal('OK')
        done()
      })
    })

    it('passing wrong user parameters', (done) => {
      const user = {
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }

      userController.create(user, (err, result) => {
        expect(err).to.not.be.equal(null)
        expect(result).to.be.equal(null)
        done()
      })
    })

    it('avoid creating an existing user', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }

      userController.create(user, (err, result) => {
        expect(err).to.be.equal(null);
        expect(result).to.not.be.equal(null);

        userController.create(user, (err, result) => {
          expect(err).to.not.be.equal(null);
          expect(result).to.be.equal(null);
          //expect(err.message).to.equal('User already exists'); 
          done();
        });
      })
    })

  })

  describe('Get', () => {

    it('get a user by username', (done) => {

      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }

      userController.create(user, (err, result) => {
        expect(err).to.be.equal(null)
        expect(result).to.not.be.equal(null);

        userController.get(user, (err, res) => {
          expect(err).to.be.equal(null)
          expect(res).to.not.be.equal(null);
          expect(res.firstname).to.equal('Sergei')
          expect(res.lastname).to.equal('Kudinov')

          done()
        })
      })
    })

    it('cannot get a user when it does not exist', (done) => {

      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }

      userController.get(user, (err, res) => {
        expect(err).to.not.be.equal(null)
        expect(res).to.be.equal(null);
        done()
      })
    })
    //hello
  })
})
