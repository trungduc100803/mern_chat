import './DiscoveryLayout.scss'

function DiscoveryLayout({ sidebar, inner }) {
    return <div className="DiscoveryLayout">
        <div className="discoveryLayout_sidebar">
            {sidebar}
        </div>
        <div className="discoveryLayout_inner">
            {inner}
        </div>
    </div>
}

export default DiscoveryLayout;