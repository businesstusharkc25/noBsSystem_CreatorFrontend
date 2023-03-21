"use client";
import queryString from "query-string";

import { useEffect, useState } from "react";

const useUrlQuery = () => {
  const [parsedQueryObject, setParsedQueryObject] = useState();

  useEffect(() => {
    setParsedQueryObject(queryString.parse(location.search));
  }, [location.href, location.search]);

  return { parsedQueryObject };
};

export default useUrlQuery;
