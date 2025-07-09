import "./ClientReg.css";
import { useEffect, useState } from "react";
import { data, Link } from "react-router-dom";
import Load from "../../../USER/ReuseableComponents/Loaders/Load";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import ClientTable from "./Clientcomp/ClientTable";

const ClientReg = () => {
  const [page, setPage] = useState(1);
  const limit = 20;

  const {
    data: clients,
    error,
    loading,
    refetch,
  } = useAxiosFetch(
    `/admin/getAllClientRegisterations?page=${page}&limit=${limit}`
  );
  console.log(clients);
  
  return (
    <>
      {loading ? (
        <Load type="load" />
      ) : error ? (
        <Load type="err" />
      ) : clients?.length > 0 ? (
        <div className="clientreg-tablecon">
          <ClientTable
            data={clients}
            page={page}
            total={clients.total}
            limit={limit}
            onPageChange={setPage}
          />
        </div>
      ) : (
        <Load type="nojobs" />
      )}
    </>
  );
};

export default ClientReg;
