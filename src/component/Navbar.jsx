import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  createTheme,
  ThemeProvider,
} from "flowbite-react";
import { useNavigate } from "react-router-dom";

const customTheme = createTheme({
  navbar: {
    root: {
      base: "bg-white px-2 py-2.5 sm:px-4 dark:border-gray-700 dark:bg-utama",
      rounded: { on: "rounded", off: "" },
      bordered: { on: "border", off: "" },
      inner: {
        base: "mx-auto flex flex-wrap items-center justify-between",
        fluid: { on: "", off: "container" },
      },
    },
    brand: { base: "flex items-center" },
    collapse: {
      base: "w-full md:block md:w-auto",
      list: "mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:text-md md:font-medium",
      hidden: { on: "hidden", off: "" },
    },
    link: {
      base: "block py-2 pl-3 pr-4 md:p-0 cursor-pointer",
      active: {
        on: "bg-primary-700 text-white md:bg-transparent md:text-primary-700 dark:text-white",
        off: "border-b border-gray-100 text-gray-700 hover:bg-gray-50 md:border-0 md:hover:bg-transparent md:hover:text-primary-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-white",
      },
      disabled: {
        on: "text-gray-400 hover:cursor-not-allowed dark:text-gray-600",
        off: "",
      },
    },
    toggle: {
      base: "inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600",
      icon: "h-6 w-6 shrink-0",
      title: "sr-only",
    },
  },
});

export default function CustomNavbar() {
  const navigate = useNavigate();

  const scrollTo = (id) => {
    navigate("/"); // kembali ke halaman utama
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100); // beri waktu render App.jsx dulu
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Navbar fluid rounded className="sticky top-0 z-50 border-b-2">
        <NavbarBrand
          href="/"
          className="flex justify-center items-center rounded-2xl pe-2"
        >
          <img
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdTh2c2VhZHRnd2hjNmhjZW0wbHprZWhyOWl3ZnY3aTV0NTRtdjBseiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ZJPSFNLmADueHvzoZ8/giphy.gif"
            alt=""
            width={50}
            className="rounded-full"
          />
          <span className="whitespace-nowrap text-md font-semibold dark:text-white ms-2">
            CariMovie
          </span>
        </NavbarBrand>

        <NavbarToggle />

        <NavbarCollapse>
          <NavbarLink onClick={() => scrollTo("home")}>Home</NavbarLink>
          <NavbarLink onClick={() => scrollTo("about")}>Film</NavbarLink>
          <NavbarLink onClick={() => scrollTo("services")} disabled>
            Services
          </NavbarLink>
          <NavbarLink onClick={() => scrollTo("pricing")} disabled>
            Pricing
          </NavbarLink>
          <NavbarLink onClick={() => scrollTo("contact")}>Contact</NavbarLink>
        </NavbarCollapse>
      </Navbar>
    </ThemeProvider>
  );
}
