import { Card } from "flowbite-react";

export default function CustomCard({ id, title, release, rate, img, onClick }) {
  const idMovie = id;
  // console.log(idMovie);

  return (
    <div
      className="w-full max-w-[150px] sm:max-w-[150px] group"
      id="film"
      onClick={onClick}
    >
      <Card className="relative h-auto w-full overflow-hidden rounded-lg shadow-lg aspect-[3/5]">
        {/* ⬇️ Background Image dibikin div tersendiri agar bisa di-scale */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110 group-active:scale-110"
          style={{
            backgroundImage: `url(${img})`,
          }}
        />
        {/* Overlay gelap */}
        <div className="absolute inset-0 bg-black/20 z-10" />
        {/* Konten */}
        <div className="absolute inset-0 z-20 flex flex-col justify-between p-4">
          <h5 className="text-md font-bold text-white">{title}</h5>
          <div>
            <span className="inline-block bg-yellow-300 text-black px-2 py-0.5 rounded text-sm font-medium">
              {rate}
            </span>
            <p className="text-sm text-white">
              {release ? new Date(release).getFullYear() : "Unknown"}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
