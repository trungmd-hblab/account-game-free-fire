export const metadata = {
  title: "Website đang bảo trì",
};

export default function MaintenancePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f7f7f7] px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">🛠️</div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Website đang bảo trì
        </h1>
        <p className="text-gray-500">
          Vui lòng quay lại sau. Xin lỗi vì sự bất tiện này!
        </p>
      </div>
    </main>
  );
}
