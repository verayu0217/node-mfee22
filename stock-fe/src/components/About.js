import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/config";

const About = () => {
  const [member, setMember] = useState(null);
  useEffect(() => {
    let getMember = async () => {
      let response = await axios.get(`${API_URL}/member`, {
        withCredentials: true,
      });
      console.log(response.data);
    };
    getMember();
  }, []);

  return (
    <div className="m-7">
      <h2 className="m-7 text-2xl text-gray-600">這裡是魚股市</h2>
      <h3>Hi, 王大明</h3>
    </div>
  );
};

export default About;
