import { CardTokenInfo } from "./CardTokenInfo";
import { TType } from "@/types/t";
import { QrToken } from "./QrToken";
import { AddTokenToMetamask } from "./AddTokenToMetamask";
import { rcService } from "@/domain/RegenerationCredit/rcService";

interface Props {
  t: TType;
}
export async function RcToken({ t }: Props) {
  const { circulatingSupply, totalCertified, totalSupply } =
    await rcService.getTokenData();

  return (
    <section className="flex flex-col py-10 lg:py-20">
      <h3 className="text-3xl font-bold uppercase text-center">
        {t("regenerationCredit")} (RC)
      </h3>

      <div className="flex flex-col lg:flex-row lg:mt-10">
        <div className="flex flex-wrap items-center justify-center gap-8 mt-5 w-full lg:justify-start lg:max-w-[50%] lg:border-r lg:py-5">
          {true ? (
            <>
              <CardTokenInfo label={t("totalSupply")} value={totalSupply} />
              <CardTokenInfo
                label={t("circulatingSupply")}
                value={circulatingSupply}
              />
              <CardTokenInfo
                label={t("totalCertified")}
                value={totalCertified}
              />
            </>
          ) : (
            <div>
              <p>{t("errorGetDataToken")}</p>
            </div>
          )}
        </div>

        <div className="w-full flex flex-col items-center justify-center gap-5 mt-10 lg:mt-0 lg:max-w-[50%] lg:items-end">
          <h4>{t("accessTheToken")}</h4>
          <QrToken />

          <p>{process.env.NEXT_PUBLIC_ADDRESS_RCTOKEN}</p>

          <AddTokenToMetamask />
        </div>
      </div>
    </section>
  );
}
