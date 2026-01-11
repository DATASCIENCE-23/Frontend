import { motion } from "framer-motion";

export default function AnimatedCard({ children }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white p-5 rounded-xl shadow"
    >
      {children}
    </motion.div>
  );
}
