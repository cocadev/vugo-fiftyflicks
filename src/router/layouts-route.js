import { Switch, Route } from 'react-router-dom'
import Layout1 from '../layouts/backend/layout1'

const LayoutsRoute = () => {
  return (
    <Switch>
      <Route path="/" component={Layout1} />
    </Switch>
  )
}

export default LayoutsRoute