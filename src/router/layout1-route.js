import {Switch,Route,useLocation} from 'react-router-dom'
import {TransitionGroup,CSSTransition} from "react-transition-group";
import UserProfile from '../views/backend/app/usermanagement/userprofile'
import UserAccountSettingList from '../views/backend/app/usermanagement/useraccountsetting'
import AddMovie from '../views/backend/movie/add-movie';
import MovieList from '../views/backend/movie/movie-list';
import ShowList from '../views/backend/show/show-list';
import Homepage from '../views/backend/home/home'
import Video from '../views/backend/pages/video';
import SignUp from '../views/backend/pages/auth/signup';
import Login from '../views/backend/pages/auth/login';
import recoverPswd from '../views/backend/pages/auth/recover-pswd';

const Layout1Route = () => {

    let location = useLocation();

    return (
        <TransitionGroup>
            <CSSTransition
            // key={location.key}
            classNames="fade"
            timeout={300}
            >
                <Switch  location={location}>
                   
                    <Route path="/manage-profile"           component={UserProfile} />
                    <Route path="/profile"                  component={UserAccountSettingList} />
                    <Route path="/movie-details"            component={AddMovie}/>
                    <Route path="/movie-category"           component={MovieList}/>

                    <Route path="/watch-video/:titleId"      component={Video} />
                    <Route path="/signup"          component={SignUp} />
                    <Route path="/login"            component={Login} />
                    <Route path="/recover-pswd"     component={recoverPswd} />
                    <Route path="/titles/:id"   exact          component={ShowList}/>

                    <Route path="/" exact                   component={Homepage}/>

                </Switch>
            </CSSTransition>
        </TransitionGroup>
    )
}

export default Layout1Route