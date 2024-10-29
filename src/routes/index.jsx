import {useRoutes} from 'react-router-dom'
import MainRoutes from './mainRoutes';

const ThemeRoutes = () => {
    const routes = useRoutes([MainRoutes]);
    return routes;
};

export default ThemeRoutes;
