function Card3({
    heading,
    description,
    thumbnailSrc,
    thumbnailAlt = "Thumbnail",
    className,
  }) {
    return (
      <div className={`rounded-lg p-6 shadow-sm ${className}`}>
        <div className="overflow-hidden rounded-lg">
          <img
            className="w-full cursor-pointer transition duration-200 ease-in-out transform hover:scale-110 rounded-lg h-auto"
            src={thumbnailSrc}
            alt={thumbnailAlt}
          />
        </div>
        <h3 className="pt-5 text-[14px] font-normal text-gray-600 block">
          {heading}
        </h3>
        <p className="font-normal text-gray-500 cursor-pointer text-lg duration-300 transition hover:text-[#FA5252] mt-2">
          {description}
        </p>
      </div>
    );
  }
  
function Card3Presentation() {
    return (
    <div className="mt-7">
        <div className="flex justify-center items-center mt-5">
            <hr className="flex-grow border-t border-gray-300"></hr>
            <h1 className="text-blue-950 mb-5 font-sans sm:text-4xl tracking-tight sm:leading-none px-4 text-center text-lg font-bold">Popular Courses</h1>
            <hr className="flex-grow border-t border-gray-300"></hr>
        </div>     
      <div className="grid gap-8 grid-cols-1 border-dotted sm:grid-cols-2 md:grid-cols-3 p-3 sm:p-8">
        <Card3
          className="bg-[#fcf4ff]"
          heading="Heading"
          description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam euismod volutpat."
          thumbnailSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXW9Oz8O-4s8NOulSnuxB2d2S5re_wqTGfSg&usqp=CAU"
        />
        <Card3
          className="bg-[#fefaf0]"
          heading="Heading"
          description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam euismod volutpat."
          thumbnailSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXW9Oz8O-4s8NOulSnuxB2d2S5re_wqTGfSg&usqp=CAU"
        />
        <Card3
          className="bg-[#f3faff]"
          heading="Heading"
          description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam euismod volutpat."
          thumbnailSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXW9Oz8O-4s8NOulSnuxB2d2S5re_wqTGfSg&usqp=CAU"
        />
        </div>
      </div>
    );
  }
  
export default  Card3Presentation;