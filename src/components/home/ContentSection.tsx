import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

const IMAGE_STYLE = "w-full md:w-full xl:w-[588px]";

export default function ContentSection({
  image,
  children,
  align,
}: {
  image: StaticImport;
  children: React.ReactNode;
  align: "left" | "right";
}) {
  return (
    <section className="w-full p-4 md:p-6 xl:p-[138px] xl:flex xl:flex-row xl:justify-center">
      <div className="bg-content-section-background w-full md:w-full xl:w-[988px] flex flex-col md:flex-col xl:flex-row justify-between">
        {align === "left" ? (
          <>
            <Image src={image} alt="컨텐츠 이미지" className={IMAGE_STYLE} />
            <div className="w-full xl:flex xl:justify-center">{children}</div>
          </>
        ) : (
          <>
            <div className="w-full xl:flex xl:justify-center">{children}</div>
            <Image src={image} alt="컨텐츠 이미지" className={IMAGE_STYLE} />
          </>
        )}
      </div>
    </section>
  );
}
