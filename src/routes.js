import Home from './pages/home';
import Forms from './pages/forms';
import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List';


const routes = [
    {
        inMeu: false,
        pasth: '/forms/add',
        component: Forms
    },
    {
        inMenu: false,
        path: '/forms/:id',
        component: Forms,
    },
    {
        inMenu: true,
        path: '/forms',
        component: Forms,
        menuName: 'Forms',
        icon: ListIcon
    },
    {
        inMenu: true,
        path: '/',
        component: Home,
        menuName: 'Home',
        icon: HomeIcon,
        exact: true
    }
]

export default routes;