
interface Props{
    label: string;
    value: number;
    erc20?: boolean;
}
export async function CardTokenInfo({label, value, erc20}: Props){
    return(
        <div className="px-10 py-4 rounded-[20px] bg-green-primary">
            <p className="font-bold text-white text-2xl">
                {erc20 ? "ERC-20" : Intl.NumberFormat('pt-BR').format(value)}
            </p>
            <p className="text-white">{label}</p>
        </div>
    )
}