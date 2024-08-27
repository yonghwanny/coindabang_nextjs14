import Login from '../app/login/page';
import { auth } from '../config/firebase';

export default function ProtectedRoute ({children,}: {children: React.ReactNode;}) {

  const user = auth.currentUser; 
  if(!user) {
    return <Login />;
  }

  return children;
}