import { Circles } from "react-loader-spinner";

function Spinner({ message }) {
  return (
    <div className="mt-5 flex flex-col justify-center items-center w-full h-full">
      <Circles
        height="80"
        width="80"
        color="#00BFFF"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
      <p className="text-lg text-center p-5">{message}</p>
    </div>
  );
}

export default Spinner;
