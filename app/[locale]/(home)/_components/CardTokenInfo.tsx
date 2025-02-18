
interface Props{
    label: string;
    value: number;
}
export async function CardTokenInfo({label, value}: Props){
    return(
        <div className="px-10 py-4 rounded-[20px] bg-green-primary">
            <p className="font-bold text-white text-2xl">{Intl.NumberFormat('pt-BR').format(value)}</p>
            <p className="text-white">{label}</p>
        </div>
    )
}