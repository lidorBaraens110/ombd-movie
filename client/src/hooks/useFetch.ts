import { useEffect,useState } from "react";
import { getData } from "../api";
import useDebounce from "./useDebounce";


const useFetch=(url:string,handleEmptyValue:()=>void)=>{
    const debouncedSearchTerm: string = useDebounce<string>(url, 500);
    const [searchResult, setSearchResult] = useState<string[]>([]);
    const [loading,setLoading]=useState(false)
    useEffect(() => {
        const fetchSearchData = async () => {
          console.log('we are fetching')
          setLoading(true);
          const data = await getData(`/${url}`);
            if (data.Search) {
              setSearchResult(data.Search);
            }else{
              setSearchResult([]);
            }
        setLoading(false)
        };
        if (debouncedSearchTerm ) {
          fetchSearchData();
        } else {
          if (debouncedSearchTerm === "") {
            setSearchResult([]);
            handleEmptyValue();
          }
        }
      }, [debouncedSearchTerm]);

    return {searchResult,loading}
}

export default useFetch