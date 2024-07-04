import clsx from "clsx";
import Footer from "../footer";
import Header from "../header";
import "./style.scss";

interface Props {
  children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
  return (
    <div className="bg-neutral-background flex flex-col min-h-screen">
      <Header />
      <div className={clsx("flex-1 relative")}>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
