import ExploreCard from "../../components/layout/Explore/ExploreCard";
import CardImage from "../../assets/img/Explore/CardImage.svg"

export default function Explore() {
    return (
        <div>
            <ExploreCard image={CardImage} name="asd" age={23} isOnline={true} location="asd" searchMethod="تصادفی" />
        </div>
    )
}