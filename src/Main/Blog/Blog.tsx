interface props {
  description: string;
  date: string;
  author: string;
  image: string;
}

const Blog: React.FC<props> = ({ description, author, date, image }) => {
  return (
    <div className="relative z-[-1] grid shadow-xl shadow-slate-200 rounded-sm h-full max-h-[500px] w-full md:w-[400px] cursor-pointer">
      <img
        src={image}
        alt="Blog one"
        className="w-full object-cover aspect-square  h-full max-h-[350px] min-h-[200px]"
      />

      <div className="shadow-2xl shadow-white bg-white overflow-hidden rounded-sm">
        <p className="p-5 rounded-sm font-mono  text-sm">{description}</p>
        <div className="text-sm w-full flex h-10 px-1 justify-between items-center bg-slate-600 text-white">
          <p className="">{date}</p>
          <hr className="w-[0.5px] h-5 bg-white" />
          <p className=" ">{author}</p>
        </div>
      </div>
    </div>
  );
};

export default Blog;
