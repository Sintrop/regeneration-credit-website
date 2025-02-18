import { UserTypeCommunity } from "./UserTypeCommunity";

export async function Community(){
    return(
        <section className="flex flex-col py-10 lg:py-20">
            <h3 className="font-bold text-3xl">Comunidade</h3>
            <p className="text-lg mt-5">A comunidade é composta por diferentes grupos com funções específicas:</p>

            <div className="flex flex-col gap-10 mt-10">
                <UserTypeCommunity userType={1}/>
                <UserTypeCommunity userType={2}/>
                <UserTypeCommunity userType={3}/>
                <UserTypeCommunity userType={4}/>
                <UserTypeCommunity userType={5}/>
                <UserTypeCommunity userType={6}/>
                <UserTypeCommunity userType={7}/>
            </div>
        </section>
    )
}