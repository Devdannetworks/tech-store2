import Blog from "./Blog";
import image2 from "../Images/pexels-photo-10949677.jpeg";
import image3 from "../Images/pexels-photo-16004744.webp";
import image4 from "../Images/1696101027010.jpeg";
import HeadersComp from "../../Components/Headers";

const Blogs: React.FC = () => {
  const BlogsContent = [
    {
      date: "16 Feb  2024",
      author: "Dannetworks",
      image: image3,
      description:
        "Is it worth switching from android to iphone. Maybe or maybe not",
    },
    {
      date: "16 Feb  2024",
      author: "Dannetworks",
      image: image2,
      description: "10 essential home gadgets you should already have",
    },
    {
      date: "16 Feb  2024",
      author: "Dannetworks",
      image: image4,
      description: "How you can monetize starlink to earn passive income",
    },
  ];
  return (
    <div>
      <div>
        <HeadersComp label="BLOGS" />
      </div>

      <div className=" ">
        <div className="flex flex-col sm:flex-row justify-between w-full gap-4">
          {BlogsContent.map((blog, index) => (
            <Blog
              date={blog.date}
              author={blog.author}
              description={blog.description}
              image={blog.image}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
