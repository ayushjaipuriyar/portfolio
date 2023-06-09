import React from "react";

interface Props {
  title: String;
}

const SectionTitle = ({ title }: Props) => {
  return (
    <h2 className="font-titleFont text-2xl font-semibold flex items-center">
      <span className="text-base md:text-lg text-textLight mr-2">{title}</span>
      <span className="hidden md:inline-flex md:w-60 lg:w-72 h-[.5px] bg-gray-700 ml-6" />
    </h2>
  );
};

export default SectionTitle;
