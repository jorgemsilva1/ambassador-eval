"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useStore from "@/store/store";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(5, "Address must be at least 5 characters"),
});

const ProfileForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { userProfile, updateUser } = useStore();

  type ProfileFormData = z.infer<typeof profileSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: userProfile, 
  });

  const onSubmit = (data: ProfileFormData) => {
    updateUser(data); 
    onClose(); 
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          {...register("name")}
          className="border p-2 w-full"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email" 
          type="email"
          {...register("email")}
          className="border p-2 w-full"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="address">Address:</label>
        <input
          id="address" 
          type="text"
          {...register("address")}
          className="border p-2 w-full"
        />
        {errors.address && (
          <p className="text-red-500 text-sm">{errors.address.message}</p>
        )}
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onClose}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
