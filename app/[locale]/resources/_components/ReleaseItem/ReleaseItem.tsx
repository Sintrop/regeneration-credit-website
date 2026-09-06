import { ReleaseProps } from "@/types/github";
import { TType } from "@/types/t";
import { format } from "date-fns";
import { SystemItemDownload } from "./SystemItemDownload";
import Link from "next/link";

interface Props {
  t: TType;
  release: ReleaseProps;
  latest?: boolean;
  apk?: boolean;
}

export function ReleaseItem({ t, release, latest, apk }: Props) {
  return (
    <div className="p-6 rounded-2xl border border-line bg-surface w-full flex flex-wrap justify-between">
      <div className="flex flex-col w-full md:max-w-[50%]">
        <div className="flex items-center gap-3">
          <h4 className="text-2xl">{release?.name}</h4>

          {latest && (
            <span className="px-3 py-1 rounded-full bg-brand-tint text-xs font-medium text-brand-deep">
              {t("latest")}
            </span>
          )}
        </div>
        <p className="text-ink-soft text-xs mt-1">
          {format(new Date(release?.created_at), "yyyy/MM/dd - kk:mm")}
        </p>
        <p className="text-sm text-ink-soft mt-3 md:max-w-[80%]">
          {release?.body}
        </p>
      </div>

      <div className="flex flex-col w-full md:max-w-[50%] mt-10 md:mt-0">
        <h4 className="text-xl text-center lg:text-start">{t("download")}</h4>
        <div className="flex flex-wrap gap-5 justify-center mt-5 lg:mt-1 lg:justify-start">
          {apk ? (
            <SystemItemDownload
              t={t}
              assets={release.assets}
              system="androidApk"
            />
          ) : (
            <>
              <SystemItemDownload
                t={t}
                assets={release.assets}
                system="windows"
              />

              <SystemItemDownload
                t={t}
                assets={release.assets}
                system="linux"
              />

              <SystemItemDownload
                t={t}
                assets={release.assets}
                system="macosarm"
              />

              {/* <SystemItemDownload t={t} assets={release.assets} system="macosx86" /> */}
            </>
          )}
        </div>

        <Link
          href={release.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-center mt-3 text-sm text-brand-deep underline"
        >
          {t("clickHereToSeeAllVersions")}
        </Link>
      </div>
    </div>
  );
}
