import "./App.css";
import logo from "./assets/images/Green.png";
import logoImg from "./assets/images/profile.jpg";
import { CiSearch } from "react-icons/ci";
import { musicGenres } from "./uitls/helper";
import { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import axios from "axios";

function App() {
  const [showDropDown, setShowDropDown] = useState(false);
  const [searchGenre, setSearchGenre] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const genreFilter = musicGenres.filter((genre) => {
    return genre.toLowerCase().includes(searchGenre.toLowerCase());
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("https://gridiron.onrender.com/playlist", {
        genre: searchGenre,
      });
      setLoading(false);
      setResult(res?.data);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  return (
    <div className="app__container">
      <div className="app__container--header">
        <div className="logo">
          <div className="img--container">
            <img src={logo} alt="logo" />
          </div>
        </div>
        <form className="search--container" onSubmit={handleSubmit}>
          <div
            className="search"
            onMouseOver={() => setShowDropDown(true)}
            onMouseLeave={() => setShowDropDown(false)}
          >
            <div className="search__bar">
              <CiSearch size={24} />
              <input
                type="text"
                placeholder="Enter favourite music genre"
                value={searchGenre}
                onChange={(e) => setSearchGenre(e.target.value)}
              />
            </div>
            {showDropDown && (
              <div className="search__dropdown">
                <ul>
                  {genreFilter.map((list, index) => (
                    <li
                      key={index}
                      onClick={(e) => {
                        setSearchGenre(list);
                        setShowDropDown(false);
                        handleSubmit(e);
                      }}
                    >
                      {list}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <button>
            <FaLongArrowAltRight color="#fff" />
          </button>
        </form>
        <div className="profile">
          <div className="img--container">
            <img src={logoImg} alt="" />
          </div>
          <p>Adenusi Adetayo</p>
        </div>
      </div>
      <div className="app__container--body">
        {!searchGenre || result.length < 1 ? (
          <></>
        ) : (
          <div className="card">
            {loading ? (
              <span className="loader"></span>
            ) : (
              <>
                {" "}
                <div className="card__list">
                  {result.map((res) => (
                    <div className="card__list--container">
                      <p>{res?.title}</p>
                      <h4>{res?.artist}</h4>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
