import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import { filterPins, getPins } from "../services/pin.service";

const Feed = () => {
  const [pins, setPins] = useState();
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);

    if (categoryId) {
      filterPins({ categoryId })
        .then((res) => {
          setPins(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      getPins()
        .then((res) => {
          setPins(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [categoryId]);

  const ideaName = categoryId || "new";
  if (loading) {
    return (
      <Spinner message={`We are adding ${ideaName} ideas to your feed!`} />
    );
  }

  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
};

export default Feed;
