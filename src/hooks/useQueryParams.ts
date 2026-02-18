import {
  parseAsInteger,
  parseAsJson,
  parseAsString,
  useQueryStates,
} from "nuqs";

type SortItem = {
  id: string;
  desc: boolean;
};

const createQueryParams = () => {
  const [params, setParams] = useQueryStates({
    search: parseAsString.withDefault(""),
    page: parseAsInteger.withDefault(1),
    sort: parseAsJson<SortItem[]>((value) => {
      if (!Array.isArray(value)) return null;
      return value.every(
        (item) => typeof item.id === "string" && typeof item.desc === "boolean",
      )
        ? value
        : null;
    }).withDefault([{ id: "createdAt", desc: true }]),
    limit: parseAsInteger.withDefault(15),
  });

  return { params, setParams };
};

export const useQueryParams = () => {
  const { params, setParams } = createQueryParams();
  const queryParams = {
    search: params.search,
    page: params.page,
    sort: params.sort,
    limit: params.limit,
  };

  const handleUpdateQuery = (newParams: Partial<typeof queryParams>) => {
    void setParams(newParams);
  };

  return { queryParams, handleUpdateQuery };
};

// export const useQueryParams = () => {
//   const router = useRouter();

//   const parseSortFromQuery = (): SortItem[] => {
//     const sortParam = router.query.sort;
//     if (!sortParam) return [{ id: "createdAt", desc: true }];

//     try {
//       const parsed = JSON.parse(sortParam as string);
//       return Array.isArray(parsed) ? parsed : [{ id: "createdAt", desc: true }];
//     } catch {
//       return [{ id: "createdAt", desc: true }];
//     }
//   };

//   const queryParams = {
//     search: (router.query.search as string) || "",
//     page: Number(router.query.page) || 1,
//     sort: parseSortFromQuery(),
//     limit: Number(router.query.limit) || 15,
//   };

//   const handleUpdateQuery = (newParams: Partial<typeof queryParams>) => {
//     const queryToUpdate = { ...router.query };

//     if (newParams.sort) {
//       queryToUpdate.sort = JSON.stringify(newParams.sort);
//     }

//     if (newParams.search !== undefined) queryToUpdate.search = newParams.search;
//     if (newParams.page !== undefined)
//       queryToUpdate.page = String(newParams.page);
//     if (newParams.limit !== undefined)
//       queryToUpdate.limit = String(newParams.limit);

//     void router.push(
//       {
//         pathname: router.pathname,
//         query: queryToUpdate,
//       },
//       undefined,
//       { scroll: false },
//     );
//   };

//   return { queryParams, handleUpdateQuery };
// };
