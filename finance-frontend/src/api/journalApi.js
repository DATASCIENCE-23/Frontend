import axios from "axios";
const BASE = "http://localhost:8000/journal";

export const getJournals = () => axios.get(BASE);
export const createJournal = (data) => axios.post(BASE, data);
