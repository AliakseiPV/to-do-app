import { useSelector } from "react-redux/es/hooks/useSelector";

export const useAuth = () => {
	const auth = useSelector(state => state.auth.value)
	return { auth }
}