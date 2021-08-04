import Home from './pages/home';
import Forms from './pages/forms';
import Form from './pages/form';
import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List';
import Submission from './pages/submission';


const routes = [
    {
        inMeu: false,
        path: '/admin/forms/add',
        component: Forms,
        adminRoute: true
    },
    {
        inMenu: false,
        path: '/admin/forms/:id',
        component: Forms,
        adminRoute: true
    },
    {
        inMenu: true,
        path: '/admin/forms',
        component: Forms,
        menuName: 'Forms',
        icon: ListIcon,
        adminRoute: true
    },
    {
        inMenu: false,
        path: '/admin/submissions/:id',
        component: Submission,
        adminRoute: true
    },
    {
        inMenu: false,
        path: '/forms/:id',
        component: Form,
        adminRoute: false
    },
    {
        inMenu: true,
        path: '/',
        component: Home,
        menuName: 'Home',
        icon: HomeIcon,
        exact: true,
        adminRoute: true
    }
]

export default routes;