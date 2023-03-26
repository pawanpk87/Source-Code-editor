import axios from "axios";

export default async function handler(req, res) {
  const params = req.query;
  try {
    const response = await axios({
      method: "post",
      url: "http://localhost:8080/register",
      data: params,
      withCredentials: true,
      headers: { "content-type": "application/json" },
    });
    const data = response.data;
    res.send(data);
  } catch (error) {
    res.status(400).send({
      message: error.response.data.message,
    });
  }
}
