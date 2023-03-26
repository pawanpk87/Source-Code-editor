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
    const response = await axios.get("http://localhost:8080/logout", {
      withCredentials: true,
      headers: headers,
    });

    res.setHeader(
      "set-cookie",
      "accessToken=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    );
    const data = response.data;
    res.send(data);
  } catch (error) {
    res.setHeader(
      "set-cookie",
      "accessToken=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    );
    res.send({
      message: error.response.data.message,
    });
  }
}
