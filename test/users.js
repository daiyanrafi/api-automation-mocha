import supertest from "supertest";
const request = supertest("https://gorest.co.in/public/v2/")

import { expect } from "chai";

const TOKEN = '6f3837e06786e898121d9c4abf9f79485ee813abce205304f9aa69a5e3356d9e'

describe('Users', () => {
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
    it('GET /users', (done) => {
        return request
            .get(`users?access-token=${TOKEN}`)
            .then((res) => {
                expect(res.body).to.not.be.empty;
            })
    })

    it('GET /users/:id', () => {
        return request
            .get(`users/1?access-token=${TOKEN}`)
            .then((res) => {
                expect(res.body.data.id).to.be.eq(6815710);
            })
    })

    it('GET /users with query params', () => {

        const url = `users?access-token=${TOKEN}&page=5`

        return request
            .get(url)
            .then((res) => {
                expect(res.body).to.not.be.empty;
                res.body.forEach(data => {
                    // expect(data.gender).to.eq('Female')
                    expect(data.status).to.eq('Active')
                })
            })
    })

    it('POST /users', () => {

        const data = {
            email: `eed-${Math.floor(Math.random() * 69)}@gmail.com`,
            name: 'gg',
            gender: 'Male',
            status: 'Inactive'
        };

        return request
            .post('users')
            .set("Authorization", `Bearer ${TOKEN}`)
            .send(data)
            .then((res) => {
                console.log(res.body)
                // expect(res.body.data.email).to.eq(data.email)
                expect(res.body.data).to.deep.include(data)
            })
    });


    //put method***********

    it('PUT /users/:id', () => {
        const data = {
            status: "active",
            name: `gg - ${Math.floor(Math.random() * 69)}`
        }

        return request
            .put('/users/6816525')
            .set("Authorization", `Bearer ${TOKEN}`)
            .send()
            .then((res) => {
                console.log(res.body.data);
                expect(res.body.data).to.deep.include(data)
            })
    })

    //delete method

    it.only('DELETE /users/:id', () => {
        return request
            .delete('users/6816525')
            .set("Authorization", `Bearer ${TOKEN}`)
            .then(res => {
                expect(res.body.data).to.be.eq(null);
            })
    })
}) 
