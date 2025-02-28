import Link from 'next/link';
import { CardTokenInfo } from './CardTokenInfo';
import { TType } from '@/types/t';
import { QrToken } from './QrToken';
import { getTokenData } from '@/services/getTokenData';
import { AddTokenToMetamask } from './AddTokenToMetamask';

interface Props {
    t: TType;
}
export async function RcToken({ t }: Props) {
    const {success, token} = await getTokenData();

    return (
        <section className="flex flex-col py-10 lg:py-20">
            <h3 className='text-3xl font-bold uppercase text-center'>{t('regenerationCredit')} ({process.env.NEXT_PUBLIC_RCTOKEN_SYMBOL})</h3>

            <div className='flex flex-col lg:flex-row lg:mt-10'>
                <div className='flex flex-wrap items-center justify-center gap-8 mt-5 w-full lg:justify-start lg:max-w-[50%] lg:border-r lg:py-5'>
                    {success ? (
                        <>
                            <CardTokenInfo
                                label={t('totalSupply')}
                                value={token?.total_supply}
                            />
                            <CardTokenInfo
                                label={t('type')}
                                value={0}
                                erc20
                            />
                            <CardTokenInfo
                                label={t('holders')}
                                value={token?.holders}
                            />
                            <CardTokenInfo
                                label={t('totalTransfers')}
                                value={token?.transfers_count}
                            />
                            <CardTokenInfo
                                label={t('decimals')}
                                value={token?.decimals}
                            />
                        </>
                    ) : (
                        <div>
                            <p>{t('errorGetDataToken')}</p>
                        </div>
                    )}
                </div>

                <div className='w-full flex flex-col items-center justify-center gap-5 mt-10 lg:mt-0 lg:max-w-[50%] lg:items-end'>
                    <h4>{t('accessTheToken')}</h4>
                    <QrToken />

                    <Link
                        href={`${process.env.NEXT_PUBLIC_URL_EXPLORER}/token/${process.env.NEXT_PUBLIC_ADDRESS_RCTOKEN}`}
                        target='_blank'
                        className='underline text-blue-500 max-w-[100%] truncate text-ellipsis overflow-hidden text-right'
                    >
                        {process.env.NEXT_PUBLIC_ADDRESS_RCTOKEN}
                    </Link>


                    <AddTokenToMetamask />
                </div>
            </div>
        </section>
    )
}