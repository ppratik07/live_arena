const { default: axios } = require("axios");

const BACKEND_URL = "http://localhost:3000"
describe("Authentication",()=>{
    test("User is able to sign up only once",async()=>{
        const username = 'Pratik' + Math.random()
        const password = '1234'
        const response = await axios.post(`${BACKEND_URL}/api/v1/signup`,{
            username,
            password,
            type: "admin"
        })

        expect(response.statusCode).toBe(200)
        const updatedResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`,{
            username,
            password,
            type:"admin"
        })
        expect(response.statusCode).toBe(400)
    });

    test("Signup fails if empty username",async()=>{
        const username = `Pratik"-${Math.random()}`;
        const password = "1234";
        const response = await axios.post(`${BACKEND_URL}/api/v1/signup`,{
            password
        })
        expect(response.statusCode).toBe(400)
    });

    test("Sign in if ther username and password are correct",async()=>{
        const username = `Pratik-${Math.random()}`;
        const password = "1234";
        await axios.post(`${BACKEND_URL}/api/v1/signup`,{
            username,
            password
        })

        const response = await axios.post(`${BACKEND_URL}/api/v1/signin`,{
            username,
            password
        })

        expect(response.statusCode).toBe(200)
        expect(response.body.token).toBeDefined()
    });

    test("Signin fails if both username and password are incorrect",async()=>{
        const username = `Pratik-${Math.random()}`;
        const password = "1234"
        await axios.post(`${BACKEND_URL}/api/v1/signup`,{
            username,
            password
        })
        await axios.post(`${BACKEND_URL}/api/v1/signin`,{
            username : "wrongname",
            password
        })
        expect(response.statusCode).toBe(403)
    })
})