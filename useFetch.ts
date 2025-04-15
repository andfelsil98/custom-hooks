import { useEffect, useState } from "react"
import { PokeApi } from "../interfaces/pokeapi.interface";
interface ResponseObj {
  data: PokeApi,
  isLoading: boolean,
  hasError: boolean,
  errorMessage: {
    code?: number,
    message?: string
  }
}


const localCache: {[key:string]: PokeApi} = {};
export const useFetch = (url: string) => {
  const responseObj: ResponseObj =  {
    data: {},
    isLoading: true,
    hasError: false,
    errorMessage: {}
  };
  const [state, setState] = useState(responseObj);

  useEffect(() => {
    getFetch();
  }, [url]);

  const setLoadingState = () => {
    setState({
      data: {},
      isLoading: true,
      hasError: false,
      errorMessage: {}
    })
  };

  const getFetch = async () => {
    if (localCache[url]){
      console.log("usando cache");
      setState({
        data: localCache[url],
        isLoading: false,
        hasError: false,
        errorMessage: {}
      })
      return;      
    }

    setLoadingState();
    const response = await fetch(url);
    if (!response.ok) {
      setState({
        data: {}, 
        isLoading: false,
        hasError: true,
        errorMessage: {
          code: response.status,
          message: response.statusText
        }
      });
      return;
    }

    const data = await response.json();
    setState({
      data,
      isLoading: false,
      hasError: false,
      errorMessage: {}
    })
    console.log({data});
    localCache[url] = data;
  }
  
  return {
    data: state.data,
    isLoading: state.isLoading,
    hasError: state.hasError
  };
}
