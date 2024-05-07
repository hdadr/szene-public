import { useEffect, useState } from "react";

const useLocalJsonData = <T>(jsonFilePath: string): T | T[] | null => {
  const [jsonData, setJsonData] = useState<T | T[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(jsonFilePath);

        if (!response.ok) {
          throw new Error(`Failed fetching data from ${jsonFilePath}.`);
        }
        
        const data = await response.json();
        setJsonData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setJsonData(null);
      }
    };

    fetchData();
  }, [jsonFilePath]);

  return jsonData;
};

export default useLocalJsonData;
