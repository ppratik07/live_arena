const { default: axios } = require("axios");

const BACKEND_URL = "http://localhost:3000";
describe("Authentication", () => {
  test("User is able to sign up only once", async () => {
    const username = "Pratik" + Math.random();
    const password = "1234";
    const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username,
      password,
      type: "admin",
    });

    expect(response.statusCode).toBe(200);
    const updatedResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username,
      password,
      type: "admin",
    });
    expect(response.statusCode).toBe(400);
  });

  test("Signup fails if empty username", async () => {
    const username = `Pratik"-${Math.random()}`;
    const password = "1234";
    const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      password,
    });
    expect(response.statusCode).toBe(400);
  });

  test("Sign in if ther username and password are correct", async () => {
    const username = `Pratik-${Math.random()}`;
    const password = "1234";
    await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username,
      password,
    });

    const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
      username,
      password,
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  test("Signin fails if both username and password are incorrect", async () => {
    const username = `Pratik-${Math.random()}`;
    const password = "1234";
    await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username,
      password,
    });
    await axios.post(`${BACKEND_URL}/api/v1/signin`, {
      username: "wrongname",
      password,
    });
    expect(response.statusCode).toBe(403);
  });
});

describe("User Information ", () => {
  let token = "";
  let avatarId="";
  beforeAll(async () => {
    const username = `Pratik-${Math.random()}`;
    const password = "1234";
    await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username,
      password,
      type: "admin",
    });
    const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
      username,
      password,
    });
    token = response.data.token;

    const avatarResponse = await axios.post(`${BACKEND_URL}/api/v1/admin/avatar`,{
        "imageUrl" : "https://ideogram.ai/assets/progressive-image/balanced/response/Bfvkdk12Soq7_mlr3PXJUg",
        "name" : "Hercules"
    })
    avatarId = avatarResponse.data.avatarId;
  });

  test("User can't update their metadata with wrong avatar id",async()=>{
    const response = await axios.post(`${BACKEND_URL}/api/v1/user/metadata`, {
        avatarId : "123"
      },{
        headers:{
            "authorization" : `Bearer ${token}`
        }
      });

      expect(response.statusCode).toBe(400)
  })

  test("User can update their metadata with the right avatar id",async()=>{
    const response = await axios.post(`${BACKEND_URL}/api/v1/user/metadata`,{
        avatarId
    },{
        headers:{
            "authorization" : `Bearer ${token}`
        }
    })
    expect(response.statusCode).toBe(200);
  })
});
