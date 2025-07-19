 export const NoRoomsPlaceholder = ({ message }) => (
  <div className="w-full text-center py-12 text-gray-500">
    <img
      src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
      alt="No Results"
      className="mx-auto mb-4 w-24 h-24 opacity-60"
    />
    <p className="text-lg font-medium">{message}</p>
  </div>
);
