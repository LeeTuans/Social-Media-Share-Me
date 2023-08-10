import { useEffect, useState } from "react";
import { MdDownloadForOffline } from "react-icons/md";
import { Link, useParams } from "react-router-dom";

import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import { getPins } from "../services/pin.service";
import { createComment } from "../services/comment.service";

const PinDetail = ({ user }) => {
  const { pinId } = useParams();
  const [pins, setPins] = useState();
  const [pinDetail, setPinDetail] = useState();
  const [comment, setComment] = useState("");
  const [addingComment, setAddingComment] = useState(false);

  async function fetchPinDetails() {
    return await getPins(pinId)
      .then((res) => {
        setPins(res.data.morePins);
        setPinDetail(res.data.pinDetail);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  useEffect(() => {
    fetchPinDetails();
  }, [pinId]);

  const addComment = async () => {
    if (comment) {
      setAddingComment(true);

      await createComment({
        userId: user._id,
        pinId: pinDetail._id,
        comment,
      })
        .then(() => {
          fetchPinDetails();
          setComment("");
          setAddingComment(false);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  if (!pinDetail) {
    return <Spinner message="Showing pin" />;
  }

  return (
    <>
      {pinDetail && (
        <div
          className="flex xl:flex-row flex-col m-auto"
          style={{ maxWidth: "1500px", borderRadius: "32px" }}
        >
          <div className="flex justify-center items-center md:items-start flex-initial xl:mr-5">
            <img
              className="rounded-t-3xl rounded-2xl "
              src={pinDetail?.image && pinDetail?.image}
              alt="user-post"
            />
          </div>
          <div className="w-full p-5 flex-1 xl:min-w-620 rounded-2xl bg-white">
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center">
                <a
                  href={pinDetail.image}
                  download
                  target={"_blank"}
                  rel="noreferrer"
                  className="bg-secondaryColor p-2 text-xl rounded-full flex items-center justify-center text-dark opacity-75 hover:opacity-100"
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              <a href={pinDetail.destination} target="_blank" rel="noreferrer">
                {pinDetail.destination?.slice(8)}
              </a>
            </div>
            <div>
              <h1 className="text-4xl font-bold break-words mt-3">
                {pinDetail.title}
              </h1>
              <p className="mt-3">{pinDetail.about}</p>
            </div>
            <Link
              to={`/user-profile/${pinDetail?.postBy._id}`}
              className="flex gap-2 mt-5 items-center bg-white rounded-lg "
            >
              <img
                src={pinDetail?.postBy.avatar}
                className="w-10 h-10 rounded-full"
                alt="user-profile"
              />
              <p className="font-bold">{pinDetail?.postBy.name}</p>
            </Link>

            <h2 className="mt-10 text-lg font-bold">
              {pinDetail?.comments?.length} Comments
            </h2>

            {user && (
              <div className="flex flex-wrap mt-4 gap-3">
                <Link to={`/user-profile/${user._id}`}>
                  <img
                    src={user.avatar}
                    className="w-10 h-10 rounded-full cursor-pointer"
                    alt="user-profile"
                  />
                </Link>
                <input
                  className=" flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
                  type="text"
                  placeholder="Add a comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button
                  type="button"
                  className="bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
                  onClick={addComment}
                >
                  {addingComment ? "Doing..." : "Done"}
                </button>
              </div>
            )}

            <div className="max-h-370 max-w-full overflow-y-auto ml-2 w-full">
              {pinDetail?.comments?.map((item) => (
                <div
                  className="flex gap-2 mt-7 bg-white rounded-lg max-w-full"
                  key={item._id}
                >
                  <div className="flex flex-none h-fit gap-2 cursor-pointer">
                    <img
                      src={item.postBy?.avatar}
                      className="w-9 h-9 rounded-full"
                      alt="user-profile"
                    />
                    <div className="font-bold mt-1 truncate hover:underline max-w-[150px]">
                      {item.postBy?.name}
                    </div>
                  </div>

                  <div className="mt-1 break-normal three-dots">
                    {item.comment}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {pins?.length > 0 && (
        <h1 className="font-bold text-2xl mt-8 mb-2 mx-5">More like this:</h1>
      )}
      {pins ? (
        <MasonryLayout pins={pins} />
      ) : (
        <Spinner message="Loading more pins" />
      )}
    </>
  );
};

export default PinDetail;
