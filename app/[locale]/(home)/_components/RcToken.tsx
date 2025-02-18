import { CardTokenInfo } from './CardTokenInfo';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { TType } from '@/types/t';

interface Props {
    t: TType;
}
export async function RcToken({t}: Props) {
    return (
        <section className="flex flex-col py-10 lg:py-20">
            <h3 className='text-3xl font-bold uppercase text-center'>{t('regenerationCredit')} (RC)</h3>

            <div className='flex flex-col lg:flex-row lg:mt-10'>
                <div className='flex flex-wrap items-center justify-center gap-8 mt-5 w-full lg:justify-start lg:max-w-[50%] lg:border-r lg:py-5'>
                    <CardTokenInfo
                        label='Total Supply'
                        value={1375499899}
                    />
                    <CardTokenInfo
                        label='Type'
                        value={0}
                        erc20
                    />
                    <CardTokenInfo
                        label='Holders'
                        value={45}
                    />
                    <CardTokenInfo
                        label='Total Transfers'
                        value={85}
                    />
                    <CardTokenInfo
                        label='Decimals'
                        value={18}
                    />
                </div>

                <div className='w-full flex flex-col items-center justify-center gap-5 mt-10 lg:mt-0 lg:max-w-[50%] lg:items-end'>
                    <div className='w-36 h-36 bg-red-500 rounded-md'>
                        QR Code
                    </div>
                    <div className='flex gap-2'>
                        <Link
                            href="https://sequoia.sintrop.com/token/0xA2628da7B5C8B9921E52402438c320e03d191275"
                            target='_blank'
                            className='underline text-blue-500'
                        >
                            0xA2628da7B5C8B9921E52402438c320e03d191275
                        </Link>
                    </div>

                    <Button
                        className='rounded-[40] h-[50px] px-10 border-2 text-black border-green-primary bg-transparent'
                    >
                        Add Metamask
                    </Button>
                </div>
            </div>
        </section>
    )
}