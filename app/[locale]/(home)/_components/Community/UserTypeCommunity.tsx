import { Button } from "@/components/ui/button";
import Image from "next/image";

import ProducerImage from "@/public/assets/img/producer.png";
import InspectorImage from "@/public/assets/img/inspector.png";
import ResearcherImage from "@/public/assets/img/researcher.png";
import DeveloperImage from "@/public/assets/img/developer.png";
import ContributorImage from "@/public/assets/img/contributors.png";
import ActivistImage from "@/public/assets/img/activists.png";
import SupporterImage from "@/public/assets/img/supporter.png";
import { TType } from "@/types/t";
import { getUsersImages } from "@/services/getCommunityImages";

interface Props {
  userType: UserTypeToDataType;
  t: TType;
}
export async function UserTypeCommunity({ userType, t }: Props) {
  const data = mapUserTypeToData[userType];
  const images = await getUsersImages({ userType });

  return (
    <div
      className="w-full flex flex-col items-center gap-5 justify-between rounded-[30px] p-5 bg-users-community lg:flex-row"
      data-aos="fade-up"
    >
      <div className="flex flex-col items-center gap-5 md:flex-row">
        {userType === 1 ? (
          <UsersImages images={images} />
        ) : (
          <Image
            src={data?.image}
            alt="image user"
            quality={100}
            className="w-[180px] h-[180px] rounded-[30px] object-cover"
          />
        )}

        <div className="flex flex-col gap-3">
          <h4 className="font-bold text-3xl">{t(data?.title)}</h4>
          <p className="text-lg">{t(data?.description)}</p>
        </div>
      </div>

      <Button className="hidden bg-transparent rounded-[40px] h-[50px] px-10 border-2 border-green-primary text-black">
        Ver comunidade
      </Button>
    </div>
  );
}

interface UsersImagesProps {
  images: string[];
}
function UsersImages({ images }: UsersImagesProps) {
  return (
    <div className="flex flex-wrap w-[182px] h-[175px] gap-0 rounded-2xl bg-gray-300 overflow-hidden">
      {images.map((item, index) => (
        <Image
          key={item}
          src={item}
          width={200}
          height={200}
          className="object-cover w-[86px] h-[86px] border border-white"
          alt={`image user ${index}`}
          quality={100}
        />
      ))}
    </div>
  );
}

const mapUserTypeToData = {
  1: {
    title: "community.regenerators",
    description: "community.descRegenerators",
    image: ProducerImage,
  },
  2: {
    title: "community.inspectors",
    description: "community.descInspectors",
    image: InspectorImage,
  },
  3: {
    title: "community.researchers",
    description: "community.descResearchers",
    image: ResearcherImage,
  },
  4: {
    title: "community.developers",
    description: "community.descDevelopers",
    image: DeveloperImage,
  },
  5: {
    title: "community.contributors",
    description: "community.descContributors",
    image: ContributorImage,
  },
  6: {
    title: "community.activists",
    description: "community.descActivists",
    image: ActivistImage,
  },
  7: {
    title: "community.supporters",
    description: "community.descSupporters",
    image: SupporterImage,
  },
};
type UserTypeToDataType = keyof typeof mapUserTypeToData;
