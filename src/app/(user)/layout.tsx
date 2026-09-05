import Footer from "../feature/shared/footer/Footer";
import Navbar from "../feature/shared/navbar/Navbar";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-sand">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}