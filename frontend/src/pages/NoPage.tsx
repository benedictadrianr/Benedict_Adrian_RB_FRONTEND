import notFound from "../assets/error.png";

export default function NoPage() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <img src={notFound} alt="" />
    </div>
  );
}
