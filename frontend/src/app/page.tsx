import Image from "next/image";
import styles from "./page.module.css";
import { useAppSelector } from "@/store/store";
import { redirect } from "next/navigation";

export const Home: React.FC = () => {
  redirect("/auth");
};

export default Home;
