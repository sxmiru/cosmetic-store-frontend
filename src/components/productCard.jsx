export default function ProductCard(props) {
  console.log(props);

  return (
    <div className="max-w-sm bg-white shadow-lg rounded-xl overflow-hidden transition-transform transform hover:scale-105 border border-gray-200">
      <img 
        src={props.image} 
        alt={props.name || "Product Image"} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h1 className="text-xl font-semibold text-gray-800 mb-2">{props.name}</h1>
        <p className="text-gray-600 text-lg mb-4">Price: <span className="font-medium text-black">{props.price}</span></p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
          View More
        </button>
      </div>
    </div>
  );
}
