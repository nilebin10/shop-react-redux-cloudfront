import API_PATHS from "~/constants/apiPaths";
import ProductsTable from "~/components/pages/admin/PageProductImport/components/ProductsTable";
import CSVFileImport from "~/components/pages/admin/PageProductImport/components/CSVFileImport";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import AlertTitle from '@mui/material/AlertTitle';
import { Link } from "react-router-dom";
import { useCallback, useState } from "react";

export default function PageProductImport() {  

  const [error, setError] = useState<any>(null);

  const setErrorCB = useCallback((err:any) => {
    setError(err)
  }, []);

  return (
    <Box py={3}>
      {error ? (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {error?.text}
      </Alert>
      ): ''}
      <Box mb={2} display="flex" justifyContent="space-between">
        <CSVFileImport
          url={`${API_PATHS.import}/import`}
          title="Import Products CSV"
          setErrorCB={setErrorCB}
        />
        <Button
          size="small"
          color="primary"
          variant="contained"
          sx={{ alignSelf: "end" }}
          component={Link}
          to={"/admin/product-form"}
        >
          Create product
        </Button>
      </Box>
      <ProductsTable />
    </Box>
  );
}
