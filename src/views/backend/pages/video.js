import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import TitlesApi from "../../../api/TitlesApi";
import CastLabsPage from "../../../components/castLabs";

const Video = () => {

  const [movie, setMovie] = useState(null);
  const { titleId } = useParams();
  // const movie = props.location?.state?.movie

  useEffect(() => {
    async function getData() {
      try {
        const { data: movie } = await TitlesApi.getSpecificTitle(titleId);
        setMovie(movie.title);
        return () => { }
      } catch (e) {
        console.error(e);
      }
    }

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
        {movie && <CastLabsPage
          movie={movie}
          onClose={() => { }}
        />}
    </>
  )
}

export default Video