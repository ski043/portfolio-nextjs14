import { Card } from "@/components/ui/card";
import me from "../../public/jan.jpg";
import Image from "next/image";
export function AboutSection() {
  return (
    <div className="grid gird-cols-1 lg:grid-cols-3 gap-4 mt-10">
      <Card className="col-span-1 lg:col-span-2 border-none bg-gray-100 p-8">
        <h1 className="text-4xl lg:text-6xl">
          Passionate versitile Web Developer who loves to create
        </h1>
        <p className="mt-4 text-muted-foreground lg:text-lg">
          I am a software engineer with a passion for creating efficient and
          user-friendly web applications. I have experience in developing
          scalable and maintainable web applications using modern technologies
          and frameworks. I am passionate about creating innovative and
          user-friendly solutions that solve real-world problems.
        </p>

        <a
          href="mailto:jan@alenix.de"
          className="relative inline-block text-lg group mt-5"
        >
          <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
            <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
            <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
            <span className="relative">Get in Touch!</span>
          </span>
          <span
            className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
            data-rounded="rounded-lg"
          ></span>
        </a>
      </Card>

      <div className="col-span-1">
        <Image
          src={me}
          alt="Jan marshal"
          className="h-[500px] object-cover rounded-lg w-full"
        />
      </div>
    </div>
  );
}
