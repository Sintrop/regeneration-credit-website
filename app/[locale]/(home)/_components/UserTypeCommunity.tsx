import { Button } from '@/components/ui/button';
import Image from 'next/image';

import ProducerImage from '@/public/assets/img/producer.png';
import InspectorImage from '@/public/assets/img/inspector.png';
import ResearcherImage from '@/public/assets/img/researcher.png';
import DeveloperImage from '@/public/assets/img/developer.png';
import ContributorImage from '@/public/assets/img/contributors.png';
import ActivistImage from '@/public/assets/img/activists.png';
import SupporterImage from '@/public/assets/img/supporter.png';

interface Props{
    userType: UserTypeToDataType;
}
export async function UserTypeCommunity({userType}: Props){
    const data = mapUserTypeToData[userType];

    return(
        <div className='w-full flex flex-col items-center gap-5 justify-between rounded-[30px] p-5 bg-users-community lg:flex-row'>
            <div className='flex items-center gap-5'>
                <Image
                    src={data?.image}
                    alt='image user'
                    quality={100}
                    className='w-[180px] h-[180px] rounded-[30px] object-cover'
                />

                <div className='flex flex-col gap-3'>
                    <h4 className='font-bold text-3xl'>{data?.title}</h4>
                    <p className='text-lg'>{data?.description}</p>
                </div>
            </div>

            <Button
                className='bg-transparent rounded-[40px] h-[50px] px-10 border-2 border-green-primary text-black'
            >
                Ver comunidade
            </Button>
        </div>
    )
}

const mapUserTypeToData = {
    1 : {
        title: 'regenerators',
        description: 'Seja recompensado pelo serviço de regeneração de ecossistemas terrestres',
        image: ProducerImage,
    },
    2 : {
        title: 'inspectors',
        description: 'Seja recompensado pelo serviço de regeneração de ecossistemas terrestres',
        image: InspectorImage,
    },
    3 : {
        title: 'researchers',
        description: 'Seja recompensado pelo serviço de regeneração de ecossistemas terrestres',
        image: ResearcherImage,
    },
    4 : {
        title: 'developers',
        description: 'Seja recompensado pelo serviço de regeneração de ecossistemas terrestres',
        image: DeveloperImage,
    },
    5 : {
        title: 'contributors',
        description: 'Seja recompensado pelo serviço de regeneração de ecossistemas terrestres',
        image: ContributorImage,
    },
    6 : {
        title: 'activists',
        description: 'Seja recompensado pelo serviço de regeneração de ecossistemas terrestres',
        image: ActivistImage,
    },
    7 : {
        title: 'supporters',
        description: 'Seja recompensado pelo serviço de regeneração de ecossistemas terrestres',
        image: SupporterImage,
    }
}
type UserTypeToDataType = keyof typeof mapUserTypeToData;