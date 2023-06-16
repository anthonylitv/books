import bookApi from "../../services/bookApi"
import "./styles/KategoryContainer.scss"
import Kategory from "./Kategory"
import SkeletonKategory from "../Skeleton/SkeletonKategory"

const KategoryContainer = () => {
    const { data, isLoading } = bookApi.useFetchBookQuery("")

    const kategories = data?.kategories.map((item) => (
        <Kategory key={item.id} id={item.id} kategory={item.kategory} />
    ))

    return (
        <div className="kategories">
            {isLoading
                ? [...new Array(6)].map((_, index) => (
                      <SkeletonKategory key={index} />
                  ))
                : kategories}
        </div>
    )
}

export default KategoryContainer
