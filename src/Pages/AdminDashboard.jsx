import React, { useEffect, useState } from "react";
import Container from "../component/Container";
import { toast } from "react-toastify";
import axios from "axios";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);


  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    color: "",
    category: "",
    subcategory: "",
    imageFile: null,
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://backend-api-1-m4ak.onrender.com/api/v1/Product/getallproduct");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm((s) => ({ ...s, imageFile: files[0] }));
    } else {
      setForm((s) => ({ ...s, [name]: value }));
    }
  };

  // Create product (multipart/form-data)
 const handleCreate = async (e) => {
  e.preventDefault();

  try {
    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("description", form.description);
    fd.append("price", form.price);
    fd.append("color", form.color);
    fd.append("category", form.category); 
    fd.append("subcategory", form.subcategory);

    if (form.imageFile) fd.append("image", form.imageFile);

    for (let [k, v] of fd.entries()) console.log(k, v);

    const res = await axios.post(
      "https://backend-api-1-m4ak.onrender.com/api/v1/Product/createproduct",
      fd,
      {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      }
    );

    toast.success("Product created successfully!");
    fetchProducts();
    setShowCreate(false);
  } catch (err) {
    console.error("Create Product Error:", err.response?.data || err.message);
    toast.error(err.response?.data?.error || "Failed to create product");
  }
};




  // Start editing
  const openEdit = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name || "",
      description: product.description || "",
      price: product.price || "",
      color: product.color || "",
      category: product.category || "",
      subcategory: product.subcategory || "",
      imageFile: null,
    });
    setShowEdit(true);
  };

  // Update product 
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("description", form.description);
      fd.append("price", form.price);
      fd.append("color", form.color || "");
      fd.append("category", form.category || "");
      fd.append("subcategory", form.subcategory || "");
      if (form.imageFile) fd.append("image", form.imageFile);

      // Use PUT with multipart if backend accepts; else send JSON (adjust accordingly)
      await axios.put(`https://backend-api-1-m4ak.onrender.com/api/v1/Product/updateProduct/${editingProduct._id}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      toast.success("Product updated");
      setShowEdit(false);
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      await axios.delete(
        `https://backend-api-1-m4ak.onrender.com/api/v1/Product/deleteProduct/${id}`,
        {
          withCredentials: true,
        }
      );
      toast.success("Deleted");
      fetchProducts();
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  return (
    <section className="py-8">
      <Container>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button
            onClick={() => setShowCreate(true)}
            className="px-4 py-2 bg-black text-white rounded"
          >
            + Create Product
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((p) => (
              <div key={p._id} className="border p-4 rounded">
                <img src={p.image} alt={p.name} className="h-40 w-full object-cover mb-2" />
                <h3 className="font-semibold">{p.name}</h3>
                <p className="text-sm text-gray-600">{p.description}</p>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => openEdit(p)} className="px-3 py-1 bg-blue-600 text-white rounded">Edit</button>
                  <button onClick={() => handleDelete(p._id)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>

      {/* Create Modal */}
      {showCreate && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
          <form onSubmit={handleCreate} className="bg-white p-6 rounded w-full max-w-lg">
            <h2 className="text-lg font-bold mb-4">Create Product</h2>

            <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
            <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
            <input name="price" placeholder="Price" value={form.price} onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
            <input name="color" placeholder="Color" value={form.color} onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
            <input name="category" placeholder="CategoryId or Name" value={form.category} onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
            <input name="subcategory" placeholder="SubcategoryId or Name" value={form.subcategory} onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
            <input type="file" onChange={(e) => setForm({ ...form, imageFile: e.target.files[0] })} className="mb-4" />


            <div className="flex gap-3">
              <button type="submit" className="px-4 py-2 bg-black text-white rounded">Create</button>
              <button type="button" onClick={() => setShowCreate(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Modal */}
      {showEdit && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
          <form onSubmit={handleUpdate} className="bg-white p-6 rounded w-full max-w-lg">
            <h2 className="text-lg font-bold mb-4">Edit Product</h2>

            <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
            <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
            <input name="price" placeholder="Price" value={form.price} onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
            <input name="color" placeholder="Color" value={form.color} onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
            <input name="category" placeholder="CategoryId or Name" value={form.category} onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
            <input name="subcategory" placeholder="SubcategoryId or Name" value={form.subcategory} onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
            <input type="file" name="image" onChange={handleChange} className="mb-4" />

            <div className="flex gap-3">
              <button type="submit" className="px-4 py-2 bg-black text-white rounded">Update</button>
              <button type="button" onClick={() => setShowEdit(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}
