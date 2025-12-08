import Sidebar from "./Sidebar";

const DashboardLayout = ({ children, role }) => {
  return (
    <div className="min-h-screen bg-amber-50 flex">
      {/* Sidebar dinámico */}
      <Sidebar role={role} />

      {/* Contenido principal */}
      <main className="flex-1 p-6 md:p-10">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
