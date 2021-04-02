import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllMusic } from "../actions/musicActions";
import style from "../styles/AllMusic.module.css";
import Footer from "../components/homepage/Footer/Footer";
import Loader from "../components/Loader/Loader";
import Music from "../components/music/music";
import ReactPaginate from "react-paginate";
import { LOADING } from "../actions/type";

const allMusic = () => {
  const [currentpage, setCurrentPage] = useState(1);
  const music = useSelector((state) => state.music);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllMusic());
  }, []);

  const handleChange = (e) => {
    console.log(e);
    dispatch({ type: LOADING });
    dispatch(getAllMusic(e.selected + 1));
  };

  if (!music.musics)
    return (
      <div className={style.container}>
        <Loader loading={true} />
      </div>
    );
  return (
    <>
      <div className={style.container}>
        {music.musics.data.map((m) => (
          <Music music={m} />
        ))}
        {console.log(music.musics.data, music.musics.totalPages)}
        {auth.isAuthenticated ? (
          <div className={style.pagination_container}>
            <ReactPaginate
              containerClassName={
                style.pagination
              } /* as this work same as bootstrap class */
              subContainerClassName={[style.pages, style.pagination].join(
                " "
              )} /* as this work same as bootstrap class */
              activeClassName={style.active}
              pageCount={music.musics.totalPages}
              breakLabel={false}
              marginPagesDisplayed={0}
              pageRangeDisplayed={0}
              previousLabel={"<"}
              nextLabel={">"}
              onPageChange={(e) => handleChange(e)}
            />
          </div>
        ) : (
          <p>*Login to listen more*</p>
        )}
      </div>

      <Footer />
    </>
  );
};

export default allMusic;