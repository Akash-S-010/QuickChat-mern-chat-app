import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import { Axios } from "axios";


export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    // ----Check a user is authenticated or not----
    checkAuth: async () => {

        try {

            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data })
        } catch (error) {

            console.log("Error in checkAuth", error);
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    },


    // ----Signup a user----
    signup: async (data) => {
        set({ isSigningUp: true })

        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data })
            toast.success("Signed Up Successfully")

        } catch (error) {
            toast.error(error.response.data.message)

        }finally{
            set({ isSigningUp: false })
        }
    },

    // ----Login a user----
    login: async (data) => {
        set({ isLoggingIn: true })

    try {
        
        const res = await axiosInstance.post("/auth/login", data);
        set({ authUser: res.data });
        toast.success("Login Successfully");
    } catch (error) {
        toast.error(error.response.data.message);
    }finally{
        set({ isLoggingIn: false })
    }
    },

    // ----Logout a user----
    logout: async()=>{
        try {
            
            await axiosInstance.post("/auth/logout");
            set({authUser:null});
            toast.success("Logout Successfully");

        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    // ----Profile update ----
    updateProfile: async (data) => {
        set((state) => ({ ...state, isUpdatingProfile: true })); // Ensure state is updated properly
    
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            set((state) => ({ ...state, authUser: res.data })); // Merge state correctly
            toast.success("Profile Updated Successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
            console.log(error);
        } finally {
            set((state) => ({ ...state, isUpdatingProfile: false })); // Reset loading state
        }
    }
    
})) 