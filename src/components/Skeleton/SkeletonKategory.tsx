import ContentLoader from "react-content-loader"

const SkeletonKategory = () => (
    <ContentLoader
        speed={0.5}
        width={114}
        height={47}
        viewBox="0 0 114 47"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <rect x="-2" y="3" rx="0" ry="0" width="94" height="45" />
    </ContentLoader>
)

export default SkeletonKategory
