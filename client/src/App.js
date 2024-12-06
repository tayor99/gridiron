import "./App.css";
import { musicGenres } from "./uitls/helper";
import { useState } from "react";
import axios from "axios";
import Header from "./components/Header";

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
    if (!genreFilter.length < 1) {
      getMusicList(searchGenre);
      setShowDropDown(false);
    }
  };

  const getMusicList = async (genre) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}playlist`,
        {
          genre: genre,
        }
      );
      setLoading(false);
      setResult(res?.data);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  return (
    <div className="app__container">
      <Header
        genreFilter={genreFilter}
        getMusicList={getMusicList}
        handleSubmit={handleSubmit}
        searchGenre={searchGenre}
        setSearchGenre={setSearchGenre}
        setShowDropDown={setShowDropDown}
        showDropDown={showDropDown}
      />
      <div className="app__container--body">
        <div className="card">
          {loading ? (
            <span className="loader"></span>
          ) : (
            <>
              <div className="card__list">
                {result.map((res) => (
                  <div className="card__list--container" key={res?.title}>
                    <p>{res?.title}</p>
                    <h4>{res?.artist}</h4>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
