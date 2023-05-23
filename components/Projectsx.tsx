import React from "react";
import Image from "next/image";
import { RxOpenInNewWindow } from "react-icons/rx";
import { TbBrandGithub } from "react-icons/tb";
import { logo } from "@/public/assets";
interface RepositoryLanguage {
  name: string;
}

interface Props {
  name: string;
  description: string | null;
  url: string;
  languages: RepositoryLanguage[];
  tags: RepositoryLanguage[];
  website: string | null;
}
const Projectsx = ({
  name,
  description,
  url,
  languages,
  website,
  tags,
}: Props) => {
  return (
    <div className="w-full flex flex-col items-Center justify-center gap-28 mt-10">
      <div className="flex flex-col xl:flex-row gap-6">
        <a
          href={url}
          target="_blank"
          className="w-full xl:w-1/2 h-auto relative group"
        >
          <div className="w-full flex flex-col items-center justify-between gap-28 mt-10"></div>
        </a>
        <div className="w-full xl:w-1/2 flex flex-col gap-6 lg:justify-between items-end text-right xl:-ml-16 z-10">
          <p className="font-titleFont text-textGreen text-sm tracking-wide">
            Featured Projects
          </p>
          <h3 className="text-2xl font-bold">{name}</h3>
          <p className="bg-[#112240] text-sm md:test-base p-2 md:p-6 rounded-md">
            {description}
          </p>
          <ul className="text-xs md:text-sm font-titleFont tracking-wide flex gpa-2 md:gap-5 justify-between text-textDark">
            {languages &&
              languages.map((language, index) => (
                <li key={index}>{language.name}</li>
              ))}
          </ul>
          <ul className="text-xs md:text-sm font-titleFont tracking-wide flex gpa-2 md:gap-5 justify-between text-textDark">
            {tags && tags.map((tag, index) => <li key={index}>{tag.name}</li>)}
          </ul>
          <div className="text-2xl flex gap-4">
            <a
              className="hover:text-textGreen duration-300"
              href={url}
              target="_blank"
            >
              <TbBrandGithub />
            </a>
            <a
              className="hover:text-textGreen duration-300"
              href={website == null ? "#" : website}
              target="_blank"
            >
              <RxOpenInNewWindow />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projectsx;