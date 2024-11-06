"use client";

import { useState } from "react";
import useStore from "@/store/store";
import ProfileForm from "./ProfileForm";
import ProductInventoryDisplay from "../Product/ProductInventoryDisplay";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { inventory } = useStore();
  const [activeTab, setActiveTab] = useState<"profile" | "inventory">(
    "profile"
  );

  const handleClose = () => {
    onClose();
    setActiveTab("profile");
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleClose}
    ><button>
    </button>
      <div
        className="bg-white p-6 rounded w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
        style={{ minHeight: "400px" }}
      >
        <div className="flex justify-center items-center border-b pb-2 mb-4">
          <button
            className={`text-xl font-bold cursor-pointer px-2 ${
              activeTab === "profile" ? "text-gray-900" : "text-gray-400"
            }`}
            onClick={() => setActiveTab("profile")}
            aria-selected={activeTab === "profile"}
            role="tab"
          >
            Edit Profile
          </button>
          <span className="text-gray-400">|</span>

          <button
            className={`text-xl font-bold cursor-pointer px-2 ${
              activeTab === "inventory" ? "text-gray-900" : "text-gray-400"
            }`}
            onClick={() => setActiveTab("inventory")}
            aria-selected={activeTab === "inventory"}
            role="tab"
          >
            Product Inventory
          </button>
        </div>

        <div className="h-full overflow-y-auto">
          {activeTab === "profile" ? (
            <ProfileForm onClose={onClose} />
          ) : (
            <ProductInventoryDisplay inventory={inventory} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
