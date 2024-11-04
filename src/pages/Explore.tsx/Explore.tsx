import ExploreCard from "../../components/layout/Explore/ExploreCard";
import CardImage from "../../assets/img/Explore/CardImage.svg";

export default function Explore() {
  return (
    <div>
      <ExploreCard
        image={CardImage}
        name="سحر رضایی"
        age={24}
        isOnline={false}
        location="گلستان گرگان"
        searchMethod="تصادفی"
      />
    </div>
  );
}
