import { Outlet } from "react-router-dom";
import ScreenWrapper from "../components/common/ScreenWrapper";
import Header from "../components/home/Header";
const MainLayout = () => {
  return (
    <ScreenWrapper>
        <Header auth={false} />
      <main>
        <Outlet />
      </main>
    </ScreenWrapper>
  );
};
export default MainLayout;
