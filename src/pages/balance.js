import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  SimpleGrid,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Balance = () => {
  const [listProducts, setListProducts] = useState([]);
  const [productFiltered, setProductFiltered] = useState("");
  const [cmbProducts, setCmbProducts] = useState([]);

  const BuildBalanceArray = () => {
    const db_stock_outputs = localStorage.getItem("db_stock_outputs")
      ? JSON.parse(localStorage.getItem("db_stock_outputs"))
      : [];

    const db_stock_entries = localStorage.getItem("db_stock_entries")
      ? JSON.parse(localStorage.getItem("db_stock_entries"))
      : [];

    const db_products = localStorage.getItem("db_products")
      ? JSON.parse(localStorage.getItem("db_products"))
      : [];

    const newArray = [];

    db_products.map((prod) => {
      const entries = db_stock_entries
        .filter((item) => item.product_id === prod.id)
        .map((entry) => Number(entry.amount))
        .reduce((acc, cur) => acc + cur, 0);

      const outputs = db_stock_outputs
        .filter((item) => item.product_id === prod.id)
        .map((entry) => Number(entry.amount))
        .reduce((acc, cur) => acc + cur, 0);

      const total = Number(entries) - Number(outputs);

      newArray.push({
        product_id: prod.id,
        product_name: prod.name,
        amount: total,
      });

      setListProducts(newArray);
      setCmbProducts(newArray);
    });
  };

  useEffect(() => {
    BuildBalanceArray();
  }, []);

  const handleFilterProducts = () => {
    if (!productFiltered) {
      setListProducts(cmbProducts);
      return;
    }

    const newArray = cmbProducts.filter(
      (item) => item.product_id === productFiltered
    );

    setListProducts(newArray);
  };

  return (
    <Flex h="100vh" flexDirection="column">
      <Header />

      <Flex w="100%" my="6" maxW={1120} mx="auto" px="6" h="100vh">
        <Sidebar />

        <Box w="100%">
          <SimpleGrid minChildWidth={240} h="fit-content" spacing="6">
            <Select
              value={productFiltered}
              onChange={(e) => setProductFiltered(e.target.value)}
            >
              <option value="">Selecione um item</option>
              {cmbProducts &&
                cmbProducts.length > 0 &&
                cmbProducts.map((item, i) => (
                  <option key={i} value={item.product_id}>
                    {item.product_name}
                  </option>
                ))}
            </Select>
            <Button w="40" onClick={handleFilterProducts}>
              FILTRAR
            </Button>
          </SimpleGrid>

          <Box overflowY="auto" height="80vh">
            <Table mt="6">
              <Thead>
                <Tr>
                  <Th fontWeight="bold" fontSize="14px">
                    Nome
                  </Th>
                  <Th fontWeight="bold" fontSize="14px">
                    Qtd.
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {listProducts.map((item, i) => (
                  <Tr key={i}>
                    <Td color="gray.500">{item.product_name}</Td>
                    <Td color="gray.500">{item.amount}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Balance;
