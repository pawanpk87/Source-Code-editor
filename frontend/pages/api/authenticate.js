import axios from "axios";

export default async function handler(req, res) {
  const params = req.query;
  try {
    const response = await axios({
      method: "post",
      url: "http://localhost:8080/authenticate",
      data: params,
      credentials: "include",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    });

    res.setHeader("set-cookie", response["headers"]["set-cookie"][0]);
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000/");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,PUT,POST,DELETE,UPDATE,OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
    );

    res.send(response.data);
  } catch (error) {
    res.status(400).send({
      message: error.response.data.message,
    });
  }
}
