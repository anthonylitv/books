import ContentLoader from "react-content-loader"

const SkeletonBookItem = () => (
    <ContentLoader
        speed={0.5}
        width={312}
        height={500}
        viewBox="0 0 312 500"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <rect x="38" y="306" rx="0" ry="0" width="228" height="35" />
        <rect x="42" y="374" rx="0" ry="0" width="41" height="20" />
        <rect x="208" y="374" rx="0" ry="0" width="55" height="22" />
        <rect x="104" y="374" rx="0" ry="0" width="41" height="22" />
        <rect x="37" y="418" rx="0" ry="0" width="107" height="35" />
        <rect x="162" y="419" rx="0" ry="0" width="105" height="35" />
        <circle cx="148" cy="151" r="131" />
    </ContentLoader>
)

export default SkeletonBookItem
