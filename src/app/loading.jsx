export default function LoadingSpinner() {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-70 flex items-center justify-center z-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
}
