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
    <div className="flex flex-wrap items-center justify-center rounded-md bg-blue-500 p-4 text-sm text-white">
      <div className="w-48 lg:w-56">
        <Image src={imageSrc} alt={altText} width={224} height={250} />
        <h4 className="pt-4 pb-2 text-base font-semibold">{title}</h4>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
}
