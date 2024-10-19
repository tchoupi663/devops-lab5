const app = require('../src/index')
const chai = require('chai')
const chaiHttp = require('chai-http')
const db = require('../src/dbClient')

chai.use(chaiHttp)

describe('User REST API', () => {

  beforeEach(() => {
    // Clean DB before each test
    db.flushdb()
  })

  after(() => {
    app.close()
    db.quit()
  })

  describe('POST /user', () => {

    it('create a new user', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      chai.request(app)
        .post('/user')
        .send(user)
        .then((res) => {
          chai.expect(res).to.have.status(201)
          chai.expect(res.body.status).to.equal('success')
          chai.expect(res).to.be.json
          done()
        })
        .catch((err) => {
          throw err
        })
    })

    it('pass wrong parameters', (done) => {
      const user = {
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      chai.request(app)
        .post('/user')
        .send(user)
        .then((res) => {
          chai.expect(res).to.have.status(400)
          chai.expect(res.body.status).to.equal('error')
          chai.expect(res).to.be.json
          done()
        })
        .catch((err) => {
          throw err
        })
    })
  })

  //describe('GET /user', () => {
  //})

})


/*

it ('get a user', (done) => {
      chai.request(app)
      .get(`/user/${sergkudinov}`)
      .then((res) => {
          chai.expect(res).to.have.status(200)
          chai.expect(res.body).to.be.an('object')
          chai.expect(res.body.username).to.equal('sergkudinov')
          done()
        })
        .catch((err) => {
          done (err)
        })
    })

    it('get a non-existing user', (done) => {
      const nonExistingUsername = 'nonexistentuser';
      
      chai.request(app)
        .get(`/user/${nonExistingUsername}`)
        .end((err, res) => {
          chai.expect(res).to.have.status(404); // Expect 404 status for not found
          chai.expect(res.body.status).to.equal('error'); // Error status in response
          chai.expect(res.body.message).to.equal(`User with username ${nonExistingUsername} not found`); // Error message
          done();
        });
    });    

    */