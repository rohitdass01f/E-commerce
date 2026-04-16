import { useEffect, useState } from "react";
import "./adminCategory.css";

const AdminCategory = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [parent, setParent] = useState("");
  const [isSub, setIsSub] = useState(false);
  const [error, setError] = useState("");

  const token = (localStorage.getItem("token"));

  const fetchCategories = async () => {
    const res = await fetch("https://e-commerce-2tio.onrender.com/category");
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const addCategory = async () => {
    if (!newCategory.trim()) return;

    await fetch("https://e-commerce-2tio.onrender.com/category", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newCategory,
        parent: parent || null,
      }),
    });

    setNewCategory("");
    setParent("");
    fetchCategories();
  };

  const deleteCategory = async (id) => {
    const res = await fetch(`https://e-commerce-2tio.onrender.com/category/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    setCategories(categories.filter((c) => c._id !== id));
  };

  return (
    <div className="admin-category">
      <h2>Manage Categories</h2>

      <div className="category-add-box">
        <input
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Category name"
        />

        <button onClick={addCategory}>Add</button>
      </div>

      <label className="sub-toggle">
        <input
          type="checkbox"
          checked={isSub}
          onChange={(e) => {
            setIsSub(e.target.checked);
            if (!e.target.checked) setParent("");
          }}
        />
          This is a sub-category
      </label>

      {isSub && (
        <div className="parent-select">
          <select value={parent} onChange={(e) => setParent(e.target.value)}>
            <option value="">Select Parent Category</option>

            {categories
              .filter((c) => !c.parent)
              .map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
          </select>
        </div>
      )}

      {error && <p className="category-error">{error}</p>}

      <table className="category-table">
        <thead>
          <tr>
            <th>Main Category</th>
            <th>Sub Categories</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {categories
            .filter((c) => !c.parent)
            .map((main) => (
              <tr key={main._id}>
                <td className="main-cat">{main.name}</td>

                <td>
                  <div className="sub-cat-list">
                    {categories
                      .filter(
                        (sub) =>
                          sub.parent && sub.parent.toString() === main._id,
                      )
                      .map((sub) => (
                        <span key={sub._id} className="sub-pill">
                          {sub.name}
                        </span>
                      ))}
                  </div>
                </td>

                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteCategory(main._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCategory;
