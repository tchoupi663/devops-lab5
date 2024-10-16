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
      //1. First, create a user to make this unit test independent from the others
      // 2. Then, check if the result of the get method is correct

      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }

      userController.create(user, (err, result) => {
        expect(err).to.be.equal(null)
        expect(result).to.not.equal(null)

        userController.get(user.username, (err, res) => {
          expect(err).to.be.equal(null)
          expect(res).to.not.equal(null)
          //expect(res).to.be.an('object')
          expect(res.firstname).to.equal(result.firstname)
          expect(res.lastname).to.equal(result.lastname)
        })
      })

      done()
    })

    it('cannot get a user when it does not exist', (done) => {
      // Chech with any invalid user
      done()
    })

  })


  // TODO Create test for the get method
  // describe('Get', ()=> {
  //   
  //   it('get a user by username', (done) => {
  //     // 1. First, create a user to make this unit test independent from the others
  //     // 2. Then, check if the result of the get method is correct
  //     done()
  //   })
  //
  //   it('cannot get a user when it does not exist', (done) => {
  //     // Chech with any invalid user
  //     done()
  //   })
  //
  // })
})
