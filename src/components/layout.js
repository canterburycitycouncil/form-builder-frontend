import React, { useState } from 'react';
import Header from './header';
import routes from '../routes';
import {Container, List, ListItem, ListItemText, ListItemIcon, Drawer } from '@material-ui/core';
import ListIcon from '@material-ui/icons/List';
import { NavLink, withRouter } from 'react-router-dom';

const Layout = ({title, children}) => {
    const [state, setState] = useState({
        menuOpen: false
    });

    const toggleMenu = (open) => {
      console.log(open, state.menuOpen);
      if(open !== state.menuOpen){
        setState({
          ...state,
          menuOpen: open
        });
      }
    }
    return (
        <React.Fragment>
            <Drawer open={state.menuOpen} onClose={e => toggleMenu(false)}>
              <List component="nav" >
                {routes.map(route => {
                    if(route.inMenu){
                        return (
                            <NavLink to={route.path} key={route.path} onClick={sessionStorage.removeItem('currentForm')}>
                                <ListItem button>
                                    <ListItemIcon><route.icon></route.icon></ListItemIcon>
                                    <ListItemText primary={route.menuName} color="primary"></ListItemText>
                                </ListItem>
                            </NavLink>
                        )
                    }
                    return '';
                })}
              </List>
            </Drawer>
            <Header title={title} onToggleMenu={toggleMenu} />
            <Container maxwidth="xl">
                {children}
            </Container>
        </React.Fragment>
    )
}

export default withRouter(Layout);