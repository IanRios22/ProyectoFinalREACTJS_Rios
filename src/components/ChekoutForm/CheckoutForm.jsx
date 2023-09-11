import { useState } from "react";

const CheckoutForm = ({ onConfirm }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleConfirm = (event) => {
    event.preventDefault();
    const userData = {
      name,
      phone,
      email,
    };
    onConfirm(userData);
  };

  return (
    <div className="bg-slate-100 shadow-md p-4 rounded-md m-4">
      <form onSubmit={handleConfirm}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Nombre
          </label>
          <input
            className="w-full px-3 py-2 rounded-md border focus:outline-none focus:border-blue-500"
            type="text"
            id="name"
            value={name}
            onChange={({ target }) => setName(target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phone"
          >
            Teléfono
          </label>
          <input
            className="w-full px-3 py-2 rounded-md border focus:outline-none focus:border-blue-500"
            type="number"
            id="phone"
            value={phone}
            onChange={({ target }) => setPhone(target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="w-full px-3 py-2 rounded-md border focus:outline-none focus:border-blue-500"
            type="email"
            id="email"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            placeholder="email@gmail.com"
            required
          />
        </div>
        <div className="text-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            type="submit"
          >
            Crear Orden
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
