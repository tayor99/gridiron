import React from "react";
import logo from "../assets/images/Green.png";
import logoImg from "../assets/images/profile.jpg";
import { CiSearch } from "react-icons/ci";
import { FaLongArrowAltRight } from "react-icons/fa";

const Header = ({
  handleSubmit,
  setShowDropDown,
  searchGenre,
  setSearchGenre,
  showDropDown,
  genreFilter,
  getMusicList,
}) => {
  return (
    <>
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
                  {genreFilter.length < 1 ? (
                    <>
                      <li>No genre found</li>
                    </>
                  ) : (
                    <>
                      {genreFilter.map((list, index) => (
                        <li
                          key={index}
                          onClick={() => {
                            setSearchGenre(list);
                            getMusicList(list);
                            setShowDropDown(false);
                          }}
                        >
                          {list}
                        </li>
                      ))}
                    </>
                  )}
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
    </>
  );
};

export default Header;
