import Image from "next/image";

interface DepartmentCardProps {
  title: string;
  imageSrc: string;
  altText: string;
  description: string;
}

export default function DepartmentCard({
  title,
  imageSrc,
  altText,
  description,
}: DepartmentCardProps) {
  return (
        <div className="group h-80 w-76 [perspective:1000px] overflow-hidden">
          {/* Flipping Container */}
          <div className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
            
            {/* Front Side */}
            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-md bg-blue-500 p-4 text-white [backface-visibility:hidden]">
              <div className="w-full h-2/3 flex justify-center items-center ">
                <Image
                  src={imageSrc}
                  alt={altText}
                  width={224}
                  height={250}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <h4 className="pt-8 pb-2 text-2xl font-bold text-center">{title}</h4>
            </div>

            {/* Back Side */}
            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-md p-4 bg-blue-500 text-white [transform:rotateY(180deg)] [backface-visibility:hidden]">
              <h4 className="pt-4 pb-2 text-xl font-semibold text-center">{description}</h4>
            </div>

          </div>
        </div>
    
  );
}
