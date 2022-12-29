import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
// import { slice } from "lodash";
interface IPaging {
  offset: number;
  limit: number;
  keyword?: string;
  sort?: string;
}

interface IMetaData<S> {
  page: number;
  size: number;
  total: number;
  data: Array<S>;
}
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function useMock<SchemeType>(schemeFunction: () => SchemeType, max: number) {
  const [source, setSource] = useState<Array<SchemeType>>([]);
  useEffect(() => {
    const raw = Array.from(
      { length: max || faker.datatype.number({ min: 100, max: 500 }) },
      (_) => schemeFunction()
    );
    setSource(raw);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [max]);

  const success = async (paging?: IPaging): Promise<IMetaData<SchemeType>> => {
    await delay(3000);
    if (paging) {
      return {
        page: paging.offset,
        size: paging.limit,
        total: source.length,
        data: source.slice(
          paging.limit * paging.offset,
          paging.limit * paging.offset + paging.limit
        ),
      };
    }
    return {
      page: 0,
      size: max,
      total: source.length,
      data: source,
    };
  };

  return { success };
}

export default useMock;
