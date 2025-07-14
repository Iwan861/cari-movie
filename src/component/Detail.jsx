import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CustomNavbar from "./Navbar";

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");
  const imgBackdrop = "https://image.tmdb.org/t/p/w1280";
  const imgPoster = "https://image.tmdb.org/t/p/w1280";

  useEffect(() => {
    const token = import.meta.env.VITE_TMDB_BEARER;
    const fetchDetail = async () => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: token,
          },
        });
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        setError("Gagal ambil data film.");
        console.error(err);
      }
    };

    fetchDetail();
  }, [id]);

  if (error)
    return (
      <>
        <CustomNavbar />
        <p className="text-red-500 text-center mt-10">{error}</p>
      </>
    );

  if (!movie)
    return (
      <>
        <CustomNavbar />
        <p className="text-white text-center mt-10">Loading...</p>
      </>
    );

  return (
    <>
      <CustomNavbar />
      <div className="container mx-auto md:bg-slate-900 text-white p-4 px-9 max-w-5xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 bg-yellow-400 text-black font-semibold px-4 py-1 rounded hover:bg-yellow-500 transition"
        >
          Kembali
        </button>

        {/* BACKDROP */}
        <div
          className="rounded-xl shadow-xl h-[400px] bg-cover bg-center hidden md:block"
          style={{
            backgroundImage: `url(${
              movie.backdrop_path
                ? imgBackdrop + movie.backdrop_path
                : "/img/no-image.jpg"
            })`,
          }}
        ></div>

        {/* POSTER + INFO */}
        <div className="flex flex-col md:flex-row gap-6 mt-6">
          {/* POSTER */}
          <img
            src={
              movie.poster_path
                ? imgPoster + movie.poster_path
                : "/img/no-image.jpg"
            }
            alt={movie.title}
            className="w-full md:w-1/3 max-w-xs rounded shadow-xl object-cover"
          />

          {/* INFO */}
          <div className="flex-1 pb-4">
            <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
            <p className="text-sm italic text-gray-300 mb-4">
              Tanggal Rilis: {movie.release_date}
            </p>
            <p className="mb-4 leading-relaxed">{movie.overview}</p>

            <div className="flex flex-wrap gap-2 items-center text-sm">
              <span className="bg-yellow-400 text-black px-3 py-1 rounded">
                ⭐ {movie.vote_average.toFixed(1)}
              </span>
              <span className="bg-slate-800 px-3 py-1 rounded">
                Durasi: {movie.runtime} menit
              </span>
              <span className="bg-slate-800 px-3 py-1 rounded">
                Popularitas: {Math.round(movie.popularity)}
              </span>
            </div>

            {movie.genres?.length > 0 && (
              <div className="mt-4">
                <h2 className="font-semibold">Genre:</h2>
                <div className="flex flex-wrap gap-2 mt-1">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="bg-amber-300 text-black px-3 py-1 rounded text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
