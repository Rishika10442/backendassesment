//const expect = require('chai').expect;
let chaiHttp = require('chai-http');
let server = require('server');
let chai = require('chai');
let should = chai.should();

const expect  = chai.expect;
chai.use(chaiHttp);
const get    = chai.request('http://localhost:8000').get;
const post   = chai.request(server).post;

chai.use(chaiHttp);


//   describe('POST /api/authenticate', () => {
//       it('it should GET all the books', async(done) => {
           
//             const res = await post('/api/authenticate').send({email:'10442rishika@gmail.com',password:'abcd'});
            
//                   expect(res).to.have.status(200);
//                   expect(res.body).to.be.an('json');
                
//               done();
//             }).timeout(5000);
//       });
  

      describe('GET /api/posts/:id', () => {
        it('it should GET all the books', (done) => {
             
               ( chai.request('http://localhost:8000').get('/api/all_posts')).end((err,res)=>{
                  res.should.have.status(200);
                  done();   
            });
              
                  //  expect(res).to.have.status(200);
                    
                  
                
              }).timeout(5000);
            
        });
    