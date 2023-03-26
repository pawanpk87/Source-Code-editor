import axios from "axios";

function getAllCookies(cookies) {
  let allCookies = "";
  for (let key in cookies) {
    allCookies += key + "=" + cookies[key] + ";";
  }
  if (allCookies.length > 0) {
    allCookies = allCookies.substring(0, allCookies.length - 1);
  }
  return allCookies;
}

export default async function handler(req, res) {
  try {
    let allCookies = "";
    if (req.cookies) {
      allCookies = getAllCookies(req.cookies);
    }
    let headers = {
      "Content-Type": "application/json",
    };
    if (allCookies !== "") {
      headers["Cookie"] = allCookies;
    }
    const response = await axios.get(
      "http://localhost:8080/api/v1/user/login",
      {
        withCredentials: true,
        headers: headers,
      }
    );
    const data = response.data;
    res.send(data);
  } catch (error) {
    throw "error occured";
  }
}
