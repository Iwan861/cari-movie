import CustomCard from "../src/component/Card.jsx";
import CustomNavbar from "../src/component/Navbar.jsx";
import CustomFooter from "../src/component/Footer.jsx";
import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const img = "https://image.tmdb.org/t/p/w500";
  const navigate = useNavigate();

  useEffect(() => {
    const token = import.meta.env.VITE_TMDB_BEARER;
    const fetchMovies = async () => {
      try {
        const baseUrl = query
          ? `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
              query
            )}&page=${page}`
          : `https://api.themoviedb.org/3/trending/movie/week?page=${page}`;

        const response = await fetch(baseUrl, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: token,
          },
        });

        const data = await response.json();
        setMovies(data.results || []);
        setTotalPages(data.total_pages || 1);
      } catch (err) {
        setError("Gagal ambil data film.");
        console.error(err);
      }
    };

    if (!token) {
      console.error("API token not found! Pastikan sudah ada di .env");
    }

    fetchMovies();
  }, [query, page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(searchTerm);
    setPage(1); // reset ke halaman 1
    setSearchTerm("");
  };

  function handleDetail(id) {
    navigate(`/movie/${id}`);
  }

  return (
    <>
      <Navbar />
      <Movies
        movies={movies}
        img={img}
        handleSearch={handleSearch}
        handleDetail={handleDetail}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setPage={setPage}
        page={page}
        totalPages={totalPages}
        query={query}
      />
      <Alert />
      <Footer />
    </>
  );
}

function Navbar() {
  return (
    <>
      <CustomNavbar />
    </>
  );
}

function Movies({
  movies,
  img,
  handleSearch,
  handleDetail,
  searchTerm,
  setSearchTerm,
  setPage,
  page,
  totalPages,
  query,
}) {
  return (
    <>
      <div className="container mx-auto mt-4 flex flex-col">
        {/* Cari */}
        <form onSubmit={handleSearch} className="self-end">
          <div className="flex justify-items-center items-center gap-2 bg-white rounded-full shadow-md ring-1 ring-gray-200 focus-within:ring-2 px-4 focus-within:ring-yellow-300 transition">
            <input
              type="text"
              placeholder="Cari Film..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm sm:text-base placeholder:text-gray-400 w-[100px] sm:w-full"
            />
            <button
              type="submit"
              className="p-2 rounded-full hover:bg-yellow-300 transition text-white"
              aria-label="Cari"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                fill="gray"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
            </button>
          </div>
        </form>
        {/* end cari */}

        {/* Card */}
        {!movies.length ? (
          <h1 className="text-center mt-10 text-white">Tidak ada hasil.</h1>
        ) : (
          <>
            <div
              className="judul text-2xl text-white py-4 pb-4 my-2 container mx-auto px-4 sm:px-0 "
              id="about"
            >
              <h1 className="text-center">🔥Hot Update</h1>
              <h4 className="underline decoration-amber-300 text-lg sm:text-2xl">
                {query}
              </h4>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] sm:gap-2 gap-y-2 justify-items-center">
              {movies.map((movie) => {
                return (
                  <CustomCard
                    onClick={() => handleDetail(movie.id)}
                    key={movie.id}
                    title={movie.title}
                    release={movie.release_date}
                    rate={movie.vote_average?.toFixed(1) ?? "?"}
                    img={
                      movie.poster_path
                        ? img + movie.poster_path
                        : "/img/no-image.jpg"
                    }
                  />
                );
              })}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-6">
              <Button
                size="xs"
                color="gray"
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
              >
                Prev
              </Button>
              <span className="text-white text-sm py-1 px-2">
                Page {page} of {totalPages}
              </span>

              <Button
                size="xs"
                color="gray"
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
              >
                Next
              </Button>
            </div>
          </>
        )}
        {/* end card */}
      </div>
    </>
  );
}

function Alert() {
  return (
    <div className="text-center text-black my-10 bg-amber-300 py-4">
      <h1 className="font-semibold">Update Soon...</h1>
      <p className="italic text-sm mt-4">
        Untuk saran langsung ke email:{" "}
        <a
          href="mailto:khairulikhwan1964@gmail.com"
          className="text-blue-500 underline italic"
        >
          khairulikhwan1964@gmail.com
        </a>{" "}
        / whatsapp
      </p>
    </div>
  );
}

function Footer() {
  return <CustomFooter />;
}
