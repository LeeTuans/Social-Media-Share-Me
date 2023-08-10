import { useEffect, useState } from "react";

import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import { filterPins } from "../services/pin.service";

const Search = ({ searchTerm, isSearched, setIsSearched }) => {
  const [pins, setPins] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isSearched) {
      setLoading(true);

      filterPins({ search: searchTerm })
        .then((res) => {
          setPins(res.data);
          setLoading(false);
          setIsSearched(false);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [searchTerm, isSearched]);

  return (
    <div>
      {loading ? (
        <Spinner message="Searching pins" />
      ) : (
        pins?.length !== 0 && <MasonryLayout pins={pins} />
      )}
      {pins?.length === 0 && searchTerm !== "" && !loading && (
        <div className="mt-10 text-center text-xl ">No Pins Found!</div>
      )}
    </div>
  );
};

export default Search;
