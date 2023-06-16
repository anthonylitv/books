import KategoryContainer from "../components/Main/KategoryContainer"
import BookContainer from "../components/Main/BookContainer"
import Sorter from "../components/Main/Sorter"
import "./styles/Main.scss"

const Main = () => {
    return (
        <section className="main">
            <div className="container">
                <div className="kategories-sorter">
                    <KategoryContainer />
                    <Sorter />
                </div>
                <BookContainer />
            </div>
        </section>
    )
}

export default Main
