import './Header.css';

function Header() {
    return (
        <>
        <header>
        <a href="#" className="logo">Macroly Nutritional Tool</a>
        <nav>
            <a href="">Meal Search</a>
            <a href="#Coming Soon">Coming Soon</a>
            <a href="#contact">Contact</a>
        </nav>
        <button class="cta">Get Premium Features</button>
        </header>
        </>
    );
}

export default Header;