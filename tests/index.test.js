const { default: axios } = require("axios");

const BACKEND_URL = "http://localhost:3000"
describe("Authenticator",()=>{
    test("User is able to sign up only once",()=>{
        const username = 'Pratik' + Math.random()
        const password = '1234'
        const response = axios.post(`${BACKEND_URL}/api/v1/signup`,{
            username,
            password,
            type: "admin"
        })

        expect(response.statusCode).toBe(200)
        const updatedResponse = axios.post(`${BACKEND_URL}/api/v1/signup`,{
            username,
            password,
            type:"admin"
        })
        expect(response.statusCode).toBe(400)
    });

    test("Signup fails if empty username",()=>{
        const username = `Pratik"-${Math.random()}`;
        const password = "1234";
        const response = axios.post(`${BACKEND_URL}/api/v1/signup`,{
            password
        })
        expect(response.statusCode).toBe(400)
    })
})