import React from 'react';
import { Redirect } from 'react-router-dom';
import {useAppSelector} from '../hooks/type';
export interface IAuthRouteProps { }
// const auth = JSON.parse(localStorage.getItem('currentUser') as string);
// export default function PrivateRoute({
//     component: Component,
//     ...rest
//   }: {
//     component: any;
//     exact?: boolean;
//     path: string;
//   }): JSX.Element {
//     return (
//       <Route
//         {...rest}
//         render={({ location, ...routeProps }) => {
//           if (!auth?.currenUser)
//             return (
//               <Redirect to={{ pathname: '/login', state: { from: location } }} />
//             );
  
//           return <Component {...routeProps} />;
//         }}
//       />
//     );
//   }
export const PrivateRoute: React.FunctionComponent<IAuthRouteProps> = props => {
  const userInfo = useAppSelector((state)=>state.user);
  const { children } = props;

  if (!userInfo?.currentUser)
  {
      return <Redirect to="/login" />;
  }

  return (
      <div>{children}</div>
  );
}

  