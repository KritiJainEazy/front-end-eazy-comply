import ProfileIcon from "../../../assets/profile-icon-profile-menu.png";
import SettingsIcon from "../../../assets/setting-icon-profile-menu.png";
import SignOutIcon from "../../../assets/sign-out-icon-profile-menu.png";
export const userName = "John Doe";
export const userEmail = "johndoe@xyz.com";

export const profileActionMenu = [
  {
    logo: ProfileIcon,
    title: "Profile",
    profileMenuAction: () => {
      console.log("Profile");
    },
  },
  {
    logo: SettingsIcon,
    title: "Settings",
    profileMenuAction: () => {
      console.log("Settings");
    },
  },
  {
    logo: SignOutIcon,
    title: "Sign Out",
    profileMenuAction: () => {
      console.log("Sign Out");
    },
  },
];
