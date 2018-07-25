const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

var assert = require('chai').assert;
var add = require('../recipesRouter.js');

describe('Recipe Test',function(){

    before(function(){
        return runServer();
    });

    after(function(){
        return closeServer();
    });

    var result = "";
    it('should list items on GET', function(){
        return chai
        .request(app)
        .get("/recipesRouter.js")
        .then(function(res){
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.be.a("array");
            expect(res.body.length).to.be.at.least(1);
            const expectedKeys=["name","ingredients"];
            res.body.forEach(function(item){
                expect(item).to.be.a("object");
                expect(item).to.include.keys(expectedKeys);

            });
        });
        /*
        assert.equal(result, 10);
        assert.equal(add(),'hello world')*/
    });

    it("should add an item on POST", function() {
        const newItem = { name: "coffee", checked: false };
        return chai
          .request(app)
          .post("/shopping-list")
          .send(newItem)
          .then(function(res) {
            expect(res).to.have.status(201);
            expect(res).to.be.json;
            expect(res.body).to.be.a("object");
            expect(res.body).to.include.keys("name", "ingredients");
            expect(res.body.id).to.not.equal(null);
            // response should be deep equal to `newItem` from above if we assign
            // `id` to it from `res.body.id`
            expect(res.body).to.deep.equal(
              Object.assign(newItem, { id: res.body.id })
            );
          });
      });


});