export default function ExploreCard(props: {
    image: string;
    name: string;
    age: number;
    isOnline: boolean;
    location: string;
    searchMethod: string;
}) {
    return (
        <div className="relative w-[343px] h-[420px]">
            <img src={props.image} alt="ExploreCard" className="rounded-t-[16px] absolute w-full h-full -z-10" />
           <div className="w-full flex items-center justify-end p-[16px]">
             <p className="bg-brand-yellow text-xs font-medium max-w-fit px-[8px] py-[4px] rounded-[16px]">
                 {props.searchMethod}
             </p>
           </div>
            <div>
                
            </div>
        </div>
    )
} 