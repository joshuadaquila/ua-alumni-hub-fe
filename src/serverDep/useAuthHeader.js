import axios from 'axios';
import useToken from './useToken';
import { useEffect } from 'eact';

const useAuthHeader = () => {
  const [token, setToken] = useToken();

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]); // run effect when token changes

  return axios.defaults.headers.common;
};

export default useAuthHeader;