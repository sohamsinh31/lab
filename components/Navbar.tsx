/* eslint-disable */
import { useEffect, useState } from "react";
import { fetchData } from "./services/CallAPI";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

// Example Navbar data type
type NavbarData = {
  label: string;
  href: string;
  dropdown?: {
    label: string;
    href: string;
  }[];
};

type Service = {
  id: number;
  name: string;
  description: string;
  imageurl: string;
};

const Navbar = ({ data }: { data: NavbarData[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [isMounted, setIsMounted] = useState(false);
  const [foundServices, setFoundServices] = useState<Service[]>([]);
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { data: session, status } = useSession();
  const su = session?.user; // Directly accessing the user object here

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // Dynamic mapping for user dropdown
  const generateUserDropdown = () => {
    if (!su) return [];

    const userDropdownItems: { label: string; href: string }[] = [
      { label: "Manage Account", href: "/account" },
      { label: "LogOut", href: "/auth/logout" },
    ];

    // Dynamically add user properties to dropdown (e.g., email, roles, etc.)
    if (su.email) {
      userDropdownItems.push({ label: `Email: ${su.email}`, href: "#" });
    }
    // Return the final dropdown structure
    return userDropdownItems;
  };

  const ldata: NavbarData = su
    ? {
        label: su.name || "User", // Provide a default value if su.name is null or undefined
        href: "#",
        dropdown: generateUserDropdown(),
      }
    : { label: "Login", href: "/auth/login" };

  const [navbarData, setNavbarData] = useState<NavbarData[]>(data);

  useEffect(() => {
    setNavbarData((prevData) => [...prevData, ldata]);
  }, [ldata]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = (label: string) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [label]: !prevState[label],
    }));
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);

    if (searchTerm.trim() === "") {
      setFoundServices([]); // Clear dropdown when input is empty
      return;
    }

    try {
      const services = await fetchData(
        `${process.env.NEXT_PUBLIC_JWS_URL}/api/services/find/${searchTerm}`
      );
      setFoundServices(services || []);
    } catch (error) {
      console.error("Error fetching services:", error);
      setFoundServices([]); // Reset on error
    }
  };

  const handleServiceClick = () => {
    setFoundServices([]); // Close dropdown when a service is clicked
    setQuery(""); // Clear search box
  };

  if (!isMounted) {
    return null; // Avoid rendering mismatched UI during server-side rendering
  }

  return (
    <nav className="bg-gray-800 p-4 w-full shadow-lg">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-white font-bold text-lg">
          <a href="/">
            <img src="/tlabs.png" width="75px" alt="tlabs logo" />
          </a>
        </div>
        <div className="relative hidden md:block">
          <input
            onChange={handleInputChange}
            value={query}
            className="bg-gray-700 text-white w-64 px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            name="search"
            placeholder="Search here"
          />
          {/* Dropdown for found services */}
          {foundServices.length > 0 && (
            <div className="absolute left-0 w-72 mt-2 bg-gray-700 rounded-md shadow-lg z-20">
              <ul className="py-2">
                {foundServices.map((service) => (
                  <li
                    key={service.id}
                    className="hover:bg-gray-600 p-2 cursor-pointer"
                    onClick={handleServiceClick}
                  >
                    <a
                      href={`/services/${service.id}`}
                      className="block text-white"
                    >
                      <div className="flex">
                        <img
                          className="h-12 w-12 object-cover"
                          src={service.imageurl}
                          alt={service.name}
                        />
                        <div className="ml-2">
                          <p className="font-bold">{service.name}</p>
                          <p className="text-sm text-gray-300">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="hidden md:flex space-x-6">
          {data.map((item) => (
            <div key={item.label} className="relative group">
              {!item.dropdown ? (
                <a href={item.href} className="text-white hover:text-gray-400">
                  {item.label}
                </a>
              ) : (
                <div>
                  <button
                    className="text-white hover:text-gray-400 flex items-center"
                    onClick={() => toggleDropdown(item.label)}
                  >
                    {item.label}
                    <span className="ml-2">
                      {dropdownOpen[item.label] ? (
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 15l7-7 7 7"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      )}
                    </span>
                  </button>
                  {dropdownOpen[item.label] && (
                    <div className="absolute mt-2 bg-gray-700 rounded-md shadow-lg z-10">
                      <ul className="py-2">
                        {item.dropdown.map((dropdownItem) => (
                          <li
                            key={dropdownItem.label}
                            className="hover:bg-gray-600 p-2"
                          >
                            <a
                              href={dropdownItem.href}
                              className="block text-white hover:text-gray-400"
                            >
                              {dropdownItem.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="md:hidden flex items-center">
          <button
            className="text-white focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
