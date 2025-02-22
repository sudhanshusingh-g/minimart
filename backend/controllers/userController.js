import User from "../models/user.js"
import { generateToken } from "./authController.js";

// Register a user
export const register = async function (req, res) {
  try {
    const { fullName, email, password, profileImage } = req.body;
    const existingUser= await User.findOne({email});
    if(existingUser){
        return res.status(409).json({
            message:"User already exists."
        });
    };
    const user = await User.create({
      fullName,
      email,
      password,
      profileImage,
    });
    
    res.status(201).json({
        status:"success",
        user:{
            id:user._id,
            name:user.fullName,
            email:user.email,
            profileImage:user.profileImage
        }
    });
  } catch (error) {
    res.status(400).json({
        error:error.message
    })
  }
};

// Getting user
export const login=async function (req,res){
    try {
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(404).json({
                status:"error",
                message:"User does not exist"
            });
        }
        if(!(await user.comparePassword(password))){
            return res.status(401).json({
              status: "error",
              message: "Invalid email or password",
            });
        }
        const token=generateToken(user);
        res.status(200).json({
            status:"success",
            token,
            user:{
                id:user._id,
                fullName:user.fullName,
                email:user.email
            }
        })
    } catch (error) {
        res.status(400).json({
            status:"error",
            message:error.message
        })
    }
}

// Edit user information
export const editProfile=async function(req,res){
    try {
        const userId = req.params.id;
        const { profileImage } = req.body;

        if (!profileImage) {
          return res.status(400).json({
            status: "fail",
            message: "Profile image URL is required",
          });
        }
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          { profileImage },
          { new: true, runValidators: true }
        );
        if (!updatedUser) {
          return res.status(404).json({
            status: "fail",
            message: "User not found",
          });
        }
        res.status(200).json({
          status: "success",
          message: "Profile image updated successfully",
          user: {
            id: updatedUser._id,
            profileImage: updatedUser.profileImage,
          },
        });

    } catch (error) {
        res.status(500).json({
          status: "error",
          message: error.message,
        });
    }
}

// Delete a user
export const deleteUser=async function(req,res){
    try {

    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }
    res.status(200).json({
        status:"success",
        message:"User removed from system",
    })        
    } catch (error) {
        res.status(500).json({
            error:error.message
        });
    }

}
