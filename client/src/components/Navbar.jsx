import { Link, useNavigate } from "react-router-dom";
import { IoMdAdd, IoMdSearch } from "react-icons/io";

const Navbar = ({ searchTerm, setSearchTerm, setIsSearched, user }) => {
  const navigate = useNavigate();

  const submitSearch = () => {
    if (searchTerm.trim()) {
      setIsSearched(true);
      navigate(`/search`);
    }
  };

  if (user) {
    return (
      <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7">
        <div className="flex justify-start items-center w-full shadow-sm px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm">
          <IoMdSearch
            fontSize={21}
            className="ml-1 cursor-pointer"
            onClick={submitSearch}
          />
          <input
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
            value={searchTerm}
            className="p-2 w-full bg-white outline-none"
          />
        </div>
        <div className="flex gap-3 ">
          <Link to={`user-profile/${user?._id}`} className="hidden md:block">
            <img
              src={user.avatar}
              alt="user-pic"
              className="w-14 h-12 rounded-full"
            />
          </Link>
          <Link
            to="/create-pin"
            className="bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center"
          >
            <IoMdAdd />
          </Link>
        </div>
      </div>
    );
  }

  return null;
};

export default Navbar;
