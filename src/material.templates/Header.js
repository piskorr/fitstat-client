export const Header = ({title}) => {
    return (
        <header>
            <h1>My Activities</h1>
            <h2>{title}</h2>
        </header>
    )
}

Header.defaultProps = {
    title: 'activity'
}

export default Header
