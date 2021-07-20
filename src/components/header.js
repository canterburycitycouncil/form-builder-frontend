import {Typography, Toolbar, IconButton, AppBar} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const Header = (props) => {

    const toggleMenu = open => {
        props.onToggleMenu(open);
    }

    return (
        <header>
            <AppBar color="primary" position="static">
            <Toolbar>
                <IconButton edge="start" color="secondary" onClick={e => toggleMenu(true)}>
                    <MenuIcon color="secondary" />
                </IconButton>
                <Typography variant="h2">{props.title}</Typography>
            </Toolbar>
            </AppBar>
        </header>
    )
}

export default Header;