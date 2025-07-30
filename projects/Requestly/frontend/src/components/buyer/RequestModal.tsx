import React, { useState, useContext } from "react";
import { X, MapPin, DollarSign, FileText } from "lucide-react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { categories } from "../../data/categories";
import { CategoryType } from "../../types";

interface RequestModalProps {
  onClose: () => void;
  initialData?: Partial<Request>;
  isEdit?: boolean;
}

export default function RequestModal({
  onClose,
  initialData,
  isEdit,
}: RequestModalProps) {
  const { state, dispatch } = useContext(AppContext);
  const user = state.currentUser;

  const [formData, setFormData] = useState({
    category: initialData?.category || "food",
    title: initialData?.title || "",
    description: initialData?.description || "",
    budget: initialData?.budget?.toString() || "",
    location: initialData?.location || user?.location?.address || "",
  });
  const [loading, setLoading] = useState(false);
  // handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEdit && (initialData?._id || initialData?.id)) {
        await axios.put(
          `${import.meta.env.VITE_BASE_URL}/api/requests/${initialData?._id || initialData?.id}`,
          {
            title: formData.title,
            description: formData.description,
            category: formData.category,
            budget: Number(formData.budget),
            location: formData.location,
          },
          {
            headers: { Authorization: `Bearer ${user?.token}` },
          }
        );
      } else {
        // Create request (existing code)
        const res = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/requests`,
          {
            title: formData.title,
            description: formData.description,
            category: formData.category,
            budget: Number(formData.budget),
            location: formData.location,
          },
          {
            headers: { Authorization: `Bearer ${user?.token}` },
          }
        );
      }

      // Re-fetch requests
      const reqRes = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/requests/mine`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      // Normalize _id to id
      const normalizedRequests = reqRes.data.map((r: any) => ({
        ...r,
        id: r._id,
      }));
      dispatch({ type: "SET_REQUESTS", payload: normalizedRequests });

      setLoading(false);
      onClose();
    } catch (error: any) {
      setLoading(false);
      // Optionally show error message to user
      alert(error.response?.data?.error || "Failed to save request");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg transform transition-all max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {isEdit ? "Edit" : "Create New"} Request
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Category
            </label>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, category: category.id })
                  }
                  className={`p-4 rounded-xl border-2 transition-all ${
                    formData.category === category.id
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="text-2xl mb-2">{category.emoji}</div>
                  <div className="text-sm font-medium text-gray-900">
                    {category.name}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What do you need?
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="e.g., Fresh pizza delivery, Car rental for weekend"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
              rows={3}
              placeholder="Provide more details about what you're looking for..."
              required
            />
          </div>

          {/* Budget */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Budget
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="number"
                value={formData.budget}
                onChange={(e) =>
                  setFormData({ ...formData, budget: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter your budget"
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter your location"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {loading
              ? "Saving Request..."
              : isEdit
              ? "Update Request"
              : "Post Request"}
          </button>
        </form>
      </div>
    </div>
  );
}
