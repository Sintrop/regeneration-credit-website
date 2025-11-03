import { AssetReleaseProps } from "@/types/github";
import Link from "next/link";
import WindowsIcon from "@/public/assets/icons/win.png";
import LinuxIcon from "@/public/assets/icons/linux.png";
import MacosIcon from "@/public/assets/icons/macos.png";
import AndroidIcon from "@/public/assets/icons/android.png";
import Image from "next/image";
import { TType } from "@/types/t";

interface Props {
  system: SystemNames;
  assets: AssetReleaseProps[];
  t: TType;
}
export function SystemItemDownload({ system, assets, t }: Props) {
  const systemData = systemToData[system];

  let linkDownload = "";

  const filterAssets = assets.find(
    (item) =>
      item.name.includes(systemData?.archiveIncludeName) &&
      !item.name.includes("sha256")
  );
  if (filterAssets) {
    linkDownload = filterAssets.browser_download_url;
  }

  return (
    <Link
      href={linkDownload}
      target="_blank"
      rel="noopener noreferer"
      className="w-[120px] h-[150px] bg-green-primary rounded-md flex flex-col items-center justify-center p-2"
    >
      <Image
        alt="icon operation system"
        src={systemData?.image}
        height={50}
        width={50}
      />

      <p className="text-white mt-3 text-center">{t(systemData?.label)}</p>
      {system === "macosarm" && (
        <p className="text-gray-300 text-xs mt-[-5px] text-center">
          arm version
        </p>
      )}
      {system === "macosx86" && (
        <p className="text-gray-300 text-xs mt-[-5px] text-center">
          intel version
        </p>
      )}
    </Link>
  );
}

const systemToData = {
  windows: {
    label: "windows",
    image: WindowsIcon,
    archiveIncludeName: ".exe",
  },
  linux: {
    label: "linux/ubuntu",
    image: LinuxIcon,
    archiveIncludeName: ".snap",
  },
  macosarm: {
    label: "macos",
    image: MacosIcon,
    archiveIncludeName: ".dmg",
  },
  macosx86: {
    label: "macos",
    image: MacosIcon,
    archiveIncludeName: ".dmg",
  },
  androidApk: {
    label: "Android/APK",
    image: AndroidIcon,
    archiveIncludeName: ".apk",
  },
};

type SystemNames = keyof typeof systemToData;
