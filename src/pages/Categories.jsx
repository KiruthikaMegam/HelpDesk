import { useState } from "react";

import { useHelpdesk } from "../context/HelpdeskContext";

import ConfirmModal from "../components/ConfirmModal";

import "./Categories.css";

function Categories() {
  const {
    categories,
    tickets,
    addCategory,
    deleteCategory,
  } = useHelpdesk();

  const [name, setName] = useState("");

  const [deleteItem, setDeleteItem] =
    useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name.trim()) {
      return;
    }

    const success = addCategory(name.trim());

    if (success) {
      setName("");
    }
  };

  return (
    <div className="categories-page page-animation">
      <div className="page-heading">
        <div>
          <span className="page-eyebrow">
            ORGANIZATION
          </span>

          <h1>Ticket Categories</h1>

          <p>
            Organize customer requests into support
            categories.
          </p>
        </div>
      </div>

      <div className="categories-layout">
        <section className="category-create-card">
          <div className="category-card-icon">
            +
          </div>

          <h3>Create Category</h3>

          <p>
            Add a new category for classifying
            incoming support tickets.
          </p>

          <form onSubmit={handleSubmit}>
            <label>Category Name</label>

            <input
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              placeholder="Example: Refund"
            />

            <button
              type="submit"
              className="primary-button"
            >
              Add Category
            </button>
          </form>
        </section>

        <section className="category-list-card">
          <div className="category-list-heading">
            <div>
              <h3>Available Categories</h3>

              <p>
                {categories.length} categories
                configured
              </p>
            </div>
          </div>

          <div className="category-list">
            {categories.map(
              (category, index) => {
                const count = tickets.filter(
                  (ticket) =>
                    ticket.category === category
                ).length;

                return (
                  <div
                    className="category-row"
                    key={category}
                  >
                    <div
                      className={`category-icon category-color-${
                        (index % 5) + 1
                      }`}
                    >
                      {category[0]}
                    </div>

                    <div className="category-name">
                      <strong>{category}</strong>

                      <span>
                        {count} support ticket
                        {count !== 1 && "s"}
                      </span>
                    </div>

                    <div className="category-count">
                      {count}
                    </div>

                    <button
                      className="category-delete"
                      onClick={() =>
                        setDeleteItem(category)
                      }
                    >
                      ×
                    </button>
                  </div>
                );
              }
            )}
          </div>
        </section>
      </div>

      <ConfirmModal
        open={Boolean(deleteItem)}
        title="Delete category?"
        message={`Remove "${deleteItem}" from the available ticket categories? Existing ticket data will not be changed.`}
        confirmText="Delete Category"
        onCancel={() => setDeleteItem(null)}
        onConfirm={() => {
          deleteCategory(deleteItem);

          setDeleteItem(null);
        }}
      />
    </div>
  );
}

export default Categories;