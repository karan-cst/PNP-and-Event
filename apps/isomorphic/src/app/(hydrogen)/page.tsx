// import FileDashboard from '@/app/shared/file/dashboard';
import { metaObject } from '@/config/site.config';
import Home from './dashboard/page';

export const metadata = {
  ...metaObject(),
};

export default function FileDashboardPage() {
  // return <>Hello</>;
  return <Home />;
}
