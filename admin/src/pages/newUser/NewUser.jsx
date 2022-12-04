import "./newUser.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";

const NewUser = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});

  //vložení inputů do state
  const handleChange = (e) => {
    //nastavíme objekt info na původní objekt (prev) + vložená hodnota e.value do inputu e.id
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  //nahrání obrázku (upload na cloudinary.com)
  const handleClick = async (e) => {
    e.preventDefault();
    const data = new FormData(); // FormData() = An HTML <form> element — when specified, the FormData object will be populated with the form's current keys/values using the name property of each element for the keys and their submitted value for the values. It will also encode file input content.
    data.append("file", file);
    data.append("upload_preset", "upload");
    try {
      //a) upload obrázku na cloud
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dvee0lzr9/image/upload",
        data
      );
      const { url } = uploadRes.data; //odebereme url z response který přichází po uploadu na cloud

      //b) upload nového usera s url obrázku na server
      const newUser = {
        ...info,
        img: url,
      };

      await axios.post("/auth/register", newUser);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(info);
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                  />
                </div>
              ))}
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewUser;
