import supertest from "supertest";
const request = supertest("https://gorest.co.in/public/v2/")

import { expect } from "chai";

const TOKEN = '9b49f4653cfefc0a9d406111f4c9d3145f66143e66aaf20fccf0249a28e763f9'

describe('Users', ()=>{
    // it('GET /users', (done)=>{
    //     request
    //     .get(`users?access-token=${TOKEN}`)
    //     .end((err, res)=>{
    //         // console.log(err);
    //         // console.log(res.body);
    //         expect(res.body).to.not.be.empty;
    //         done()
    //     })
    // })

    
    //used .then

    it('GET /users', ()=>{
        return request
        .get(`users?access-token=${TOKEN}`)
        .then((res)=>{
            expect(res.body).to.not.be.empty;
        })
    })

    it('GET /users/:id', ()=>{
        return request
        .get(`users/1?access-token=${TOKEN}`)
        .then((res)=>{
            expect(res.body.data.id).to.be.eq(1);
        })
    })
})
